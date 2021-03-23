
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Landing Page Component
import Home from './components/home';

import Manage from './containers/management';
import Blog from './containers/blog';

import './sass/main.scss'
import EachBlog from './containers/eachBlog';
import ShowcaseBlog from './blogEditor/showcaseBlog'
import BlogEditor from './blogEditor/blogEditor';

function App() {
  if (window.location.host.split(".")[0] == "blogs") {
    return (
      // <Router >
        <Blog />
      // </Router>
    )
  }
  else {
    return (
      <div>
        <Router>
          <switch>
             <Route path="/" exact component={Home} />
             {/* <Route path="/admin" component={Manage} /> */}
  
             {/*Blog routes*/}
             <Route path="/blogs/:slug" render={props => <EachBlog {...props} key={props.location.key}/>} />
             
             {/* <Route path="/blogs" exact component={Blog} /> */}
             <Route path="/showcase-your-blog" exact component={ShowcaseBlog} />
  
              {/*Blog editors*/}
             {/* <Route path="/blog-editor" component={BlogEditor} /> */}
  
          </switch>
        </Router>
      </div>
    )
  }
  
}

export default App;
//https://stackoverflow.com/questions/63753022/javascript-heap-out-of-memory-on-aws-ec2