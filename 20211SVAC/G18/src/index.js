import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import Nav from '../src/components/Nav'


// import Particles from 'react-particles-js';

ReactDOM.render(
  <React.StrictMode>
    <Nav/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

