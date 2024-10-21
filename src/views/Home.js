import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'

import * as Api from '../Api'
import { useNavigate, useHref } from "react-router-dom"
import { Icon } from '@mui/material'

export default function Home() {
  let navigate = useNavigate();

  let [userInfo, setUserInfo] = React.useState({})
  let [sidebarStatus, setSidebarStatus] = React.useState(true)
  let [currentTab, setCurrentTab] = React.useState(0)

  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  let [currentTheme, setCurrentTheme] = React.useState(Mui.theme())
  Mui.listenToThemeModeChange((v) => {
    setCurrentTheme(Mui.theme())
  })

  let handleSignOutBtnClick = () => {
    Api.signOut().then((data) => {
      if (data.data.ok) {
        window.location.reload()
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error signing out: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error signing out: ${JSON.stringify(err)}` })
      setAlertOpen(true)
    })
  }

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
    <ThemeProvider theme={currentTheme}>
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
      <Mui.Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Mui.CssBaseline />
        <Mui.AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Mui.Toolbar>
            <Mui.IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => { setSidebarStatus(!sidebarStatus) }}
            >
              <Mui.Icons.Menu />
            </Mui.IconButton>
            <Mui.Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              XmediaCenter2
            </Mui.Typography>
            <Mui.IconButton sx={{ float: 'right' }} onClick={() => {
              Mui.rotateThemeMode()
            }}>
              {currentTheme.palette.mode === 'dark' ? <Mui.Icons.Brightness7 sx={{ color: 'white' }} /> : <Mui.Icons.Brightness4 sx={{ color: 'white' }} />}
            </Mui.IconButton>
            <Mui.IconButton sx={{ float: 'right' }} onClick={() => {
              handleSignOutBtnClick()
            }}>
              <Mui.Icons.Logout sx={{ color: 'white' }} />
            </Mui.IconButton>
          </Mui.Toolbar>
        </Mui.AppBar>
        <Mui.Drawer
          variant='persistent'
          open={sidebarStatus}
          onClose={() => setSidebarStatus(false)}
          sx={{
            width: sidebarStatus ? '20%' : '0px',
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: "20%", boxSizing: 'border-box',
              // backgroundColor: currentTheme.palette.mode === 'light' ? '#ffffff' : '#424242'
            },
          }}
        >
          <Mui.Toolbar />
          <Mui.Box sx={{ overflow: 'auto', }}>
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

              <Mui.ListItem key="Tasks" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(3) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.TaskSharp />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="Tasks" />
                </Mui.ListItemButton>
              </Mui.ListItem>

              {userInfo.level >= 2 && <Mui.ListItem key="User Management" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(4) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.ManageAccounts />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="User Management" />
                </Mui.ListItemButton>
              </Mui.ListItem>}

              {userInfo.level >= 1 && <Mui.ListItem key="Settings" disablePadding>
                <Mui.ListItemButton onClick={() => { setCurrentTab(5) }}>
                  <Mui.ListItemIcon>
                    <Mui.Icons.Settings />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary="Settings" />
                </Mui.ListItemButton>
              </Mui.ListItem>}
            </Mui.List>
          </Mui.Box>
        </Mui.Drawer>
        <Mui.Box component="main" sx={{
          flexGrow: 1, p: 3,
          backgroundColor: currentTheme.palette.surfaceContainer.main
        }}>
          <Mui.Toolbar />
          <Mui.Paper style={{ padding: 0, borderTopLeftRadius: 30, height: `calc(100vh - 64px)`, overflowY: 'scroll' }}>
            <Mui.TransitionGroup>
              {currentTab === 0 && <Mui.Fade key={0} exit={false}><div style={{ width: "100%" }}><Mui.Profile userInfo={userInfo} width="100%" headImgHeight="240px" /></div></Mui.Fade>}
              {currentTab === 1 && <Mui.Fade key={1} exit={false}><div style={{ width: "100%" }}><Mui.Drive userInfo={userInfo} width="100%" /></div></Mui.Fade>}
              {currentTab === 2 && <Mui.Fade key={2} exit={false}><div style={{ width: "100%" }}><Mui.Music userInfo={userInfo} width="100%" /></div></Mui.Fade>}
              {currentTab === 3 && <Mui.Fade key={3} exit={false}><div style={{ width: "100%" }}><Mui.Tasks userInfo={userInfo} width="100%" /></div></Mui.Fade>}
              {currentTab === 4 && <Mui.Fade key={4} exit={false}><div style={{ width: "100%" }}><Mui.UserManagement userInfo={userInfo} width="100%" /></div></Mui.Fade>}
              {currentTab === 5 && <Mui.Fade key={5} exit={false}><div style={{ width: "100%" }}><Mui.Settings userInfo={userInfo} width="100%" /></div></Mui.Fade>}
            </Mui.TransitionGroup>
          </Mui.Paper>
        </Mui.Box>
      </Mui.Box>
    </ThemeProvider>
  )
}