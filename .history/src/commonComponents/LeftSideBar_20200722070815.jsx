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
<<<<<<< HEAD
            aaaa
=======
            <h1>とりあえず5曲</h1>
            <a href="">1【カラオケ】香水/瑛人</a>
            <a href="">2米津玄師/Lemon</a>
            <a href="">3あいみょん/マリーゴールド</a>
            <a href="">4RADWIMPS/いいんですか？</a>
            <a href="">5YPASOBI/夜に駆ける</a>
        
>>>>>>> origin/feature/youtube
        </div>
    );
}

export default LeftSideBar;