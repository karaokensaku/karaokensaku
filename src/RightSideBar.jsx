import React, { useContext } from 'react';
import { AuthContext } from './AuthService';
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
    }//右サイドバーのスタイル
    /////////////css/////////css////////css///////

    const user = useContext(AuthContext) //ユーザー情報引っ張ってくる

    var renderRightSideBar;
    if (user) {
        renderRightSideBar = <i class="fas fa-user-circle"></i>
    } else {
        renderRightSideBar = <p>ログインするとここにユーザー情報が表示されます</p>
    }

    return (
        <div style={rightSideBarCSS}>
            {renderRightSideBar}
        </div>
    );
}

export default RightSideBar;