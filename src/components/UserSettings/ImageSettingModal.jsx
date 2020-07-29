import React, { useState, useContext } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Button, makeStyles, Modal } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import firebase from '../../config/firebase';
import { AuthContext } from '../../store/AuthService';

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

export default () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [modalStyle] = useState(getModalStyle);
  const [edirRef, setEditRef] = useState('');
  const [metadata] = useState({ contentType: 'image/jpeg' });
  const user = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrop = dropped => {
    setImage(dropped[0]);
  };

  const onClick = () => {
    if(edirRef) {
      edirRef.getImageScaledToCanvas().toBlob(blob => {
        firebase.storage().ref().child(`user/${user.uid}`).put(blob, metadata).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            user.updateProfile({
              photoURL: downloadURL
            }).then(() => {
              window.location.reload();
            }).catch((err) => {
              console.log(err);
            });
          });
        });
      });
    };
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
            <Dropzone
        onDrop={handleDrop}
        noClick
        style={{ width: '250px', height: '250px' }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            {image && 
              <AvatarEditor 
                ref={setEditRef}
                width={250} 
                height={250} 
                borderRadius={200}
                scale={1.2}
                image={image} 
              />
            }
            <input 
              {...getInputProps()}  
              style={{display: "block"}} 
            />
          </div>
        )}
      </Dropzone>
      <Button className={classes.button} onClick={onClick}>アップロード</Button>
    </div>
  )


  return (
    <>
      <Button className={classes.button} onClick={handleOpen}>画像を変更する</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  )
}