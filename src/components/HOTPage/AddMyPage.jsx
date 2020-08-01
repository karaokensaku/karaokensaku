import React, { useState, useContext } from 'react';
import { Button, Modal, makeStyles, Fab, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { fireStore } from '../../config/firebase';
import { AuthContext } from '../../store/AuthService';
import { useForm } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, 
  addBtn: {
    backgroundColor: red[800],
    color: '#fff',
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5px 0",
  },
  addContainer: {
    display: "flex",
    alignItems: "center"
  },
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
        <div key={myPage.id} className={classes.addContainer}>
          <p  style={{marginRight: "7px"}}>{myPage.title}</p>
          <Button className={classes.addBtn} onClick={() => onAddClick(myPage)}>追加</Button>
        </div>
      ))}
      {plus && 
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="title" ref={register} />
          <button type="submit">追加</button>
        </form>
      }
      <Fab size="small" className={classes.addBtn}  aria-label="add" onClick={onPlusClick}>
        <AddIcon />
      </Fab>
    </div>
  )

  return (
    <div>
      <div className={classes.container}>
        <Typography>{video.snippet.title}</Typography>
        <Button variant="contained" className={classes.addBtn} onClick={() => handleOpen(video)}>追加</Button>
      </div>
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