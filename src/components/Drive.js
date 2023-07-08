import * as React from 'react'
import * as Mui from '../Components'
import PathInputDialog from './PathInputDialog'

import * as Api from '../Api'

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
  return { "title": "", "message": "", onCancel: () => { }, onOk: (data) => { }, "state": false }
}

export default function Drive(props) {
  let [confirmDialogState, setConfirmDialogState] = React.useState(defaultConfirmDialogState())
  let [itemRenameDialogState, setItemRenameDialogState] = React.useState(defaultItemRenameDialogState())
  let [pathInputDialogState, setPathInputDialogState] = React.useState(defaultPathInputDialogState())

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
        // TODO: finish file preview
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
        message: `New path for ${driveInfo.info.list[index].filename}`,
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
        }
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
        <Mui.TableCell component="th" scope="row" onClick={() => { handleActionsClick(index, "open") }}>
          {row.filename}
        </Mui.TableCell>
        <Mui.TableCell >{row.mime}</Mui.TableCell>
        <Mui.TableCell >{row.lastModified}</Mui.TableCell>
        <Mui.TableCell >
          <Mui.IconButton aria-label="Copy" onClick={() => { handleActionsClick(index, "copy") }}>
            <Mui.Icons.FileCopy />
          </Mui.IconButton>
          <Mui.IconButton aria-label="Move" onClick={() => { handleActionsClick(index, "move") }}>
            <Mui.Icons.DriveFileMove />
          </Mui.IconButton>
          <Mui.IconButton aria-label="rename" onClick={() => { handleActionsClick(index, "rename") }}>
            <Mui.Icons.DriveFileRenameOutline />
          </Mui.IconButton>
          <Mui.IconButton aria-label="delete" onClick={() => {
            setConfirmDialogState({
              title: "Warning",
              message: "Are you really going to delete this item? This operation is IRREVERTIBLE!",
              onOk: () => { handleActionsClick(index, "delete"); setConfirmDialogState(defaultConfirmDialogState()) },
              onCancel: () => { setConfirmDialogState(defaultConfirmDialogState()) }, state: true
            })
          }}>
            <Mui.Icons.Delete />
          </Mui.IconButton>
          {row.type == "file" &&
            <Mui.IconButton aria-label="download" onClick={() => { handleActionsClick(index, "download") }}>
              <Mui.Icons.CloudDownload />
            </Mui.IconButton>}
        </Mui.TableCell>
      </Mui.TableRow>
    )))
  }

  let previewFile = (index) => {

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
        <PathInputDialog title={pathInputDialogState.title} message={pathInputDialogState.message} state={pathInputDialogState.state} onOk={pathInputDialogState.onOk} onCancel={pathInputDialogState.onCancel} />
        <ItemRenameDialog origin={itemRenameDialogState.origin} path={itemRenameDialogState.path} state={itemRenameDialogState.state} onOk={itemRenameDialogState.onOk} onCancel={itemRenameDialogState.onCancel}></ItemRenameDialog>
        <ConfirmDialog title={confirmDialogState.title} message={confirmDialogState.message} state={confirmDialogState.state} onOk={confirmDialogState.onOk} onCancel={confirmDialogState.onCancel}></ConfirmDialog>
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
        <Mui.Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={previewOpen}
        >

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
          <Mui.Button>Create folder</Mui.Button>
          <Mui.Button onClick={() => { updateDriveInfo() }}>Refresh</Mui.Button>
          <Mui.Button>Upload file</Mui.Button>
        </Mui.ButtonGroup>
        {<div style={{ marginTop: "10px" }}></div>}
        <Mui.TableContainer component={Mui.Paper} >
          <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
            <Mui.TableHead>
              <Mui.TableRow>
                <Mui.TableCell width="32px"></Mui.TableCell>
                <Mui.TableCell>Filename</Mui.TableCell>
                <Mui.TableCell >MIME</Mui.TableCell>
                <Mui.TableCell >Last modified</Mui.TableCell>
                <Mui.TableCell >Actions</Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {rawTableRows}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
      </Mui.CardContent>
    </Mui.Card>
  );
}