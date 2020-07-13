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
        height: "100%",
        alignItems: "center",
        padding: "10px",
        color: "white",
    }

    return (
        <>
            <Header/>
            <div style={containerCSS}>
                <LeftSideBar />
                <RightSideBar
            </div>
            <Footer/>
        </>
    );
}

export default HOTPage