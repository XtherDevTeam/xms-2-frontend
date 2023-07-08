import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'

import * as Api from '../Api'
import { useNavigate, useHref } from "react-router-dom"
import { Icon } from '@mui/material'
import PropTypes from 'prop-types'

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
  );
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
  let [profileTab, setProfileTab] = React.useState(0)

  return (
    <Mui.Card sx={{ width: props.width }}>
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
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={profileTab} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={profileTab} index={2}>
          <Mui.Grid container spacing={1}>
            <Mui.Grid item xs={12}>
              
            </Mui.Grid>
          </Mui.Grid>
        </CustomTabPanel>
      </Mui.CardContent>
    </Mui.Card>
  );
}