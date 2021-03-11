import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//slick carousel css file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);