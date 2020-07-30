import React, { useContext } from 'react';
import { useState } from "react";
import _ from "lodash";
import { makeStyles } from '@material-ui/core';
import AddMyPage from './AddMyPage';
import { StyledComponent } from './MainPage.styled';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '80%',
    textAlign: 'center',
    margin: "auto",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
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
      <div key={video.id.videoId}>
        <div className="youtube">
          <iframe
            id="ytplayer"
            type="ytplayer"
            width="640"
            height="360"
            src={url}
            title={video.snippet.title}
            frameBorder="0"
            style={{ width: "100%"}}
          />
        </div>
          <AddMyPage video={video} />
      </div>
    );
  });

  return (
    <StyledComponent>
      <div className={classes.main}>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          onChange={handleChangeInput}
          value={keyword}
        />
        <button onClick={handleClickInput}>検索</button>
        <h1>{keyword}</h1>
        <p>の検索結果</p>
        {video}
      </div>
    </StyledComponent>
  );
}

export default Youtube;
