import React,{ useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { Link } from 'react-router-dom';
import { Box, IconButton} from '@material-ui/core';
import { AuthContext } from '../store/AuthService';
import { fireStore } from '../config/firebase';
import AddIcon from '@material-ui/icons/Add';

const leftSideBarCSS = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom:0,
    right: "82%",
    backgroundColor: "white",
    color: "black",
}//左サイドバーのスタイル

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
  const [plus, setPlus] = useState(false);
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(title.trim() !== '') {
      fireStore.collection('user').doc(`${user.uid}`).collection('myPages').add({title}).then((docRef) => {
        const newMyPages = addMyPage(myPages, {title, id: docRef.id});
        setMyPages(newMyPages)
        setTitle('');
      });
    };
  };

  const onPlusClick = () => {
    setPlus(!plus);
  };

  return (
    <Box className={classes.root} style={leftSideBarCSS}>
      <Link to='/main'>Home</Link><br/>
      <Link to='/hotpage'>HOT</Link><br />
      <Link to='/userSettingPage'>UserSettingPage</Link>
      {/* <Link to='/'>Home</Link> */}
      
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
                    <input name="title" value={title} onChange={onTitleChange}/>
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
