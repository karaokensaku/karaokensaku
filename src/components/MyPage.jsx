import React from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { Box, makeStyles, Typography, Accordion, AccordionSummary, Button } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { myPageState } from '../atoms/myPage';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
          {myPage.songs.map((song, index) => {
            return (
              <Accordion>
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
                <Button variant="contained" color="secondary">
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
}

export default MyPage