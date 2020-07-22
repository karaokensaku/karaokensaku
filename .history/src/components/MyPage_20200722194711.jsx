import React, { useState } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { Box, makeStyles, Typography, Accordion, AccordionSummary } from '@material-ui/core';
import { myPageState } from '../atoms/myPage';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Redirect, useHistory } from 'react-router-dom';
import { fireStore } from '../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthService';
import { useRecoilState } from 'recoil'; 
import ConfirmModal from '../commonComponents/ConfirmModal'

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

const MyPage = (props) => {

const removeMyPage = (myPages, id) => {
  console.log(id);
  return myPages.filter(myPage => {
    console.log(id);
    return myPage.id !== id
  });
};

const MyPage = (props) => {
  const classes = useStyles();
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const [myPage, setMyPage] = useState(myPages.find(element => element.id === props.match.params.id)) ;
  const user = useContext(AuthContext);
  const history = useHistory();
  
  const onRemoveSongClick = (song) => {
    const newMyPage = removeSong(myPage, song);
    setMyPage(newMyPage);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${myPage.id}`).update(newMyPage);
  };

  const onRemoveMyPageClick = () => {
    const newMyPages = removeMyPage(myPages, myPage.id);
    setMyPages(newMyPages);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${myPage.id}`).delete().then(() => {
      history.push('/main');
    });
  };

  if(myPage !== undefined) {
    return(
      <>
        <Header />
        <Box className={classes.container}>
          <LeftSideBar />
          <Box className={classes.main}>
            <Typography align='center' variant='h4' >{myPage.title}</Typography>
            <ConfirmModal onRemoveClick={onRemoveMyPageClick}/>
            {myPage.songs ? myPage.songs.map((song, index) => {
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
        <Footer />
      </>
    );
  } else {
    return <Redirect to="/main" />
  }
}

export default MyPage