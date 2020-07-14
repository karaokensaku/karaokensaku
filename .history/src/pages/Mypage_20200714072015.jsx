import React from 'react';
import Header from '../Header';
import Footer from '../Footer';


const MyPage = () => {

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

        </div>
        <Footer />
        </>
    );
}

export default MyPage