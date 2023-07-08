import * as React from 'react'
import * as Mui from '../Components'

import * as Api from '../Api'

function dirname(pathStr) {
  if (pathStr === "/") { return "" }

  if (pathStr.endsWith('/')) { pathStr = pathStr.substring(0, pathStr.length - 1) }
  let paths = pathStr.split("/")
  console.log(paths)
  if (paths.length == 2) {
    return '/'
  } else {
    let final = '/'
    paths.map((i, idx) => { if (idx !== 0 && idx !== paths.length - 1) { final += i + '/' } })
    return final.substring(0, final.length - 1)
  }
}

export default function PathInputDialog(props) {
  let [inputValue, setInputValue] = React.useState('/')
  // use this to force refresh the rendered component
  let [rawCandidateList, setRawCandidateList] = React.useState('')
  // store driveDir query result
  let [driveDirQueryResult, setDriveDirQueryResult] = React.useState({ list: [], info: { files: 0, dirs: 0, total: 0 } })

  function CandidateList(props) {
    return (
      <Mui.List sx={{ maxHeight: "500px", overflowY: "scroll" }}>
        {props.current !== "/" && <Mui.ListItem key={0} disablePadding>
          <Mui.ListItemButton onClick={() => {
            if (dirname(props.current) == "/") { setInputValue(dirname(props.current)) }
            else { setInputValue(dirname(props.current) + "/") }
            refreshCandidateList(dirname(props.current))
          }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Folder />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary={".."} />
          </Mui.ListItemButton>
        </Mui.ListItem>}
        {props.items}
      </Mui.List>
    )
  }

  function refreshCandidateList(dirPath) {
    Api.driveDir(dirPath).then((data) => {
      if (data.data.ok) {
        setDriveDirQueryResult(data.data.data)
        console.log("fuck it", dirPath, data.data.data.list)
        setRawCandidateList(<CandidateList current={dirPath} dirOnly={props.dirOnly} items={
          data.data.data.list.map((row, index) =>
          (
            <Mui.ListItem key={index + 1} disablePadding>
              <Mui.ListItemButton disabled={props.dirOnly && row.type !== "dir"} onClick={() => {
                if (row.type === "dir") {
                  if (row.path === "/") {
                    setInputValue("/")
                  } else {
                    setInputValue(row.path + "/")
                  }
                  refreshCandidateList(row.path)
                } else {
                  setInputValue(row.path)
                }
              }}>
                <Mui.ListItemIcon>
                  {row.type === "file" && <Mui.Icons.InsertDriveFile />}
                  {row.type === "dir" && <Mui.Icons.Folder />}
                </Mui.ListItemIcon>
                <Mui.ListItemText primary={row.filename} />
              </Mui.ListItemButton>
            </Mui.ListItem>
          ))
        } />)
      } else {
        setRawCandidateList(<Mui.Typography variant='body2' align='center' color='text.secondary'>
          Error loading candidate list: {data.data.data}
        </Mui.Typography>)
      }
    }).catch((err) => {
      setRawCandidateList(<Mui.Typography variant='body2' align='center' color='text.secondary'>
        Error loading candidate list: NetworkError
      </Mui.Typography>)
    })
  }

  React.useEffect(() => {
    refreshCandidateList(inputValue)
  }, [])

  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
      <Mui.Box component="form" noValidate autoComplete="off" onSubmit={(event) => { event.preventDefault(); let d = new FormData(event.currentTarget);props.onOk(d.get('data')) }}>
        <div>
          <Mui.DialogTitle>{props.title}</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Typography variant='body2'>
              {props.message}
              <Mui.TextField value={inputValue} name="data" label="Path" variant="filled" margin="normal" fullWidth onChange={(event) => {
                setInputValue(event.target.value)
                if (event.target.value === '/') {
                  console.log("back to root directory, no need to refresh")
                  refreshCandidateList("/")
                } else if (event.target.value.endsWith('/')) {
                  console.log("yikes", event.target.value.substring(0, event.target.value.length - 1))
                  refreshCandidateList(event.target.value.substring(0, event.target.value.length - 1))
                }
              }} />
            </Mui.Typography>

            {<div style={{ marginTop: "10px" }}></div>}
            {rawCandidateList}
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