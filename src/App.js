import './App.css';
import { SelectStore } from "./components/selectStore";
import homeimg from './img/home.png';
import { Component } from 'react';
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import MyOrder from "./components/Myorders";
import { withRouter } from 'react-router-dom';
import ContactUs from "./components/contactUs";
import NearBy from './components/nearBy';
import Tiles from './components/Tiles';
// function App() {
//   return (
//     <div align="center" className="App">
//       <img src={homeimg} style={{width:"100%"}}></img>
//       <div className="MainHeader">
//         <SelectStore />
//         <MyOrders/>
//       </div>
//     </div>
//   );
// }
const data=JSON.parse(JSON.stringify(
  {
    recipies:[
      {
        img:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F1.jpg?alt=media&token=f956e8ee-85f4-4b85-9e0c-e9838500d3dc',
        list:'chicken(kg)-1,curd-1,Garam Masala powder-1,briyani masala-1,Turmeric powder,ghee small pack -1,mint leaves',
      },
      {
        img:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F2.jpg?alt=media&token=a5b02ea8-92c8-40ac-aa12-e7276d8de1b3',
        list:'mutton(kg)-1,curd-1,Garam Masala powder-1,briyani masala-1,ghee small (pack) -1,mint leaves',
      },
      {
        img:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fchicken%20tikka%20masala.jpg?alt=media&token=9782cecf-72be-4b50-90d3-b700e8459401',
        list:'chicken(kg)-1,Garam Masala powder-1,briyani masala-1,Turmeric powder(pack),ginger garlic paste (pack)-1,ghee small pack -1,mint leaves',
      },
    ]
  }
))
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "load",
    }
  }
  componentDidMount() {
    this.props.history.listen(() => {
      if (window.swUpdateReady) {
        window.swUpdateReady = false;
        window.stop();
        window.location.reload();
      }
    });
    var firebaseConfig = {
      apiKey: "AIzaSyCOCrbg825KuNFIEz-MutP4qHErSZga520",
      authDomain: "ungakadai.firebaseapp.com",
      projectId: "ungakadai",
      storageBucket: "ungakadai.appspot.com",
      messagingSenderId: "308299846904",
      appId: "1:308299846904:web:8e6b785e1800eca3f8170d",
      measurementId: "G-PW74QPHN0Z"
    };
    // //console.log(this.props.match.params.pincode, this.props.match.params.parms)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user })
        //console.log(user)
      } else {
        this.setState({ currentUser: "notlogin" })
        //console.log(user)
      }
    });
    // this.getUsers()
  }

  render() {
    if (this.state.currentUser == 'load') {
      return (
        <h2>Loading...</h2>
      )
    }

    else if (this.state.currentUser == 'notlogin') {


      return (
        <Redirect to="/login" />
      )
    }
    else {
      return (
        <div align="center" className="App">
          <img src={homeimg} style={{ width: "100%" }}></img>
          <div className="MainHeader">
            
            <NearBy/>
            <Tiles data={data.recipies} title="cook @ home" height="150" width="150" sub='just one tap to fill list'/>
            <SelectStore />
            <MyOrder uid={this.state.currentUser.uid} />
            <br/>
            <ContactUs auth={this.state.currentUser}/>
          </div>
          <div style={{position:"absolute",top:'0px',right:'0px',fontSize:'9px',}}>
            v-0.0.1(beta)
          </div>
          <br/>
          <br/><br/>
        </div>
      )
    }
  }
}
export default withRouter(App);


// self.addEventListener('install', function() {
//   self.skipWaiting();
// });
