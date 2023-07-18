import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Backdrop from '@mui/material/Backdrop'
import ButtonGroup from '@mui/material/ButtonGroup'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Fab from '@mui/material/Fab'
import CardActionArea from '@mui/material/CardActionArea'
import Icon from '@mui/material/Icon'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import * as Icons from '@mui/icons-material'
import imgBackground1 from './assets/loginBackground.jpg'
import imgOops from './assets/oops.jpg'
import imgBackground2 from './assets/background-2.png'
import imgBackground3 from './assets/background-3.png'
import { styled } from "@mui/system"

import Profile from './components/Profile'
import Drive from './components/Drive'
import Music from './components/Music'

import FileUpload from 'react-mui-fileuploader'

import { createTheme } from '@mui/material/styles'

import * as React from 'react'

// backgroundColor: "rgba(255, 255, 255, 0.24)",
//               backdropFilter: "blur(15px)",

const Background = (props) => (<div style={{
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${props.img})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2000,
  transition: 'background-image 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}}>{props.children}</div>)

const BackgroundColor = (props) => (<div style={{
  position: "absolute",
  top: '0px',
  left: '0px',
  width: "100%",
  height: "100%",
  backgroundColor: props.color,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2000,
  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}}>{props.children}</div>)

let theme = () => {
  if (window.localStorage.getItem('themeMode') === null) {
    setThemeMode('light')
    return
  }

  document.getElementsByTagName('body')[0].style.backgroundColor = window.localStorage.getItem('themeMode') === 'light' ? '#fafafa' : '#303030'
  return createTheme({
    palette: {
      mode: window.localStorage.getItem('themeMode'),
      primary: {
        light: '#ea4c03',
        main: '#f36903',
        dark: '#f97902',
        contrastText: '#fff',
      },
      secondary: {
        light: '#1a3db3',
        main: '#165dd2',
        dark: '#116fe5',
        contrastText: '#000',
      },
    },
  })
}


let setThemeMode = (mode) => {
  let event = new Event('themeModeChange')
  window.localStorage.setItem('themeMode', mode)
  event.newValue = mode
  window.dispatchEvent(event)
}

let listenToThemeModeChange = (callback) => {
  window.addEventListener('themeModeChange', (e) => {
    callback(e.newValue)
  })
}


function IconText(props) {
  return (
    <Stack direction="row" alignItems="center" gap={1} {...props}></Stack>
  )
}


export {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Paper, Box, Grid, LockOutlinedIcon, Typography, Snackbar, Alert,
  AlertTitle, IconButton, Icons, Background, Card, CardActions, CardContent,
  CardMedia, Container, imgOops, imgBackground2, AppBar, Toolbar, Drawer,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List,
  Profile, Tab, Tabs, Drive, Breadcrumbs, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Backdrop, ButtonGroup, theme, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, FileUpload,
  imgBackground3, ListItemAvatar, Music, imgBackground1, Menu, MenuItem,
  BackgroundColor, Fab, CardActionArea, Icon, IconText, Stack, Slider,
  setThemeMode, listenToThemeModeChange
}