import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { Link } from 'react-router-dom';
import { IconButton, Hidden } from '@material-ui/core';
import firebase from '../../config/firebase';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import { AuthContext } from '../../store/AuthService';
import { StyledComponent } from "./Header.styled"
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  btn: {
    backgroundColor: red[800],
    color: '#fff',
    '&:hover': {
      backgroundColor: red[600],
    },
  }
});

export default function Header() {
  const classes = useStyles();
  const [left, setLeft] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setLeft({ ...left, [anchor]: open });
  };

  const onPlusClick = () => {
    setPlus(!plus);
  };

  const [plus, setPlus] = useState(false);
  // const myPages = useRecoilValue(myPageState)
  const [myPages] = useRecoilState(myPageState);
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}　消しとけばマイリストクリックしても消えない
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ul>
          <h2>メニュー</h2>
          <li><Link to='/' onClick={toggleDrawer(anchor, false)}>検索ページ</Link></li>
          <li><Link to='/hotpage' onClick={toggleDrawer(anchor, false)}>人気ランキング</Link><br /></li>
          <li><Link to='/userSettingPage' onClick={toggleDrawer(anchor, false)}>ユーザー設定</Link></li>
          <li style={{listStyle: "none"}}>
            {!user ? 
              <>
                <LoginModal />
                <SignUpModal />
              </>
              :
              <Button  variant="contained" onClick={LogOut} className={classes.btn}>ログアウト</Button>
            }
          </li>
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
                <Link to={`/mypages/${myPage.id}`} key={myPage.id} onClick={toggleDrawer(anchor, false)}>
                  <TreeItem nodeId={number.valueOf()} label={myPage.title} />
                </Link>
              )
            })}
            <TreeItem
              nodeId={myPages.length + 2}
              label={
                <div>
                  {plus &&
                    <form >
                      <input name="title" />
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
      </List>
    </div>
  );
  const user = useContext(AuthContext);

  const LogOut = (user) => {                          //ログアウト処理
    firebase.auth().signOut().then(() => {
      console.log("ログアウトしました");
    })
    .catch((error) => {
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
  }

  return (
    <>
      <Hidden smUp>
        <StyledComponent className="header">
          {['left',].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer anchor={anchor} open={left[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </StyledComponent>
      </Hidden>
    </>
  );
}
