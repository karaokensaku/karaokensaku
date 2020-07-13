import React, { useContext } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';


import { AuthContext } from '../AuthService'            //ユーザー情報が入っている

const LoggedainDEMO = () => {                           //仮のユーザー用メインページ

    const user = useContext(AuthContext);               //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    ///js//////js/////////js/////////js///////

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
        height: "100%",
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
            <Header />
            <div style={containerCSS} name="mainContainer">
                <RightSideBar />
                <LeftSideBar />
                <div style={mainPage}>
                    <h1>人気のカラオケ</h1>

                    <div></div>
                    <p>香水/瑛人</p>
                    <iframe width="525" height="380" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>

                    </iframe>
                    <a href="">もっと人気カラオケを見る</a>
                    <h1>あなたのお気に入り</h1>
                    
                    <p>マリーゴールド/あいみょん</p>
                    <iframe width="525" height="380" src="https://www.youtube.com/embed/zduP-6somBM" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                    <a href="">もっとお気に入りを見る</a>

                    {/* <p>別の人の彼女になったよ / wacci</p>
                    <iframe width="525" height="380" src="https://www.youtube.com/embed/ekeC7sLBlOM" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe> */}
                </div>
            </div>
            <Footer />
        </>
    );

}

export default LoggedainDEMO;