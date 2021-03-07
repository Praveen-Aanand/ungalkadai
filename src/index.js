import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Login from './pages/login';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#000000',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* <IndexRoute component = {App} /> */}
      <Switch>
      <Route exact path="/" component={()=><App index={1}/>} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route exact path="/order/:shop/:address/:cato" component={OrderPage} />
        <Route exact path="/order/:shop/:address/:cato/:list" component={OrderPage} />
        <Route path="/order" component={OrderPage} /> */}
        {/* <Redirect path="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
