import React, { useState } from 'react';
import MainPage from './components/MainPage';
// import LoggedMainPage from './components/LoggedMainPage';
import { AuthProvider } from './store/AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './router/LoggedInRoute'
import HOTPage from './components/HOTPage'
import LIKEPage from './components/LIKEPage'
import UserSettingPage from './components/UserSettings';
import { RecoilRoot } from "recoil";
import axios from "axios";
import Youtube from './components/MainPage';
import MyPage from './components/MyPage';
import { makeStyles } from '@material-ui/core';
import Layout from "./components/Layout"

const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    minHeight: "100vh",
    backgroundColor: '#F2F2F2'
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
              <div className={classes.app}>
                <Switch>
                  {/* LoggedMainPageをLoggedInRouteのpropsとして渡す */}
                  <Route exact path='/' component={MainPage} />
                  <Route exact path='/myPages/:id' component={MyPage} />
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
