import * as React from 'react'
import * as Mui from '../Components'

import * as Api from '../Api'

export default function PlaylistSelectDialog(props) {
  // use this to force refresh the rendered component
  let [rawCandidateList, setRawCandidateList] = React.useState('')

  let CandidateList = (props) => {
    return (
      <Mui.List sx={{ maxHeight: "500px", overflowY: "scroll" }}>
        {props.items.map((row, index) =>
        (
          <Mui.ListItem key={index + 1} disablePadding>
            <Mui.ListItemButton onClick={() => { props.onOk(row.id) }}>
              <Mui.ListItemIcon>
                  <Mui.Icons.LibraryMusic />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary={row.name} />
            </Mui.ListItemButton>
          </Mui.ListItem>
        ))}
      </Mui.List>
    )
  }

  let refreshCandidateList = () => {
    Api.userPlaylists().then((data) => {
      if (data.data.ok) {
        setRawCandidateList(<CandidateList items={data.data.data} onOk={props.onOk}/>)
      } else {
        setRawCandidateList(<Mui.Typography component="div" variant='body2' align='center' color='text.secondary'>
          Error loading candidate list: {data.data.data}
        </Mui.Typography>)
      }
    }).catch((err) => {
      setRawCandidateList(<Mui.Typography component="div" variant='body2' align='center' color='text.secondary'>
        Error loading candidate list: NetworkError
      </Mui.Typography>)
    })
  }

  // make the props update
  React.useEffect(() => {
    refreshCandidateList()
  }, [props.state])

  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
      <Mui.DialogTitle>{props.title}</Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Typography variant='body2'>
          {props.message}
        </Mui.Typography>
        {<div style={{ marginTop: "10px" }}></div>}
        {rawCandidateList}
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}