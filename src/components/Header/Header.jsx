import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../store/AuthService';
import firebase, { fireStore } from '../../config/firebase';
import { Link } from 'react-router-dom';
import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal'                          //ログイン用モーダル
import { StyledComponent } from "./Header.styled"
import { useRecoilState } from 'recoil';
import { myPageState } from '../../atoms/myPage';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

const Header = () => {

  const user = useContext(AuthContext);                    

  const [myPages, setMyPages] = useRecoilState(myPageState);

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
  const LogOut = () => {                          //ログアウト処理
    firebase.auth().onAuthStateChanged(() => {
      firebase.auth().signOut().then(() => {
        console.log("ログアウトしました");
      }).catch((err) => {
        console.log(err);
      });
    });
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
    </>
  )
}
export default Header;