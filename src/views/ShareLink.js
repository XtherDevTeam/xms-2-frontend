import { ThemeProvider } from '@emotion/react'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import * as Mui from '../Components'
import * as Api from '../Api'

export default function ShareLink(props) {
  let { id } = useParams()

  let [rawPreviewComponent, setRawPreviewComponent] = React.useState(<></>)
  let [previewOpen, setPreviewOpen] = React.useState(false)
  let [quickCheckOutCurrentPath, setQuickCheckOutCurrentPath] = React.useState(``)
  let [quickCheckOutList, setQuickCheckOutList] = React.useState([])
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })
  let [currentTheme, setCurrentTheme] = React.useState(Mui.theme())
  let [shareLinkInfo, setShareLinkInfo] = React.useState({
    owner: {
      name: '理塘丁真',
      id: 114514,
    },
    path: '/丁真珍珠最新单曲集/I Got Smoke.mp3',
    info: {
      type: 'file',
      lastModified: '1989-06-04 11:45:14',
      filename: 'I Got Smoke.mp3',
      mime: 'audio/mpeg'
    }
  })
  Mui.listenToThemeModeChange((v) => {
    setCurrentTheme(Mui.theme())
  })

  let refreshShareLinkInfo = (sid) => {
    Api.shareLinkInfo(sid).then((data) => {
      if (data.data.ok) {
        setShareLinkInfo(data.data.data)
      } else {
        setAlertDetail({ type: 'error', title: 'Error', message: `Error refreshing share link infomation: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ type: 'error', title: 'Error', message: `Error refreshing share link infomation: NetworkError` })
      setAlertOpen(true)
    })
  }
  let handleFilePreviewOpen = (isInDir, row) => {
    if (isInDir) {
      let realpath = Api.getShareLinkDirFilePath(id, row.path)
      console.log("wtf: ", realpath)
      if (row.mime.startsWith("application")) {
        setRawPreviewComponent(<Mui.Typography variant='body2' color="text.primary">Preview not available</Mui.Typography>)
      } else if (row.mime.startsWith('video')) {
        setRawPreviewComponent(<video style={{ maxWidth: "75%" }} controls><source src={realpath} type={row.mime} /></video>)
      } else if (row.mime.startsWith('audio')) {
        setRawPreviewComponent(<audio controls><source src={realpath} type={row.mime} /></audio>)
      } else if (row.mime.startsWith('image')) {
        setRawPreviewComponent(<img style={{ maxWidth: "75%" }} src={realpath} alt="preview" />)
      }
      setPreviewOpen(true)
    } else {
      if (shareLinkInfo.info.mime) {
        let realpath = Api.getShareLinkFilePath(id)
        if (shareLinkInfo.info.mime.startsWith("application")) {
          setRawPreviewComponent(<Mui.Typography variant='body2' color="text.primary">Preview not available</Mui.Typography>)
        } else if (shareLinkInfo.info.mime.startsWith('video')) {
          setRawPreviewComponent(<video style={{ maxWidth: "75%" }} controls><source src={realpath} type={shareLinkInfo.info.mime} /></video>)
        } else if (shareLinkInfo.info.mime.startsWith('audio')) {
          setRawPreviewComponent(<audio controls><source src={realpath} type={shareLinkInfo.info.mime} /></audio>)
        } else if (shareLinkInfo.info.mime.startsWith('image')) {
          setRawPreviewComponent(<img style={{ maxWidth: "75%" }} src={realpath} alt="preview" />)
        }
      }
      setPreviewOpen(true)
    }
  }
  let handleFileDownload = (isInDir, row) => {
    if (isInDir) {
      window.open(Api.getShareLinkDirFilePath(id, row.path))
    } else {
      window.open(Api.getShareLinkFilePath(id))
    }
  }

  let QuickCheckOut = () => {
    if (shareLinkInfo.info.type === 'file') {
      return (
        <Mui.List>
          <Mui.ListItem disablePadding secondaryAction={
            <Mui.IconButton onClick={() => { handleFileDownload(false, null) }}><Mui.Icons.Download /></Mui.IconButton>
          }>
            <Mui.ListItemButton onClick={() => {
              handleFilePreviewOpen(false, null)
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.InsertDriveFile />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary={shareLinkInfo.info.filename} />
            </Mui.ListItemButton>
          </Mui.ListItem>
        </Mui.List>
      )
    } else {
      return (
        <Mui.List sx={{ maxHeight: "50vh", overflowY: "scroll" }}>
          {quickCheckOutCurrentPath !== "/" && <Mui.ListItem key={0} disablePadding>
            <Mui.ListItemButton onClick={() => {
              if (Api.dirname(quickCheckOutCurrentPath) == "/") { setQuickCheckOutCurrentPath(`/`) }
              else { setQuickCheckOutCurrentPath(Api.dirname(quickCheckOutCurrentPath)) }
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Folder />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary={".."} />
            </Mui.ListItemButton>
          </Mui.ListItem>}
          {quickCheckOutList.map((row, index) =>
          (
            <Mui.ListItem key={index + 1} disablePadding secondaryAction={
              <>{row.type === "file" &&
                <Mui.IconButton onClick={() => { handleFileDownload(true, row) }}><Mui.Icons.Download /></Mui.IconButton>}
              </>
            }>
              <Mui.ListItemButton onClick={() => {
                if (row.type === "dir") {
                  if (row.path === "/") {
                    setQuickCheckOutCurrentPath("/")
                  } else {
                    setQuickCheckOutCurrentPath(row.path)
                  }
                } else {
                  handleFilePreviewOpen(true, row)
                }
              }}>
                <Mui.ListItemIcon>
                  {row.type === "file" && <Mui.Icons.InsertDriveFile />}
                  {row.type === "dir" && <Mui.Icons.Folder />}
                </Mui.ListItemIcon>
                <Mui.ListItemText primary={row.filename} />
              </Mui.ListItemButton>
            </Mui.ListItem>
          ))}
        </Mui.List>
      )
    }
  }

  React.useEffect(() => {
    refreshShareLinkInfo(id)
  }, [])

  React.useEffect(() => {
    if (quickCheckOutCurrentPath === ``)
      return

    Api.shareLinkDir(id, quickCheckOutCurrentPath).then((data) => {
      if (data.data.ok) {
        setQuickCheckOutList(data.data.data.list)
      } else {
        setAlertDetail({ type: 'error', title: 'Error', message: `Error refreshing share link infomation: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ type: 'error', title: 'Error', message: `Error refreshing share link infomation: NetworkError` })
      setAlertOpen(true)
    })
  }, [quickCheckOutCurrentPath])

  React.useEffect(() => {
    if (shareLinkInfo.info.type === 'dir')
      setQuickCheckOutCurrentPath(`/`)
  }, [shareLinkInfo])


  return (
    <ThemeProvider theme={currentTheme}>
      <Mui.Container>
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
        <Mui.Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={previewOpen}
          onClick={() => { setRawPreviewComponent(<></>); setPreviewOpen(false) }}
        >
          {rawPreviewComponent}
        </Mui.Backdrop>
        <Mui.IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => {
          Mui.setThemeMode(currentTheme.palette.mode === 'dark' ? 'light' : 'dark')
        }}>
          {currentTheme.palette.mode === 'dark' ? <Mui.Icons.Brightness7 /> : <Mui.Icons.Brightness4 />}
        </Mui.IconButton>
        <Mui.Grid container direction="row"
          justifyContent="center"
          alignItems="center"
          height={'100vh'}
        >
          <Mui.Grid item xs={11} sm={8} md={6}>
            <Mui.Card sx={{
              height: 'auto',
            }}>
              <Mui.CardContent>
                <Mui.Typography variant='body1'>
                  <Mui.IconText>
                    {shareLinkInfo.info.filename}
                  </Mui.IconText>
                </Mui.Typography>

                <Mui.Typography variant='body1' sx={{ marginTop: '10px' }}>
                  <Mui.IconText>
                    <Mui.Icons.AccountCircle fontSize='inherit' />
                    {shareLinkInfo.owner.name}
                    <Mui.Icons.DateRange fontSize='inherit' />
                    {shareLinkInfo.info.lastModified}
                  </Mui.IconText>
                </Mui.Typography>

                <Mui.Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />

                <QuickCheckOut />
              </Mui.CardContent>
            </Mui.Card>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Container >
    </ThemeProvider >
  )
}