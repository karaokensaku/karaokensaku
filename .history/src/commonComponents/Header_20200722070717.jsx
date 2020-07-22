import React, { useContext,useState } from 'react';
import {AuthContext} from '../store/AuthService';

import {Link} from 'react-router-dom';


import LoginModal from './LoginModal'                          //ログイン用モーダル
import SignUpModal from './SignUpModal'                        //サインアウト用モーダル
const Header = () => {

/////////////////CSS//////////////////
    const headerTitle = {
        color: "blue",
        fontSize: "40px",
        margin: "0 0 0 10px",
        backgroundColor:"white",
        lineHeight:"40px",
        padding:"5px",
        borderRadius:"10px",
        border:"red 2px solid"
    }

    const headerCSS = {
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "orange",
        alignItems: "center",
        padding: "5px",
        borderRadius: "20px",
        border: "red 5px solid",
        height: "52px",
    }

    const headerMenu = {
        display: "flex",
        listStyle: "none",
    }

    const headerMenuItem = {
        marginRight: "15px",
        color: "snow",
        textDecoration: "none",
    }

    const titlelinkCSS = {
        position: "absolute",
        width: "225px",
        left: 0,
        right: 0,
        margin: "auto", 
        textDecoration: 'inherit'
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

    const renderHeader = (user) => {
        if(user){
            return(
                <header style={headerCSS}>
                    
                    <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ<span style={{ color: "red" }}>検索</span></h1></Link>
                    <nav>
                        <ul style={headerMenu}>
                            <li style={headerMenuItem}><Link to="/HOTPage" style={{ color: "white", textDecoration: 'inherit'}}>HOT</Link> </li>
                            <li style={headerMenuItem}><Link to="/LIKEPage" style={{ color: "white", textDecoration: 'inherit' }}>LIKE</Link></li>
                            <li style={headerMenuItem}><Link to="/MyPage" style={{ color: "white", textDecoration: 'inherit' }}>MYPAGE</Link></li>
                        </ul>
                    </nav>
                </header>
            )
        }else{
            return(
                <header style={headerCSS}>
                    
                    <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ<span style={{ color: "red" }}>検索</span></h1></Link>
                    <nav>
                        <ul style={headerMenu}>
                            {/* <li style={headerMenuItem}><Link to="/HOTPage" style={{ color: "white", textDecoration: 'inherit' }}>HOT</Link> </li> */}
                            <li style={headerMenuItem} onClick={openLoginModal}>LOGIN</li>
                        </ul>
                    </nav>
                    {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
                    <LoginModal LoginModalIsOpen={LoginModalIsOpen} closeLoginModal={closeLoginModal} />
                </header>
            );
        }
    }
<<<<<<< HEAD
    /////js///////js////////////js////////
    return (
        <>
            {RenderHeader(user)}
=======
/////js///////js////////////js////////
    return (
        <>
        {renderHeader(user)}
>>>>>>> origin/feature/youtube
        </>
    );

}
export default Header;