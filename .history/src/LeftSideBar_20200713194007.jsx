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
            <a href="">1米津玄師/Lemon</a>
            <a href="">2米津玄師/LOSER</a>
            <a href="">3あいみょん/マリーゴールド</a>
            <a href="">4RADWIMPS/愛にできること</a>
            <a href="">5米津玄師/Lemon</a>
        </div>
    );
}

export default LeftSideBar;