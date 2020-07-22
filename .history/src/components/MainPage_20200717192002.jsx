import React, { useState, useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { AuthContext } from '../store/AuthService';
import { Link } from 'react-router-dom';

const MainDEMO = () => {                        //仮のユーザー用メインページ
    const user = useContext(AuthContext);
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
        position: "absolute",
        right: 0,
        // borderRadius: "10px",
        // border: "red 5px solid",
        backgroundColor: "#F2F2F2",
        color: "black",

        width: "80%",
        // margin: "10px 20px",
        // height: "100vh",
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
                    aaa
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
                        aaaa
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default MainDEMO;