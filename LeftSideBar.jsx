import React from 'react';
import axios from 'axios';

// const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
// 今回は使わずに セキュリティ上は使った方がいい？

class LeftSideBar extends React.Component {
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
        //左サイドバーのスタイル
        const leftSideBarCSS = {
            position: "absolute",
            top: "20px",
            padding: "10px",

            left: "25px",
            width: "20%",

            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            border: "red 5px solid",
            borderRadius: "10px",

            backgroundColor: "white",
            color: "black",
        }
        // 左寄せにしたいぞ
        const fiveLists = {
            textAlign: "left",
        }

        console.log(this.state.videos)

        // ランダム5用
        // const fives = [];
        // for (let i = 0; fives.length < 5; i++) {
        //     const r = Math.floor(Math.random() * 50) + 1;
        //     if (!fives.includes(r)) {
        //         fives.push(r)
        //     } else { fives.push("e") }
        // }
        // console.log(fives);

        return (
            <div style={leftSideBarCSS}>
                <h2>とりあえずファイブ</h2>

                {this.state.videos.map((video) => {
                    const url = `https://www.youtube.com./watch?v=${video.id.videoId}`;
                    const ttl = video.snippet.title;
                    // if (fives.includes()) {
                        return (
                            <div>
                                <a href={url}>{ttl}</a>
                            </div>
                        );
                    // }
                })}
            </div>
        );
    }
}

export default LeftSideBar;