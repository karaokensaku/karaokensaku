import React, { useState } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { Box, makeStyles, Typography, Accordion, AccordionSummary } from '@material-ui/core';
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
  container: {
    width: '100%',
    margin: (0, 'auto'),
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: "100vh",
  },
  main: {
    width: '79%',
    backgroundColor: '#F2F2F2'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const removeSong = (myPage, song) => {
  const num = song.id
  const selectedSongs = myPage.songs.filter(element => {
    return element.id !== num.toString();
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

const MyPage = (props) => {
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
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${selectedMyPage.id}`).update(newMyPage);
  };

  const onRemoveMyPageClick = () => {
    const newMyPages = removeMyPage(myPages, selectedMyPage.id);
    setMyPages(newMyPages);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${selectedMyPage.id}`).delete().then(() => {
      history.push('/main');
    });
  };

    return(
      <>
        <Header />
        {selectedMyPage && (
          <Box className={classes.container}>
            <LeftSideBar />
            <Box className={classes.main}>
              <Typography align='center' variant='h4' >{selectedMyPage.title}</Typography>
              <ConfirmModal onRemoveClick={onRemoveMyPageClick}/>
              {selectedMyPage.songs ? selectedMyPage.songs.map((song, index) => {
                return (
                  <Accordion key={song.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>{index + 1} {song.songTitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                    <ConfirmModal onRemoveClick={onRemoveSongClick} song={song}/>
                  </Accordion>
                );
              }) : 
                <p>まだ歌がありません。</p>
              }
              {}
            </Box>
          </Box>
        )}
        <Footer />
      </>
    );
}

export default MyPage