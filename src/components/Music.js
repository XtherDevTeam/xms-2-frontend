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

function ShowPlaylists(props) {
  if (props.list.length === 0) {
    return (<Mui.Typography variant='body2' color="text.secondary" sx={{textAlign: "center"}}>No data here...</Mui.Typography>)
  } else {
    return (
      <Mui.Grid container spacing={2}>
        {props.list.map((row, index) => (
          <Mui.Grid item xs={6} sm={6} md={4}>
            <Mui.Card sx={{ width: "100%" }}>
              <Mui.CardMedia
                // sx={{ wid" }}
                image={Api.getPlaylistArtworkPath(row.id)}
                title={row.name}
              />
              <Mui.CardContent>
                <Mui.ListItemButton component="button" onClick={() => { }}>
                  <Mui.ListItemText primary={row.name} secondary={row.desccription} />
                </Mui.ListItemButton>
              </Mui.CardContent>
            </Mui.Card>
          </Mui.Grid>
        ))}
      </Mui.Grid>
    )
  }
}

export default function Music(props) {
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

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

  React.useEffect(() => {
    if (currentTab === 0) {
      updateUserPlaylist(props.userInfo.id)
    } else if (currentTab === 1) {

    } else {

    }
  }, [currentTab])

  return (
    <Mui.Card sx={{ width: props.width }}>
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
          <ShowPlaylists list={playlistsData} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
          <ShowPlaylists list={playlistsData} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
          233
        </CustomTabPanel>
      </Mui.CardContent>
    </Mui.Card>
  )
}