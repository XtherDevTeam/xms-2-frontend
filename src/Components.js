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

import * as Icons from '@mui/icons-material'
import imgBackground1 from './assets/loginBackground.jpg'
import imgOops from './assets/oops.jpg'
import imgBackground2 from './assets/background-2.png'
import imgBackground3 from './assets/background-3.jpg'
import { styled } from "@mui/system"

const Background = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${imgBackground3})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2000,
});

export {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Paper, Box, Grid, LockOutlinedIcon, Typography, Snackbar, Alert,
  AlertTitle, IconButton, Icons, Background, Card, CardActions, CardContent,
  CardMedia, Container, imgOops, imgBackground2, AppBar, Toolbar, Drawer,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List
}