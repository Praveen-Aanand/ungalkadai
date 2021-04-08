import React from "react";
import ReactFormInputValidation from "react-form-input-validation";
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase'
import firebaseConfig from "../firebase";
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        pincode: "",
        ownername: "",
      },
      already: false,
      phone: '',
      errors: {}
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      name: "required",
      ownername: 'required',
      pincode: "required|numeric|digits:6",
    });
    this.form.onformsubmit = (fields) => {
      // Do you ajax calls here.
      console.log(fields)
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({ phone: user.phoneNumber })
        firebase.firestore().collection('Support').doc(user.phoneNumber).get().then((doc) => {
          if (doc.exists) {
            this.setState({ already: true })
          } else {
            this.setState({ already: false })
          }
        })

      } else {
        console.log('hello')

        return <Redirect to={`/login`} />
      }
    });
  }
  RegisterUpload() {
    firebase.firestore().collection('Support').doc(this.state.phone).set({
      type: 'Register',
      ShopName: this.state.fields.name,
      Owner: this.state.fields.ownername,
      pincode: this.state.fields.pincode,
      phone: this.state.phone
    }).then(() => {
      this.setState({ already: true })
    }).catch(() => {
      console.log('over')
    })
  }
  render() {
    return (<React.Fragment>
      <div align="center" style={{paddingTop:'20px'}}>
        {this.state.already ? <div style={{ width: '100vw', height: '100vh' }}>
        <h2>Registered</h2>
          Our Team will contact you soon.
        </div> : <div>
          <h2>Register Now</h2>
          <form onSubmit={this.form.onformsubmit}>

            <TextField
              style={{ margin: '10px', padding: '0px' }}
              error={this.state.errors.name ? true : false}
              id="Name"
              label="Shop Name"
              name="name"
              variant="outlined"
              value={this.state.fields.name}
              onBlur={this.form.handleBlurEvent}
              onChange={this.form.handleChangeEvent}
              helperText={this.state.errors.name ? this.state.errors.name : ""}
            />
            <TextField
              style={{ margin: '10px', padding: '0px' }}

              error={this.state.errors.ownername ? true : false}
              id="oName"
              label="Owner Name"
              name="ownername"
              variant="outlined"
              value={this.state.fields.ownername}
              onBlur={this.form.handleBlurEvent}
              onChange={this.form.handleChangeEvent}
              helperText={this.state.errors.ownername ? this.state.errors.ownername : ""}
            />
            <TextField
              style={{ margin: '10px', padding: '0px' }}

              error={this.state.errors.pincode ? true : false}
              id="pincode"
              label="pincode"
              name="pincode"
              variant="outlined"
              onBlur={this.form.handleBlurEvent}
              onChange={this.form.handleChangeEvent}
              value={this.state.fields.pincode}
              helperText={this.state.errors.pincode ? this.state.errors.pincode : ""}
            />
            <TextField
              style={{ margin: '10px', padding: '0px' }}

              disabled={true}
              id="phone"
              label="PhoneNumber"
              name="phone"
              variant="outlined"
              value={this.state.phone}
            />
            <br />
            <br />
            <Button variant="contained" color="secondary" onClick={()=>this.RegisterUpload()}>
              Submit
          </Button>
            <br /><br />
            <Typography variant="subtitle2" color="initial" style={{ maxWidth: "200px", color: 'gray' }}>
              Make sure your phone number is avalable to take calls.
          </Typography>
          </form></div>}
        <div></div>

      </div>
    </React.Fragment>)
  }
}