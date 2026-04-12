import React, { useState } from 'react';
import * as Mui from '../Components';
import * as Api from '../Api';
import { usePlayer } from '../context/PlayerContext';
import { useTheme } from '@mui/material/styles';

export default function MiniPlayer() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const {
    currentTrackInfo,
    isPlaying,
    togglePlay,
    next,
    prev,
    setIsPlayerOpen,
    progress,
    duration
  } = usePlayer();

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  if (!currentTrackInfo) return null;

  return (
    <Mui.Paper
      elevation={10}
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: { xs: '95%', sm: '400px', md: '500px' },
        height: '70px',
        borderRadius: '35px',
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}
      onClick={() => setIsPlayerOpen(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Mui.Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        height: '3px', 
        backgroundColor: theme.palette.primary.main, 
        width: `${(progress / duration) * 100}%`,
        transition: 'width 0.5s linear'
      }} />

      <Mui.Avatar
        variant="rounded"
        src={Api.getSongArtworkPath(currentTrackInfo.id)}
        sx={{ width: 50, height: 50, borderRadius: '10px', marginLeft: 5 }}
      />

      <Mui.Box sx={{ flexGrow: 1, minWidth: 0, marginLeft: 5 }}>
        <Mui.Typography variant="body1" fontWeight="bold" noWrap sx={{ color: 'text.primary' }}>
          {currentTrackInfo.info.title}
        </Mui.Typography>
        <Mui.Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
          {currentTrackInfo.info.artist}
        </Mui.Typography>
      </Mui.Box>

      <Mui.Stack direction="row" spacing={1}>
        <Mui.IconButton 
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          sx={{ color: 'text.primary' }}
        >
          {isPlaying ? <Mui.Icons.Pause /> : <Mui.Icons.PlayArrow />}
        </Mui.IconButton>
        <Mui.IconButton 
          onClick={(e) => { e.stopPropagation(); next(); }}
          sx={{ color: 'text.primary' }}
        >
          <Mui.Icons.SkipNext />
        </Mui.IconButton>
      </Mui.Stack>
    </Mui.Paper>
  );
}
