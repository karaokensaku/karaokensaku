import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import RightSideBar from '../RightSideBar';
import LeftSideBar from '../LeftSideBar';
import { AuthContext } from '../AuthService';
import { Redirect } from 'react-router-dom';


const LIKEPage = () => {

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

    const user = useContext(AuthContext)
    if (user) {
        return (
            <>
                <Header />
                <div style={containerCSS}>
                    <LeftSideBar />
                    <RightSideBar />
                    <div style={centerContainer}>
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                        <h1>あなたのお気に入りカラオケ動画</h1>
                        <p>【カラオケ】香水/瑛人</p>
                        <iframe width="525" height="380" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        <p>別の人の彼女になったよ / wacci</p>
                        <iframe width="525" height="380" src="https://www.youtube.com/embed/ekeC7sLBlOM" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        <p>【カラオケ】香水/瑛人</p>
                        <iframe width="525" height="380" src="https://www.youtube.com/embed/Z8K_8jbzmiY" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        <p>別の人の彼女になったよ / wacci</p>
                        <iframe width="525" height="380" src="https://www.youtube.com/embed/ekeC7sLBlOM" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                    </div>
                </div>
                <Footer />
            </>
        );
    }else{
        return <Redirect to="/" />                                         //ログイン状態ならLoggedMainPageに遷移
    }
}

export default LIKEPage