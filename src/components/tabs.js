import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Close,Tick} from '../img/close';
import Apple from '../img/prods/apple.jpeg'
import Banana from "../img/prods/banana.jpg"
import Beans from "../img/prods/beans.jpg"
import Bgrapes from "../img/prods/blackgrapes.jpg"
import Brinjal from "../img/prods/brinjal.jpg"
import cabbage from "../img/prods/cabbage.jpg"
import carrot from "../img/prods/carrot.jpg"
import { Link } from "react-router-dom";
import tomato from "../img/prods/tomato.jpg"
import potato from "../img/prods/potato.jpg"
import ladyfinger from "../img/prods/lady-finger.jpg"
import onions from "../img/prods/onions.jpeg"
import grapes from "../img/prods/grapes.jpg"
import guava from "../img/prods/guava.jpg"
import orange from "../img/prods/orange.jpg"
import papaya from "../img/prods/papaya.jpg"
import pomegranate from "../img/prods/pomegranate.jpg"


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [list, setList] = React.useState([]);
  React.useEffect(()=>{

  },[list]);
  const data = JSON.parse(JSON.stringify({
    veggies: [
      {
        name: 'Tomato',
        img: tomato,
        list_d: '(kg)'
      },
      {
        name: 'Brinjal',
        img: Brinjal,
        list_d: '(kg)'
      }, {
        name: 'Beans',
        img: Beans,
        list_d: '(kg)'
      }, {
        name: 'Carrot',
        img: carrot,
        list_d: '(kg)'
      }, {
        name: 'Potato',
        img: potato,
        list_d: '(kg)'
      }, {
        name: 'Lady Finger',
        img: ladyfinger,
        list_d: '(kg)'
      }, {
        name: 'Onion',
        img: onions,
        list_d: '(kg)'
      }, {
        name: 'Cabbage',
        img: cabbage,
        list_d: '(kg)'
      },
    ],
    fruites: [
      {
        name: 'Apple',
        img: Apple,
        list_d: '(kg)'
      },
      {
        name: 'Grapes',
        img: grapes,
        list_d: '(kg)'
      }, {
        name: 'Banana',
        img: Banana,
        list_d: '(kg)'
      }, {
        name: 'Black Grapes',
        img: Bgrapes,
        list_d: '(kg)'
      }, {
        name: 'Guava',
        img: guava,
        list_d: '(kg)'
      }, {
        name: 'Orange',
        img: orange,
        list_d: '(kg)'
      }, {
        name: "papaya",
        img: papaya,
        list_d: '(kg)'
      }, {
        name: 'Pomegranate',
        img: pomegranate,
        list_d: '(kg)'
      },
    ],
  }));




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* <AppBar position="static" color="default"> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
      </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}

      >
        <TabPanel value={value} index={0} dir={theme.direction} style={{ padding: '0px' }}>
          <div style={{ display: 'grid', margin: '10px', gridTemplateColumns: 'auto auto auto auto auto auto' }}>
            {data.veggies.map((data, index) => {
              return (
                <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px' }} onClick={() => {
                  var CartTemp = list
                  //    console.log(CartTemp)
                  if (CartTemp !== null) {
                    if (CartTemp.indexOf(data.name) == -1) {
                      CartTemp.unshift(data.name);
                      setList(CartTemp)
                    } else {

                      CartTemp.splice(CartTemp.indexOf(data.name), 1)
                      setList(CartTemp)
                    }
                  } else {
                    setList(CartTemp)
                  }
                  console.log(list)

                  //     if (this.state?.list?.indexOf(data.name) == -1) {
                  //         CartTemp.unshift(data.name);
                  //         this.setState({ list: CartTemp });
                  //         // console.log(this.state.list)
                  //     }
                  //     else  if (this.state?.list?.indexOf(data.name) !== -1 && CartTemp !== null) {
                  //         let data = this.state.list;
                  //         data.splice(this.state?.list?.indexOf(data.name), 1)
                  //         this.setState({ list: data })
                  //        }
                  //   if (CartTemp == null) {

                  //     }

                }}>

                  <img src={data.img} width="50px"></img>
                  <div align="center" >
                    {console.log("h")}
                    <table>
                      <tr>
                        <td>
                          <p style={{ textTransform: 'capitalize', fontSize: '12px', margin: '0px', color: list.indexOf(data.name)!== -1  ? "rgb(18, 147, 18)" : 'black' }}>{data.name}</p>
                        </td>
                        <td>
                          {list?.indexOf(data.name) !== -1 && list !== null ? <Tick className="ProdTick" /> : null}
                        </td>
                      </tr>
                    </table>

                  </div>
                </div>
              )
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
          {/* {console.log("h2")} */}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
          {/* {console.log("h3")} */}
        </TabPanel>
      </SwipeableViews>
      {list !== null && list.length ? <>
                        <br/>
                        <p style={{ textAlign: 'left', fontSize: '14px', color: 'gray', margin: '0px', padding: '0px', textIndent: '30px' }}>you can set the quantity in order page .</p>
                        <div className="bottomCart">
                            <div align="left" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '10px' }} onClick={() => {
                                setList();
                            }}><Close className="closeBut" /></div>
                            <div style={{ overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}> {list.map((data, index) => {
                                return (
                                    <p key={index} style={{ borderRadius: '50px', marginRight: '3px', fontSize: '12px', display: 'flex', padding: '3px', paddingLeft: '10px', paddingRight: '10px', textTransform: 'capitalize', border: "1px solid green" }} >{data} <div style={{ padding: '0px', margin: '0px', height: '20px' }} onClick={() => {
                                        let data = list;
                                        data.splice(index, 1)
                                        setList()
                                    }}><Close className="closeButItem" /></div></p>
                                )
                            })}</div>
                            <div align="right" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '5px', paddingLeft: '5px' }}><Link to={`/order/n/n/n/${list.join(',')}`}><input type="button" value="Add to cart" style={{ 
                                padding: '3px', paddingLeft: '15px', paddingRight: '15px', color: 'white', height: '30px', backgroundColor: 'rgb(47, 206, 113)', border: '0px solid red', borderRadius: '50px' }}></input></Link></div>

                        </div>
                    </> : null}
    </div>
  );
}
