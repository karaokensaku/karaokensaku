import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/AuthService';
import firebase, { fireStore } from '../config/firebase';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal'                          //ログイン用モーダル
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const Header = () => {
    const headerTitle = {
        color: "white",
        fontSize: "40px",
        left: "10px",
        marginLeft: "100px",
    }

    const headerCSS = {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
    }

    const titlelinkCSS = {
        width: "225px",
        margin: "auto",
        textDecoration: 'inherit',
    }

    const leftdiv = {
        backgroundColor: "#C50D1A",
        position: "relative",
        width: "70%"
    }

    const rightdiv = {
        backgroundColor: "white",
        width: "30%",
        position: "relative",
        height: "113.5px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around"
    }
    const user = useContext(AuthContext);                   

    //グローバルで管理できるのかな？↓
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
    const useStyles = makeStyles((theme) => ({ //マテリアル　UIスタイル
        button: {
            backgroundColor: "#C50D1A",
            color: "white",
            height: "40px"
        },
    }));

    const classes = useStyles();

    return (
        <>
          {user ? 
            <header style={headerCSS}>
              <div style={leftdiv}>
                  <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
              </div>
              <div style={rightdiv}>
              <Link to="/UserSettingPage" >
                      <div style={{ borderRadius: "200px", backgroundColor: "#F2F2F2", height: "70px", width: "70px", overflow: "hidden" }}>{/* インラインcss */}
                          <img src={user.photoURL} height="100%" width="100%" alt="userImg" />
                      </div>
              </Link>
                  <Button className={classes.button} variant="contained" onClick={LogOut}>ログアウト</Button>
                  </div>
            </header> : 
            <header style={headerCSS}>
            <div style={leftdiv}>
                <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
            </div>
            <div style={rightdiv}>
                <SignUpModal />
                <LoginModal />
            </div>
            </header>
          }
        </>
    );

}
export default Header;