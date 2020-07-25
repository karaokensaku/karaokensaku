import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useForm } from 'react-hook-form';
import firebase from '../../../config/firebase';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: red[800],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: red[800],
    color: "#fff",
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  modal: {
    backgroundColor: '#fff',
    paddingBottom: '40px',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [signUpErr, setSignUpErr] = useState('');
  const { register, handleSubmit } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignUpErr('');
  };

  const onSubmit = ({name, email, password}) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.updateProfile({ displayName: name });
    }).then(() => {
      setOpen(false);
      console.log('sign up!');
    }).catch((error) => {
      console.log(error);
      if(error.message === 'The email address is already in use by another account.') {
        setSignUpErr('このメールアドレスは既に登録されています。')
      } else {
        setSignUpErr('必要な情報を入力して下さい。');
      };
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>登録</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container component="main" maxWidth="xs" className={classes.modal}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登録
            </Typography>
            {signUpErr && <Typography component="p" variant="h7">{signUpErr}</Typography>}
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="名前"
                    name="name"
                    autoComplete="lname"
                    inputRef={register} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    inputRef={register} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register} 
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                登録する
              </Button>
            </form>
          </div>
        </Container>
      </Modal>
    </>
  );
}