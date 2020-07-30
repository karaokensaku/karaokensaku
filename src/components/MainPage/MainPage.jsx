import React, { useContext } from 'react';
import { useState } from "react";
import _ from "lodash";
import { makeStyles } from '@material-ui/core';
import AddMyPage from './AddMyPage';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    textAlign: 'center',
    border: "3px solid #C50D1A",
    borderRadius: "10px",
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
      <div key={video.id.videoId} style={{ margin: "20px", textAlign: "center" }}>
          <iframe
            id="ytplayer"
            type="ytplayer"
            width="480"
            height="270"
            src={url}
            title={video.snippet.title}
            frameBorder="0"
          />
          <AddMyPage video={video} />
      </div>
    );
  });

  return (
    <>
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
    </>
  );
}

export default Youtube;
