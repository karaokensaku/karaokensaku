import React from 'react';
import MainDEMO from './components/MainPage';
import LoggedMainPage from './components/LoggedMainPage';
import {AuthProvider} from './AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './router/LoggedInRoute'
import HOTPage from './components/HOTPage'
import LIKEPage from './components/LIKEPage'
import MyPage from './components/MyPage'
import SearchKaraokeView from './components/SearchKaraokeView'
import ViewKaraokePage from './components/ViewKaraokePage'
function App() {

  return (
    <div className="App">
      <AuthProvider>
          {/* AuthProviderでラップすることで、 */}
          {/* その子孫コンポーネント全てでログイン済みユーザーのデータにアクセスできます */}

        <Router>
          <Switch>
            {/* LoggedMainPageをLoggedInRouteのpropsとして渡す */}
            <LoggedInRoute exact path='/' component={LoggedMainPage}/>
            <Route exact path='/maindemo' component={MainDEMO} />
            <Route exact path='/HOTPage' component={HOTPage} />
            <Route exact path='/LIKEPage' component={LIKEPage} />
            <Route exact path='/MyPage' component={MyPage} />
            <Route exact path='/SearchKaraokeView' component={SearchKaraokeView} />
            <Route exact path='/ViewKaraokePage' component={ViewKaraokePage} />
          </Switch>
        </Router>

      </AuthProvider>

    </div>
  );
}

export default App;