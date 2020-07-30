import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { Link } from 'react-router-dom';
import firebase, { fireStore } from '../../config/firebase';
import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import { AuthContext } from '../../store/AuthService';
import { StyledComponent } from "./Header.styled"
import DrawerPage from "./DrawerPage";
import { Hidden, Avatar } from '@material-ui/core';

export default function Header() {
  // const myPages = useRecoilValue(myPageState)
  const [myPages, setMyPages] = useRecoilState(myPageState);
  const user = useContext(AuthContext);
  const LogOut = (user) => {                          //ログアウト処理
    firebase.auth().onAuthStateChanged((user) => {
      firebase.auth().signOut().then(() => {
        console.log("ログアウトしました");
      })
        .catch((error) => {
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    });
  }

  useEffect(() => {
    let getMypages = [];
    {user &&
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

  return (
    <>
        <StyledComponent className="header">
        <div className="title">
          <Link to="/"><h1>カラオ検索</h1></Link>
        </div>
        <div className="headerMenu">
          {user && 
            <Hidden xsDown>
              <Link to="/UserSettingPage" >
                {user.photoURL ? 
                    <Avatar className="avatarImg" src={user.photoURL} />
                    : 
                    <Avatar className="avatarImg">{user.displayName.slice(0,2)}</Avatar>
                  }
              </Link>
            </Hidden>
          }
          <Hidden xsDown>
            {!user ? 
                <>
                  <LoginModal />
                  <SignUpModal />
                </>
              :
              <Button  variant="contained" onClick={LogOut}>ログアウト</Button>
            }
          </Hidden>
        </div>
      </StyledComponent> 
      <DrawerPage />
    </>
  );
}
