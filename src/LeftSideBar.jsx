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
            <h1>左サイドバー</h1>
            <p>詳細検索</p>
            
            <form>
                <p >歌いやすい <input type="checkbox" /></p>
                <p >難しい <input type="checkbox" /></p>
                <p class="deepitem">歌われ回数　</p>
                <input type="text" placeholder="以下" class="width40" />
                <p>〜</p>
                <input type="text" placeholder="以上" class="width40"/>
                <p class="deepitem">いいね数</p><input type="text" placeholder="以上" class="width40"/>
                <br/>
                <button>検索</button>
            </form>
        </div>
    );
}

export default LeftSideBar;