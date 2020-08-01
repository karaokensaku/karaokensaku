import React, { useContext, useState } from 'react';
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
      });
    };
    setPlus(false);
  };

  const onPlusClick = () => {
    setPlus(!plus);
  };

  return (
    <StyledComponent className="left">
    <Hidden xsDown>
      <ul>
        <h2>メニュー</h2>
        <li><Link to='/'>検索ページ</Link></li>
        <li><Link to='/hotpage'>人気ランキング</Link><br /></li>
        {user && <li><Link to='/userSettingPage'>ユーザー設定</Link></li>}
      </ul>
      {/* <Link to='/'>Home</Link> */}
      {user &&
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
                      <input name="title" value={title} onChange={onTitleChange} style={{width: "100%"}} />
                      <button type="submit">追加</button>
                    </form>
                  }
                  <IconButton size="small" aria-label="add" onClick={onPlusClick}>
                    <AddIcon />
                  </IconButton>
                </div>
              }
            />
          </TreeItem>
        </TreeView>
      } 
      </Hidden>
    </StyledComponent>
  );
};
