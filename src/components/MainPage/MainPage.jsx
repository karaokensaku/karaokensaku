import React from 'react';
import { useState } from "react";
import _ from "lodash";
import { makeStyles } from '@material-ui/core';
import AddMyPage from './AddMyPage';
import { StyledComponent } from './MainPage.styled';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
  },
  main: {
    width: '95%',
    textAlign: 'center',
    margin: "auto",
  },
  search: {
    padding: "7px 0",
  },
}));

const Youtube = ({ onSearchYoutube, videos }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleClickInput = () => {
    _debounce(keyword);
  };

  const _debounce = _.debounce((value) => {
    onSearchYoutube(value + "カラオケ");
  }, 200);

  const video = videos.map((video) => {
    const url = "https://www.youtube.com/embed/" + video.id.videoId;
    return (
      <div key={video.id.videoId} className="youtubeContainer">
        <div className="youtube">
          <iframe
            id="ytplayer"
            type="ytplayer"
            width="640"
            height="360"
            src={url}
            title={video.snippet.title}
            frameBorder="0"
          />
        </div>
          <AddMyPage video={video} />
      </div>
    );
  });

  return (
    <StyledComponent className={classes.container}>
      <div className={classes.main}>
        <div class={classes.search}>
          <input
            type="search"
            name="search"
            placeholder="キーワードを入力"
            onChange={handleChangeInput}
            value={keyword}
          />
          <button onClick={handleClickInput}>検索</button>
        </div>
        {video}
      </div>
    </StyledComponent>
  );
}

export default Youtube;
