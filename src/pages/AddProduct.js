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
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import '../App.css'
export default function AddProducts() {
  Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  return (
    <div>
      <AppBarThis />
      <FormArea />
    </div>
  )
}

function AppBarThis() {
 
  let history = useHistory();
  return (
    <AppBar position="static" style={{ background: 'white' }} elevation={3} >

      <Toolbar variant="dense">
        <IconButton>
        <ArrowBackRoundedIcon style={{color:'gray'}}  onClick={() => history.goBack()}/>
        </IconButton>
        
        <Typography variant="h6" style={{ color: 'gray' }} >
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
                style={{ margin: '10px', padding: '0px', minWidth: '300px' }}
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

              <div width="100%" style={{ overflowX: 'scroll' }}>
                {this.state.images.length ? <table>
                  <tr id="imgList">
                    {this.state.images.map((data, index) => {
                      return (
                        <td key={index}>
                          <div className="imageContainerEditor">
                            <CancelRoundedIcon className="close" onClick={() => {
                              var temp = this.state.images;
                              temp.remove(data);
                              this.setState({images:temp})
                            }} /><br />
                            <img src={data} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                </table> : <div >
                  <AddAPhotoRoundedIcon style={{ fontSize: 40, padding: "30px", backgroundColor: 'rgb(222, 222, 222)' }} onClick={()=>{
                    document.getElementById('imgup').click();
                  }}/>
                </div>}
              </div>
              <div>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onInput={async (e) => {

                    for (let index = 0; index < e.target.files.length; index++) {
                      var fReader = new FileReader();
                      await fReader.readAsDataURL(e.target.files[index]);

                      fReader.onload = async (ele) => {
                        // console.log(fReader.result, index, e.target.files[index])
                        await this.setState({ images: [...this.state.images, ele.target.result] })
                      }
                    }



                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" id="imgup" color="gray" component="span">
                    select images
                  </Button>
                </label>
              </div>
              <TextField
                style={{ margin: '10px', padding: '0px', minWidth: '300px' }}
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
                style={{ margin: '10px', padding: '0px', minWidth: '300px' }}
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
              /><br />
              <TextField
                style={{ margin: '10px', padding: '0px', minWidth: '300px' }}
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

            </form></div>}

          <Typography variant="subtitle2" color="initial" style={{ maxWidth: "200px", color: 'gray' }}>
            images must be in square (1:1)
            </Typography>
        </div>
      </React.Fragment>
    )
  }
}


