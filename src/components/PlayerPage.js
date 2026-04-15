import React from 'react';

import * as Mui from '../Components';
import * as Api from '../Api';
import BlurBackground from './BlurBackground';
import LyricView from './LyricView';
import { usePlayer } from '../context/PlayerContext';

import { useTheme } from '@mui/material/styles';

export default function PlayerPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const {
    currentTrackInfo,
    isPlayerOpen,
    setIsPlayerOpen,
    isPlaying,
    progress,
    duration,
    volume,
    playMode,
    setIsPlaylistDrawerOpen,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    setPlayMode,
    lyrics,
    sub_lyrics
  } = usePlayer();

  if (!currentTrackInfo) return null;


  const artwork = Api.getSongArtworkPath(currentTrackInfo.id);

  return (
    <Mui.Slide direction="up" in={isPlayerOpen} timeout={500} mountOnEnter unmountOnExit>
      <Mui.Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1300,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <BlurBackground
          img={artwork}
          filterArg="80px"
          backgroundColor={isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}
        />

        <Mui.Container maxWidth="lg" sx={{ minHeight: '100%', paddingTop: 4, paddingBottom: 4, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <Mui.IconButton
            onClick={() => setIsPlayerOpen(false)}
            sx={{ position: 'absolute', top: 20, left: 20, color: 'text.primary' }}
          >
            <Mui.Icons.KeyboardArrowDown sx={{ fontSize: 40 }} />
          </Mui.IconButton>

          <Mui.Grid container spacing={4} sx={{ flexGrow: 1, alignItems: 'center' }}>
            {/* Left Panel: Cover and Controls */}
            <Mui.Grid item xs={12} md={6}>
              <Mui.Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left' }}>
                <Mui.Paper
                  elevation={10}
                  sx={{
                    width: { xs: '180px', sm: '220px', md: '300px', lg: '350px' },
                    height: { xs: '180px', sm: '220px', md: '300px', lg: '350px' },
                    maxWidth: '45vh',
                    maxHeight: '45vh',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: { xs: 2, md: 4, lg: 6 },
                    transition: 'transform 0.3s ease',
                    transform: isPlaying ? 'scale(1.02)' : 'scale(0.95)',
                    boxShadow: isPlaying
                      ? (isDarkMode ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.2)')
                      : (isDarkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)')
                  }}
                >
                  <img
                    src={artwork}
                    alt="album cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Mui.Paper>

                <Mui.Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary', marginBottom: 1, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentTrackInfo.info.title}
                </Mui.Typography>
                <Mui.Typography variant="h6" sx={{ color: 'text.secondary', marginBottom: 3 }}>
                  {currentTrackInfo.info.artist} • {currentTrackInfo.info.album}
                </Mui.Typography>

                <Mui.Box sx={{ width: '100%', mb: 2, textAlign: 'center' }}>
                  <Mui.Stack direction="row" spacing={2} alignItems="center">
                    <Mui.Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 40 }}>
                      {Api.getPlayTimeStr(progress)}
                    </Mui.Typography>
                    <Mui.Slider
                      size="small"
                      value={progress}
                      min={0}
                      max={duration || 100}
                      onChange={(e, v) => seek(v)}
                      sx={{
                        color: theme.palette.primary.main,
                        '& .MuiSlider-thumb': {
                          width: 12,
                          height: 12,
                        },
                      }}
                    />
                    <Mui.Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 40 }}>
                      {Api.getPlayTimeStr(duration)}
                    </Mui.Typography>
                  </Mui.Stack>
                </Mui.Box>

                <Mui.Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                  <Mui.IconButton sx={{ color: 'text.primary' }} onClick={() => setPlayMode((playMode + 1) % 3)}>
                    {playMode === 0 && <Mui.Icons.Repeat />}
                    {playMode === 1 && <Mui.Icons.RepeatOne />}
                    {playMode === 2 && <Mui.Icons.Shuffle />}
                  </Mui.IconButton>

                  <Mui.IconButton sx={{ color: 'text.primary' }} onClick={prev}>
                    <Mui.Icons.SkipPrevious sx={{ fontSize: 32 }} />
                  </Mui.IconButton>

                  <Mui.Fab
                    color="primary"
                    onClick={togglePlay}
                    sx={{ width: 64, height: 64, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                  >
                    {isPlaying ? <Mui.Icons.Pause sx={{ fontSize: 32 }} /> : <Mui.Icons.PlayArrow sx={{ fontSize: 32 }} />}
                  </Mui.Fab>

                  <Mui.IconButton sx={{ color: 'text.primary' }} onClick={next}>
                    <Mui.Icons.SkipNext sx={{ fontSize: 32 }} />
                  </Mui.IconButton>

                  <Mui.IconButton sx={{ color: 'text.primary' }} onClick={() => setIsPlaylistDrawerOpen(true)}>
                    <Mui.Icons.QueueMusic />
                  </Mui.IconButton>
                </Mui.Stack>


                <Mui.Stack direction="row" spacing={3} alignItems="center" justifyContent="center" sx={{ marginTop: { xs: 2, md: 4, lg: 8 } }}>
                  <Mui.Stack direction="row" spacing={2} alignItems="center" sx={{ width: '95%' }}>
                    <Mui.Icons.VolumeDown sx={{ color: 'text.secondary' }} />
                    <Mui.Slider
                      size="small"
                      value={volume}
                      onChange={(e, v) => setVolume(v)}
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Mui.Icons.VolumeUp sx={{ color: 'text.secondary' }} />
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Box>
            </Mui.Grid>

            <Mui.Grid item xs={12} md={6} sx={{ display: 'flex', position: 'relative' }}>
              <Mui.Box
                sx={{
                  width: '100%',
                  height: { xs: '60vh', md: '70vh', lg: '75vh' },
                  maxHeight: '75vh',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                  maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                }}
              >
                {!lyrics || lyrics.length === 0 ? (
                  <Mui.Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Mui.Typography variant="h5" fontStyle="italic" sx={{ opacity: 0.6, color: 'text.secondary' }}>
                      {currentTrackInfo ? "Searching for lyrics..." : "No track selected"}
                    </Mui.Typography>
                  </Mui.Box>
                ) : (
                  <LyricView 
                    lyrics={lyrics} 
                    sub_lyrics={sub_lyrics}
                    currentTime={progress} 
                    onLyricPress={(line) => seek(line.time)} 
                  />
                )}
              </Mui.Box>
            </Mui.Grid>


          </Mui.Grid>
        </Mui.Container>
      </Mui.Box>
    </Mui.Slide>
  );
}
