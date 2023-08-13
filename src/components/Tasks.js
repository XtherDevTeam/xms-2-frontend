import * as React from 'react'
import * as Mui from '../Components'
import * as Api from '../Api'

export default function Tasks(props) {
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  let [createTaskDialogState, setCreateTaskDialogState] = React.useState(false)
  let [editCreateTaskParamDialogState, setEditCreateTaskParamDialogState] = React.useState(false)
  let [createTaskDialogArgs, setCreateTaskDialogArgs] = React.useState([])
  let [currentEditingTaskArgIndex, setCurrentEditingTaskArgIndex] = React.useState(null)
  let [currentEditingTaskArgType, setCurrentEditingTaskArgType] = React.useState("str")
  let [currentEditingTaskArgValue, setCurrentEditingTaskArgValue] = React.useState("yoimiya is my waifu")
  let [createTaskDialogTaskName, setCreateTaskDialogTaskName] = React.useState("")
  let [createTaskDialogPlugin, setCreateTaskDialogPlugin] = React.useState("")
  let [createTaskDialogPluginHandler, setCreateTaskDialogPluginHandler] = React.useState("")

  let defaultTaskDetailsDialogState = () => ({
    name: '',
    creationTime: '',
    endTime: '',
    logText: '',
    plugin: '',
    handler: ''
  })

  let [taskDetailsDialogState, setTaskDetailsDialogState] = React.useState(defaultTaskDetailsDialogState())
  let [taskDetailsDialogOpen, setTaskDetailsDialogOpen] = React.useState(false)
  let [taskDetailsRefreshInterval, setTaskDetailsRefreshInterval] = React.useState(null)

  let [userTasks, setUserTasks] = React.useState([])
  let [avaliablePlugins, setAvaliablePlugins] = React.useState([])

  let handleTaskDialogArgsDelete = (dIndex) => {
    let f = createTaskDialogArgs.filter((i, j) => j !== dIndex)
    setCreateTaskDialogArgs(f)
  }
  let handleTaskDialogArgsAdd = () => {
    setCreateTaskDialogArgs([...createTaskDialogArgs, ["str", "yoimiya is my waifu"]])
  }
  let handleCreateTaskDialogArgsEdit = (index) => {
    setCurrentEditingTaskArgIndex(index)
    setCurrentEditingTaskArgType(createTaskDialogArgs[index][0])
    setCurrentEditingTaskArgValue(createTaskDialogArgs[index][1])
    setEditCreateTaskParamDialogState(true)
  }
  let handleEditCreateTaskParamDialogOk = () => {
    let f = [...createTaskDialogArgs]
    f[currentEditingTaskArgIndex] = [currentEditingTaskArgType, currentEditingTaskArgValue]
    setCreateTaskDialogArgs(f)
    handleEditCreateTaskParamDialogClose()
  }
  let handleEditCreateTaskParamDialogClose = () => {
    setEditCreateTaskParamDialogState(false)
    setCurrentEditingTaskArgIndex(null)
    setCurrentEditingTaskArgType("str")
    setCurrentEditingTaskArgValue("yoimiya is my waifu")
  }

  let covertCreatetaskDialogArgsToList = () => {
    console.log('args', createTaskDialogArgs)
    return createTaskDialogArgs.map((v, index) => {
      if (v[0] === 'str') {
        return v[1]
      } else if (v[0] === 'int') {
        return parseInt(v[1])
      } else if (v[0] === 'bool') {
        return v[1] === 'true'
      } else if (v[0] === 'deci') {
        return parseFloat(v[1])
      } else {
        return null
      }
    })
  }

  let handleCreateUserTask = (name, plugin, handler, args) => {
    Api.taskCreate(name, plugin, handler, args).then((data) => {
      if (data.data.data) {
        refreshUserTasks()
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error creating user task: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error creating user task: NetworkError` })
      setAlertOpen(true)
    })
  }

  let refreshUserTasks = () => {
    Api.userTasks().then((data) => {
      if (data.data.ok) {
        setUserTasks(data.data.data)
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating user tasks: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating user tasks: NetworkError` })
      setAlertOpen(true)
    })
    Api.infoPlugins().then((data) => {
      if (data.data.ok) {
        setAvaliablePlugins(data.data.data)
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating avaliable task plugins: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating avaliable task plugins: NetworkError` })
      setAlertOpen(true)
    })
  }

  let handleRefreshTaskInfo = (id) => {
    Api.taskInfo(id).then((data) => {
      if (data.data.ok) {
        setTaskDetailsDialogState(data.data.data)
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating task detail: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error updating task detail: NetworkError` })
      setAlertOpen(true)
    })
  }

  let handleTaskDetailsDialogOpen = (id) => {
    handleRefreshTaskInfo(id)
    let fr = setInterval(() => (handleRefreshTaskInfo(id)), 1000)
    console.log("fr", fr)
    setTaskDetailsRefreshInterval(fr)
    setTaskDetailsDialogOpen(true)
  }
  let handleTaskDetailsDialogClose = () => {
    console.log(taskDetailsRefreshInterval, "fr")
    clearInterval(taskDetailsRefreshInterval)
    setTaskDetailsDialogOpen(false)
  }
  let handleTaskDelete = (id) => {
    Api.taskDelete(id).then((data) => {
      if (data.data.data) {
        refreshUserTasks()
      } else {
        setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error deleting task: ${data.data.data}` })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ 'type': 'error', 'title': 'Error', 'message': `Error deleting task: NetworkError` })
      setAlertOpen(true)
    })
  }

  React.useEffect(() => {
    if (taskDetailsDialogState.endTime === '') {
      return
    }
    if (taskDetailsDialogState.endTime !== '0000-00-00 00:00:00') {
      // ended
      console.log("refresh clear", taskDetailsRefreshInterval)
      clearInterval(taskDetailsRefreshInterval)
    }
  }, [taskDetailsDialogState])

  React.useEffect(() => {
    refreshUserTasks()
  }, [props])

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
      <Mui.Dialog fullWidth open={createTaskDialogState} onClose={() => {
        setCreateTaskDialogState(false)
      }}>
        <Mui.Dialog fullWidth open={editCreateTaskParamDialogState} onClose={() => {
          handleEditCreateTaskParamDialogClose()
        }}>
          <Mui.DialogTitle>{`Edit param #${currentEditingTaskArgIndex}`}</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Grid container spacing={1}>
              <Mui.Grid item xs={4}>
                <Mui.FormControl variant='filled' size='small' fullWidth>
                  <Mui.InputLabel id={`task-param-type-select-label`}>Type</Mui.InputLabel>
                  <Mui.Select
                    id={`task-param-type-select`}
                    labelId={`task-param-type-select-label`}
                    value={currentEditingTaskArgType}
                    onChange={(e) => {
                      setCurrentEditingTaskArgType(e.target.value)
                    }}
                  >
                    {['str', 'int', 'bool', 'deci'].map((row) => (
                      <Mui.MenuItem value={row}>{row}</Mui.MenuItem>
                    ))}
                  </Mui.Select>
                </Mui.FormControl>
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Mui.TextField
                  fullWidth
                  size='small'
                  variant='filled'
                  id={`task-param-input`}
                  label={`Value`}
                  value={currentEditingTaskArgValue}
                  onChange={(e) => {
                    setCurrentEditingTaskArgValue(e.target.value)
                  }}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={() => { handleEditCreateTaskParamDialogClose() }}>Cancel</Mui.Button>
            <Mui.Button onClick={() => { handleEditCreateTaskParamDialogOk() }}>OK</Mui.Button>
          </Mui.DialogActions>
        </Mui.Dialog>
        <Mui.DialogTitle>Create task</Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.TextField
            margin="normal"
            variant='filled'
            required
            fullWidth
            id="task-name-input"
            label="Task name"
            autoFocus
            value={createTaskDialogTaskName}
            onChange={(e) => { setCreateTaskDialogTaskName(e.target.value) }}
          />
          <Mui.FormControl variant="filled" margin="normal" fullWidth>
            <Mui.InputLabel id="task-plugin-select-label">Plugin</Mui.InputLabel>
            <Mui.Select
              id="task-plugin-select"
              labelId='task-plugin-select-label'
              value={createTaskDialogPlugin}
              onChange={(e) => { setCreateTaskDialogPlugin(e.target.value) }}
            >
              {avaliablePlugins.map((row, index) => (
                <Mui.MenuItem value={row.name}>{row.name}</Mui.MenuItem>
              ))}
            </Mui.Select>
          </Mui.FormControl>
          <Mui.TextField
            margin="normal"
            variant='filled'
            required
            fullWidth
            id="task-handler-input"
            label="Plugin handler"
            value={createTaskDialogPluginHandler}
            onChange={(e) => { setCreateTaskDialogPluginHandler(e.target.value) }}
          />
          <div style={{ maxHeight: '30vh', overflowY: 'scroll' }}>
            <Mui.List sx={{ width: '100%' }}>
              <Mui.ListItem sx={{ width: '100%' }}>
                <Mui.Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                  <Mui.Grid item xs={3}>
                    <Mui.Typography color='text.primary'>Type</Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item sx={{ flexGrow: 1 }}>
                    <Mui.Typography color='text.primary'>Value</Mui.Typography>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.ListItem>
              {createTaskDialogArgs.map((row, index) => <Mui.ListItem sx={{ width: '100%' }}>
                <Mui.Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                  <Mui.Grid item xs={3}>
                    <Mui.Typography color='text.secondary'>{row[0]}</Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item sx={{ flexGrow: 1 }}>
                    <Mui.Typography color='text.secondary'>{row[1]}</Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item>
                    <Mui.IconButton onClick={() => { handleCreateTaskDialogArgsEdit(index) }}><Mui.Icons.Edit /></Mui.IconButton>
                    <Mui.IconButton onClick={() => { handleTaskDialogArgsDelete(index) }}><Mui.Icons.Delete /></Mui.IconButton>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.ListItem>)}
              {createTaskDialogArgs.length === 0 &&
                <Mui.ListItem sx={{ width: '100%', justifyContent: 'center' }}>
                  <Mui.Typography color='text.secondary'>{'No data yet :-('}</Mui.Typography>
                </Mui.ListItem>
              }
            </Mui.List>
          </div>
          <Mui.Button sx={{ marginTop: '10px' }} fullWidth variant='text' onClick={() => { handleTaskDialogArgsAdd() }}>New param</Mui.Button>
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={() => { setCreateTaskDialogState(false) }}>Cancel</Mui.Button>
          <Mui.Button onClick={() => {
            let f = covertCreatetaskDialogArgsToList()
            console.log(f)
            handleCreateUserTask(createTaskDialogTaskName, createTaskDialogPlugin, createTaskDialogPluginHandler, f)
            setCreateTaskDialogState(false)
          }}>OK</Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog >
      <Mui.Dialog fullWidth open={taskDetailsDialogOpen} onClose={() => {
        handleTaskDetailsDialogClose()
      }}>
        <Mui.DialogTitle>
          Task {taskDetailsDialogState.name} details
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
            <Mui.Grid item xs={12} sm={6}>
              <Mui.Typography color='text.primary'>Plugin: </Mui.Typography>
              <Mui.Typography color='text.secondary'>{taskDetailsDialogState.plugin}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12} sm={6}>
              <Mui.Typography color='text.primary'>Plugin handler: </Mui.Typography>
              <Mui.Typography color='text.secondary'>{taskDetailsDialogState.handler}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12} sm={6}>
              <Mui.Typography color='text.primary'>Start time: </Mui.Typography>
              <Mui.Typography color='text.secondary'>{taskDetailsDialogState.creationTime}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12} sm={6}>
              <Mui.Typography color='text.primary'>End time: </Mui.Typography>
              <Mui.Typography color='text.secondary'>{taskDetailsDialogState.endTime}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.TextField
                fullWidth
                label="Log text"
                multiline
                rows={8}
                value={taskDetailsDialogState.logText}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={() => {
            handleTaskDetailsDialogClose()
          }}>OK</Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
      <Mui.CardContent>
        <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {"Tasks"}
        </Mui.Typography>

        <Mui.TableContainer component={'div'}>
          <Mui.Table sx={{ minWidth: 650 }}>
            <Mui.TableHead>
              <Mui.TableRow>
                <Mui.TableCell>Name</Mui.TableCell>
                <Mui.TableCell>Plugin</Mui.TableCell>
                <Mui.TableCell>Handler</Mui.TableCell>
                <Mui.TableCell>Start time</Mui.TableCell>
                <Mui.TableCell>End time</Mui.TableCell>
                <Mui.TableCell></Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {userTasks.map((row, index) => (
                <Mui.TableRow hover key={`tasks-unique-key-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <Mui.TableCell>{row.name}</Mui.TableCell>
                  <Mui.TableCell>{row.plugin}</Mui.TableCell>
                  <Mui.TableCell>{row.handler}</Mui.TableCell>
                  <Mui.TableCell>{row.creationTime}</Mui.TableCell>
                  <Mui.TableCell>{row.endTime}</Mui.TableCell>
                  <Mui.TableCell>
                    <Mui.IconButton onClick={() => {
                      handleTaskDetailsDialogOpen(row.id)
                    }}>
                      <Mui.Icons.OpenInNew />
                    </Mui.IconButton>
                    <Mui.IconButton onClick={() => {
                      handleTaskDelete(row.id)
                    }}>
                      <Mui.Icons.Delete />
                    </Mui.IconButton>
                  </Mui.TableCell>
                </Mui.TableRow>
              ))}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
        <Mui.Fab sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }} color="primary" aria-label="add" onClick={() => {
          setCreateTaskDialogState(true)
        }}>
          <Mui.Icons.Add />
        </Mui.Fab>
      </Mui.CardContent>
    </Mui.Card>
  )
}