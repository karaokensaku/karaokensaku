import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';

const ViewKaraokePage = () => {

    const containerCSS = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "red 5px solid",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "orange",
        height: "100vh",
        alignItems: "center",
        padding: "10px",
        color: "white",
    }

    const mainPage = {
        display: "flex",
        justifyontent: "center",
        alignItems: "center",
        flexDirection: "column",

        borderRadius: "10px",
        border: "red 5px solid",
        backgroundColor: "white",
        color: "black",

        width: "80%",
        margin: "10px 20px",
        height: "100%",
        padding: "20px",
    }

    return(
        <>
        <Header />
        <div style={containerCSS}>
            <div style={mainPage}>
                    <iframe width="700" height="500" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default ViewKaraokePage