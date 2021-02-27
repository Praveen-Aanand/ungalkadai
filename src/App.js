import './App.css';
import { SelectStore } from "./components/selectStore";
import homeimg from './img/mobshop.jpg';
import React, { Component } from 'react';
import firebase from "firebase";
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FullWidthTabs from "./components/tabs";
import ContactUs from "./components/contactUs";
import NearBy from './components/nearBy';
import Tiles from './components/Tiles';
import ProductsGrid from './components/ProductsGrid';
import Login from './pages/login';
import MyOrders from './components/Myorders';
import Typewriter from 'typewriter-effect';
import ss1 from './img/1.jpg'
import ss2 from './img/2.jpg'

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
const data = JSON.parse(JSON.stringify(
  {
    recipies: [
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F1.jpg?alt=media&token=f956e8ee-85f4-4b85-9e0c-e9838500d3dc',
        list: 'chicken(kg)-1,curd-1,Garam Masala powder-1,briyani masala-1,Turmeric powder,ghee small pack -1,mint leaves',
      },
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F2.jpg?alt=media&token=a5b02ea8-92c8-40ac-aa12-e7276d8de1b3',
        list: 'mutton(kg)-1,curd-1,Garam Masala powder-1,briyani masala-1,ghee small (pack) -1,mint leaves',
      },
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fchicken%20tikka%20masala.jpg?alt=media&token=9782cecf-72be-4b50-90d3-b700e8459401',
        list: 'chicken(kg)-1,Garam Masala powder-1,briyani masala-1,Turmeric powder(pack),ginger garlic paste (pack)-1,ghee small pack -1,mint leaves',
      },
    ]
  }
))
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "load",
      showLogin: false
    }
  }
  componentDidMount() {
    // this.props.history.listen(() => {
    //   if (window.swUpdateReady) {
    //     window.swUpdateReady = false;
    //     window.stop();
    //     window.location.reload();
    //   }
    // });
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
        this.setState({ currentUser: user ,showLogin:false})
        //console.log(user)
      } else {
        this.setState({ currentUser: "notlogin",showLogin:true})

        //console.log(user)
      }
    });
    // this.getUsers()
    
  }

  signOut=()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  tonggleLoginCard=()=>{
    this.setState({showLogin:true})
  }
   a11yProps=(index)=>{
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  render() {
    // if (this.state.currentUser == 'load') {
    //   return (
    //     <h2>Loading...</h2>
    //   )
    // }

    // else if (this.state.currentUser == 'notlogin') {
    //   return (
    //     <Redirect to="/login" />
    //   )
    // }
    // else {
    return (
      <div align="center" className="App">
        {/* <img src={homeimg} style={{ width: "100%" }}></img> */}
        <div className="MainBanner">
          <img src={homeimg} className="mainImg" height="80%" />
          <h1>Ungakadai</h1>
          {/* <h6 >Local store shopping</h6> */}
         <Typewriter
                    options={
                        {
                            loop: true,
                            devMode: false,
                            cursor:false
                        }
                    }
                    onInit={(typewriter) => {

                        typewriter.typeString('<h6>Local store shopping</h6>')
                            .callFunction(() => {
                                // console.log('typed');
                            })
                            .pauseFor(2500)
                            .deleteAll()
                            .typeString('<h6>Local Market in your pocket</h6>')
                            .callFunction(() => {
                                // console.log('deleted');
                            })
                            .start();
                    }}

                />
          <div>
            {this.state.currentUser?.uid == undefined ?
              <input type="button" onClick={() => {this.setState({showLogin:true}) }} value="Login"></input> :
              <> <Link to='/order'>
                <input type="button" value="Place Order"></input>
              </Link>
                <a href="#myorders"><input style={{ color: ' rgb(69, 187, 30)', backgroundColor: 'white', border: '1px solid rgb(69, 187, 30)', background: 'rgba(255, 255, 255, 0.811)' }} type="button" value="My Orders"></input></a>
              </>
            }
          </div>
        </div>
        <br />
        <div className="MainHeader">
         <div style={{display:'flex-root',overflowX:'scroll',}}>
        <table style={{marginLeft:'10px'}}>
          <tr>
            <td> <img src={ss1} width="300 "></img></td>
            <td> <img src={ss2} width="300"></img></td>
          </tr>
        </table>
         </div>


         <FullWidthTabs/>



         <br/>
          <h4 style={{ textAlign: "left", textIndent: '10px', marginTop: '0px', marginBottom: '5px' }}>Suggestions</h4>
          <ProductsGrid />
          <br/>
          <Tiles data={data.recipies} title="Cook @ home (Bundle)" height="120" width="120" sub='just one tap to fill list' />
          <br/>
          <NearBy />
          {/* <SelectStore /> */}
          <br/>
          <MyOrders uid={this.state.currentUser.uid} tonggleLogin={()=>this.tonggleLoginCard()} />
            <br/>
          
           {this.state.currentUser.uid? <div>
            <ContactUs auth={this.state.currentUser}/>
            <br/>
              <b>{this.state.currentUser.phoneNumber}</b>
              <br/>
              <input type="button" value='Logout' onClick={()=>{this.signOut()}} style={{ color: 'rgb(250, 68, 65)', backgroundColor: 'white', border: '1px solid rgb(250, 68, 65)', background: 'rgba(255, 255, 255, 0.811)' }} />
            </div>:null}
        <br/>
        </div>
        
        <div style={{ position: "absolute", top: '0px', right: '0px', fontSize: '9px', }}>
          v-0.0.1(beta)
          </div>
        <br />
        <br /><br />
        {this.state.showLogin ? <div style={{ position: 'fixed', left: '0px', bottom: '0px', width:'100%'}} align="center">
          <div style={{ position: 'fixed', left: '0px', top: '0px',width:'100%',height:'100%', padding: '0px',backgroundColor:'rgba(107, 108, 107, 0.39)' }} onClick={()=>this.setState({showLogin:false})} ></div>
          <Login/>
        </div> : null}
       
      </div>
    )
  }
}
// }
export default withRouter(App);


// self.addEventListener('install', function() {
//   self.skipWaiting();
// });
