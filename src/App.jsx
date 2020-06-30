import React from 'react';
import MainDEMO from './pages/MainDEMO';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path='/' component={MainDEMO}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
