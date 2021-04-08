import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login';
import App from './App';
import Register from "./pages/register"
import  AddProducts from './pages/AddProduct';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={()=><App index={0}/>} />
        <Route path="/login" component={Login} />
        <Route path="/addproduct" component={AddProducts} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
reportWebVitals();
