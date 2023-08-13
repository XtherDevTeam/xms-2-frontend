import * as React from 'react'
import * as Mui from '../Components'
import * as Api from '../Api'

export default function Settings(props) {
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })
  let [serverId, setServerId] = React.useState("")
  let [xmsRootPath, setXmsRootPath] = React.useState("")
  let [xmsBlobPath, setXmsBlobPath] = React.useState("")
  let [xmsDrivePath, setXmsDrivePath] = React.useState("")
  let [host, setHost] = React.useState("")
  let [port, setPort] = React.useState("")
  let [proxyType, setProxyType] = React.useState("None")
  let [proxyUrl, setProxyUrl] = React.useState("")
  let [allowRegister, setAllowRegister] = React.useState(false)
  let [enableInviteCode, setEnableInviteCode] = React.useState(false)
  let [inviteCode, setInviteCode] = React.useState("")
  let [proxyUrlDisabled, setProxyUrlDisabled] = React.useState(true)
  let [inviteCodeDisabled, setInviteCodeDisabled] = React.useState(true)
  let [saveBtnDisabled, setSaveBtnDisabled] = React.useState(false)

  React.useEffect(() => {
    if (proxyType === 'None') {
      setProxyUrlDisabled(true)
    } else {
      setProxyUrlDisabled(false)
    }
  }, [proxyType])
  React.useEffect(() => {
    Api.config().then((data) => {
      if (data.data.ok) {
        setServerId(data.data.data.serverId)
        setXmsRootPath(data.data.data.xmsRootPath)
        setXmsBlobPath(data.data.data.xmsBlobPath)
        setXmsDrivePath(data.data.data.xmsDrivePath)
        setHost(data.data.data.host)
        setPort(data.data.data.port)
        setProxyType(data.data.data.proxyType)
        setProxyUrl(data.data.data.proxyUrl)
        setAllowRegister(data.data.data.allowRegister === 1)
        setEnableInviteCode(data.data.data.enableInviteCode === 1)
        setInviteCode(data.data.data.inviteCode)
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error fetching config: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error fetching config: NetworkError` })
      setAlertOpen(true)
    })
  }, [props])

  React.useEffect(() => {
    console.log(enableInviteCode)
    if (enableInviteCode === false) {
      setInviteCodeDisabled(true)
    } else {
      setInviteCodeDisabled(false)
    }
  }, [enableInviteCode])

  let handleSaveChanges = () => {
    let data = {
      host: host,
      port: port,
      proxyType: proxyType,
      proxyUrl: proxyUrl,
      enableInviteCode: enableInviteCode ? 1 : 0,
      allowRegister: allowRegister ? 1 : 0,
      serverId: serverId,
      inviteCode: inviteCode,
      xmsBlobPath: xmsBlobPath,
      xmsRootPath: xmsRootPath,
      xmsDrivePath: xmsDrivePath
    }
    console.log(data)
    setSaveBtnDisabled(true)
    Api.configUpdate(data).then(data => {
      setSaveBtnDisabled(false)
      if(data.data.ok) {
        setAlertDetail({ 'type': 'success', 'title': 'Success', 'message': `Config updated successfully.` })
        setAlertOpen(true)
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating config: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch(err => {
      setSaveBtnDisabled(false)
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating config: NetworkError` })
      setAlertOpen(true)
    })
  }

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
        <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {"Settings"}
        </Mui.Typography>
        <Mui.Typography variant="body2" component="div" color="text.secondary" sx={{ flexGrow: 1 }}>
          Proxy is a necessary setting for those who in China Mainland to use spotdl. Make sure set up proxy url properly.
        </Mui.Typography>
        <Mui.Grid container spacing={1}>
          <Mui.Grid item xs={12} sm={6} md={6}>
            <Mui.FormControl variant='filled' margin="normal" fullWidth>
              <Mui.InputLabel id={`proxy-type-select-label`}>Type</Mui.InputLabel>
              <Mui.Select
                id={`proxy-type-select`}
                labelId={`proxy-type-select-label`}
                defaultValue='None'
                value={proxyType}
                onChange={(e) => {
                  setProxyType(e.target.value)
                }}
              >
                {['None', 'HTTP(S)'].map((row) => (
                  <Mui.MenuItem value={row}>{row}</Mui.MenuItem>
                ))}
              </Mui.Select>
            </Mui.FormControl>
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} md={6}>
            <Mui.TextField
              variant='filled'
              margin="normal"

              fullWidth
              id="proxyUrl"
              label="Proxy URL"
              value={proxyUrl}
              disabled={proxyUrlDisabled}
              onChange={(e) => { setProxyUrl(e.target.value) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
              <Mui.Grid item>
                <Mui.FormControl>
                  <Mui.FormControlLabel
                    control={<Mui.Switch
                      checked={allowRegister}
                      onChange={(e) => { setAllowRegister(e.target.checked) }}
                    />} label="Allow register" />
                </Mui.FormControl>
              </Mui.Grid>
              <Mui.Grid item>
                <Mui.FormControl>
                  <Mui.FormControlLabel
                    control={<Mui.Switch
                      checked={enableInviteCode}
                      onChange={(e) => { setEnableInviteCode(e.target.checked) }}
                    />} label="Enable invite code" />
                </Mui.FormControl>
              </Mui.Grid>
              <Mui.Grid item sx={{ flexGrow: 1 }}>
                <Mui.TextField
                  variant='filled'
                  margin="normal"
                  fullWidth
                  id="inviteCode"
                  label="Invite code"
                  value={inviteCode}
                  disabled={inviteCodeDisabled}
                  onChange={(e) => { setInviteCode(e.target.value) }}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
        <div style={{ marginTop: '20px' }}></div>
        <Mui.Typography variant="body2" component="div" color="text.secondary" sx={{ flexGrow: 1 }}>
          Changing backend host and backend port will result in some major problem to new users.
          To prevent it, configure them in the official command line tool.<br />
          Editing root, blob, drive paths without moving them to the new path will cause backend server error.
        </Mui.Typography>
        <Mui.Grid container spacing={1}>
          <Mui.Grid item xs={12} sm={6} md={4}>
            <Mui.TextField
              margin="normal"
              variant='filled'
              fullWidth
              id="serverId"
              label="Server Id"
              disabled
              value={serverId}
              onChange={(e) => { setServerId(e.target.value) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} md={4}>
            <Mui.TextField
              margin="normal"
              variant='filled'

              fullWidth
              id="Backend host"
              label="Host"
              disabled
              value={host}
              onChange={(e) => { setHost(e.target.value) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} md={4}>
            <Mui.TextField
              margin="normal"
              variant='filled'

              fullWidth
              id="Backend port"
              label="port"
              disabled
              type="number"
              value={port}
              onChange={(e) => { let v = parseInt(e.target.value); if (v >= 0 && v < 65536) setPort(v) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.TextField
              margin="normal"
              variant='filled'

              fullWidth
              id="xmsRootPath"
              label="Root path"
              value={xmsRootPath}
              onChange={(e) => { setXmsRootPath(e.target.value) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.TextField
              margin="normal"
              variant='filled'

              fullWidth
              id="xmsBlobPath"
              label="Blob path"
              value={xmsBlobPath}
              onChange={(e) => { setXmsBlobPath(e.target.value) }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.TextField
              margin="normal"
              variant='filled'

              fullWidth
              id="xmsDrivePath"
              label="Drive path"
              value={xmsDrivePath}
              onChange={(e) => { setXmsDrivePath(e.target.value) }}
            />
          </Mui.Grid>
        </Mui.Grid>
        <div style={{marginTop: '10px'}}></div>
        <Mui.Button disabled={saveBtnDisabled} variant='contained' onClick={() => { handleSaveChanges() }}>Save Changes</Mui.Button>
      </Mui.CardContent>
    </Mui.Card>
  )
}