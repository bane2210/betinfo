import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  createStore /* ,applyMiddleware, compose, combineReducers */,
} from "redux";
import reducer from "./store/reducers/reducers";
import axios from "axios";

import ReactGA from "react-ga";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const proxyurl = "https://cors-proxy.htmldriven.com/?url=";
// dodaj fajlovima header allow orign ...

axios.defaults.baseURL = "http://betinfo.cc";

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer);

const trackingId = "UA-168991469-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter /*basename="/ticket"*/>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
