import React, { useState } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { Box, makeStyles, Typography, Accordion, AccordionSummary, Button } from '@material-ui/core';
import { myPageState } from '../atoms/myPage';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fireStore } from '../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthService';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: (0, 'auto'),
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: "100vh",
  },
  main: {
    width: '80%',
    backgroundColor: '#F2F2F2'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const removeSongtitle = (myPage, song) => {
  const num = song.id
  console.log(num);
  const selectedSongs = myPage.songs.filter(element => {
    return element.id !== num.toString();
  });
  return {
    ...myPage,
    songs: selectedSongs
  }
};

const MyPage = (props) => {
  const classes = useStyles();
  const [myPages, setMypages] = useRecoilState(myPageState);
  const [myPage, setMyPage] = useState(myPages.find(element => element.id === props.match.params.id)) ;
  const user = useContext(AuthContext);

  const onRemoveClick = (myPage, song) => {
    const newMyPage = removeSongtitle(myPage, song);
    setMyPage(newMyPage);
    fireStore.collection('user').doc(`${user.uid}`).collection('myPages').doc(`${myPage.id}`).update(newMyPage);
  };

  if(myPage !== undefined) {
    return(
      <>
        <Header />
        <Box className={classes.container}>
          <LeftSideBar />
          <Box className={classes.main}>
            <Typography align='center' variant='h4' >{myPage.title}</Typography>
            {myPage.songs.map((song, index) => {
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
                  <Button variant="contained" color="secondary" onClick={() => onRemoveClick(myPage, song)} >
                    -リスト削除
                  </Button>
                </Accordion>
              )
            })}
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