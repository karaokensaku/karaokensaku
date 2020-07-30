import React, { useState, useContext } from 'react';
import { Button, Modal, makeStyles, Fab } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { fireStore } from '../../config/firebase';
import { AuthContext } from '../../store/AuthService';
import { useForm } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const addMyPage = (myPages, data) => {
  return [
    ...myPages,
    data
  ];
};

const addSongs = (myPages, id, updates) => {
  return myPages.map(myPage => {
    if(myPage.id === id) {
      return {
        ...myPage,
        ...updates
      };
    } else {
      return myPage
    };
  });
};

export default ({ video }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const user = useContext(AuthContext);
  const [plus, setPlus] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    if(data.title.trim() !== '') {
      if(data.title.trim() !== '') {
        fireStore.collection('user').doc(`${user.uid}`).collection('myPages').add({title: data.title, songs:[]}).then((docRef) => {
          const newMyPages = addMyPage(myPages, {title: data.title, id: docRef.id, songs: []});
          setMyPages(newMyPages);
          setPlus(false);
        });
      }
    };
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPlusClick = () => {
    setPlus(!plus);
  };

  const handleOpen = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const onAddClick = (myPage) => {
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(myPage.id)
    .set(
      {title: myPage.title, 
        songs: [
          ...myPage.songs, 
          {
            videoId: selectedVideo.id.videoId,
            title: selectedVideo.snippet.title,
          }
        ]
      }
    ).then(() => {
      const newMyPages = addSongs(myPages, myPage.id, {title: myPage.title, songs: [
        ...myPage.songs, 
        {
          videoId: selectedVideo.id.videoId,
          title: selectedVideo.snippet.title,
        }
      ]});
      setMyPages(newMyPages);
      setOpen(false);
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {myPages.map(myPage => (
        <div key={myPage.id}>
          <p>{myPage.title}</p>
          <button onClick={() => onAddClick(myPage)}>追加</button>
        </div>
      ))}
      {plus && 
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="title" ref={register} />
          <button type="submit">追加</button>
        </form>
      }
      <Fab size="small" color="primary" aria-label="add" onClick={onPlusClick}>
        <AddIcon />
      </Fab>
    </div>
  )

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen(video)}>追加</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}