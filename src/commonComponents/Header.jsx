import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/AuthService';
import firebase, { fireStore } from '../config/firebase';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal'                          //ログイン用モーダル
import { useRecoilState } from 'recoil';
import { myPageState } from '../atoms/myPage';
const Header = () => {

    /////////////////CSS//////////////////
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
        height: "113.5px"
    }

    const loginButton = {
        position: "absolute",
        right: "15px",
        bottom: "10px",
        height: "30px",
        width: "85px",
        backgroundColor: "#C50D1A",
        border: "none",
        borderRadius: "5px",
        color: "white",
    }
    const signUpButton = {
        position: "absolute",
        fontSize: "11px",
        right: "15px",
        top: "20px",
        height: "30px",
        width: "85px",
        backgroundColor: "#C50D1A",
        border: "none",
        borderRadius: "5px",
        color: "white",
    }
    //////////////////CSS/////////////////

    /////js///////js////////////js////////
    const user = useContext(AuthContext);                    //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    //グローバルで管理できるのかな？↓
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
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
        debugger
        firebase.auth().onAuthStateChanged((user) => {
            firebase.auth().signOut().then(() => {
                console.log("ログアウトしました");
            })
                .catch((error) => {
                    console.log(`ログアウト時にエラーが発生しました (${error})`);
                });
        });
    }
    ///js//////js/////////js/////////js///////
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

    //モーダルを開いたり閉じたりする関数達
    const renderHeader = (user) => {
        if (user) {
            return (
                <header style={headerCSS}>
                    <div style={leftdiv}>
                        <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
                    </div>

                    <div style={rightdiv}>
                        <button onClick={LogOut} style={loginButton}>ログアウト</button>
                    </div>
                </header>
            )
        } else {
            return (
                <header style={headerCSS}>
                    <div style={leftdiv}>
                        <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
                    </div>
                    <div style={rightdiv}>
                        <button style={loginButton} onClick={openLoginModal}>ログイン</button>
                        <button style={signUpButton} onClick={openSignUpModal}>サインアップ</button>
                    </div>

                    {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
                    <LoginModal LoginModalIsOpen={LoginModalIsOpen} closeLoginModal={closeLoginModal} />
                    <SignUpModal SignUpModalIsOpen={SignUpModalIsOpen} closeSignUpModal={closeSignUpModal} />
                </header>
            );
        }
    }
    /////js///////js////////////js////////
    return (
        <>
            {renderHeader(user)}
        </>
    );

}
export default Header;