import React, { useEffect, useState, useRef } from 'react';
import * as Mui from '../Components';
import { useTheme } from '@mui/material/styles';

/**
 * LyricView Component
 * @param {Array} lyrics - Array of { time, text } objects
 * @param {number} currentTime - Current playback position in seconds
 * @param {function} onLyricPress - Callback when a lyric line is pressed
 */
const LyricView = ({ lyrics = [], sub_lyrics = null, currentTime = 0, onLyricPress }) => {
  const defaultLyricOffset = -1.0; // -1.0s
  const theme = useTheme();
  const scrollViewRef = useRef(null);
  const [lineLayouts, setLineLayouts] = useState({});

  // Find the index of the current lyric line
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time + defaultLyricOffset && (!nextLine || currentTime < nextLine.time + defaultLyricOffset);
  });

  // Auto-scroll to center the current line
  useEffect(() => {
    if (scrollViewRef.current && currentLineIndex !== -1) {
      const container = scrollViewRef.current;
      const targetLayout = lineLayouts[currentLineIndex];
      if (targetLayout) {
        const containerHeight = container.offsetHeight;
        // Calculate scroll Y to center the current line
        const scrollToY = Math.max(0, targetLayout.y - containerHeight / 2 + targetLayout.height / 2);
        
        container.scrollTo({
          top: scrollToY,
          behavior: 'smooth',
        });
      }
    }
  }, [currentLineIndex, lineLayouts]);

  if (!lyrics || lyrics.length === 0) {
    return (
      <Mui.Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Mui.Typography sx={{ color: 'text.secondary', opacity: 0.5 }}>
          No lyrics available
        </Mui.Typography>
      </Mui.Box>
    );
  }

  const handleRef = (index, el) => {
    if (el) {
      const offsetTop = el.offsetTop;
      const offsetHeight = el.offsetHeight;
      setLineLayouts(prev => {
        if (prev[index] && Math.abs(prev[index].y - offsetTop) < 0.5 && Math.abs(prev[index].height - offsetHeight) < 0.5) {
          return prev;
        }
        return { ...prev, [index]: { y: offsetTop, height: offsetHeight } };
      });
    }
  };

  return (
    <Mui.Box sx={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
      <Mui.Box
        ref={scrollViewRef}
        sx={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingX: 2,
          paddingTop: '35vh',
          paddingBottom: '35vh',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {lyrics.map((line, index) => (
          <Mui.Typography
            key={`${line.time}-${index}`}
            component="div"
            onClick={() => onLyricPress && onLyricPress(line)}
            ref={(el) => handleRef(index, el)}
            sx={{
              fontSize: index === currentLineIndex ? 26 : 26,
              lineHeight: 1.5,
              textAlign: 'left',
              marginTop: index === currentLineIndex ? 20 : 10,
              marginBottom: index === currentLineIndex ? 20 : 10,
              minHeight: '32px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: index === currentLineIndex ? theme.palette.primary.main : 'text.secondary',
              opacity: index === currentLineIndex ? 1 : 0.4,
              fontWeight: index === currentLineIndex ? 'bold' : 'normal',
              transform: index === currentLineIndex ? 'scale(1.1)' : 'scale(1)',
              transformOrigin: 'left center',
              '&:hover': {
                color: 'text.primary',
                opacity: 0.8
              }
            }}
          >
            <Mui.Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Mui.Box>{line.text || '•••'}</Mui.Box>
              {sub_lyrics && sub_lyrics[index] && sub_lyrics[index].text && (
                <Mui.Box sx={{ 
                  fontSize: '0.65em', 
                  opacity: 0.8, 
                  marginTop: '4px',
                  fontWeight: 'normal',
                  lineHeight: 1.2
                }}>
                  {sub_lyrics[index].text}
                </Mui.Box>
              )}
            </Mui.Box>
          </Mui.Typography>
        ))}
      </Mui.Box>
    </Mui.Box>
  );
};

export default LyricView;
