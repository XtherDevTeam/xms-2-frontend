import * as React from 'react'
import * as Mui from '../Components'

import * as Api from '../Api'
import PropTypes from 'prop-types'


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `music-tabpanel-${index}`,
  }
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`music-tabpanel-${index}`}
      aria-labelledby={`music-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Mui.Box sx={{ marginTop: "10px" }}>
          {children}
        </Mui.Box>
      )}
    </div>
  )
}

export default function Music(props) {
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  let [createPlaylistDialogStatus, setCreatePlaylistDialogState] = React.useState(false)

  let [currentTab, setCurrentTab] = React.useState(0)
  let [playlistsData, setPlaylistsData] = React.useState([])

  let updateUserPlaylist = () => {
    Api.userPlaylists().then((data) => {
      if (data.data.ok) {
        setPlaylistsData(data.data.data)
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error updating user playlists: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error updating user playlists: NetworkError` })
      setAlertOpen(true)
    })
  }

  let ShowPlaylists = () => {
    if (playlistsData.length === 0) {
      return (<Mui.Typography variant='body2' color="text.secondary" sx={{ textAlign: "center" }}>No data here...</Mui.Typography>)
    } else {
      return (
        <Mui.Grid container spacing={2}>
          {playlistsData.map((row, index) => (
            <Mui.Grid item xs={6} sm={4} md={3}>
              <Mui.Card>
                <Mui.CardActionArea onClick={() => {
                  window.open(`/player?playlistId=${row.id}`)
                }}>
                  <Mui.CardMedia
                    component="img"
                    image={Api.getPlaylistArtworkPath(row.id)}
                    title={row.name}
                  />
                </Mui.CardActionArea>
                <Mui.List sx={{ width: '100%' }}>
                  <Mui.ListItem secondaryAction={
                    currentTab === 0 &&
                    <Mui.IconButton edge="end" aria-label="delete" onClick={() => {
                      Api.musicPlaylistDelete(row.id).then((data) => {
                        if (data.data.ok) {
                          updateUserPlaylist()
                        } else {
                          setAlertDetail({ "type": "error", "title": "Error", "message": `Error deleting playlist: ${data.data.data}` })
                          setAlertOpen(true)
                        }
                      }).catch((err) => {
                        setAlertDetail({ "type": "error", "title": "Error", "message": `Error deleting playlist: NetworkError` })
                        setAlertOpen(true)
                      })
                    }}>
                      <Mui.Icons.Delete />
                    </Mui.IconButton>
                  }>
                    <Mui.ListItemText
                      primary={row.name}
                      secondary={row.description}
                      primaryTypographyProps={{
                        sx: {
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden"
                        }
                      }}
                      secondaryTypographyProps={{
                        sx: {
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden"
                        }
                      }} />
                  </Mui.ListItem>
                </Mui.List>
              </Mui.Card>
            </Mui.Grid>
          ))}
        </Mui.Grid>
      )
    }
  }

  let CreatePlaylistDialog = () => {
    return (
      <Mui.Dialog open={createPlaylistDialogStatus} onClose={() => {
        setCreatePlaylistDialogState(false)
      }}>
        <Mui.Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault()
            let formData = new FormData(event.currentTarget)
            let name = formData.get("name")
            let description = formData.get("description")
            if (name.length === 0 || description.length === 0) {
              setAlertDetail({ "type": "error", "title": "Error", "message": `Playlist name or description is empty!` })
              setAlertOpen(true)
            } else {
              Api.musicPlaylistCreate(name, description).then((data) => {
                if (data.data.ok) {
                  setCurrentTab(0)
                  updateUserPlaylist()
                } else {
                  setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating playlist: ${data.data.data}` })
                  setAlertOpen(true)
                }
                setCreatePlaylistDialogState(false)
              }).catch((err) => {
                setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating playlist: NetworkError` })
                setAlertOpen(true)
                setCreatePlaylistDialogState(false)
              })
            }
          }}
        >
          <Mui.DialogTitle>Create playlist</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Typography variant='body2'>
              A playlist is a minimum unit of playing music in music player, so what are you waiting for? Create and add musics into playlist!
            </Mui.Typography>
            <Mui.TextField
              margin="normal"
              variant='filled'
              required
              fullWidth
              id="playlist-name-input"
              label="Playlist name"
              name="name"
              autoFocus
            />
            <Mui.TextField
              margin="normal"
              variant='filled'
              required
              fullWidth
              id="playlist-description-input"
              label="Playlist description"
              name="description"
              multiline
              maxRows={4}
              autoFocus
            />
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={() => (setCreatePlaylistDialogState(false))}>Cancel</Mui.Button>
            <Mui.Button type='submit'>OK</Mui.Button>
          </Mui.DialogActions>
        </Mui.Box>
      </Mui.Dialog>
    )
  }

  React.useEffect(() => {
    if (currentTab === 0) {
      updateUserPlaylist(props.userInfo.id)
    } else if (currentTab === 1) {
      setPlaylistsData([])
    } else {

    }
  }, [currentTab])

  return (
    <div>
      <Mui.Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => { setAlertOpen(false) }}>
        <Mui.Alert severity={alertDetail.type} action={
          <Mui.IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlertOpen(false) }} >
            <Mui.Icons.Close fontSize="inherit" />
          </Mui.IconButton>
        }>
          <Mui.AlertTitle>{alertDetail.title}</Mui.AlertTitle>
          {alertDetail.message}
        </Mui.Alert>
      </Mui.Snackbar>
      <Mui.CardContent>
        <Mui.Typography gutterBottom variant="h6" component="div">
          {"Music"}
        </Mui.Typography>
        <Mui.Tabs value={currentTab} onChange={(event, value) => { setCurrentTab(value) }} centered>
          <Mui.Tab label="My Playlists" value={0} {...a11yProps(0)} />
          <Mui.Tab label="Explore" value={1} {...a11yProps(1)} />
          <Mui.Tab label="Statistics" value={2} {...a11yProps(2)} />
        </Mui.Tabs>
        <CustomTabPanel value={currentTab} index={0}>
          <CreatePlaylistDialog></CreatePlaylistDialog>
          <Mui.Fab sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }} color="primary" aria-label="add" onClick={() => { setCreatePlaylistDialogState(true) }}>
            <Mui.Icons.Add />
          </Mui.Fab>
          <ShowPlaylists list={playlistsData} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
          <ShowPlaylists list={playlistsData} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
          233
        </CustomTabPanel>
      </Mui.CardContent>
    </div>
  )
}