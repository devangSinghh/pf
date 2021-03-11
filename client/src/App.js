
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Landing Page Component
import Home from './components/home';

import Manage from './containers/management';

import './sass/main.scss'

function App() {
  return (
    <div>
      <Router>
        <switch>
           <Route path="/" exact component={Home}/>
           <Route path="/admin" component={Manage}/>
        </switch>
      </Router>
    </div>
  );
}

export default App;
