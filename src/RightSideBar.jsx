import React from 'react';

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
    
    return (
        <div style={rightSideBarCSS}>
            <i class="fas fa-user-circle"></i>
        </div>
    );
}

export default RightSideBar;