import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { Link } from 'react-router-dom';
import { IconButton, Hidden } from '@material-ui/core';
import { AuthContext } from '../../store/AuthService';
import { fireStore } from '../../config/firebase';
import AddIcon from '@material-ui/icons/Add';
import { StyledComponent } from './LeftSideBar.styled'

const addMyPage = (myPages, data) => {
  return [
    ...myPages,
    data
  ];
};

export default function FileSystemNavigator() {
  const user = useContext(AuthContext);
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const [plus, setPlus] = useState(false);
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      fireStore.collection('user').doc(`${user.uid}`).collection('myPages').add({ title, songs: [] }).then((docRef) => {
        const newMyPages = addMyPage(myPages, { title, id: docRef.id, songs: [] });
        setMyPages(newMyPages)
        setTitle('');
      });
    };
  };

  const onPlusClick = () => {
    setPlus(!plus);
  };

  return (
    <StyledComponent className="left">
      <Hidden smDown>
        <ul>
          <h2>MENU</h2>
          <li><Link to='/main'>Home</Link></li>
          <li><Link to='/hotpage'>HOT</Link><br /></li>
          <li><Link to='/userSettingPage'>UserSettingPage</Link></li>
        </ul>
 

        <TreeView
          className="myList"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="My リスト">
            {myPages.map((myPage, index) => {
              const number = index + 2
              return (
                <Link to={`/mypages/${myPage.id}`} key={myPage.id}>
                  <TreeItem nodeId={number.valueOf()} label={myPage.title} />
                </Link>
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
      </Hidden>
    </StyledComponent>
  );
};
