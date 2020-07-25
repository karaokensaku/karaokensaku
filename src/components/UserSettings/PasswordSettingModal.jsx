import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AuthContext } from '../../store/AuthService';
import { useForm } from 'react-hook-form';
import firebase from '../../config/firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    backgroundColor: red[800],
    color: '#fff',
    '&:hover': {
      backgroundColor: red[600],
    },
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const user = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [errMessage, setErrMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = ({nowPassword, newPassword, confirmPassword}) => {
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, nowPassword);
    user.reauthenticateWithCredential(credentials).then(() => {
      if(newPassword === confirmPassword) {
        user.updatePassword(newPassword).then(function() {
          window.location.reload();
        }).catch(function(error) {
          console.log(error)
        });
      } else {
        setErrMessage('パスワードが違います。')
      };
    }).catch((err) => {
      setErrMessage('パスワードが違います。')
      console.log(err);
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {errMessage && <Typography component="p" variant="h7">{errMessage}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          type="password"
          margin="normal"
          required
          fullWidth
          id="nowPassword"
          name="nowPassword"
          autoComplete="nowPassword"
          inputRef={register} 
          label="現在のパスワード"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="password"
          required
          fullWidth
          id="newPassword"
          name="newPassword"
          autoComplete="newPassword"
          label="新しいパスワード"
          inputRef={register} 
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="password"
          required
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="confirmPassword"
          label="新しいパスワード（確認）"
          inputRef={register} 
        />
        <Button className={classes.button} type="submit">
          パスワードを変更する
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        パスワードを変更する
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
