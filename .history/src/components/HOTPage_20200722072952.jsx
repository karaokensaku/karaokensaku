import React from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import RightSideBar from '../commonComponents/RightSideBar';
import LeftSideBar from '../commonComponents/LeftSideBar';

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
        minHeight: "100vh",
        width: "49%",
        margin: "10px 20px",
        height: "100%",
        padding: "10px",
    }
    
    return (
        <>
            <Header />
            <div style={containerCSS}>
                <LeftSideBar />
                <RightSideBar />
                <div style={centerContainer}>
                    {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                    <h1>人気のカラオケ動画</h1>
                    
                    {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HOTPage