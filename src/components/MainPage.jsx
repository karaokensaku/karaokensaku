import React, { useContext } from 'react';
import { useState } from "react";
import _ from "lodash";
import { Button, makeStyles, Modal, Fab } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { useForm } from "react-hook-form";
import AddIcon from '@material-ui/icons/Add';
import { fireStore } from '../config/firebase';
import { AuthContext } from '../store/AuthService';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    textAlign: 'center',
    border: "3px solid #C50D1A",
    borderRadius: "10px",
  },
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

const Youtube = ({ onSearchYoutube, videos }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const [plus, setPlus] = useState(false);
  const { register, handleSubmit } = useForm();
  const user = useContext(AuthContext);
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

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleClickInput = () => {
    _debounce(keyword);
  };

  const _debounce = _.debounce((value) => {
    onSearchYoutube(value + "カラオケ");
  }, 200);

  const handleOpen = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPlusClick = () => {
    setPlus(!plus);
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

  const video = videos.map((video) => {
    const url = "https://www.youtube.com/embed/" + video.id.videoId;
    return (
      <div key={video.id.videoId} style={{ margin: "20px", textAlign: "center" }}>
          <iframe
            id="ytplayer"
            type="ytplayer"
            width="480"
            height="270"
            src={url}
            frameborder="0"
          />
          <Button variant="contained" color="primary" onClick={() => handleOpen(video)}>追加</Button>
      </div>
    );
  });

  return (
    <>
      <div className={classes.main}>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          onChange={handleChangeInput}
          value={keyword}
        />
        <button onClick={handleClickInput}>検索</button>
        <h1>{keyword}</h1>
        <p>の検索結果</p>
        {video}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </>
  );
}

export default Youtube;
