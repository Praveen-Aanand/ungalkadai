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
      // signInSuccessUrl: isLocalhost? "http://localhost:3000/": window.location.origin, //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // The default selected country.
        defaultCountry: 'IN',
        recaptchaParameters: {
          size: 'invisible',
          badge: 'bottomleft'
        },
      }],
      tosUrl: window.location.origin,
     
    };
    if(firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  
    // if ('OTPCredential' in window) {
    //   console.log('enter')
  
    //       console.log("after then")
    //       const input = document.querySelector('input[id="ui-sign-in-phone-confirmation-code-input"]');
    //       console.log(input)
    //       if (!input) return;
    //       const ac = new AbortController();
    //       const form = input.closest('form');
    //       if (form) {
    //         form.addEventListener('submit', e => {
    //           ac.abort();
    //         });
    //       }
    //       navigator.credentials.get({
    //         otp: { transport:['sms'] },
    //         signal: ac.signal
    //       }).then(otp => {
    //         input.value = otp.code;
    //         if (form) form.submit();
    //       }).catch(err => {
    //         console.log(err);
    //       });
       
       
      
    // }
    // else{
    //   console.log("get")
   
    //   document.getElementById('ui-sign-in-phone-confirmation-code-input')?.onload(()=>{
    //     console.log("here is t")
    //     document.getElementById('ui-sign-in-phone-confirmation-code-input').setAttribute("autocomplete","one-time-code")
    //     console.log('conpljet')
    //   })
    
    // }
  }
  render() {
    return (
      <>
        <div id="firebaseui-auth-container" style={{width:'100%',margin:'auto'}}></div>
      </>
    )
  }
}

export default Login;