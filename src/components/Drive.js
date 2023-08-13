import * as React from 'react'
import * as Mui from '../Components'
import PathInputDialog from './PathInputDialog'
import ItemUploadDialog from './ItemUploadDialog'
import PlaylistSelectDialog from './PlaylistSelectDialog'

import * as Api from '../Api'
import axios from 'axios'
import { formLabelClasses } from '@mui/material'

function splitPath(pathStr) {
  if (pathStr === "/")
    return ["Drive"]
  let paths = pathStr.split("/")
  paths[0] = "Drive"
  return paths
}


function defaultConfirmDialogState() {
  return { "title": "", "message": "", onOk: () => { }, onCancel: () => { }, "state": false, }
}

function defaultItemRenameDialogState() {
  return { "origin": "", "path": "", onOk: () => { }, onCancel: () => { }, "state": false, }
}

function defaultPathInputDialogState() {
  return { "title": "", "message": "", onCancel: () => { }, onOk: (data) => { }, dirOnly: false, "state": false }
}

function defaultCreateFolderDialogState() {
  return { "path": "", onOk: () => { }, onCancel: () => { }, "state": false }
}

function defaultItemUploadDialogState() {
  return { onUpload: (data) => { }, message: "", title: "", acceptedType: "", allowMultiFile: false, onOk: () => { }, onCancel: () => { }, "state": false, formKey: "" }
}

function defaultPlaylistSelectDialogState() {
  return { onOk: (id) => { }, onCancel: () => { }, message: "", title: "", state: false }
}

function defaultFilesContextMenuState() {
  return { state: false, row: {}, index: 0, posX: 0, posY: 0, targetEl: null }
}


