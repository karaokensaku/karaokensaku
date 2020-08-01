import React from 'react';
import { useState } from "react";
import _ from "lodash";
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import AddMyPage from './AddMyPage';
import { StyledComponent } from './MainPage.styled';
import SearchIcon from '@material-ui/icons/Search';

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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Youtube = ({ onSearchYoutube, videos }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
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
        <div className={classes.search}>
          <Paper component="div" component="form" className={classes.root} onSubmit={handleSubmitInput} >
            <InputBase
              className={classes.input}
              placeholder="曲名"
              inputProps={{ 'aria-label': 'music search' }}
              value={keyword}
              onChange={handleChangeInput}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        {video}
      </div>
    </StyledComponent>
  );
}

export default Youtube;
