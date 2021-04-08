import React, { Component } from 'react';
import * as firebaseui from "firebaseui";
import firebaseConfig from '../firebase'
import firebase from "firebase";

class Login extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
      } else {
        firebase.app(); // if already initialized, use that one
      }
    const uiConfig = {
      signInSuccessUrl: "http://localhost:3000/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions:[{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // The default selected country.
        defaultCountry: 'IN'
      }],
      tosUrl: "http://localhost:3000/"
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth()); 
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <>
      <h1 style={{color:'rgb(57, 170, 57)',textAlign:'center'}}>LOGIN</h1>
      <br/> <br/> <br/>
      <div id="firebaseui-auth-container"></div>
      </>
    )
  }
}

export default Login;