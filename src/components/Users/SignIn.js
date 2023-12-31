import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  CssBaseline, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLoginMutation } from '../Slices/usersApiSlice';
import { setCredentials } from '../Slices/authSlice';
import {toast} from 'react-toastify';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, ] = useLoginMutation();
  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  }, [navigate,userInfo])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try{
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
    }catch(error){
      toast.error("error")

    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In Family
            </Button>
            <Typography>
              <Link component={RouterLink} to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;