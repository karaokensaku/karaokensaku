import React, { useContext } from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
import { AuthContext } from '../store/AuthService';

import { useState } from "react";
import _ from "lodash";
// import { Link } from 'react-router-dom';

const Youtube = () => {                        //仮のユーザー用メインページ
    const user = useContext(AuthContext);
    //////////css//////////css/////////css//////
    const containerCSS = {
        position: "relative",
        backgroundColor: "orange",
        minHeight: "100vh",
        alignItems: "center",
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
        top:0,
        bottom:0,
        left:"18%",
        backgroundColor: "#F2F2F2",
        color: "black",
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

export default Youtube;

// import React, {useState} from "react";
// import _ from "lodash";
// import Header from "../commonComponents/Header";
// import LeftSideBar from "../commonComponents/LeftSideBar";
// import RightSideBar from "../commonComponents/RightSideBar";



// export default Youtube;
