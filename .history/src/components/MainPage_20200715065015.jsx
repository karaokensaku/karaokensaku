import React, { useState, useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import RightSideBar from '../commonComponents/RightSideBar';
import LeftSideBar from '../commonComponents/LeftSideBar';
import LoginModal from '../commonComponents/LoginModal'                          //ログイン用モーダル
import SignUpModal from '../commonComponents/SignUpModal'                        //サインアウト用モーダル
import { AuthContext } from '../store/AuthService';


const MainDEMO = () => {                        //仮のユーザー用メインページ
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    const user = useContext(AuthContext)

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

    ///js//////js/////////js/////////js///////

    //////////css//////////css/////////css//////
    const containerCSS = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "red 5px solid",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "orange",
        minHeight: "100vh",
        alignItems: "center",
        padding: "10px",
        color: "white",
    }
    //containerのcss

    const mainPage = {
        display: "flex",
        justifyontent: "center",
        alignItems: "center",
        flexDirection: "column",

        borderRadius: "10px",
        border: "red 5px solid",
        backgroundColor: "white",
        color: "black",

        width: "49%",
        margin: "10px 20px",
        height: "100%",
        padding: "20px",
    }
    //真ん中のメインページのcss
    const HOTcontainerCSS = {

        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "orangered",
        alignItems: "center",
        padding: "20px",
        color: "white",
        width: "90%",
    }
    const LIKEcontainerCSS = {

        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "pink",
        alignItems: "center",
        padding: "20px",
        color: "white",
        width: "90%",
    }
    /////////css/////////////css//////////css///////
    if(user){

    }else{

    
    return (
        <>
            <Header />
            <div style={containerCSS} name="mainContainerGuest">
                <RightSideBar />
                <LeftSideBar />
                <div style={mainPage}>
                    <p>今すぐ検索！！</p>
                    <h1>会員登録したらできる機能</h1>
                    <div style={HOTcontainerCSS}>
                        {/* メインページから各ページへアクセスできる */}
                        <h1>人気のカラオケ</h1>
                        <p>人気のカラオケ動画を視聴可能に！🔥</p>
                        <img src="./sample.png"  height="380"/>
                        

                    </div>
                    <div style={LIKEcontainerCSS}>

                        <h1>あなたのお気に入り</h1>
                        <p>好きなカラオケ動画をお気に入りにしていつでも練習しよう❤️</p>
                        <img src="./sample.png" height="380" />
                        
                    </div>
                    <p>↓↓今すぐサインアップ&ログイン↓↓</p>
                    <button type="submit" onClick={openLoginModal}>ログインする</button>
                    <br/>
                    <button type="submit" onClick={openSignUpModal}>会員登録する</button>

                    {/* ログインモーダル用に開くか閉じるかの処理を渡す */}
                    <LoginModal LoginModalIsOpen={LoginModalIsOpen} closeLoginModal={closeLoginModal}  />
                    {/* サインモーダル用に開くか閉じるかの処理を渡す */}
                    <SignUpModal SignUpModalIsOpen={SignUpModalIsOpen} closeSignUpModal={closeSignUpModal}  />
                </div>
            </div>
            <Footer />
        </>
    );
    }
}

export default MainDEMO;