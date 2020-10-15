import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import "jquery/dist/jquery.min.js";
import "bootstrap/js/src/collapse.js";
// import "bootstrap/dist/js/bootstrap.min.js";
// import 'bootstrap/js/dist/collapse.js';
// import 'bootstrap/js/src/collapse.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './css/main.scss';
import { maintainSession } from './utils/common';

maintainSession();
const rootElement = document.getElementById('root');
//DOM
ReactDOM.render(
  <Provider store={store}>
    <AppRouter/>
    {/* <Footer/> */}
  </Provider>,
  rootElement
);