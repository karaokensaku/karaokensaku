import React from 'react';

const LeftSideBar = () => {

    const leftSideBarCSS = {
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
    }//左サイドバーのスタイル

    return (
        <div style={leftSideBarCSS}>
            <h1>人気カラオケ</h1>
            <a></a>
        </div>
    );
}

export default LeftSideBar;