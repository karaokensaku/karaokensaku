import React from 'react';
import MainDEMO from './pages/MainDEMO';
import LoggedMainPage from './pages/LoggedMainPage';
import {AuthProvider} from './AuthService';//ユーザー情報を持っているコンテキストオブジェクト
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from './LoggedInRoute'

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
          </Switch>
        </Router>

      </AuthProvider>

    </div>
  );
}

export default App;
