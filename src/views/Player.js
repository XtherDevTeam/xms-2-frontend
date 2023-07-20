import * as React from 'react'
import * as Mui from '../Components'
import BlurBackground from '../components/BlurBackground'
import * as Api from '../Api.js'
import './Player.css'

import * as qs from 'qs'
import { ThemeProvider, createTheme } from '@mui/material'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function Player(props) {
  let [editPlaylistDialogStatus, setEditPlaylistDialogStatus] = React.useState(false)
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })
  let [searchParams, setSearchParams] = React.useState({ playlistId: 0 })
  let [currentArtwork, setCurrentArtwork] = React.useState("")
  let [playlistSongList, setPlaylistSongList] = React.useState([])

  let [playlistInfo, setPlaylistInfo] = React.useState({
    name: '丁真珍珠歌曲精选',
    description: '丁真歌曲不完全收录，包含了《I Got Smoke》《Zood》《XXX》等名曲。',
    creationDate: '2008-6-21 11:45:14',
    playCount: 0
  })
  let [currentTrackIndex, setCurrentTrackIndex] = React.useState(-1)
  let [currentTrackInfo, setCurrentTrackInfo] = React.useState({
    info: {
      title: '烟 Distance',
      album: '丁真珍珠最新力作',
      artist: '礼堂丁真',
      composer: 'User'
    },
    id: 0,
    path: ''
  })
  let [currentPlayStatus, setCurrentPlayStatus] = React.useState({
    progressStr: '--:--',
    durationStr: '--:--'
  })
  let [currentVolume, setCurrentVolume] = React.useState(50)
  let [volumeChangeBarState, setVolumeChangeBarState] = React.useState(false)
  let [inInitialState, setInInitialState] = React.useState(true)
  let [currentPlayInfoStatus, setCurrentPlayInfoStatus] = React.useState(false)
  let [currentPlayInfoMode, setCurrentPlayInfoMode] = React.useState(0)
  let [currentMusicFile, setCurrentMusicFile] = React.useState("")
  let [currentProgress, setCurrentProgress] = React.useState(0)
  let [lastStartTime, setLastStartTime] = React.useState(0)
  let [currentPlayTime, setCurrentPlayTime] = React.useState(0)
  let [currentDuration, setCurrentDuration] = React.useState(0)

  let audioRef = React.useRef(new Audio(""))
  let intervalRef = React.useRef()

  let updateCurrentPlayStatus = () => {
    setCurrentPlayStatus({
      progressStr: Api.getPlayTimeStr(audioRef.current.currentTime),
      durationStr: Api.getPlayTimeStr(audioRef.current.duration)
    })
  }

  let runTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentProgress(audioRef.current.currentTime)
      updateCurrentPlayStatus()
    }, 500)
  }

  let forceStartPlaying = () => {
    setCurrentPlayInfoStatus(true)
    audioRef.current.play()
  }

  let selectNextSong = (isClickedEvent, lastSongIndex) => {
    console.log("SELECTING NEXT SONG:", isClickedEvent, playlistSongList)
    if (playlistSongList.length == 0) {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error selecting next song: playlist is empty!` })
      setAlertOpen(true)
      return null
    }
    if (currentPlayInfoMode == 0) {
      return (lastSongIndex + 1) % playlistSongList.length
    } else if (currentPlayInfoMode == 1) {
      return isClickedEvent ? (lastSongIndex + 1) % playlistSongList.length : lastSongIndex
    } else {
      return Api.getRndInteger(0, playlistSongList.length - 1)
    }
  }

  let selectPrevSong = (isClickedEvent, lastSongIndex) => {
    if (playlistSongList.length == 0) {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error selecting next song: playlist is empty!` })
      setAlertOpen(true)
      return null
    }
    if (currentPlayInfoMode == 0) {
      return (lastSongIndex - 1) % playlistSongList.length
    } else if (currentPlayInfoMode == 1) {
      return (lastSongIndex - 1) % playlistSongList.length
    } else {
      return Api.getRndInteger(0, playlistSongList.length - 1)
    }
  }

  let prepareForPlaying = (isClickedEvent, selector) => {
    let next = selector(isClickedEvent, currentTrackIndex)
    if (next === null) {
      return
    } else {
      console.log("selector: ", next, playlistSongList[next].id)
      if (next === currentTrackIndex) {
        audioRef.current.currentTime = 0
      }
      setCurrentMusicFile(Api.getMusicPlaylistSongsFileSrc(searchParams.playlistId, playlistSongList[next].id))
      setCurrentTrackInfo(playlistSongList[next])
      setCurrentTrackIndex(next)
      setCurrentArtwork(Api.getSongArtworkPath(playlistSongList[next].id))
      setLastStartTime(0)
    }
  }

  let refreshPlaylistInfo = (pid) => {
    Api.musicPlaylistInfo(pid).then((data) => {
      if (data.data.ok) {
        setPlaylistInfo(data.data.data)
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error refreshing playlist info: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error refreshing playlist info: NetworkError` })
      setAlertOpen(true)
    })
  }

  let refreshPlaylistSongList = (pid, initial) => {
    Api.musicPlaylistSongs(pid).then((data) => {
      if (data.data.ok) {
        setPlaylistSongList(data.data.data)
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error refreshing playlist songs: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error refreshing playlist songs: NetworkError` })
      setAlertOpen(true)
    })
  }

  let setPlayProgress = (newProgress) => {
    audioRef.current.currentTime = newProgress
  }

  React.useEffect(() => {
    let result = qs.parse(window.location.search.replace(/^\?/, ''))
    if (result.playlistId === undefined) {
      setAlertDetail({ "type": "error", "title": "Error", "message": "playlistId doesn't not provided in the param" })
      setAlertOpen(true)
    } else {
      result.playlistId = JSON.parse(result.playlistId)
      if (Number.isInteger(result.playlistId)) {
        setSearchParams(result)
        setCurrentArtwork(Api.getPlaylistArtworkPath(result.playlistId))
        refreshPlaylistInfo(result.playlistId)
        refreshPlaylistSongList(result.playlistId, true)
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": "playlistId is not an integer" })
        setAlertOpen(true)
      }
    }
  }, [props])

  React.useEffect(() => {
    if (playlistSongList.length === 0) {
      return
    }
    if (currentTrackIndex === -1) {
      console.log(playlistSongList)
      prepareForPlaying(false, selectNextSong)
    }
  }, [playlistSongList])

  React.useEffect(() => {
    if (currentPlayInfoStatus) {
      audioRef.current.play()
      runTimer()
    } else {
      clearInterval(intervalRef.current)
      audioRef.current.pause()
    }
  }, [currentPlayInfoStatus])

  React.useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(currentMusicFile)
    audioRef.current.oncanplaythrough = () => {
      updateCurrentPlayStatus()
      setCurrentProgress(audioRef.current.currentTime)
      setCurrentDuration(audioRef.current.duration)
      if (!inInitialState) {
        forceStartPlaying()
      } else {
        setInInitialState(false)
      }
    }
    audioRef.current.onpause = () => {
      setCurrentPlayInfoStatus(false)
    }
    audioRef.current.onended = () => {
      setCurrentPlayInfoStatus(false)
      prepareForPlaying(false, selectNextSong)
    }
    audioRef.current.onplay = () => {
      setCurrentPlayInfoStatus(true)
    }
  }, [currentMusicFile])

  React.useEffect(() => {
    audioRef.current.volume = currentVolume / 100.0
  }, [currentVolume])

  React.useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  let EditPlaylistDialog = () => {
    return (
      <Mui.Dialog open={editPlaylistDialogStatus} onClose={() => {
        setEditPlaylistDialogStatus(false)
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
              Api.musicPlaylistEdit(searchParams.playlistId, name, description).then((data) => {
                if (data.data.ok) {
                  refreshPlaylistInfo(searchParams.playlistId)
                } else {
                  setAlertDetail({ "type": "error", "title": "Error", "message": `Error editing playlist: ${data.data.data}` })
                  setAlertOpen(true)
                }
                setEditPlaylistDialogStatus(false)
              }).catch((err) => {
                setAlertDetail({ "type": "error", "title": "Error", "message": `Error editing playlist: NetworkError` })
                setAlertOpen(true)
                setEditPlaylistDialogStatus(false)
              })
            }
          }}
        >
          <Mui.DialogTitle>Edit playlist</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Typography variant='body2'>
              Change the playlist name and description
            </Mui.Typography>
            <Mui.TextField
              margin="normal"
              variant='filled'
              required
              fullWidth
              id="playlist-name-input"
              label="Playlist name"
              name="name"
              defaultValue={playlistInfo.name}
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
              defaultValue={playlistInfo.description}
              autoFocus
            />
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={() => (setEditPlaylistDialogStatus(false))}>Cancel</Mui.Button>
            <Mui.Button type='submit'>OK</Mui.Button>
          </Mui.DialogActions>
        </Mui.Box>
      </Mui.Dialog>
    )
  }

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: 'dark',
      }
    })}>
      <BlurBackground loading="lazy" img={`${currentArtwork}`} filterArg="50px" backgroundColor="rgba(0, 0, 0, 0.40)"></BlurBackground>
      <EditPlaylistDialog></EditPlaylistDialog>
      <Mui.Container style={{ height: '100vh', overflowY: 'hidden' }}>
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
        <Mui.Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          open={volumeChangeBarState}
          onClose={() => {
            setVolumeChangeBarState(false)
          }}
          key="volume-change-bar"
        >
          <Mui.Paper sx={{ width: '100%', padding: '10px' }}>
            <Mui.Stack direction="row" alignItems="center" gap={1} spacing={2}>
              <Mui.Typography color='text.primary' component={"div"}><Mui.Icons.VolumeDown /></Mui.Typography>
              <Mui.Slider style={{ width: '20vw' }} size="small" aria-label="Volume" min={0} max={100} value={currentVolume} onChange={(e, v) => {
                setCurrentVolume(v)
              }} />
              <Mui.Typography color='text.primary' component={"div"}><Mui.Icons.VolumeUp /></Mui.Typography>
            </Mui.Stack>
          </Mui.Paper>
        </Mui.Snackbar>
        <Mui.Grid container style={{ width: "100%" }} whiteSpace={4}>
          <Mui.Grid item xs={12} sm={6} md={4}>
            <Mui.Container style={{ height: "100vh", "display": "flex" }}>
              <div id="player-box" style={{ margin: "auto", width: "100%" }}>
                <img loading="lazy" src={`${currentArtwork}`} style={{ display: "block", borderRadius: "25px", width: "80%", height: "auto" }}></img>
                <Mui.Typography variant='h3' component={"div"} color='text.primary' style={{
                  marginTop: "40px",
                  width: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden"
                }}>{currentTrackInfo.info.title}</Mui.Typography>
                <Mui.Typography variant='body1' component={"div"} color='text.secondary' style={{
                  marginTop: "10px",
                  width: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden"
                }}>
                  <Mui.IconText>
                    <Mui.Icon><Mui.Icons.Album /></Mui.Icon>
                    <div>{currentTrackInfo.info.album}</div>
                  </Mui.IconText>
                </Mui.Typography>
                <Mui.Typography variant='body1' component={"div"} color='text.secondary' style={{
                  marginTop: "10px",
                  width: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden"
                }}>
                  <Mui.IconText>
                    <Mui.Icon><Mui.Icons.Mic /></Mui.Icon>
                    <div>{currentTrackInfo.info.artist}</div>
                  </Mui.IconText>
                </Mui.Typography>
                <Mui.Stack spacing={2} direction="row" sx={{ mb: 1, marginTop: '10px' }} alignItems="center">
                  <Mui.Typography color='text.secondary'>{currentPlayStatus.progressStr}</Mui.Typography>
                  <Mui.Slider min={0} max={currentDuration} value={currentProgress} onChange={(e, v) => {
                    setPlayProgress(v)
                  }} aria-label="Progress bar" size='small' />
                  <Mui.Typography color='text.secondary'>{currentPlayStatus.durationStr}</Mui.Typography>
                </Mui.Stack>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Mui.IconButton onClick={() => {
                    prepareForPlaying(true, selectPrevSong)
                  }}><Mui.Icons.SkipPrevious /></Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    let newProgress = currentProgress - 15
                    setCurrentProgress(newProgress > 0 ? newProgress : 0)
                  }}><Mui.Icons.FastRewind /></Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    setCurrentPlayInfoStatus(!currentPlayInfoStatus)
                  }}>
                    {currentPlayInfoStatus && <Mui.Icons.Pause />}
                    {!currentPlayInfoStatus && <Mui.Icons.PlayArrow />}
                  </Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    let newProgress = currentProgress + 15
                    setPlayProgress(newProgress < currentDuration ? newProgress : currentDuration)
                  }}><Mui.Icons.FastForward /></Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    prepareForPlaying(true, selectNextSong)
                  }}><Mui.Icons.SkipNext /></Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    setCurrentPlayInfoMode((currentPlayInfoMode + 1) % 3)
                  }}>
                    {currentPlayInfoMode === 0 &&
                      <Mui.Icons.List />
                    }
                    {currentPlayInfoMode === 1 &&
                      <Mui.Icons.Loop />
                    }
                    {currentPlayInfoMode === 2 &&
                      <Mui.Icons.Shuffle />
                    }
                  </Mui.IconButton>
                  <Mui.IconButton onClick={() => {
                    setVolumeChangeBarState(true)
                  }}><Mui.Icons.VolumeUp /></Mui.IconButton>
                </div>
              </div>
            </Mui.Container>
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} md={8}>
            <Mui.Paper className='scrollhost' elevation={5} sx={{
              height: "calc(90vh - 16px - 20px)",
              borderRadius: '20px',
              padding: "40px 40px 20px 40px",
              marginTop: 'calc(10vh - 16px + 40px)',
              backgroundColor: 'rgba(0, 0, 0, .30)',
              overflowY: 'scroll',
            }}>
              <Mui.IconButton sx={{ float: 'right' }} onClick={() => { setEditPlaylistDialogStatus(true) }}><Mui.Icons.Edit /></Mui.IconButton>
              <Mui.Typography color='text.primary' variant='h4'>
                {playlistInfo.name}
              </Mui.Typography>
              <div style={{ marginTop: '10px' }} />
              <Mui.Typography color='text.secondary' variant='body2'>
                {playlistInfo.description}
              </Mui.Typography>
              <div style={{ marginTop: '10px' }} />
              <Mui.Typography color='text.secondary' variant='body2'>
                <Mui.IconText>
                  <Mui.Icon><Mui.Icons.PlayCircle /></Mui.Icon><div>{playlistInfo.playCount}</div>
                  <Mui.Icon><Mui.Icons.DateRange /></Mui.Icon><div>{playlistInfo.creationDate}</div>
                </Mui.IconText>
              </Mui.Typography>
              <div style={{ marginTop: '10px' }} />

              <DragDropContext onDragEnd={(result) => {
                if (result.destination == null) {
                  return null
                }
                [playlistSongList[result.source.index], playlistSongList[result.destination.index]] = [playlistSongList[result.destination.index], playlistSongList[result.source.index]]
                Api.musicPlaylistSongsSwap(
                  searchParams.playlistId,
                  playlistSongList[result.source.index].id,
                  playlistSongList[result.destination.index].id).then((data) => {
                    if (data.data.ok) {
                      refreshPlaylistSongList(searchParams.playlistId, false)
                    } else {
                      setAlertDetail({ "type": "error", "title": "Error", "message": `Error swapping playlist songs: ${data.data.data}` })
                      setAlertOpen(true)
                    }
                  }).catch((err) => {
                    setAlertDetail({ "type": "error", "title": "Error", "message": `Error swapping playlist songs: NetworkError` })
                    setAlertOpen(true)
                  })

              }}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <Mui.List {...provided.droppableProps} ref={provided.innerRef} sx={{ width: "100%" }}>
                      {
                        playlistSongList.map((row, index) => (
                          <Draggable key={`playlist-song-${row.id}`} draggableId={`playlist-song-${row.id}`} index={index}>
                            {(provided, snapshot) => (
                              <Mui.ListItem
                                disablePadding
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                                secondaryAction={
                                  <Mui.IconButton aria-label='delete' onClick={() => {
                                    Api.musicPlaylistSongsDelete(searchParams.playlistId, row.id).then((data) => {
                                      if (data.data.ok) {
                                        refreshPlaylistSongList(searchParams.playlistId)
                                      } else {
                                        setAlertDetail({ "type": "error", "title": "Error", "message": `Error deleting playlist songs: ${data.data.data}` })
                                        setAlertOpen(true)
                                      }
                                    }).catch((err) => {
                                      setAlertDetail({ "type": "error", "title": "Error", "message": `Error deleting playlist songs: NetworkError` })
                                      setAlertOpen(true)
                                    })
                                  }}>
                                    <Mui.Icons.Delete />
                                  </Mui.IconButton>
                                }>
                                <Mui.ListItemButton onClick={() => {
                                  prepareForPlaying(true, () => {
                                    return index
                                  })
                                }}>
                                  <Mui.ListItemIcon>
                                    {/* Work around: 解决img缓存问题 */}
                                    <Mui.Avatar imgProps={{ loading: 'lazy' }} variant="rounded" alt="artwork" src={`${Api.getSongArtworkPath(row.id)}`} />
                                  </Mui.ListItemIcon>
                                  <Mui.ListItemText primary={row.info.title} secondary={row.info.artist} />
                                </Mui.ListItemButton>
                              </Mui.ListItem>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Mui.List>
                  )}
                </Droppable>
              </DragDropContext>
              <div style={{ marginTop: '20px' }} />
            </Mui.Paper>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Container>
    </ThemeProvider >
  )
}