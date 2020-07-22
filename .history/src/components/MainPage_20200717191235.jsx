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
    //////////css//////////css/////////css//////
    const containerCSS = {
        // position: "relative",
        display: "flex",
        justifyContent: "space-between",
        // flexDirection: "column",
        // border: "red 5px solid",
        // margin: "10px 0",
        // borderRadius: "10px",
        backgroundColor: "orange",
        minHeight: "100vh",
        alignItems: "center",
        // padding: "10px",
        color: "white",
    }
    //containerのcss

    const mainPage = {
        display: "flex",
        justifyontent: "center",
        alignItems: "center",
        flexDirection: "column",

        // borderRadius: "10px",
        // border: "red 5px solid",
        backgroundColor: "lightblue",
        color: "black",

        width: "80%",
        // margin: "10px 20px",
        height: "100vh",
        padding: "20px",
    }
    //真ん中のメインページのcss
   
    /////////css/////////////css//////////css///////
    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS} name="mainContainer">
                    <LeftSideBar />
                    <div style={mainPage}>

       
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