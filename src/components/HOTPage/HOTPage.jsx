import React from 'react';
// APIデータ取得に使うやつ
import axios from 'axios';
import AddMyPage from './AddMyPage';
import { StyledComponent } from './HOTPage.styled';
import { Typography } from '@material-ui/core';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class HOTPage extends React.Component {
    state = {
        videos: [],
    }

    componentDidMount() {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&channelId=UC1tk9F5-MGXEq4LWnjmrtpA&key=${YOUTUBE_API_KEY}`;

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

        console.log(this.state.videos);

        return (
            <>
                <StyledComponent style={containerCSS}>
                    <div style={centerContainer}>
                        <Typography variant="h5" style={{marginBottom: "20px"}}>人気のカラオケ動画</Typography>
                        {this.state.videos.map((video) => {
                            const ttl = video.snippet.title;
                            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
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
                    </div>
                </StyledComponent>
            </>
        );
    }
}

export default HOTPage