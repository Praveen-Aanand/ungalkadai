import React, { useState, useEffect, Component } from 'react';
// import Tabs from 'react-simply-tabs';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from 'react-swipeable-views';
import { Close, Tick } from '../img/close';
import { Link } from "react-router-dom";
import Apple from '../img/prods/apple.jpeg'
import Banana from "../img/prods/banana.jpg"
import Beans from "../img/prods/beans.jpg"
import Bdc from "../img/prods/birthday-cake.jpeg"
import Bgrapes from "../img/prods/blackgrapes.jpg"
import Brinjal from "../img/prods/brinjal.jpg"
import cabbage from "../img/prods/cabbage.jpg"
import carrot from "../img/prods/carrot.jpg"
import dark_fantasy from "../img/prods/dark-fantasy.jpeg"
import diary_milk from "../img/prods/diarymilk.jpeg"
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

export default function ProductsGrid() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [poductData, setProductData] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    // const [cartData, setCartData] = useState([]);
    
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

  

    return (
        <div>
          
           
            <Grid cato={data} theme={theme} classes={classes}></Grid>

        </div>
    );
};


class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: 0
        }
    }
    
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };
    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };
    render() {
       console.log(this.props.cato)
        if (this.props?.cato) {
            return (
                <>
                    <div style={{ width: '100%' }}>
                        {/* <AppBar position="static" color="default"> */}
                        <Tabs
                        TabIndicatorProps={{style: {background:'green'}}}
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={{color:'green'}}
                            // inkBarStyle={{background: 'blue'}}
                            indicatorColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="vegitables"  {...a11yProps(0)} />
                            <Tab label="fruites" {...a11yProps(1)} />
                            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                        </Tabs>
                        {/* </AppBar> */}
                        <SwipeableViews
                            axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}

                        >
                            <TabPanel value={this.state.value} index={0} dir={this.props.theme.direction} style={{ padding: '0px' }}>
                                
                                <div style={{ display: 'grid', margin: '5px', gridTemplateColumns: 'auto auto auto auto auto' }}>
                                    
                                    {this.props?.cato?.veggies.map((data, index) => {
                                        return (
                                            <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px' }} onClick={() => {
                                                var CartTemp = this.state.list;
                                                   console.log(CartTemp)
                                                if (CartTemp !== null) {
                                                    if (CartTemp.indexOf(data.name) == -1) {
                                                        CartTemp.unshift(data.name);
                                                        this.setState({list:CartTemp})
                                                    } else {

                                                        CartTemp.splice(CartTemp.indexOf(data.name), 1)
                                                        this.setState({list:CartTemp})
                                                    }
                                                } else {
                                                    this.setState({list:CartTemp})
                                                }
                                                console.log(this.state.list)


                                            }}>

                                                <img src={data.img} width="50px"></img>
                                                <div align="center" >
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <p style={{ textTransform: 'capitalize', fontSize: '12px', margin: '0px', color: this.state?.list?.indexOf(data.name) !== -1 && this.state.list !==null? "rgb(18, 147, 18)" : 'black' }}>{data.name}</p>
                                                            </td>
                                                            <td>
                                                                {this.state?.list?.indexOf(data.name) !== -1 && this.state?.list !== null ? <Tick className="ProdTick" /> : null}
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1} dir={this.props.theme.direction}>
                            <div style={{ display: 'grid', margin: '5px', gridTemplateColumns: 'auto auto auto auto auto '}}>
                                    
                                    {this.props?.cato?.fruites.map((data, index) => {
                                        return (
                                            <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px' }} onClick={() => {
                                                var CartTemp = this.state.list;
                                                   console.log(CartTemp)
                                                if (CartTemp !== null) {
                                                    if (CartTemp.indexOf(data.name) == -1) {
                                                        CartTemp.unshift(data.name);
                                                        this.setState({list:CartTemp})
                                                    } else {

                                                        CartTemp.splice(CartTemp.indexOf(data.name), 1)
                                                        this.setState({list:CartTemp})
                                                    }
                                                } else {
                                                    this.setState({list:CartTemp})
                                                }
                                                console.log(this.state.list)


                                            }}>

                                                <img src={data.img} width="50px"></img>
                                                <div align="center" >
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <p style={{ textTransform: 'capitalize', fontSize: '12px', margin: '0px', color: this.state?.list?.indexOf(data.name) !== -1 && this.state.list !==null? "rgb(18, 147, 18)" : 'black' }}>{data.name}</p>
                                                            </td>
                                                            <td>
                                                                {this.state?.list?.indexOf(data.name) !== -1 && this.state?.list !== null ? <Tick className="ProdTick" /> : null}
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={2} dir={this.props.theme.direction}>
                                Item Three
                    {/* {console.log("h3")} */}
                            </TabPanel>
                        </SwipeableViews>
                        {this.state.list !== null && this.state.list.length ? <>
                            <br />
                            <p style={{ textAlign: 'left', fontSize: '14px', color: 'gray', margin: '0px', padding: '0px', textIndent: '30px' }}>you can set the quantity in order page .</p>
                            <div className="bottomCart">
                                <div align="left" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '10px' }} onClick={() => {
                                    
                                    this.setState({list:[]})
                                }}><Close className="closeBut" /></div>
                                <div style={{ overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}> {this.state.list.map((data, index) => {
                                    return (
                                        <p key={index} style={{ borderRadius: '50px', whiteSpace:'nowrap' , marginRight: '3px', fontSize: '12px', display: 'flex', padding: '3px', paddingLeft: '10px', paddingRight: '10px', textTransform: 'capitalize', border: "1px solid green" }} >{data} <div style={{ padding: '0px', margin: '0px', height: '20px' }} onClick={() => {
                                            let data = this.state.list;
                                            data.splice(index, 1)
                                            this.setState({list:[]})
                                        }}><Close className="closeButItem" /></div></p>
                                    )
                                })}</div>
                                <div align="right" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '5px', paddingLeft: '5px' }}><Link to={`/order/n/n/n/${this.state.list.join(',')}`}><input type="button" value="Add to cart" style={{
                                    padding: '3px', paddingLeft: '15px', paddingRight: '15px', color: 'white', height: '30px', backgroundColor: 'rgb(47, 206, 113)', border: '0px solid red', borderRadius: '50px'
                                }}></input></Link></div>

                            </div>
                        </> : null}
                    </div>

      

                </>
            )
        } else {
            return (
                <div>null</div>
            )
        }

    }
}