import React, { Component } from 'react';
import * as firebaseui from "firebaseui";
import firebase from "firebase";

class Login extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyCOCrbg825KuNFIEz-MutP4qHErSZga520",
        authDomain: "ungakadai.firebaseapp.com",
        projectId: "ungakadai",
        storageBucket: "ungakadai.appspot.com",
        messagingSenderId: "308299846904",
        appId: "1:308299846904:web:8e6b785e1800eca3f8170d",
        measurementId: "G-PW74QPHN0Z"
      };
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app(); // if already initi alized, use that one
    }
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );
    const uiConfig = {
      signInSuccessUrl: isLocalhost? "http://localhost:3000/": window.location.origin, //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // The default selected country.
        defaultCountry: 'IN'
      }],
      tosUrl: window.location.origin
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <>
        <h1 style={{ color: 'rgb(57, 170, 57)', textAlign: 'center' }}>LOGIN</h1>
        <br /> <br /> <br />
        <div id="firebaseui-auth-container"></div>
      </>
    )
  }
}

export default Login;