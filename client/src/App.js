
import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import ReactGA, { initialize } from 'react-ga'
import axios , { base } from './axios-pf'

//Landing Page Component
import Home from './components/home'

import Manage from './containers/management'
import Blog from './containers/blog'

import './sass/main.scss'
import EachBlog from './containers/eachBlog'
import ShowcaseBlog from './blog/showcaseBlog'
import BlogEditor from './blog/blogEditor'

import DeveloperBlogs from './blog/developerBlogs'

import DevBlogsAdmin from './containers/devBlogsAdmin'
import EachDevBlog from './containers/eachDevBlog'
import Login from './auth/login'
import { Cookies } from 'js-cookie'
import Register from './auth/Register'

function App() {

  useEffect(async() => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
    
  }, [])

  return (
    <div>
      <Router>
        <Switch>
           <Route path="/" exact component={Home} />
           {/* <Route path="/admin" exact component={Manage} /> */}
           {/* <Route path="/d/admin" component={DevBlogsAdmin} /> */}

           {/*Blog routes*/}
           <Route path="/travel/:slug" render={props => <EachBlog {...props} key={props.location.key}/>} />
           <Route path="/travel" exact component={Blog} />
           <Route path="/blogs" exact component={DeveloperBlogs} />
           <Route path="/register" component={Register} />
           {/* <Route path="/login" component={Login} /> */}
           <Route path="/blogs/:slug" render={props => <EachDevBlog {...props} key={props.location.key}/>} />
           <Route path="/showcase-your-blog" component={ShowcaseBlog} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
//https://stackoverflow.com/questions/63753022/javascript-heap-out-of-memory-on-aws-ec2