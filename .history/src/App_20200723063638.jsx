import React from 'react';
import MainPage from './components/MainPage';
// import LoggedMainPage from './components/LoggedMainPage';
import {AuthProvider} from './store/AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './router/LoggedInRoute'
import HOTPage from './components/HOTPage'
import LIKEPage from './components/LIKEPage'
import MyPage from './components/MyPage'
import SearchKaraokeView from './components/SearchKaraokePage'
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          {/* AuthProviderでラップすることで、 */}
          {/* その子孫コンポーネント全てでログイン済みユーザーのデータにアクセスできます */}
        <RecoilRoot>
          <Router>
            <Switch>
              {/* LoggedMainPageをLoggedInRouteのpropsとして渡す */}
              <LoggedInRoute exact path='/' component={MainPage}/>
              <Route exact path='/main' component={MainPage} />
              <Route exact path='/HOTPage' component={HOTPage} />
              <Route exact path='/LIKEPage' component={LIKEPage} />
              <Route exact path='/mypages/:id' component={MyPage} />
              <Route exact path='/SearchKaraokeView' component={SearchKaraokeView} />
            </Switch>
          </gitRouter>
        </RecoilRoot>
      </AuthProvider>
    </div>
  );
}

export default App;
