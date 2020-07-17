import React, { useContext } from 'react';
import { AuthContext } from './AuthService';
import firebase from './config/firebase'               //firebaseインポート
const KanrenKaraoke = () => {

    ////////////css/////////css////////css////////
    const rightSideBarCSS = {
        position: "absolute",
        top: "20px",
        padding: "10px",

        left: "25px",
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
                <p>【カラオケ】香水/瑛人</p>
                <iframe width="700" height="500" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
                <p>【カラオケ】香水/瑛人</p>
                <iframe width="700" height="500" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
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

export default KanrenKaraoke;