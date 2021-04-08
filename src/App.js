import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import BottomNav from "./components/bottomNav";
import firebaseConfig from "./firebase";
import firebase from 'firebase';
import { UserData } from './store';
import { Redirect } from 'react-router';
const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    fontSize: '5px !important'
  },
});
export default function App(props) {
  const [verified, setValue] = React.useState('loading');
  console.log(props.index)
  const classes = useStyles();
  const UserState=UserData.useState((s)=>s);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('shopAppUsers').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            UserData.update((s)=>{
              s.data=doc.data()
              s.auth=user
            })
            setValue(true)
          } else {
            setValue('register')
          }
        })

      } else {
        console.log('hello')
        setValue(false)
        return <Redirect to={`/login`} />
      }
    });
    // firebase.firestore().collection('shopApp')
  }, [])
  switch (verified) {
    case 'loading':
      return (
        <div align="center" style={{ height: '100vh', width: '100vw', margin: 'auto', paddingTop: '50vh' }}>
          <CircularProgress style={{ margin: 'auto' }} />
        </div>
      );
    case true:
      return <BottomNav index={props.index} />
    case false:
      return <Redirect to={`/login`} />
    case 'register':
      return <Redirect to={`/register`} />

    default:
      return <Redirect to={`/login`} />
      break;
  }
}