import React from 'react';
import MainDEMO from './pages/MainDEMO';
import LoggedMainPage from './pages/LoggedMainPage';
import {AuthProvider} from './AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './LoggedInRoute'
import HOTPage from './pages/HOTPage'
import LIKEPage from './pages/LIKEPage'
import MyPage from './pages/MyPage'
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
            <Route exact path='/LIKEPage' component={MyPage} />
          </Switch>
        </Router>

      </AuthProvider>

    </div>
  );
}

export default App;
