import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'

import { submitSignup } from '../Api'
import { useNavigate, useHref } from "react-router-dom"

const defaultTheme = createTheme();

export default function NotMatch() {
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Mui.Background />
      <Mui.Card sx={{ maxWidth: 500, top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }}>
        <Mui.CardMedia
          sx={{ height: 140 }}
          image={Mui.imgOops}
          title="Oops"
        />
        <Mui.CardContent>
          <Mui.Typography gutterBottom variant="h5" component="div">
            {"Oops, something went wrong :("}
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {"The page you're looking for is lost, maybe you made something wrong? XD"}
          </Mui.Typography>
        </Mui.CardContent>
        <Mui.CardActions>
          <Mui.Button size="small" onClick={() => {navigate(-1)}}>Go Back</Mui.Button>
          <Mui.Button size="small" onClick={() => {navigate("/")}}>Homepage</Mui.Button>
        </Mui.CardActions>
      </Mui.Card>
    </ThemeProvider>
  )
}