import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';


import {useAuth} from "../Lib/auth_provider";
import routes from "../Lib/routes";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Error = styled.div`
  background-color: red;
`;

export default function RegisterUser(props) {
  const classes = useStyles();
	const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
  const { data, register } = useAuth();

  function validateForm() {
    return email.length > 0 && password === password2 && password.length > 8 && password.length < 17 && username.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    register(username, email, password);
  }

  if (data.isLoggedIn) {
    return <Redirect to={routes.recipes} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
					<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="no"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="no"
            onChange={e => setPassword(e.target.value)}
          />
					<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Repeat password"
            type="password"
            id="password2"
            value={password2}
            autoComplete="no"
            onChange={e => setPassword2(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={routes.login} variant="body2">
                Back to login page
              </Link>
            </Grid>
           </Grid>
        </form>
         { data.errorMsg &&<Error> {data.errorMsg} </Error> }
      </div>
    </Container>
  );
}
