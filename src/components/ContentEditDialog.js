import React from 'react';
import * as Mui from '../Components';

function ContentEditDialog({ defaultValue, onOk, title, description, icon, secret, hideCurrentValue }) {
  const [value, setValue] = React.useState(defaultValue)
  const [state, setState] = React.useState(false)

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <>
    <Mui.Dialog open={state} onClose={() => setState(false)}>
      <Mui.DialogTitle>Edit</Mui.DialogTitle>
      <Mui.DialogContent sx={{ minWidth: '300px' }}>
        <Mui.Typography variant='body1'>
          {description}
        </Mui.Typography>
        <Mui.TextField 
          type={secret ? 'password' : 'text'} 
          sx={{ marginTop: '1em' }} 
          label={title} 
          value={value} 
          multiline 
          maxRows={6} 
          onChange={(e) => setValue(e.target.value)} 
          variant='outlined' 
          fullWidth
        />
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button variant='text' onClick={() => setState(false)}>
          Cancel
        </Mui.Button>
        <Mui.Button variant='text' onClick={() => {
          onOk(value)
          setState(false)
        }}>
          Save
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
    <Mui.ListItemButton onClick={() => setState(true)}>
      <Mui.ListItemIcon>
        {icon}
      </Mui.ListItemIcon>
      {hideCurrentValue && <Mui.ListItemText primary={title} />}
      {!hideCurrentValue && (
        <Mui.ListItemText 
          primary={title} 
          secondary={defaultValue ? (secret ? '************' : defaultValue) : 'Click to edit'} 
          secondaryTypographyProps={{ 
            textOverflow: 'ellipsis', 
            overflow: 'hidden', 
            width: '100%', 
            maxHeight: '3em' 
          }} 
        />
      )}
    </Mui.ListItemButton>
    </>
}

export default ContentEditDialog
