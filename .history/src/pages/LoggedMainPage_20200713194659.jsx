import React, { useContext } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';

import firebase from '../config/firebase'               //firebaseインポート

import { AuthContext } from '../AuthService'            //ユーザー情報が入っている

const LoggedainDEMO = () => {                           //仮のユーザー用メインページ

    const user = useContext(AuthContext);               //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    ///js//////js/////////js/////////js///////
    // const LogOut = (user) => {                          //ログアウト処理
    //     debugger
    //     firebase.auth().onAuthStateChanged((user) => {
    //         firebase.auth().signOut().then(() => {
    //             console.log("ログアウトしました");
    //         })
    //             .catch((error) => {
    //                 console.log(`ログアウト時にエラーが発生しました (${error})`);
    //             });
    //     });
    // }

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
        height: "100vh",
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
        padding: "10px",
    }
                                                        //真ん中のメインページのcss
    /////////css/////////////css//////////css///////
    return (
        <>
            <Header  LogOut={LogOut}/>
            <div style={containerCSS} name="mainContainer">
                <RightSideBar />
                <LeftSideBar />
                <div style={mainPage}>
                    
                </div>
            </div>
            <Footer />
        </>
    );

}

export default LoggedainDEMO;