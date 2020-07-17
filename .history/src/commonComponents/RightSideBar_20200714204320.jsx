import React, { useContext } from 'react';
import { AuthContext } from '../store/';
import firebase from '../config/firebase'               //firebaseインポート
const RightSideBar = () => {

    ////////////css/////////css////////css////////
    const rightSideBarCSS = {
        position: "absolute",
        top: "20px",
        padding: "10px",

        right: "25px",
        width: "20%",

        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "red 5px solid",
        borderRadius: "10px",

        backgroundColor: "white",
        color: "black",
    }                                                                       //右サイドバーのスタイル
    /////////////css/////////css////////css///////

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

    const user = useContext(AuthContext)                                    //ユーザー情報引っ張ってくる

    // var renderRightSideBar;
    if (user) {
        //ログイン状態ならユーザー情報を表示
        return (
            <div style={rightSideBarCSS}>
                <i class="fas fa-user-circle"></i>
                <button onClick={LogOut}>ログアウト</button>
            </div>
        )


    } else {                                                                //未ログイン状態なら他の表示
        return (
            <div style={rightSideBarCSS}>
                <p>ログインするとここにユーザー情報が表示されます</p>
            </div>
        );
    }

    // return (
    //     <div style={rightSideBarCSS}>
    //         {renderRightSideBar}
    //     </div>
    // );
}

export default RightSideBar;