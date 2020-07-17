import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';

const SearchKaraokeView = () => {

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

    return(
        <>
            <Header />
            <div style={containerCSS}>
                <h1>世界に一つだけの花</h1>
                <p>の検索結果</p>

                
            </div>
            <Footer />
        </>
    );
}

export default SearchKaraokeView