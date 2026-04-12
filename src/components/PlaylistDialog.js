import React from 'react';
import * as Mui from '../Components';
import * as Api from '../Api';
import { usePlayer } from '../context/PlayerContext';
import { useTheme } from '@mui/material/styles';

export default function PlaylistDialog() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { 
    isPlaylistDrawerOpen, 
    setIsPlaylistDrawerOpen, 
    playlistSongList, 
    currentTrackIndex,
    loadPlaylist,
    playlistId,
    removeSongFromPlaylist
  } = usePlayer();

  return (
    <Mui.Dialog 
      open={isPlaylistDrawerOpen} 
      onClose={() => setIsPlaylistDrawerOpen(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(15px)',
          color: 'text.primary',
          backgroundImage: 'none'
        }
      }}
    >
      <Mui.DialogTitle>
        Current Playlist
      </Mui.DialogTitle>
      <Mui.DialogContent sx={{ mt: 2, maxHeight: '60vh' }}>
        <Mui.List>
          {playlistSongList.map((song, index) => (
            <Mui.ListItem
              key={song.id}
              disablePadding
              secondaryAction={
                <Mui.IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={() => removeSongFromPlaylist(song.id)}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                >
                  <Mui.Icons.Delete />
                </Mui.IconButton>
              }
              sx={{
                borderRadius: '35px',
                mb: 1,
                backgroundColor: index === currentTrackIndex 
                  ? (isDarkMode ? 'rgba(207, 188, 255, 0.2)' : 'rgba(103, 80, 164, 0.1)') 
                  : 'transparent',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <Mui.ListItemButton onClick={() => loadPlaylist(playlistId, index)}>
                <Mui.ListItemIcon>
                  <Mui.Avatar 
                    variant="rounded" 
                    src={Api.getSongArtworkPath(song.id)} 
                    sx={{ width: 40, height: 40 }}
                  />
                </Mui.ListItemIcon>
                <Mui.ListItemText 
                  primary={song.info.title} 
                  secondary={song.info.artist} 
                  primaryTypographyProps={{ 
                    sx: { 
                      color: index === currentTrackIndex ? 'primary.main' : 'text.primary', 
                      fontWeight: index === currentTrackIndex ? 'bold' : 'normal' 
                    } 
                  }}
                  secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                />
              </Mui.ListItemButton>
            </Mui.ListItem>
          ))}
        </Mui.List>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setIsPlaylistDrawerOpen(false)}>
          Close
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
}
