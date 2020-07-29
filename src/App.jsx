import React, { useState } from 'react';
import MainPage from './components/MainPage';
// import LoggedMainPage from './components/LoggedMainPage';
import { AuthProvider } from './store/AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './router/LoggedInRoute'
import HOTPage from './components/HOTPage'
import LIKEPage from './components/LIKEPage'
import UserSettingPage from './components/UserSettingPage'
import { RecoilRoot } from "recoil";
import axios from "axios";
import Youtube from './components/MainPage';
import MyPage from './components/MyPage';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import { makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import Layout from "./components/Layout"
import styled, { css } from 'styled-components';
import { GlobalStyle } from "./GlobalStyle"

// const styled =
const mixinColor = css`
  color: white;
  background: blue;
`;

const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    margin: (0, 'auto'),
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: "100vh",
  },
  main: {
    backgroundColor: '#F2F2F2'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function App() {
  const classes = useStyles();
  const [video, setVideos] = useState([]);

  const onSearchYoutube = (keyword) => {
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&maxResults=3&key=AIzaSyB-JHockHi2hKNaGdLBI8u5d3xSPxnWEDc`;

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
            {/* AuthProviderでラップすることで、 */}
            {/* その子孫コンポーネント全てでログイン済みユーザーのデータにアクセスできます */}
            <Router>
      <Layout>
        <GlobalStyle />
              <div className={classes.app}>
                <Switch>
                  {/* LoggedMainPageをLoggedInRouteのpropsとして渡す */}
                  <LoggedInRoute exact path='/' component={MainPage} />
                  <LoggedInRoute exact path='/myPages/:id' component={MyPage} />
                  <Route exact path='/main' render={props => <Youtube onSearchYoutube={onSearchYoutube} videos={video} />} />
                  <Route exact path='/hotPage' component={HOTPage} />
                  <Route exact path='/likePage' component={LIKEPage} />
                  <Route exact path='/userSettingPage' component={UserSettingPage} />
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
