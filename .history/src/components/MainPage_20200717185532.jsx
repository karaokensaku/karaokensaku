import React, { useState, useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import RightSideBar from '../commonComponents/RightSideBar';
import LeftSideBar from '../commonComponents/LeftSideBar';
import LoginModal from '../commonComponents/LoginModal'                          //ログイン用モーダル
import SignUpModal from '../commonComponents/SignUpModal'                        //サインアウト用モーダル
import { AuthContext } from '../store/AuthService';
import { Link } from 'react-router-dom';

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
        // border: "red 5px solid",
        // margin: "10px 0",
        // borderRadius: "10px",
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
    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainer">
                    <RightSideBar />
                    <LeftSideBar />
                    <div style={mainPage}>

                        <input type="search" placeholder="カラオケ動画を検索" />
                        <button>検索</button>
                        <div style={HOTcontainerCSS}>
                            {/* メインページから各ページへアクセスできる */}
                            <h1>人気のカラオケ</h1>
                            <p>【カラオケ】香水/瑛人</p>
                            <iframe width="525" height="380" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                            <Link to="HOTPage"><button style={{ marginTop: "10px" }}><a href="" style={{ color: "black", fontWeight: "bold" }}>もっと人気カラオケを見る</a></button></Link>

                        </div>
                        <div style={LIKEcontainerCSS}>

                            <h1>あなたのお気に入り</h1>
                            <p>別の人の彼女になったよ / wacci</p>
                            <iframe width="525" height="380" src="https://www.youtube.com/embed/ekeC7sLBlOM" frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                            <Link to="/LIKEPage"><button style={{ marginTop: "10px" }}><a href="" style={{ color: "black", fontWeight: "bold" }}>もっとお気に入りを見る</a></button></Link>
                        </div>

                        <div><button><a href="" style={{ color: "black", fontWeight: "bold" }}>マイページへ行く</a></button></div>
                        {/* メインページから各ページへアクセスできる */}

                    </div>
                </div>
                <Footer />
            </>
        );
    } else {
        console.log("aaaaa")
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainerGuest">
                    <LeftSideBar />
                    <div style={mainPage}>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default MainDEMO;