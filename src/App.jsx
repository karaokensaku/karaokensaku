import React, { useState } from 'react';
import { AuthProvider } from './store/AuthService';
import LoggedInRoute from './router/LoggedInRoute'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HOTPage from './components/HOTPage'
import UserSettingPage from './components/UserSettings';
import { RecoilRoot } from "recoil";
import axios from "axios";
import Youtube from './components/MainPage';
import MyPage from './components/MyPage';
import { makeStyles } from '@material-ui/core';
import Layout from "./components/Layout"
import { GlobalStyle } from "./GlobalStyle"

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: "100vh",
    backgroundColor: '#F2F2F2',
    padding: "20px",
  },
  main: {
    backgroundColor: '#F2F2F2'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function App() {
  const classes = useStyles();
  const [video, setVideos] = useState([]);

  const onSearchYoutube = (keyword) => {
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&maxResults=3&key=${YOUTUBE_API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setVideos(response.data.items);
      })
      .catch(() => {
        console.log("通信に失敗しました");
      });
  };

  return (
    <div>
        <AuthProvider>
          <RecoilRoot>
            <Router>
      <Layout>
        <GlobalStyle />
              <div className={classes.app}>
                <Switch>
                  <Route exact path='/' render={() => <Youtube onSearchYoutube={onSearchYoutube} videos={video} />} />
                  <LoggedInRoute path='/myPages/:id' component={MyPage} />
                  <Route path='/hotPage' component={HOTPage} />
                  <LoggedInRoute path='/userSettingPage' component={UserSettingPage} />
                </Switch>
              </div>
      </Layout>
            </Router>
          </RecoilRoot>
        </AuthProvider>
    </div>
  );
}

export default App;
