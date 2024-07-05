import * as React from 'react'
import * as Mui from '../Components'
import * as Api from '../Api'

function defaultConfirmDialogState() {
  return { "title": "", "message": "", onOk: () => { }, onCancel: () => { }, "state": false, }
}

function defaultChangeUserPermissionDialogState() {
  return { onOk: () => { }, onCancel: () => { }, "state": false, }
}

function defaultCreateUserDialogState() {
  return { onOk: () => { }, onCancel: () => { }, "state": false, }
}

function ConfirmDialog(props) {
  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
      <Mui.DialogTitle>{props.title}</Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Typography variant='body2' color='text.secondary'>
          {props.message}
        </Mui.Typography>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
        <Mui.Button onClick={() => { props.onOk() }} autoFocus>
          OK
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function ChangeUserPermissionDialog(props) {
  let { row } = props
  let [permission, setPermission] = React.useState(row.level)

  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
      <Mui.DialogTitle>Edit permission level</Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Typography variant='body2'>
          Changing permission level for {row.name} (UID: {row.id})
        </Mui.Typography>
        <Mui.FormControl variant='filled' margin="normal" fullWidth>
          <Mui.InputLabel id={`permission-level-select-label`}>Type</Mui.InputLabel>
          <Mui.Select
            id={`permission-level-select`}
            labelId={`permission-level-select-label`}
            value={permission}
            onChange={(e) => {
              setPermission(e.target.value)
            }}
          >
            {[[0, 'User'], [1, 'Administrator'], [2, 'Super-administrator']].map((row) => (
              <Mui.MenuItem value={row[0]}>{row[1]}</Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
        <Mui.Button onClick={() => { props.onOk(permission) }} autoFocus>
          OK
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function CreateUserDialog(props) {
  let { state } = props
  let [name, setName] = React.useState("")
  let [password, setPassword] = React.useState("")
  let [slogan, setSlogan] = React.useState("")
  let [level, setLevel] = React.useState(0)

  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={state}>
      <Mui.DialogTitle>Create user</Mui.DialogTitle>
      <Mui.DialogContent sx={{ width: '600px' }}>
        <Mui.TextField variant='filled' margin="normal" fullWidth id="name" label="Username" value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <Mui.TextField variant='filled' margin="normal" fullWidth id="password" label="Password" value={password} type='password'
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <Mui.TextField variant='filled' margin="normal" fullWidth id="slogan" label="Slogan" value={slogan}
          onChange={(e) => { setSlogan(e.target.value) }}
        />
        <Mui.FormControl variant='filled' margin="normal" fullWidth>
          <Mui.InputLabel id={`permission-level-select-label`}>Type</Mui.InputLabel>
          <Mui.Select
            id={`permission-level-select`}
            labelId={`permission-level-select-label`}
            value={level}
            onChange={(e) => {
              setLevel(e.target.value)
            }}
          >
            {[[0, 'User'], [1, 'Administrator'], [2, 'Super-administrator']].map((row) => (
              <Mui.MenuItem value={row[0]}>{row[1]}</Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
        <Mui.Button onClick={() => { props.onOk(name, password, slogan, level) }} autoFocus>
          OK
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog >
  )
}

export default function Settings(props) {
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })
  let [userList, setUserList] = React.useState([])
  let [createUserDialogState, setCreateUserDialogState] = React.useState(defaultCreateUserDialogState())

  let updateUserList = () => {
    Api.userManageList().then((data) => {
      if (data.data.ok) {
        setUserList(data.data.data)
      } else {
        setAlertDetail({ type: 'error', title: 'Error', message: `Error updating user list: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ type: 'error', title: 'Error', message: `Error updating user list: NetworkError` })
      setAlertOpen(true)
    })
  }

  React.useEffect(() => {
    updateUserList()
  }, [props])

  function UserTableRow(props) {
    let [open, setOpen] = React.useState(false)
    let { row } = props
    let [confirmDialogState, setConfirmDialogState] = React.useState(defaultConfirmDialogState())
    let [changeUserPermissionDialogState, setChangeUserPermissionDialogState] = React.useState(defaultChangeUserPermissionDialogState())

    return (
      <React.Fragment>
        <ConfirmDialog title={confirmDialogState.title} message={confirmDialogState.message} state={confirmDialogState.state} onOk={confirmDialogState.onOk} onCancel={confirmDialogState.onCancel}></ConfirmDialog>
        <ChangeUserPermissionDialog row={row} state={changeUserPermissionDialogState.state} onOk={changeUserPermissionDialogState.onOk} onCancel={changeUserPermissionDialogState.onCancel}></ChangeUserPermissionDialog>

        <Mui.TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <Mui.TableCell sx={{ borderBottom: 'unset' }}>
            <Mui.IconText>
              <Mui.Avatar sx={{ height: "40px", width: "40px" }} alt={row.name} src={`/api/xms/v1/user/${row.id}/avatar`} />
              <Mui.Typography variant='body2' component={"div"}>
                {row.name}
              </Mui.Typography>
            </Mui.IconText>
          </Mui.TableCell>
          <Mui.TableCell align='right' sx={{ borderBottom: 'unset' }}>
            {row.level < 2 && <Mui.IconButton size="small" onClick={() => {
              setChangeUserPermissionDialogState({
                onOk: (permission) => {
                  Api.userManageUpdateLevel(row.id, permission).then(data => {
                    setChangeUserPermissionDialogState(defaultChangeUserPermissionDialogState())
                    if (data.data.ok) {
                      setAlertDetail({ type: 'success', title: 'Success', message: `Updated the permission level of ${row.name} (UID: ${row.id}) successfully` })
                      setAlertOpen(true)
                      updateUserList()
                    } else {
                      setAlertDetail({ type: 'error', title: 'Error', message: `Error updating the permission level of ${row.name} (UID: ${row.id}): ${data.data.data}` })
                      setAlertOpen(true)
                    }
                  }).catch(err => {
                    setChangeUserPermissionDialogState(defaultChangeUserPermissionDialogState())
                    setAlertDetail({ type: 'error', title: 'Error', message: `Error updating the permission level of ${row.name} (UID: ${row.id}): NetworkError` })
                    setAlertOpen(true)
                  })
                }, onCancel: () => {
                  setChangeUserPermissionDialogState(defaultChangeUserPermissionDialogState())
                }, state: true
              })
            }}>
              <Mui.Icons.ManageAccounts />
            </Mui.IconButton>
            }
            {row.level < 2 && <Mui.IconButton size="small" onClick={() => {
              setConfirmDialogState({
                title: "Confirm", message: `Are you sure to delete user ${row.name} (UID: ${row.id}) ? This operation is IRREVERTIBLE!`, onOk: () => {
                  Api.userManageDelete(row.id).then(data => {
                    if (data.data.ok) {
                      setAlertDetail({ type: 'success', title: 'Success', message: `Deleted user ${row.name} (UID: ${row.id}) successfully` })
                      setAlertOpen(true)
                      updateUserList()
                    } else {
                      setAlertDetail({ type: 'error', title: 'Error', message: `Error deleting user: ${data.data.data}` })
                      setAlertOpen(true)
                    }
                  }).catch(err => {
                    setAlertDetail({ type: 'error', title: 'Error', message: `Error deleting user: NetworkError` })
                    setAlertOpen(true)
                  })
                  setConfirmDialogState(defaultConfirmDialogState())
                }, onCancel: () => {
                  setConfirmDialogState(defaultConfirmDialogState())
                }, state: true
              })
            }}>
              <Mui.Icons.Delete />
            </Mui.IconButton>}
            <Mui.IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <Mui.Icons.KeyboardArrowUp /> : <Mui.Icons.KeyboardArrowDown />}
            </Mui.IconButton>
          </Mui.TableCell>
        </Mui.TableRow>
        <Mui.TableRow>
          <Mui.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Mui.Collapse in={open} timeout="auto" unmountOnExit>
              <Mui.Box sx={{ margin: 1 }}>
                <Mui.Grid container spacing={1}>
                  <Mui.Grid item xs={12} sm={6}>
                    <Mui.Typography variant='subtitle2' component={'span'}>
                      {'User ID: '}
                    </Mui.Typography>
                    <Mui.Typography variant='body2' color='text.secondary' component={'span'}>{row.id}</Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={12} sm={6}>
                    <Mui.Typography variant='subtitle2' component={'span'}>
                      {'Permission level: '}
                    </Mui.Typography>
                    <Mui.Typography variant='body2' color='text.secondary' component={'span'}>
                      {row.level === 0 && <span>User</span>}
                      {row.level === 1 && <span>Administrator</span>}
                      {row.level === 2 && <span>Super-administrator</span>}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={12}>
                    <Mui.Typography variant='subtitle2' component={'span'}>
                      {'Username: '}
                    </Mui.Typography>
                    <Mui.Typography variant='body2' color='text.secondary' component={'span'}>
                      {row.name}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={12}>
                    <Mui.Typography variant='subtitle2' component={'span'}>
                      {'Slogan: '}
                    </Mui.Typography>
                    <Mui.Typography variant='body2' color='text.secondary' component={'span'}>
                      {row.slogan}
                    </Mui.Typography>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Box>
            </Mui.Collapse>
          </Mui.TableCell>
        </Mui.TableRow>
      </React.Fragment>
    )
  }

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
      <CreateUserDialog state={createUserDialogState.state} onOk={createUserDialogState.onOk} onCancel={createUserDialogState.onCancel}></CreateUserDialog>
      <Mui.CardContent>
        <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {"User Management"}
        </Mui.Typography>
        <Mui.Typography variant="body2" component="div" color="text.secondary" sx={{ flexGrow: 1 }}>
          Super-administrator can create, delete users and give, revoke users' premissions here.
        </Mui.Typography>
        <Mui.TableContainer component={'div'} >
          <Mui.Table sx={{ width: '100%' }}>
            <Mui.TableHead>
              <Mui.TableRow>
                <Mui.TableCell>Username</Mui.TableCell>
                <Mui.TableCell align='right'>Actions</Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {userList.map(row => (<UserTableRow row={row} />))}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
        <Mui.Fab sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }} color="primary" aria-label="add" onClick={() => {
          setCreateUserDialogState({
            onOk(name, password, slogan, level) {
              Api.userManageCreate(name, password, slogan, level).then(data => {
                setCreateUserDialogState(defaultCreateUserDialogState())
                if (data.data.ok) {
                  setAlertDetail({ type: 'success', title: 'Success', message: `Created user ${name} successfully` })
                  setAlertOpen(true)
                  updateUserList()
                } else {
                  setAlertDetail({ type: 'error', title: 'Error', message: `Error creating user ${name}: ${data.data.data}` })
                  setAlertOpen(true)
                }
              }).catch(err => {
                setAlertDetail({ type: 'error', title: 'Error', message: `Error creating user ${name}: NetworkError` })
                setAlertOpen(true)
              })
            },
            onCancel() {
              setCreateUserDialogState(defaultCreateUserDialogState())
            },
            state: true
          })
        }}>
          <Mui.Icons.Add />
        </Mui.Fab>
      </Mui.CardContent>
    </div>
  )
}