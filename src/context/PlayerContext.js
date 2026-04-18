import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import * as Api from '../Api';
import { get_lyric_for, parseLRC } from '../lyrics';



const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlistSongList, setPlaylistSongList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playMode, setPlayMode] = useState(0); // 0: List, 1: Loop, 2: Shuffle
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState(false);
  const [lyrics, setLyrics] = useState([]);
  const [sub_lyrics, setSubLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);


  const audioRef = useRef(new Audio(""));
  const intervalRef = useRef();
  const currentPlayCountUpdated = useRef(false);
  const isInitialReadyToPlay = useRef(false);

  // Sync volume
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // Fetch lyrics when song changes
  useEffect(() => {
    if (currentTrackInfo) {
      setLyrics([]);
      setSubLyrics([]);
      setCurrentLyricIndex(-1);
      const { title, album, artist } = currentTrackInfo.info;
      get_lyric_for(title, album, artist).then(data => {
        const lyricStr = data?.lrc;
        const subLyricStr = data?.trans;
        
        if (lyricStr) {
          const parsed = parseLRC(lyricStr);
          setLyrics(parsed);
        }
        
        if (subLyricStr) {
          const parsedSub = parseLRC(subLyricStr);
          setSubLyrics(parsedSub);
        }
      }).catch(err => console.error("Error fetching lyrics", err));
    }

  }, [currentTrackInfo]);

  // Update current lyric line based on progress
  useEffect(() => {
    if (lyrics.length > 0) {
      const index = lyrics.findIndex((line, i) => {
        const nextLine = lyrics[i + 1];
        return progress >= line.time && (!nextLine || progress < nextLine.time);
      });
      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
      }
    }
  }, [progress, lyrics, sub_lyrics, currentLyricIndex]);


  const updateCurrentPlayStatus = () => {
    if (audioRef.current.currentTime > audioRef.current.duration / 2 && !currentPlayCountUpdated.current && currentTrackInfo) {
      Api.increaseSongPlayCount(currentTrackInfo.id).then(data => {
        if (data.data.ok) {
          currentPlayCountUpdated.current = true;
        }
      }).catch(err => console.error("Error updating song play count", err));
    }
    setProgress(audioRef.current.currentTime);
  };

  const runTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      updateCurrentPlayStatus();
    }, 500);
  };

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
    runTimer();
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const selectNextSong = (isClickedEvent, lastSongIndex, list) => {
    if (list.length === 0) return null;
    if (playMode === 0) {
      return (lastSongIndex + 1) % list.length;
    } else if (playMode === 1) {
      return isClickedEvent ? (lastSongIndex + 1) % list.length : lastSongIndex;
    } else {
      return Api.getRndInteger(0, list.length - 1);
    }
  };

  const selectPrevSong = (isClickedEvent, lastSongIndex, list) => {
    if (list.length === 0) return null;
    return (lastSongIndex - 1 + list.length) % list.length;
  };

  const loadTrack = (index, list, pid) => {
    if (index === null || index === -1 || !list[index]) return;
    
    currentPlayCountUpdated.current = false;
    const song = list[index];
    const src = Api.getMusicPlaylistSongsFileSrc(pid, song.id);
    
    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.load();
    
    setCurrentTrackIndex(index);
    setCurrentTrackInfo(song);
    
    audioRef.current.oncanplaythrough = () => {
      setDuration(audioRef.current.duration);
      if (isInitialReadyToPlay.current) {
        play();
      }
    };

    audioRef.current.onended = () => {
      const next = selectNextSong(false, index, list);
      loadTrack(next, list, pid);
    };
  };

  const next = () => {
    const nextIdx = selectNextSong(true, currentTrackIndex, playlistSongList);
    isInitialReadyToPlay.current = true;
    loadTrack(nextIdx, playlistSongList, playlistId);
  };

  const prev = () => {
    const prevIdx = selectPrevSong(true, currentTrackIndex, playlistSongList);
    isInitialReadyToPlay.current = true;
    loadTrack(prevIdx, playlistSongList, playlistId);
  };

  const seek = (val) => {
    audioRef.current.currentTime = val;
    setProgress(val);
  };

  const loadPlaylist = async (pid, startWithIndex = 0) => {
    try {
      setPlaylistId(pid);
      const [infoRes, songsRes] = await Promise.all([
        Api.musicPlaylistInfo(pid),
        Api.musicPlaylistSongs(pid)
      ]);

      if (infoRes.data.ok && songsRes.data.ok) {
        setPlaylistInfo(infoRes.data.data);
        setPlaylistSongList(songsRes.data.data);
        isInitialReadyToPlay.current = true;
        loadTrack(startWithIndex, songsRes.data.data, pid);
        
        // Update playlist play count
        Api.increasePlaylistPlayCount(pid).catch(err => console.error(err));
      }
    } catch (err) {
      console.error("Failed to load playlist", err);
    }
  };

  const removeSongFromPlaylist = async (songId) => {
    try {
      const res = await Api.musicPlaylistSongsDelete(playlistId, songId);
      if (res.data.ok) {
        const updatedList = playlistSongList.filter(s => s.id !== songId);
        setPlaylistSongList(updatedList);
        if (currentTrackInfo && currentTrackInfo.id === songId) {
          next();
        } else {
          // Adjust index if necessary
          const newIdx = updatedList.findIndex(s => s.id === (currentTrackInfo?.id));
          setCurrentTrackIndex(newIdx);
        }
      }
    } catch (err) {
      console.error("Failed to delete song", err);
    }
  };

  return (
    <PlayerContext.Provider value={{
      playlistId, playlistInfo, playlistSongList, currentTrackIndex, currentTrackInfo,
      isPlaying, progress, duration, volume, playMode, isPlayerOpen, isPlaylistDrawerOpen,
      lyrics, sub_lyrics, currentLyricIndex,
      setIsPlayerOpen, setIsPlaylistDrawerOpen, setVolume, setPlayMode,
      play, pause, togglePlay, next, prev, seek, loadPlaylist, removeSongFromPlaylist
    }}>

      {children}
    </PlayerContext.Provider>
  );
};
