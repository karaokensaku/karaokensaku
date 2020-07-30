import React, { useContext, useState, useEffect } from 'react';

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
import { IconButton, Hidden, Avatar } from '@material-ui/core';

import firebase, { fireStore } from '../../config/firebase';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import { AuthContext } from '../../store/AuthService';
import { StyledComponent } from "./Header.styled"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Header() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [plus, setPlus] = useState(false);
  // const myPages = useRecoilValue(myPageState)
  const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}　消しとけばマイリストクリックしても消えない
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
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
                    <form >
                      <input name="title" />
                      <button type="submit">追加</button>
                    </form>
                  }
                  <IconButton aria-label="settings" component="span" >
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

  //モーダルを開いたり閉じたりする関数達
  const openLoginModal = () => {
    setLoginModalIsOpen(true)
  }

  const closeLoginModal = () => {
    setLoginModalIsOpen(false)
  }

  const openSignUpModal = () => {
    setSignUpModalIsOpen(true)
  }

  const closeSignUpModal = () => {
    setSignUpModalIsOpen(false)
  }

  const LogOut = (user) => {                          //ログアウト処理
    firebase.auth().onAuthStateChanged((user) => {
      firebase.auth().signOut().then(() => {
        console.log("ログアウトしました");
        setLoginModalIsOpen(false);
      })
        .catch((error) => {
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    });
  }
  const user = useContext(AuthContext);

  useEffect(() => {
    let getMypages = [];
    {
      user &&
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
    }
  }, [user]);

  const RenderHeader = (user) => {

    if (user) {
      // ログイン時
      return (
        <StyledComponent className="header">
          <div className="title">
            <Link to="/"><h1>カラオ検索</h1></Link>
          </div>
          <div className="headerMenu">
            <Link to="/UserSettingPage" >
              <img src={user.photoURL} height="100%" width="100%" alt="userImg" />
              <h3>User Setting</h3>
            </Link>
            <Button variant="contained" onClick={LogOut}>ログアウト</Button>
          </div>
        </StyledComponent>
      )
    } else {
      // 非ログイン時
      return (
        <StyledComponent className="header">
          <div className="title">
            <Link to="/"><h1>カラオ検索</h1></Link>
          </div>
          <div className="headerMenu">
            <Button variant="contained" onClick={openSignUpModal}>サインアップ</Button>
            <Button variant="contained" onClick={openLoginModal}>ログイン</Button>
          </div>

          {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
          <LoginModal
            LoginModalIsOpen={LoginModalIsOpen}
            closeLoginModal={closeLoginModal}
          />
          <SignUpModal
            SignUpModalIsOpen={SignUpModalIsOpen}
            closeSignUpModal={closeSignUpModal}
          />
        </StyledComponent>
      );
    }
  }

  return (
    <>
        <StyledComponent className="header">
        <div className="title">
          <Link to="/"><h1>カラオ検索</h1></Link>
        </div>
        <div className="headerMenu">
          {user && 
            <Link to="/UserSettingPage" >
              {user.photoURL ? 
                  <Avatar className="avatarImg" src={user.photoURL} />
                  : 
                  <Avatar className="avatarImg">{user.displayName.slice(0,2)}</Avatar>
                }
            </Link>
          }
          {!user ? 
              <>
                <LoginModal />
                <SignUpModal />
              </>
            :
            <Button  variant="contained" onClick={LogOut}>ログアウト</Button>
          }
        </div>
      </StyledComponent> 
      <Hidden smUp>
        <StyledComponent className="header">
          {['left',].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </StyledComponent>
      </Hidden>
    </>
  );
}
