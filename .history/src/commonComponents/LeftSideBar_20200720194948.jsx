import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { Link } from 'react-router-dom';
import { Box, IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import { AuthContext } from '../store/AuthService';
import firebase, { fireStore } from ''';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    width: '21%',
  },
});

const addMyPage = (myPages, data) => {
  return [
    ...myPages,
    data
  ];
};

export default function FileSystemNavigator() {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [myPages, setMyPages] = useRecoilState(myPageState);
  console.log(myPages);
  const [plus, setPlus] = useState(false);
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      fireStore.collection('user').doc(`${user.uid}`).collection('myPages').add({ title }).then((docRef) => {
        const newMyPages = addMyPage(myPages, { title, id: docRef.id });
        setMyPages(newMyPages)
        setTitle('');
      });
    };
  };

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

  const onPlusClick = () => {
    setPlus(!plus);
  };

  return (
    <Box className={classes.root}>
      <Link to='/'>Home</Link>
      <Link to='/hotpage'>HOT</Link>
      <Link to='/'>Home</Link>
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
                <Link to={`/mypages/${myPage.id}`} key={myPage.id}>
                  <TreeItem nodeId={number.valueOf()} label={myPage.title} />
                </Link>
              </>
            )
          })}
          <TreeItem
            nodeId={myPages.length + 2}
            label={
              <div>
                {plus &&
                  <form onSubmit={onSubmit}>
                    <input name="title" value={title} onChange={onTitleChange} />
                    <button type="submit">追加</button>
                  </form>
                }
                <IconButton aria-label="settings" component="span" onClick={onPlusClick} >
                  <AddIcon />
                </IconButton>
              </div>
            }
          />
        </TreeItem>
      </TreeView>
    </Box>
  );
};