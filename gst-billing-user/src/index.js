import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from './preModels/Faq';

import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Features2 from './preModels/Faq';
import { Features } from './components/features';
import Otp from './components/Login/otpMessage';

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <App/>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
