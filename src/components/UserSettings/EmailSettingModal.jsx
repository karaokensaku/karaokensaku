import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AuthContext } from '../../store/AuthService';
import { useForm } from 'react-hook-form';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: "290px",
    padding: "16px 10px 24px"
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
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [errMess, setErrMess]  = useState('')
  const user = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = ({email}) => {
    user.updateEmail(email).then(() => {
      window.location.reload();
    }).catch((err) => {
      console.log(err.message);
      if(err.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
        setErrMess('再ログインしてからメールアドレスを変更してください。')
      }
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {errMess && <p>{errMess}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={user.email}
          inputRef={register} 
        />
        <Button className={classes.button} type="submit">
          メールアドレスを変更する
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        メールアドレスを変更する
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
