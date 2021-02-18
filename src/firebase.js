import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyCOCrbg825KuNFIEz-MutP4qHErSZga520",
  authDomain: "ungakadai.firebaseapp.com",
  projectId: "ungakadai",
  storageBucket: "ungakadai.appspot.com",
  messagingSenderId: "308299846904",
  appId: "1:308299846904:web:8e6b785e1800eca3f8170d",
  measurementId: "G-PW74QPHN0Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;