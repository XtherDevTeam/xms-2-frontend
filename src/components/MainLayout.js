import React, { useState } from 'react';
import { PlayerProvider } from '../context/PlayerContext';
import MiniPlayer from './MiniPlayer';
import PlayerPage from './PlayerPage';
import PlaylistDialog from './PlaylistDialog';
import * as Mui from '../Components';
import { ThemeProvider } from '@mui/material/styles';

export default function MainLayout({ children }) {
  const [currentTheme, setCurrentTheme] = useState(Mui.theme());
  
  Mui.listenToThemeModeChange(() => {
    setCurrentTheme(Mui.theme());
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <Mui.CssBaseline />
      <PlayerProvider>
        {children}
        <MiniPlayer />
        <PlayerPage />
        <PlaylistDialog />
      </PlayerProvider>
    </ThemeProvider>
  );
}
