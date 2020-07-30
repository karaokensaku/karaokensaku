import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal } from '@material-ui/core';
import { StyledComponent } from './LoginModal.styled';
import { red } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#C50D1A',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: red[800],
    color: "#fff",
    '&:hover': {
      backgroundColor: red[600],
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [logInErr, setLogInErr] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLogInErr('');
  };

  const onSubmit = ({email, password}) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { 
      console.log('log in!');
      setOpen(false);
    })
    .catch(err => {
      console.log(err)
      setLogInErr('メールアドレスかパスワードが間違っています。')
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>ログイン</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          contentLabel
        >
          <StyledComponent>
            <Container component="main" maxWidth="xs" className="LogIn_Moadl">
              <CssBaseline />
              <div className="paper">
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  ログイン
                </Typography>
                {logInErr && <Typography component="p" variant="h7">{logInErr}</Typography>}
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    inputRef={register} 
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register} 
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    ログイン
                  </Button>
                </form>
              </div>
            </Container>
          </StyledComponent>
      </Modal>
    </>
  );
};