import React from 'react';

const LeftSideBar = () => {

    const leftSideBarCSS = {
        // position: "absolute",
        // top: "20px",
        // padding: "10px",

        left: "25px",
        width: "20%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",

        backgroundColor: "white",
        color: "black",
    }//左サイドバーのスタイル

    return (
        <div style={leftSideBarCSS}>

        </div>
    );
}

export default LeftSideBar;