export default function Drive(props) {
  let [filesContextMenuState, setFilesContextMenuState] = React.useState(defaultFilesContextMenuState())
  let [confirmDialogState, setConfirmDialogState] = React.useState(defaultConfirmDialogState())
  let [itemRenameDialogState, setItemRenameDialogState] = React.useState(defaultItemRenameDialogState())
  let [pathInputDialogState, setPathInputDialogState] = React.useState(defaultPathInputDialogState())
  let [createFolderDialogState, setCreateFolderDialogState] = React.useState(defaultCreateFolderDialogState())
  let [itemUploadDialogState, setItemUploadDialogState] = React.useState(defaultItemUploadDialogState())
  let [playlistSelectDialogState, setPlaylistSelectDialogState] = React.useState(defaultPlaylistSelectDialogState())

  let [rawPreviewComponent, setRawPreviewComponent] = React.useState(<></>)
  let [previewOpen, setPreviewOpen] = React.useState(false)
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  let [driveInfo, setDriveInfo] = React.useState({ "path": "/", "states": [], "info": { "info": { "dirs": 0, "total": 0, "files": 0 }, "list": [] } })
  let [breadcrumb, setBreadcrumb] = React.useState("loading...")
  let [rawTableRows, setRawTableRows] = React.useState(<div></div>)


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


  function CreateFolderDialog(props) {
    let handleSubmit = (formData) => {
      let name = formData.get('name')
      Api.driveCreateDir(props.path, name).then((data) => {
        if (data.data.ok) {
          props.onOk()
        } else {
          setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating folder: ${data.data.data}` })
          setAlertOpen(true)
          props.onCancel()
        }
      }).catch((err) => {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating folder: NetworkError` })
        setAlertOpen(true)
        props.onCancel()
      })
    }

    return (
      <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
        <Mui.Box component="form" noValidate autoComplete="off" onSubmit={(event) => { event.preventDefault(); handleSubmit(new FormData(event.currentTarget)) }}>
          <div>
            <Mui.DialogTitle>Create folder</Mui.DialogTitle>
            <Mui.DialogContent>
              <Mui.Typography variant='body2' color='text.secondary'>
                Enter the name for folder
                <Mui.TextField name="name" label="Folder name" variant="filled" margin="normal" fullWidth />
              </Mui.Typography>
            </Mui.DialogContent>
            <Mui.DialogActions>
              <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
              <Mui.Button type="submit" autoFocus>
                OK
              </Mui.Button>
            </Mui.DialogActions>
          </div>
        </Mui.Box>
      </Mui.Dialog>
    )
  }


  function ItemRenameDialog(props) {
    let handleSubmit = (formData) => {
      let newName = formData.get('newName')
      console.log("newName: ", newName)
      Api.driveRename(props.path, newName).then((data) => {
        if (data.data.ok) {
          props.onOk()
        } else {
          setAlertDetail({ "type": "error", "title": "Error", "message": `Error renameing item: ${data.data.data}` })
          setAlertOpen(true)
          props.onCancel()
        }
      }).catch((err) => {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error renameing item: NetworkError` })
        setAlertOpen(true)
        props.onCancel()
      })
    }
    return (
      <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
        <Mui.Box component="form" noValidate autoComplete="off" onSubmit={(event) => { event.preventDefault(); handleSubmit(new FormData(event.currentTarget)) }}>
          <div>
            <Mui.DialogTitle>Rename item</Mui.DialogTitle>
            <Mui.DialogContent>
              <Mui.Typography variant='body2' color='text.secondary'>
                Enter the new name for {props.origin}
                <Mui.TextField name="newName" label="New name" variant="filled" margin="normal" fullWidth />
              </Mui.Typography>
            </Mui.DialogContent>
            <Mui.DialogActions>
              <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
              <Mui.Button type="submit" autoFocus>
                OK
              </Mui.Button>
            </Mui.DialogActions>
          </div>
        </Mui.Box>
      </Mui.Dialog>
    )
  }

  function FilesContextMenu() {
    return (
      <Mui.Menu
        id="basic-menu"
        open={filesContextMenuState.state}
        onClose={() => {
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}
        anchorEl={filesContextMenuState.targetEl}
        MenuListProps={{

        }}
      >
        <Mui.MenuItem onClick={() => {
          handleActionsClick(filesContextMenuState.index, "copy")
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}>
          <Mui.ListItemIcon>
            <Mui.Icons.FileCopy fontSize='small' />
          </Mui.ListItemIcon>
          <Mui.ListItemText>Copy</Mui.ListItemText>
        </Mui.MenuItem>
        <Mui.MenuItem onClick={() => {
          handleActionsClick(filesContextMenuState.index, "move")
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}>
          <Mui.ListItemIcon>
            <Mui.Icons.DriveFileMove fontSize='small' />
          </Mui.ListItemIcon>
          <Mui.ListItemText>Move</Mui.ListItemText>
        </Mui.MenuItem>
        <Mui.MenuItem onClick={() => {
          handleActionsClick(filesContextMenuState.index, "rename")
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}>
          <Mui.ListItemIcon>
            <Mui.Icons.DriveFileRenameOutline fontSize='small' />
          </Mui.ListItemIcon>
          <Mui.ListItemText>Rename</Mui.ListItemText>
        </Mui.MenuItem>
        <Mui.MenuItem onClick={() => {
          setConfirmDialogState({
            title: "Warning",
            message: "Are you really going to delete this item? This operation is IRREVERTIBLE!",
            onOk: () => { handleActionsClick(filesContextMenuState.index, "delete"); setConfirmDialogState(defaultConfirmDialogState()) },
            onCancel: () => { setConfirmDialogState(defaultConfirmDialogState()) }, state: true
          })
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}>
          <Mui.ListItemIcon>
            <Mui.Icons.Delete fontSize='small' />
          </Mui.ListItemIcon>
          <Mui.ListItemText>Delete</Mui.ListItemText>
        </Mui.MenuItem>
        <Mui.MenuItem onClick={() => {
          handleShareOnClick(filesContextMenuState.index)
          setFilesContextMenuState(defaultFilesContextMenuState())
        }}>
          <Mui.ListItemIcon>
            <Mui.Icons.Share fontSize='small' />
          </Mui.ListItemIcon>
          <Mui.ListItemText>Share</Mui.ListItemText>
        </Mui.MenuItem>
        {filesContextMenuState.row.type == "file" &&
          <Mui.MenuItem onClick={() => {
            handleActionsClick(filesContextMenuState.index, "download")
            setFilesContextMenuState(defaultFilesContextMenuState())
          }}>
            <Mui.ListItemIcon>
              <Mui.Icons.CloudDownload fontSize='small' />
            </Mui.ListItemIcon>
            <Mui.ListItemText>Download</Mui.ListItemText>
          </Mui.MenuItem>
        }
        {(filesContextMenuState.row.type == "file" && filesContextMenuState.row.mime.startsWith("audio/")) &&
          <Mui.MenuItem onClick={() => {
            handleAddToPlaylistOnClick(filesContextMenuState.index)
            setFilesContextMenuState(defaultFilesContextMenuState())
          }}>
            <Mui.ListItemIcon>
              <Mui.Icons.PlaylistAdd fontSize='small' />
            </Mui.ListItemIcon>
            <Mui.ListItemText>Add to playlist</Mui.ListItemText>
          </Mui.MenuItem>
        }
      </Mui.Menu>
    )
  }

  let handleNavigationClick = (index) => {
    console.log("breadcrumb got clicked!", index)
    let builtPath = "/"
    for (let i = 1; i <= index; i++) {
      builtPath = driveInfo.states[i] + "/"
    }
    if (builtPath.length > 1)
      builtPath = builtPath.substring(0, builtPath.length - 1)

    driveInfo.path = builtPath
    updateDriveInfo()
  }

  let handleActionsClick = (index, event) => {
    console.log("actionClick", index, event)
    if (event === "open") {
      if (driveInfo.info.list[index]['type'] === "dir") {
        driveInfo.path = driveInfo.info.list[index].path;
        updateDriveInfo()
      } else {
        previewFile(index)
      }
    } else if (event === "delete") {
      Api.driveDelete(driveInfo.info.list[index].path).then((data) => {
        if (data.data.ok) {
          updateDriveInfo()
        } else {
          setAlertDetail({ "type": "error", "title": "Error", "message": `Error deleting item: ${data.data.data}` })
          setAlertOpen(true)
        }
      })
    } else if (event === "download") {
      window.open(Api.getDownloadPath(driveInfo.info.list[index].path))
    } else if (event === "move") {
      setPathInputDialogState({
        title: "Move to",
        message: `Enter the new path for ${driveInfo.info.list[index].filename}`,
        state: true,
        onOk: (newPath) => {
          setPathInputDialogState(defaultPathInputDialogState())
          Api.driveMove(driveInfo.info.list[index].path, newPath).then((data) => {
            if (data.data.ok) {
              updateDriveInfo()
            } else {
              setAlertDetail({ "type": "error", "title": "Error", "message": `Error moving item: ${data.data.data}` })
              setAlertOpen(true)
            }
          }).catch((err) => {
            setAlertDetail({ "type": "error", "title": "Error", "message": `Error moving item: NetworkError` })
            setAlertOpen(true)
          })
        },
        onCancel: () => {
          setPathInputDialogState(defaultPathInputDialogState())
        },
        dirOnly: true
      })
    } else if (event === "copy") {
      setPathInputDialogState({
        title: "Copy to",
        message: `Enter the copy destination for ${driveInfo.info.list[index].filename}`,
        state: true,
        onOk: (newPath) => {
          setPathInputDialogState(defaultPathInputDialogState())
          Api.driveCopy(driveInfo.info.list[index].path, newPath).then((data) => {
            if (data.data.ok) {
              updateDriveInfo()
            } else {
              setAlertDetail({ "type": "error", "title": "Error", "message": `Error copying item: ${data.data.data}` })
              setAlertOpen(true)
            }
          }).catch((err) => {
            setAlertDetail({ "type": "error", "title": "Error", "message": `Error copying item: NetworkError` })
            setAlertOpen(true)
          })
        },
        onCancel: () => {
          setPathInputDialogState(defaultPathInputDialogState())
        },
        dirOnly: true
      })
    } else if (event === "rename") {
      console.log("origin", driveInfo.info.list[index].name)
      setItemRenameDialogState({
        origin: driveInfo.info.list[index].filename,
        path: driveInfo.info.list[index].path,
        onOk: () => { setItemRenameDialogState(defaultItemRenameDialogState()); updateDriveInfo() },
        onCancel: () => { setItemRenameDialogState(defaultItemRenameDialogState()) },
        state: true
      })
    } else {
      setAlertDetail({ "type": "info", "title": "Info", "message": `Incomplete actions` })
      setAlertOpen(true)
    }
  }

  let handleShareOnClick = (index) => {
    console.log("wdnmd", index)
    Api.shareLinkCreate(driveInfo.info.list[index].path).then((data) => {
      if (data.data.ok) {
        setConfirmDialogState({
          title: "Share link created",
          message: <><span style={{ fontWeight: "bold" }}>Your link</span>: {Api.getShareLinkPath(window.location, data.data.data)}</>,
          onOk: () => { setConfirmDialogState(defaultConfirmDialogState()) },
          onCancel: () => { setConfirmDialogState(defaultConfirmDialogState()) }, state: true
        })
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating sharelink: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Error creating share link: NetworkError` })
      setAlertOpen(true)
    })
  }

  let handleAddToPlaylistOnClick = (index) => {
    setPlaylistSelectDialogState({
      onOk: (id) => {
        Api.musicPlaylistSongsInsert(id, driveInfo.info.list[index].path).then((data) => {
          if (data.data.ok) {
            setPlaylistSelectDialogState(defaultPlaylistSelectDialogState())
            setAlertDetail({ "type": "success", "title": "Success", "message": `Add ${driveInfo.info.list[index].filename} into playlist successfully!` })
            setAlertOpen(true)
          } else {
            setPlaylistSelectDialogState(defaultPlaylistSelectDialogState())
            setAlertDetail({ "type": "error", "title": "Error", "message": `Error adding music into playlist: ${data.data.data}` })
            setAlertOpen(true)
          }
        }).catch((err) => {
          setAlertDetail({ "type": "error", "title": "Error", "message": `Error adding music into playlist: NetworkError` })
          setAlertOpen(true)
        })
      },
      onCancel: () => { setPlaylistSelectDialogState(defaultPlaylistSelectDialogState()) },
      title: "Add to playlist",
      message: "Select which playlist that you want to add the song into",
      state: true
    })
  }

  let tableRows = () => {
    return (driveInfo.info.list.map((row, index) => (
      <Mui.TableRow
        hover
        key={row.index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <Mui.TableCell component="th" scope="row">
          {row.type === "file" && <Mui.Icons.InsertDriveFile />}
          {row.type === "dir" && <Mui.Icons.Folder />}
        </Mui.TableCell>
        <Mui.TableCell style={{ width: "40%", overflow: "hidden" }} onClick={() => { handleActionsClick(index, "open") }}>
          {row.filename}
        </Mui.TableCell>
        <Mui.TableCell><p style={{ width: "100px", overflow: "hidden" }}>{row.mime}</p></Mui.TableCell>
        <Mui.TableCell>{row.lastModified}</Mui.TableCell>
        <Mui.TableCell>
          <Mui.IconButton onClick={(event) => {
            console.log("more: ", event.clientX, event.clientY)
            setFilesContextMenuState({ state: true, row: row, index: index, posX: event.clientX, posY: event.clientY, targetEl: event.currentTarget })
            event.preventDefault()
          }}><Mui.Icons.MoreVert /></Mui.IconButton>
        </Mui.TableCell>
      </Mui.TableRow>
    )))
  }

  let previewFile = (index) => {
    if (driveInfo.info.list[index].mime.startsWith("application")) {
      setRawPreviewComponent(<Mui.Typography variant='body2' color="text.primary">Preview not available</Mui.Typography>)
    } else if (driveInfo.info.list[index].mime.startsWith('video')) {
      setRawPreviewComponent(<video style={{ maxWidth: "75%" }} controls><source src={Api.getDownloadPath(driveInfo.info.list[index].path)} type={driveInfo.info.list[index].mime} /></video>)
    } else if (driveInfo.info.list[index].mime.startsWith('audio')) {
      setRawPreviewComponent(<audio controls><source src={Api.getDownloadPath(driveInfo.info.list[index].path)} type={driveInfo.info.list[index].mime} /></audio>)
    } else if (driveInfo.info.list[index].mime.startsWith('image')) {
      setRawPreviewComponent(<img style={{ maxWidth: "75%" }} src={Api.getDownloadPath(driveInfo.info.list[index].path)} alt="preview" />)
    }
    setPreviewOpen(true)
  }

  let updateDriveInfo = () => {
    console.log("updating drive info")
    Api.driveDir(driveInfo.path).then((data) => {
      if (data.data.ok) {
        driveInfo.states = splitPath(driveInfo.path)
        driveInfo.info = data.data.data
        setDriveInfo(driveInfo)
        console.log("...done!", driveInfo)
        setBreadcrumb(driveInfo.states.map((text, index) => (
          <Mui.Link underline="hover" color="inherit" onClick={() => { handleNavigationClick(index) }}>
            <Mui.Typography variant="h6" gutterBottom color="text.primary">{text}</Mui.Typography>
          </Mui.Link>
        )))
        setRawTableRows(tableRows())
      } else {
        setAlertDetail({ "type": "error", "title": "Error", "message": `Serverside response: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "title": "Error", "message": `Serverside response: NetworkError` })
      setAlertOpen(true)
    })
  }

  React.useEffect(() => {
    updateDriveInfo()
  }, [])
  return (
    <Mui.Card sx={{ width: props.width }}>
      <Mui.CardContent>
        <FilesContextMenu></FilesContextMenu>
        <PlaylistSelectDialog title={playlistSelectDialogState.title} message={playlistSelectDialogState.message} state={playlistSelectDialogState.state} onOk={playlistSelectDialogState.onOk} onCancel={playlistSelectDialogState.onCancel} />
        <ItemUploadDialog title={itemUploadDialogState.title} message={itemUploadDialogState.message} allowMultiFile={itemUploadDialogState.allowMultiFile} acceptedType={itemUploadDialogState.acceptedType} formKey={itemUploadDialogState.formKey} state={itemUploadDialogState.state} onUpload={itemUploadDialogState.onUpload} onOk={itemUploadDialogState.onOk} onCancel={itemUploadDialogState.onCancel} />
        <CreateFolderDialog path={createFolderDialogState.path} state={createFolderDialogState.state} onOk={createFolderDialogState.onOk} onCancel={createFolderDialogState.onCancel} />
        <PathInputDialog title={pathInputDialogState.title} message={pathInputDialogState.message} state={pathInputDialogState.state} onOk={pathInputDialogState.onOk} onCancel={pathInputDialogState.onCancel} dirOnly={pathInputDialogState.dirOnly} />
        <ItemRenameDialog origin={itemRenameDialogState.origin} path={itemRenameDialogState.path} state={itemRenameDialogState.state} onOk={itemRenameDialogState.onOk} onCancel={itemRenameDialogState.onCancel}></ItemRenameDialog>
        <ConfirmDialog title={confirmDialogState.title} message={confirmDialogState.message} state={confirmDialogState.state} onOk={confirmDialogState.onOk} onCancel={confirmDialogState.onCancel}></ConfirmDialog>
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
        <Mui.Breadcrumbs aria-label="breadcrumb">
          {breadcrumb}
        </Mui.Breadcrumbs>
        <Mui.Typography variant='' color="text.secondary">
          <span><Mui.Icons.Book fontSize='small' /> Total: {driveInfo.info.info.total} {"Item(s)"} </span>
          <span>{driveInfo.info.info.files} {"file(s)"},{driveInfo.info.info.dirs} {"folder(s)"}</span>
        </Mui.Typography>
        {<div style={{ marginTop: "10px" }}></div>}
        <Mui.ButtonGroup variant="outlined" >
          <Mui.Button onClick={() => {
            setCreateFolderDialogState({ "path": driveInfo.path, "state": true, onOk: () => { setCreateFolderDialogState(defaultCreateFolderDialogState()); updateDriveInfo() }, onCancel: () => { setCreateFolderDialogState(defaultCreateFolderDialogState()) } })
          }}>Create folder</Mui.Button>
          <Mui.Button onClick={() => { updateDriveInfo() }}>Refresh</Mui.Button>
          <Mui.Button onClick={() => {
            setItemUploadDialogState({
              title: "Upload files", message: "", acceptedType: "*/*",
              allowMultiFile: true, formKey: "yoimiya",
              onOk: (formData) => {
                setAlertDetail({ "type": "info", "title": "Uploading...", "message": `Please be patient, and DO NOT close the dialog.` })
                setAlertOpen(true)
                Api.driveUpload(driveInfo.path, formData).then((data) => {
                  if (data.data.ok) {
                    setAlertDetail({ "type": "success", "title": "Success", "message": `Finished uploading to ${driveInfo.path}` })
                    setAlertOpen(true)
                  } else {
                    setAlertDetail({ "type": "error", "title": "Error", "message": `Error uploading files: ${data.data.data}` })
                    setAlertOpen(true)
                  }
                  setItemUploadDialogState(defaultItemUploadDialogState())
                  updateDriveInfo()
                }).catch((err) => {
                  setAlertDetail({ "type": "error", "title": "Error", "message": `Error uploading files: NetworkError` })
                  setAlertOpen(true)
                  setItemUploadDialogState(defaultItemUploadDialogState())
                })
              },
              onCancel: () => { setItemUploadDialogState(defaultItemUploadDialogState()) },
              state: true
            })
          }}>Upload file</Mui.Button>
        </Mui.ButtonGroup>
        {<div style={{ marginTop: "10px" }}></div>}
        <Mui.TableContainer component={'div'} >
          <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
            <Mui.TableHead>
              <Mui.TableRow>
                <Mui.TableCell width="32px"></Mui.TableCell>
                <Mui.TableCell style={{ width: "40%", overflow: "hidden" }}>Name</Mui.TableCell>
                <Mui.TableCell>MIME</Mui.TableCell>
                <Mui.TableCell>Last modified</Mui.TableCell>
                <Mui.TableCell width="32px"></Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {
                driveInfo.path !== "/" && <Mui.TableRow hover key={-1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <Mui.TableCell component="th" scope="row">
                    <Mui.Icons.Folder />
                  </Mui.TableCell>
                  <Mui.TableCell style={{ width: "40%", overflow: "hidden" }} onClick={() => { driveInfo.path = Api.dirname(driveInfo.path); updateDriveInfo() }}>
                    ..
                  </Mui.TableCell>
                  <Mui.TableCell>None</Mui.TableCell>
                  <Mui.TableCell>None</Mui.TableCell>
                  <Mui.TableCell></Mui.TableCell>
                </Mui.TableRow>
              }
              {rawTableRows}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
      </Mui.CardContent>
    </Mui.Card>
  );
}