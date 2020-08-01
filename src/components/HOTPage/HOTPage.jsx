import React from 'react';
// APIデータ取得に使うやつ
import axios from 'axios';
import AddMyPage from './AddMyPage';
import { StyledComponent } from './HOTPage.styled';
import { Typography } from '@material-ui/core';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

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
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&channelId=UC1tk9F5-MGXEq4LWnjmrtpA&key=${YOUTUBE_API_KEY}`;

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
            .catch((err) => {
                console.log(err);
            });
    };

    render() {

        const containerCSS = {
            width: '95%',
            textAlign: 'center',
            margin: "auto",
        }

        const centerContainer = {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#F2F2F2",
            color: "black",
        }

        // 取得したデータを確認(なぜかConsoleに2回表示される)
        console.log(this.state.videos);

        return (
            <>
                <StyledComponent style={containerCSS}>
                    <div style={centerContainer}>
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                        <Typography variant="h5" style={{marginBottom: "20px"}}>人気のカラオケ動画</Typography>
                        {this.state.videos.map((video) => {
                            const ttl = video.snippet.title;
                            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                            // comのあとに.をつけると広告が流れない？らしい
                            return (
                                <div key={video.id.videoId} className="youtubeContainer">
                                    <div className="youtube">
                                        <iframe 
                                            id="ytplayer" 
                                            type="text/html" 
                                            width="640" 
                                            height="360"
                                            src={url}
                                            frameBorder="0"
                                            title={ttl}
                                        ></iframe>
                                    </div>
                                    <AddMyPage video={video} />
                                </div>
                            );
                        })}
                        {/* ここにカラオケで検索したyoutube動画を再生回数順に表示していく */}
                    </div>
                </StyledComponent>
                {/* <Footer /> */}
            </>
        );
    }
}

export default HOTPage