import React from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { myPageState } from '../atoms/myPage';

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
  }

}));

const MyPage = (props) => {
  const classes = useStyles();
  const myPages = useRecoilValue(myPageState);
  const myPage = myPages.find(element => element.id === props.match.params.id);
  console.log(myPage);
  return(
    <>
      <Header />
      <Box className={classes.container}>
        <LeftSideBar />
        <Box className={classes.main}>
          <Typography align='center' variant='h4' >{myPage.title}</Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default MyPage