import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSideBar from './LeftSideBar';

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

    // const centerContainer = {
    //     display: "flex",
    //     justifyontent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",

    //     borderRadius: "10px",
    //     border: "red 5px solid",
    //     backgroundColor: "white",
    //     color: "black",
    //     minHeight: "100vh",
    //     width: "45%",
    //     margin: "10px 20px",
    //     height: "100%",
    //     padding: "30px",
    // }
    return(
        <>
            <Header />
            <div style={containerCSS}>
                {/* <LeftSideBar /> */}
                <h1>【世界に一つだけの花】</h1>
                
            </div>
            <Footer />
        </>
    );
}

export default SearchKaraokeView