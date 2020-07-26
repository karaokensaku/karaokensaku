import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSideBar from './LeftSideBar';
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

        //  検索で,チャンネルID,再生回数,で取得.表示数はデフォで5
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&channelId=UC1tk9F5-MGXEq4LWnjmrtpA&key=AIzaSyA8tNpyBZw1H4HYxOmB8qdFO-ooPwxH1t4`;

        // TOP50からランダム5抽出への挑戦
        // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=50&channelId=UC1tk9F5-MGXEq4LWnjmrtpA&key=AIzaSyA8tNpyBZw1H4HYxOmB8qdFO-ooPwxH1t4`;

        // チャンネル指定で,再生回数トップ5の動画を取得するのはできないのだろうか？↓
        // const url = `https://www.googleapis.com/youtube/v3/channels?id=UC1tk9F5-MGXEq4LWnjmrtpA&part=snippet&order=viewCount&key=AIzaSyA8tNpyBZw1H4HYxOmB8qdFO-ooPwxH1t4&snippet&order=viewCount`;

        // axiosでデータを取得

        axios.get(url)
            .then(response => {
                this.setState({
                    videos: response.data.items,
                });
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    };

    render() {

        const containerCSS = {
            position: "relative",
            backgroundColor: "orange",
            height: "100%",
            // minHeight: "100vh",
            alignItems: "center",
            color: "white",
        }

        const centerContainer = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // position: "absolute",
            // right: 0,
            // top: 0,
            // bottom: 0,
            // left: "18%",
            backgroundColor: "#F2F2F2",
            color: "black",
            padding: "20px",
        }

        // 取得したデータを確認(なぜかConsoleに2回表示される)
        console.log(this.state.videos);

        return (
            <>
                {/* <Header /> */}
                <div style={containerCSS}>
                    {/* <LeftSideBar /> */}
                    <div style={centerContainer}>
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                        <h1>人気のカラオケ動画</h1>
                        {this.state.videos.map((video) => {
                            const ttl = video.snippet.title;
                            const url = `https://www.youtube.com./embed/${video.id.videoId}`;
                            // comのあとに.をつけると広告が流れない？らしい
                            return (
                                <div>
                                    <h3>{ttl}</h3>
                                    <iframe id="ytplayer" type="text/html" width="640" height="360"
                                        src={url}
                                        frameborder="0">
                                    </iframe>
                                </div>
                            );
                        })}
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                    </div>
                </div>
                {/* <Footer /> */}
            </>
        );
    }
}

export default HOTPage