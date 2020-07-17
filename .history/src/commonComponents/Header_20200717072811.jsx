import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthService';

import { Link } from 'react-router-dom';


import LoginModal from './LoginModal'                          //ログイン用モーダル
const Header = () => {

    /////////////////CSS//////////////////
    const headerTitle = {
        color: "white",
        fontSize: "40px",
        // margin: "0 0 0 10px",
        // backgroundColor: "white",
        // lineHeight: "40px",
        // padding: "5px",
        // borderRadius: "10px",
        // border: "red 2px solid"
    }

    const headerCSS = {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        // padding: "5px",
        // borderRadius: "20px",
        // border: "red 5px solid",
        // height: "52px",
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
        
        width: "225px",
        margin: "auto",
        textDecoration: 'inherit'
    }

    const leftdiv = {
        backgroundColor: "rgb(199,13,25)",
        position: "relative",
        width: "70%"
    }

    const rightdiv = {
        backgroundColor:"white",
        width:"30%",
        position:"relative",
        height: "113.5px"
    }

    const loginButton = {
        position:"absolute",
        right: "15px",
        bottom: "10px",
        height:"30px",
        width: "85px",
        backgroundColor: "rgb(199,13,25)",
        border: "none",
        borderRadius: "5px",
        color: "white",
    }
    //////////////////CSS/////////////////

    /////js///////js////////////js////////
    const user = useContext(AuthContext);                    //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    //グローバルで管理できるのかな？↓
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);


    ///js//////js/////////js/////////js///////
    //モーダルを開いたり閉じたりする関数達
    const openLoginModal = () => {
        setLoginModalIsOpen(true)
    }

    const closeLoginModal = () => {
        setLoginModalIsOpen(false)
    }

    const renderHeader = (user) => {
        if (user) {
            return (
                <header style={headerCSS}>
                    <div style={leftdiv}>
                        <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ検索</h1></Link>
                    </div>
                    <div style={rightdiv}>
                        <button　style={loginButton}>ログアウト</button>
                    </div>
                </header>
            )
        } else {
            return (
                <header style={headerCSS}>

                    <Link to="/" style={titlelinkCSS}><h1 style={headerTitle}>カラオ<span style={{ color: "red" }}>検索</span></h1></Link>
                    <nav>
                    
                            <li style={headerMenuItem} onClick={openLoginModal}>LOGIN</li>

                    {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
                    <LoginModal LoginModalIsOpen={LoginModalIsOpen} closeLoginModal={closeLoginModal} />
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