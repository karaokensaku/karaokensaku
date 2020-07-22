import React from 'react';
import Header from '../commonComponents/Header';
import Footer from '../commonComponents/Footer';
import LeftSideBar from '../commonComponents/LeftSideBar';
// APIデータ取得に使うやつ
import axios from 'axios';

//  本当は関数Componentで書きたい
class HOTPage extends React.Component {
    state = {
        videos: [],
    }

    componentDidMount() {
        // 検索結果を表示するAPIの例
        // const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.state.keyword}&maxResults=3&key=${YOUTUBE_API_KEY}`;
        // リソースの種類 https://developers.google.com/youtube/v3/getting-started?hl=ja#resources
        // 取得されたパラメータ https://developers.google.com/youtube/v3/docs/activities?hl=ja#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E8%A1%A8%E7%8F%BE

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
                <Footer />
            </>
        );
    }
}

export default HOTPage