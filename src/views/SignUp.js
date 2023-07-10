import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'
import { submitSignup } from '../Api'
import { useNavigate, useHref } from "react-router-dom"

function Copyright(props) {
  return (
    <Mui.Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Mui.Link color="inherit" href="https://xiaokang00010.top/">
        XmediaCenter2
      </Mui.Link>
      {' '}
      {" by xiaokang00010"}
    </Mui.Typography>
  );
}

export default function SignUpSide() {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('username'), data.get('password'), data.get('slogan'));
    submitSignup(data.get('username'), data.get('password'), data.get('slogan')).then((data) => {
      if (data.data.ok) {
        setAlertDetail({ "type": "success", "message": "Registration completed. Redirecting you to SignIn page.", "title": "Success" })
        setAlertOpen(true)
        setTimeout(() => {
          navigate("/signin")
        }, 1000)
      } else {
        setAlertDetail({ "type": "error", "message": "Serverside response: " + data.data.data, "title": "Error" })
        setAlertOpen(true)
      }
    }).catch((err) => {
      setAlertDetail({ "type": "error", "message": "Clientside response: " + err.data, "title": "Error" })
      setAlertOpen(true)
    })
  };

  return (
    <ThemeProvider theme={Mui.theme}>
      <Mui.Grid container component="main" sx={{ height: '100vh' }}>
        <Mui.CssBaseline />
        <Mui.Grid
          item
          xs={false}
          sm={6}
          md={9}
          sx={{
            backgroundImage: `url(` + loginBackground + `)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Mui.Grid item xs={12} sm={6} md={3} component={Mui.Paper} elevation={6} square>
          <Mui.Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Mui.Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => { setAlertOpen(false) }}>
              <Mui.Alert severity={alertDetail.type} action={
                <Mui.IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlertOpen(false); }} >
                  <Mui.Icons.Close fontSize="inherit" />
                </Mui.IconButton>
              }>
                <Mui.AlertTitle>{alertDetail.title}</Mui.AlertTitle>
                {alertDetail.message}
              </Mui.Alert>
            </Mui.Snackbar>
            <Mui.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <Mui.LockOutlinedIcon />
            </Mui.Avatar>
            <Mui.Typography component="h1" variant="h5">
              Sign up
            </Mui.Typography>
            <Mui.Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Mui.TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <Mui.TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Mui.TextField
                margin="normal"
                required
                fullWidth
                name="slogan"
                label="Slogan"
                id="slogan"
                autoComplete=""
              />
              {/* no need to handle onClick here because this is a form */}
              <Mui.Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Mui.Button>
              <Mui.Grid container>
                <Mui.Grid item xs>
                  <Mui.Link href="http://www.xiaokang00010.top:4001/xiaokang00010/xms-2-frontend" variant="body2">
                    {"About"}
                  </Mui.Link>
                </Mui.Grid>
                <Mui.Grid item>
                  <Mui.Link href={useHref('/signin')} variant="body2">
                    {"Sign In"}
                  </Mui.Link>
                </Mui.Grid>
              </Mui.Grid>
              <Copyright sx={{ mt: 5 }} />
            </Mui.Box>
          </Mui.Box>
        </Mui.Grid>
      </Mui.Grid>
    </ThemeProvider>
  );
}