import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: "290px",
    padding: "16px 10px 24px",
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
  removeBtn: {
    backgroundColor: red[800],
    color: '#fff',
    margin: "10px",
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  container: {
    textAlign: "right",
  },
  choiceContainer: {
    textAlign: "center",
  },
  button: {
    backgroundColor: red[800],
    marginRight: "30px",
    color: '#fff',
    '&:hover': {
      backgroundColor: red[600],
    },
  },
}));

export default function SimpleModal( {onRemoveClick, song} ) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onYesClick = () => {
    if(song) {
      onRemoveClick(song);
    } else {
      onRemoveClick();
    };
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">本当に削除しますか？</h2>
      <div className={classes.choiceContainer}>
          <Button className={classes.button} onClick={onYesClick}>はい</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>いいえ</Button>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      {song === undefined ? 
        <Button variant="contained" className={classes.removeBtn} onClick={handleOpen}>削除</Button>
        :
        <Button variant="contained" className={classes.removeBtn} onClick={handleOpen}>-リスト削除</Button>
      }
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