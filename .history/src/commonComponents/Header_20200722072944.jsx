import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthService';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal'                          //ログイン用モーダル

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
        height: "113.5px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent:"space-around"
    }
    //////////////////CSS/////////////////

    /////js///////js////////////js////////
    const user = useContext(AuthContext);                    //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    

    //グローバルで管理できるのかな？↓
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

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
    const RenderHeader = (user) => {

        const useStyles = makeStyles((theme) => ({ //マテリアル　UIスタイル
            button: {
                backgroundColor:"#C50D1A",
                color:"white",
                height: "40px"
            },
        }));

        const classes = useStyles();



        if (user) {
            return (
                <header style={headerCSS}>
                    <div style={leftdiv}>
                        <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
                    </div>

                    <div style={rightdiv}>
                        <i className="fas fa-user-circle" style={{fontSize:"80px"}}></i>
                        <Button className={classes.button} variant="contained" onClick={LogOut}>ログアウト</Button>
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
                        <Button className={classes.button} variant="contained" onClick={openSignUpModal}>サインアップ</Button>
                        <Button className={classes.button} variant="contained" onClick={openLoginModal}>ログイン</Button>
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
            {RenderHeader(user)}
        </>
    );

}
export default Header;