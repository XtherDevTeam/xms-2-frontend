import * as React from 'react'
import * as Mui from '../Components'

import * as Api from '../Api'
import PropTypes from 'prop-types'

import ItemUploadDialog from './ItemUploadDialog'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  let defaultAlertState = () => ({ "type": "error", "title": "", "message": "" })
  let defaultItemUploadDialogState = () => (
    { onUpload: (data) => { }, message: "", title: "", acceptedType: "", allowMultiFile: false, onOk: () => { }, onCancel: () => { }, state: false, formKey: "" }
  )
  let defaultTextChangeDialogState = () => ({
    title: "", message: "", value: "", state: false, onOk: () => { }, onCancel: () => { }
  })
  let defaultPasswordChangeDialogState = () => ({
    title: "", message: "", state: false, onOk: (oldPassword, newPassword) => { }, onCancel: () => { }
  })


  let [profileTab, setProfileTab] = React.useState(0)
  let [sharedLinksList, setSharedLinksList] = React.useState([])
  let [alertDetail, setAlertDetail] = React.useState(defaultAlertState())
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [itemUploadDialogState, setItemUploadDialogState] = React.useState(defaultItemUploadDialogState())
  let [textChangeDialogState, setTextChangeDialogState] = React.useState(defaultTextChangeDialogState())
  let [passwordChangeDialogState, setPasswordChangeDialogState] = React.useState(defaultPasswordChangeDialogState())

  let PasswordChangeDialog = () => {
    return (
      <Mui.Dialog onClose={() => { passwordChangeDialogState.onCancel() }} open={passwordChangeDialogState.state}>
        <Mui.Box component="form" noValidate onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          if (data.get("newPassword") === data.get("confirm")) { passwordChangeDialogState.onOk(data.get("oldPassword"), data.get("newPassword")) }
          else {
            setAlertDetail({ type: "error", title: "Error", message: `these passwords don't match` })
            setAlertOpen(true)
          }
        }} sx={{ mt: 1 }}>
          <Mui.DialogTitle>{passwordChangeDialogState.title}</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Typography variant='body2'>
              {passwordChangeDialogState.message}
            </Mui.Typography>
            <Mui.TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              name="oldPassword"
              label="Old password"
              type="password"
            />
            <Mui.TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              name="newPassword"
              label="New password"
              type="password"
            />
            <Mui.TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              name="confirm"
              label="Re-enter the new password"
              type="password"
            />
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={() => passwordChangeDialogState.onCancel()}>Cancel</Mui.Button>
            <Mui.Button type="submit">OK</Mui.Button>
          </Mui.DialogActions>
        </Mui.Box>
      </Mui.Dialog>
    )
  }

  let updateSharedLinksList = () => {
    Api.userShareLinks(props.userInfo.id).then((data) => {
      if (data.data.ok) {
        setSharedLinksList(data.data.data)
      } else {
        setAlertDetail({ type: "error", title: "Error", message: `Error updating share links list: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ type: "error", title: "Error", message: `Error updating share links list: NetworkError` })
      setAlertOpen(true)
    })
  }

  let handleChangeSloganOnClick = () => {
    setTextChangeDialogState({
      title: "Change slogan",
      message: "New slogan",
      value: "",
      state: true,
      onOk: (arg) => {
        Api.userSloganUpdate(arg).then((data) => {
          if (data.data.ok) {
            window.location.reload()
          } else {
            setAlertDetail({ type: "error", title: "Error", message: `Error updating username: ${data.data.data}` })
            setAlertOpen(true)
          }
          setTextChangeDialogState(defaultTextChangeDialogState())
        }).catch((err) => {
          setAlertDetail({ type: "error", title: "Error", message: `Error updating username: NetworkError` })
          setAlertOpen(true)
          setTextChangeDialogState(defaultTextChangeDialogState())
        })
      },
      onCancel: () => setTextChangeDialogState(defaultTextChangeDialogState())
    })
  }

  let handleChangeUsernameOnClick = () => {
    setTextChangeDialogState({
      title: "Change username",
      message: "New username",
      value: "",
      state: true,
      onOk: (arg) => {
        Api.userUsernameUpdate(arg).then((data) => {
          if (data.data.ok) {
            window.location.reload()
          } else {
            setAlertDetail({ type: "error", title: "Error", message: `Error updating username: ${data.data.data}` })
            setAlertOpen(true)
          }
          setTextChangeDialogState(defaultTextChangeDialogState())
        }).catch((err) => {
          setAlertDetail({ type: "error", title: "Error", message: `Error updating username: NetworkError` })
          setAlertOpen(true)
          setTextChangeDialogState(defaultTextChangeDialogState())
        })
      },
      onCancel: () => setTextChangeDialogState(defaultTextChangeDialogState())
    })
  }

  let handleChangeUserHeadImgOnClick = () => {
    setItemUploadDialogState({
      title: "Change head image", message: "", acceptedType: "image/*",
      allowMultiFile: false, state: true, formKey: "image",
      onOk: (formData) => {
        Api.userHeadImgUpdate(formData).then((data) => {
          if (data.data.ok) {
            window.location.reload()
          } else {
            setAlertDetail({ type: "error", title: "Error", message: `Error updating user headImg: ${data.data.data}` })
            setAlertOpen(true)
          }
          setItemUploadDialogState(defaultItemUploadDialogState())
        }).catch((err) => {
          setAlertDetail({ type: "error", title: "Error", message: `Error updating user headImg: NetworkError` })
          setAlertOpen(true)
          setItemUploadDialogState(defaultItemUploadDialogState())
        })
      }, onCancel: () => {
        setItemUploadDialogState(defaultItemUploadDialogState())
      }
    })
  }

  let handleChangeUserAvatarOnClick = () => {
    setItemUploadDialogState({
      title: "Change avatar", message: "", acceptedType: "image/*",
      allowMultiFile: false, state: true, formKey: "image",
      onOk: (formData) => {
        Api.userAvatarUpdate(formData).then((data) => {
          if (data.data.ok) {
            window.location.reload()
          } else {
            setAlertDetail({ type: "error", title: "Error", message: `Error updating user avatar: ${data.data.data}` })
            setAlertOpen(true)
          }
          setItemUploadDialogState(defaultItemUploadDialogState())
        }).catch((err) => {
          setAlertDetail({ type: "error", title: "Error", message: `Error updating user avatar: NetworkError` })
          setAlertOpen(true)
          setItemUploadDialogState(defaultItemUploadDialogState())
        })
      }, onCancel: () => {
        setItemUploadDialogState(defaultItemUploadDialogState())
      }
    })
  }

  let handleChangeUserPasswordOnClick = () => {
    setPasswordChangeDialogState({
      title: "Change password",
      message: "Please remember your password. Once you forget it, you will not be able to use this account again.",
      state: true,
      onOk: (oldPassword, newPassword) => {
        Api.userPasswordUpdate(oldPassword, newPassword).then((data) => {
          if (data.data.ok) {
            setAlertDetail({ type: "success", title: "Success", message: `Your password has been changed successfully, reloading window.` })
            setAlertOpen(true)
            Api.signOut().then((data) => {
              if (data.data.ok) {
                window.location.reload()
              } else {
                setAlertDetail({ type: "error", title: "Error", message: `Error logging out: ${data.data.data}` })
                setAlertOpen(true)
              }
            }).catch((err) => {
              setAlertDetail({ type: "error", title: "Error", message: `Error logging out: NetworkError` })
              setAlertOpen(true)
            })
            setPasswordChangeDialogState(defaultPasswordChangeDialogState())
          } else {
            setAlertDetail({ type: "error", title: "Error", message: `Error changing password: ${data.data.data}` })
            setAlertOpen(true)
            setPasswordChangeDialogState(defaultPasswordChangeDialogState())
          }
        }).catch((err) => {
          setAlertDetail({ type: "error", title: "Error", message: `Error changing password: NetworkError` })
          setAlertOpen(true)
          setPasswordChangeDialogState(defaultPasswordChangeDialogState())
        })
      },
      onCancel: () => {
        setPasswordChangeDialogState(defaultPasswordChangeDialogState())
      }
    })
  }

  let handleSharedFileOnClick = (index) => {
    window.open(Api.getShareLinkPath(window.location, sharedLinksList[index].id))
  }

  let handleSharedFileDeleteOnClick = (index) => {
    Api.shareLinkDelete(sharedLinksList[index].id).then((data) => {
      if (data.data.ok) {
        setAlertDetail({ type: "success", title: "Success", message: `The share link has deleted successfully.` })
        setAlertOpen(true)
        updateSharedLinksList()
      } else {
        setAlertDetail({ type: "error", title: "Error", message: `Error deleting share link: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ type: "error", title: "Error", message: `Error deleting share link: NetworkError` })
      setAlertOpen(true)
    })
  }

  let SharedFiles = () => (
    <Mui.TableContainer component={'div'} >
      <Mui.Table sx={{ minWidth: 650 }}>
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>Link</Mui.TableCell>
            <Mui.TableCell>Name</Mui.TableCell>
            <Mui.TableCell>Actions</Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {sharedLinksList.map((row, index) => (
            <Mui.TableRow hover key={-1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <Mui.TableCell>{row.id}</Mui.TableCell>
              <Mui.TableCell onClick={() => { }}><p style={{ width: "100%", overflow: "hidden" }} onClick={() => {
                handleSharedFileOnClick(index)
              }}>{Api.basename(row.path)}</p></Mui.TableCell>
              <Mui.TableCell>
                <Mui.IconButton aria-label="delete" onClick={() => {
                  handleSharedFileDeleteOnClick(index)
                }}>
                  <Mui.Icons.Delete />
                </Mui.IconButton>
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  )

  let SharedPlaylists = () => {

  }

  let EditProfile = () => {
    let [newUserInfo, setNewUserInfo] = React.useState({
      name: props.userInfo.name,
      slogan: props.userInfo.slogan
    })
    return (
      <Mui.List>
        <Mui.ListItem
          secondaryAction={<Mui.IconButton edge="end" aria-label="edit" onClick={handleChangeUsernameOnClick}><Mui.Icons.Edit /></Mui.IconButton>}
        >
          <Mui.ListItemAvatar>
            <Mui.Avatar>
              <Mui.Icons.Badge />
            </Mui.Avatar>
          </Mui.ListItemAvatar>
          <Mui.ListItemText
            primary={`Username`}
            secondary={`${newUserInfo.name}`}
          />
        </Mui.ListItem>
        <Mui.ListItem
          secondaryAction={<Mui.IconButton edge="end" aria-label="edit" onClick={handleChangeSloganOnClick}><Mui.Icons.Edit /></Mui.IconButton>}
        >
          <Mui.ListItemAvatar>
            <Mui.Avatar>
              <Mui.Icons.Description />
            </Mui.Avatar>
          </Mui.ListItemAvatar>
          <Mui.ListItemText
            primary="Slogan"
            secondary={`${newUserInfo.slogan}`}
          />
        </Mui.ListItem>
        <Mui.ListItem
          secondaryAction={<Mui.IconButton edge="end" aria-label="edit" onClick={handleChangeUserAvatarOnClick}><Mui.Icons.Edit /></Mui.IconButton>}
        >
          <Mui.ListItemAvatar>
            <Mui.Avatar>
              <Mui.Icons.AccountCircle />
            </Mui.Avatar>
          </Mui.ListItemAvatar>
          <Mui.ListItemText
            primary="User Avatar"
          />
        </Mui.ListItem>
        <Mui.ListItem
          secondaryAction={<Mui.IconButton edge="end" aria-label="edit" onClick={handleChangeUserHeadImgOnClick}><Mui.Icons.Edit /></Mui.IconButton>}
        >
          <Mui.ListItemAvatar>
            <Mui.Avatar>
              <Mui.Icons.Photo />
            </Mui.Avatar>
          </Mui.ListItemAvatar>
          <Mui.ListItemText
            primary="Head Image"
          />
        </Mui.ListItem>
        <Mui.ListItem
          secondaryAction={<Mui.IconButton edge="end" aria-label="edit" onClick={handleChangeUserPasswordOnClick}><Mui.Icons.Edit /></Mui.IconButton>}
        >
          <Mui.ListItemAvatar>
            <Mui.Avatar>
              <Mui.Icons.Key />
            </Mui.Avatar>
          </Mui.ListItemAvatar>
          <Mui.ListItemText
            primary="Password"
          />
        </Mui.ListItem>
      </Mui.List>
    )
  }

  React.useEffect(() => {
    if (props.userInfo.id !== undefined)
      updateSharedLinksList()
  }, [props])

  return (
    <Mui.Card sx={{ width: props.width }}>
      <PasswordChangeDialog />
      <Mui.Dialog onClose={() => { textChangeDialogState.onCancel() }} open={textChangeDialogState.state}>
        <Mui.DialogTitle>{textChangeDialogState.title}</Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.TextField value={textChangeDialogState.value} variant='filled' fullWidth sx={{ minWidth: "256px" }} label={textChangeDialogState.message} onChange={(event) => {
            setTextChangeDialogState({
              title: textChangeDialogState.title,
              message: textChangeDialogState.message,
              value: event.currentTarget.value,
              state: textChangeDialogState.state,
              onOk: textChangeDialogState.onOk,
              onCancel: textChangeDialogState.onCancel
            })
            console.log(textChangeDialogState.value, event.currentTarget.value)
          }} />
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={() => textChangeDialogState.onCancel()}>Cancel</Mui.Button>
          <Mui.Button onClick={() => textChangeDialogState.onOk(textChangeDialogState.value)}>OK</Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
      <ItemUploadDialog title={itemUploadDialogState.title} message={itemUploadDialogState.message} allowMultiFile={itemUploadDialogState.allowMultiFile} acceptedType={itemUploadDialogState.acceptedType} state={itemUploadDialogState.state} onUpload={itemUploadDialogState.onUpload} onOk={itemUploadDialogState.onOk} onCancel={itemUploadDialogState.onCancel} formKey={itemUploadDialogState.formKey} />
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
      <Mui.CardMedia
        sx={{ height: props.headImgHeight }}
        image={`/api/xms/v1/user/${props.userInfo.id}/headimg`}
        title={props.userInfo.name}
      />
      <Mui.CardContent>
        <Mui.Grid container spacing={1}>
          <Mui.Grid item xs="auto">
            <Mui.Avatar sx={{ height: "50px", width: "50px" }} alt={props.userInfo.name} src={`/api/xms/v1/user/${props.userInfo.id}/avatar`} />
          </Mui.Grid>
          <Mui.Grid item xs="auto">
            <Mui.Typography variant="h6">
              {props.userInfo.name}
            </Mui.Typography>
            <Mui.Typography variant="body2" color="text.secondary">
              {props.userInfo.slogan}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Box sx={{ marginTop: "10px", borderBottom: 1, borderColor: 'divider' }}>
          <Mui.Tabs value={profileTab} onChange={(event, v) => { setProfileTab(v) }} aria-label="basic tabs example">
            <Mui.Tab label="Shared Files" {...a11yProps(0)} />
            <Mui.Tab label="Shared Playlists" {...a11yProps(1)} />
            <Mui.Tab label="Edit Profile" {...a11yProps(2)} />
          </Mui.Tabs>
        </Mui.Box>
        <CustomTabPanel value={profileTab} index={0}>
          <SharedFiles />
        </CustomTabPanel>
        <CustomTabPanel value={profileTab} index={1}>
          <SharedPlaylists />
        </CustomTabPanel>
        <CustomTabPanel value={profileTab} index={2}>
          <EditProfile />
        </CustomTabPanel>
      </Mui.CardContent>
    </Mui.Card>
  );
}