
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Landing Page Component
import Home from './components/home';

import Manage from './containers/management';
import Blog from './containers/blog';

import './sass/main.scss'
import EachBlog from './containers/eachBlog';
import ShowcaseBlog from './blogEditor/showcaseBlog'

function App() {
  return (
    <div>
      <Router>
        <switch>
           <Route path="/" exact component={Home} />
           <Route path="/admin" component={Manage} />

           {/*Blog routes*/}
           <Route path="/blog/:slug" render={props => <EachBlog {...props} key={props.location.key}/>} />
           <Route path="/blog" exact component={Blog} />
           <Route path="/showcase-your-blog" exact component={ShowcaseBlog} />

        </switch>
      </Router>
    </div>
  );
}

export default App;
