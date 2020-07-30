import React, { useState } from 'react';
import { makeStyles, Typography, Accordion, AccordionSummary } from '@material-ui/core';
import { myPageState } from '../atoms/myPage';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory, useParams } from 'react-router-dom';
import { fireStore } from '../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthService';
import { useRecoilState } from 'recoil'; 
import ConfirmModal from '../commonComponents/ConfirmModal'
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#F2F2F2',
    textAlign: 'center',
    width: "95%",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  youtube: {
    position: "relative",
    width: "100%",
    margin: "auto",
    paddingTop: "50.25%",
  },
  iframe: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "100% !important",
    height: "100% !important",
  }
}));

const removeSong = (myPage, song) => {
  const num = song.videoId
  const selectedSongs = myPage.songs.filter(element => {
    return element.videoId !== num;
  });
  return {
    ...myPage,
    songs: selectedSongs
  }
};

const removeMyPage = (myPages, id) => {
  return myPages.filter(myPage => {
    return myPage.id !== id
  });
};

const MyPage = () => {
  const {id: getId} = useParams();
  const classes = useStyles();
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const [selectedMyPage, setSelectedMyPage] = useState(myPages.find(element => element.id === getId)) ;
  const user = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setSelectedMyPage(myPages.find(element => element.id === getId))
  }, [myPages, getId]) //切り替わるタイミングはuseEffectで管理する
  
  const onRemoveSongClick = (song) => {
    const newMyPage = removeSong(selectedMyPage, song);
    setSelectedMyPage(newMyPage);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${selectedMyPage.id}`).update({title: newMyPage.title, songs: newMyPage.songs});
  };

  const onRemoveMyPageClick = () => {
    const newMyPages = removeMyPage(myPages, selectedMyPage.id);
    setMyPages(newMyPages);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${selectedMyPage.id}`).delete().then(() => {
      history.push('/');
    });
  };

    return(
      <>
        {selectedMyPage && (
          <div className={classes.main}> 
            <Typography align='center' variant='h4' >{selectedMyPage.title}</Typography>
            <ConfirmModal onRemoveClick={onRemoveMyPageClick}/>
            {selectedMyPage.songs ? selectedMyPage.songs.map((song, index) => {
              const url = "https://www.youtube.com/embed/" + song.videoId;
              return (
                <Accordion key={song.videoId}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>{index + 1} {song.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div  className={classes.youtube}>
                      <iframe
                        id="ytplayer"
                        type="ytplayer"
                        width="640"
                        height="360"
                        src={url}
                        frameborder="0"
                        title={song.title}
                        className={classes.iframe}
                      />
                    </div>
                  </AccordionDetails>
                  <ConfirmModal onRemoveClick={onRemoveSongClick} song={song}/>
                </Accordion>
              );
            }) : 
              <p>まだ歌がありません。</p>
            }
            {}
          </div>
        )}
      </>
    );
}

export default MyPage