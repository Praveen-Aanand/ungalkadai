import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Switch,Redirect,Route } from "react-router-dom";
import OrderPage from './pages/orderPage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <IndexRoute component = {App} /> */}
      <Switch>
      <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route exact path="/order/:shop/:address/:cato" component={OrderPage} />
        <Route exact path="/order/:shop/:address/:cato/:list" component={OrderPage} />
        <Route path="/order" component={OrderPage} />

        {/* <Redirect path="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
