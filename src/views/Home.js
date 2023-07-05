import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'

import * as Api from '../Api'
import { useNavigate, useHref } from "react-router-dom"
import { Icon } from '@mui/material'

const defaultTheme = createTheme()

export default function Home() {
  let navigate = useNavigate();

  let [userInfo, setUserInfo] = React.useState({})

  let [currentTab, setCurrentTab] = React.useState(0)

  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  React.useEffect(() => {
    Api.checkIfLoggedIn().then((data) => {
      if (data.data.ok) {
        let uid = data.data.data.uid
        Api.userInfo(uid).then((data) => {
          if (data.data.ok) {
            setUserInfo(data.data.data)
            console.log(userInfo)
          } else {
            setAlertDetail({ "type": "error", "title": "Error", "message": `Error querying user information: ${data.data.data}` })
            setAlertOpen(true)
          }
        }).catch((err) => {
          setAlertDetail({ "type": "error", "title": "Error", "message": `Error querying user information: ${toString(err)}` })
          setAlertOpen(true)
        })
      } else {
        setAlertDetail({ "type": "error", "message": "User haven't logged in yet! Redirecting to the SignIn page.", "title": "Success" })
        setAlertOpen(true)
        setTimeout(() => {
          navigate("/signin")
        }, 1000)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": toString(err) })
      setAlertOpen(true)
    })
  }, [])
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Mui.Snackbar open={alertOpen} autoHideDuration={6000} >
        <Mui.Alert severity={alertDetail.type} action={
          <Mui.IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlertOpen(false) }} >
            <Mui.Icons.Close fontSize="inherit" />
          </Mui.IconButton>
        }>
          <Mui.AlertTitle>{alertDetail.title}</Mui.AlertTitle>
          {alertDetail.message}
        </Mui.Alert>
      </Mui.Snackbar>

      <Mui.Box sx={{ display: 'flex' }}>
        <Mui.CssBaseline />
        <Mui.AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Mui.Toolbar>
            <Mui.Typography variant="h6" noWrap component="div">
              XmediaCenter2
            </Mui.Typography>
          </Mui.Toolbar>
        </Mui.AppBar>
        <Mui.Drawer
          variant="permanent"
          sx={{
            width: "20%",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: "20%", boxSizing: 'border-box' },
          }}
        >
          <Mui.Toolbar />
          <Mui.Box sx={{ overflow: 'auto' }}>
            <Mui.List>
              <Mui.ListItem key="Profile" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(0) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.AccountBox />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="Profile" />
                </Mui.ListItemButton>
              </Mui.ListItem>

              <Mui.ListItem key="Drive" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(1) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.FilePresent />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="Drive" />
                </Mui.ListItemButton>
              </Mui.ListItem>


              <Mui.ListItem key="Music" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(2) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.MusicNote />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="Music" />
                </Mui.ListItemButton>
              </Mui.ListItem>
            </Mui.List>
          </Mui.Box>
        </Mui.Drawer>
        <Mui.Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Mui.Toolbar />
          {currentTab === 0 && <Mui.Paper>
            0: Profile<br/>
            <span>Name: {userInfo.name}</span><br/>
            <span>Slogan: {userInfo.slogan}</span><br/>
          </Mui.Paper>}
          {currentTab === 1 && <Mui.Paper>
            1: Drive
          </Mui.Paper>}
          {currentTab === 2 && <Mui.Paper>
            2: Music
          </Mui.Paper>}
        </Mui.Box>
      </Mui.Box>
    </ThemeProvider>
  )
}