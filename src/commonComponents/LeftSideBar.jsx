import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { AuthContext } from '../store/AuthService';
import firebase, { fireStore } from '../config/firebase';

const useStyles = makeStyles({
  root: {
    width: '20%',
  },
});

export default function FileSystemNavigator() {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [myPages, setMyPages] = useRecoilState(myPageState);

  useEffect(() => {
    let getMypages = [];
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      fireStore.collection('user').doc(`${uid}`).collection('myPages').get().then((snapshot) => {
        snapshot.forEach(myPage => {
          getMypages.push({
            id: myPage.id,
            ...myPage.data()
          });
        });
      }).then(() => {
        setMyPages(getMypages);
      });
    });
  }, [user]);

  return (
    <Box className={classes.root}>
      <Link to='/'>Home</Link>
      <TreeView
        
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="My リスト">
          {myPages.map((myPage, index) => {
            const number = index + 2
            return (
              <>
                <Link to={`/mypages/${myPage.id}`}>
                  <TreeItem nodeId={number.valueOf()} label={myPage.title}/>
                </Link>
              </>
            )
          })}
        </TreeItem>
      </TreeView>
    </Box>
  );
};
