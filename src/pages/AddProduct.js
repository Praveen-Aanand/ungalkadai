import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactFormInputValidation from "react-form-input-validation";
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase'
import firebaseConfig from "../firebase";
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default function AddProducts() {
  return (
    <div>
      <AppBarThis />
      <FormArea />
    </div>
  )
}

function AppBarThis() {

  return (
    <AppBar position="static" style={{ background: 'white' }} elevation={3} >
      <Toolbar variant="dense">
        <Typography variant="subtitle2" style={{ color: 'gray' }} >
          Add Products
                </Typography>
      </Toolbar>
    </AppBar>
  )
}

class FormArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        productName: "",
        MRP: '',
        price: '',
        images: [],
        description: ''
      },
      images: [],
      loading: false,
      phone: '',
      errors: {}
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      productName: "required|between:8,25",
      MRP: 'required|numeric|between:1,100000',
      price: "required|numeric|between:1,100000",
      description: 'required'

    });
    this.form.onformsubmit = (fields) => {
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
    return (
      <React.Fragment>
        <div align="center" style={{ paddingTop: '20px' }}>
          {this.state.loading ? <div style={{ width: '100vw', height: '100vh' }}>
            <h2>Registered</h2>
          Our Team will contact you soon.
        </div> : <div>
            <form onSubmit={this.form.onformsubmit}>

              <TextField
                style={{ margin: '10px', padding: '0px' }}
                error={this.state.errors.productName ? true : false}
                id="Name"
                label="Product Name"
                name="productName"
                variant="outlined"
                data-attribute-name="Product Name"
                value={this.state.fields.productName}
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                helperText={this.state.errors.productName ? this.state.errors.productName : ""}
              />

              <div width="100%">
                <table>
                  <tr id="imgList">
                    {this.state.images.map((data,index) => {
                      return (
                        <td key={index}>
                          <img src={data} width="100px"/>
                        </td>
                      )
                    })}
                  </tr>
                </table>
              </div>
              <div>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onInput={(e) => {
                    var fReader = new FileReader();
                    fReader.readAsDataURL( e.target.files[0]);
                   
                    fReader.onload = ()=>{
                      this.setState({ images: [fReader.result] })
                  }
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
        </Button>
                </label>
              </div>
              <button >Add image</button> <br />
              <TextField
                style={{ margin: '10px', padding: '0px' }}
                error={this.state.errors.MRP ? true : false}
                type="number"
                id="mrp"
                label="MRP"
                name="MRP"
                variant="outlined"
                value={this.state.fields.MRP}
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                helperText={this.state.errors.MRP ? this.state.errors.MRP : ""}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <AccountCircle />
              //     </InputAdornment>
              //   ),
              // }}
              />
              <TextField
                style={{ margin: '10px', padding: '0px' }}
                error={this.state.errors.price ? true : false}
                type="number"
                id="price"
                label="Selling price"
                name="price"
                variant="outlined"
                value={this.state.fields.price}
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                helperText={this.state.errors.price ? this.state.errors.price : ""}
              />
              <TextField
                style={{ margin: '10px', padding: '0px' }}
                multiline
                error={this.state.errors.description ? true : false}
                id="dis"
                label="Description"
                name="description"
                variant="outlined"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.description}
                helperText={this.state.errors.description ? this.state.errors.description : ""}
              />
              <br />
              <br />
              <Button variant="contained" color="secondary" onClick={() => this.RegisterUpload()}>
                Submit
          </Button>
              <br /><br />
              <Typography variant="subtitle2" color="initial" style={{ maxWidth: "200px", color: 'gray' }}>
                Make sure your phone number is avalable to take calls.
          </Typography>
            </form></div>}
          <div></div>

        </div>
      </React.Fragment>
    )
  }
}


