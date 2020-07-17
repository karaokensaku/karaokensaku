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
    return(
        <>
            <Header />
            <div style={containerCSS}>
                <h1>世界に一つだけの花</h1>
                <p>の検索結果</p>
        
                <iframe width="950" height="550" src="https://www.youtube.com/embed/pPmMaWpAjOw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br/>
                <iframe width="950" height="550" src="https://www.youtube.com/embed/IlIIBvN-EMM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br/>
                <iframe width="950" height="550" src="https://www.youtube.com/embed/qZq-q75KeMw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <Footer />
        </>
    );
}

export default SearchKaraokeView