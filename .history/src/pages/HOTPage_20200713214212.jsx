import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';

const HOTPage = () => {

    const containerCSS = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "red 5px solid",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "orange",
        minHeight: "100vh",
        alignItems: "center",
        padding: "10px",
        color: "white",
    }
    const centerContainer = {
        display: "flex",
        justifyontent: "center",
        alignItems: "center",
        flexDirection: "column",

        borderRadius: "10px",
        border: "red 5px solid",
        backgroundColor: "white",
        color: "black",
        minHeight:"100vh",
        width: "49%",
        margin: "10px 20px",
        height: "100%",
        padding: "10px",
    }
    return (
        <>
            <Header/>
            <div style={containerCSS}>
                <LeftSideBar />
                <RightSideBar />
                <div style={centerContainer}>
                    ここにカラオケで検索したyoutube動画を再生回数順に表示していく
                    <a>香水</a>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default HOTPage