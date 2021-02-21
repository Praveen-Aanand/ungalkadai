import React, { useState, useEffect, Component } from 'react';
import Tabs from 'react-simply-tabs';
import Globe from '../img/close';
import { Link } from "react-router-dom";


export default function ProductsGrid() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [poductData, setProductData] = useState(0);
    // const [cartData, setCartData] = useState([]);
    const data = JSON.parse(JSON.stringify({
        veggies: {
            tomato: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Ftomato.jpg?alt=media',
            brinjal: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fbrinjal.jpg?alt=media&token=db5f5847-47ef-4ef9-a0ec-76e74a02337b',
            beans: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fbeans.jpg?alt=media&token=611966d5-1012-4d44-bea0-99e5b016cc36',
            carrot: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fcarrot.jpg?alt=media&token=2f88f927-1607-4cb5-a0c3-12cb75763361',
            potato: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fpotato.jpg?alt=media&token=23852f68-dcb7-43ce-ae53-af8a3f545d46',
            ladyfinger: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Flady-finger.jpg?alt=media&token=5bba47ec-55bd-44a5-9b5b-d7fd4f0f7356',
            onions: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fonions.jpeg?alt=media&token=bf939d29-3711-42fa-aa22-232811ab9686',
            cabbage: "https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fcabbage.jpg?alt=media&token=fcd3c2d1-7cce-4f1f-a5dc-d79edb60ea2d"
        },
        fruites: {
            apple: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F1.jpg?alt=media&token=f956e8ee-85f4-4b85-9e0c-e9838500d3dc',
            orange: 'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2F1.jpg?alt=media&token=f956e8ee-85f4-4b85-9e0c-e9838500d3dc'
        },

    }));

    // function handleChange(newValue) {

    //     console.log(cartData)
    // }

    useEffect(() => {
        //console.log('Listening: ', images);

        if (activeTabIndex == 0) {
            let proddata = [];
            for (var key in data.veggies) {

                // console.log(key)
                // console.log(data.veggies[key])
                proddata.push({ name: key, img: data.veggies[key] })

            }
            setProductData({ data: proddata })
        }
        if (activeTabIndex == 1) {
            let proddata = [];
            for (var key in data.fruites) {

                // console.log(key)
                // console.log(data.fruites[key])
                proddata.push({ name: key, img: data.fruites[key] })

            }
            setProductData({ data: proddata })
        }
        if (activeTabIndex == 2) {
            let proddata = [];
            for (var key in data.fruites) {

                // console.log(key)
                // console.log(data.fruites[key])
                proddata.push({ name: key, img: data.fruites[key] })

            }
            setProductData({ data: proddata })
        }
        if (activeTabIndex == 3) {
            let proddata = [];
            for (var key in data.fruites) {

                // console.log(key)
                // console.log(data.fruites[key])
                proddata.push({ name: key, img: data.fruites[key] })

            }
            setProductData({ data: proddata })
        }

    }, [activeTabIndex]);

    return (
        <div>
            <Tabs
                activeTabIndex={activeTabIndex}
                onRequestChange={setActiveTabIndex}
                controls={[
                    <button className="Sugmenu" type="button">
                        Daily veggies
                       </button>,
                    <button className="Sugmenu"  type="button">
                        Fruits
                          </button>,
                    <button className="Sugmenu"  type="button">
                        Snacks
                           </button>,
                    <button className="Sugmenu"  type="button">
                        Sweets & bakery
                       </button>,

                ]}
            >

            </Tabs>
            {/* 
            {poductData ? <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto' }}>
                {poductData.data.map((data, index) => {
                    //    console.log(data.img)
                    return (
                        <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px' }} onClick={() => {
                            var CartTemp = cartData;

                            if (cartData.indexOf(data.name) == -1) {
                                CartTemp.push(data.name);
                                setCartData(CartTemp);
                            }
                            console.log(cartData)
                        }}>

                            <img src={data.img} width="70px" height="70px"></img>
                            <p style={{ textTransform: 'capitalize', margin: '0px' }}>{data.name}</p>
                        </div>
                    )
                })}
            </div> : null} */}
            <Grid cato={poductData}></Grid>

        </div>
    );
};

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    render() {
        if (this.props?.cato) {
            return (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto' }}>
                        {this.props.cato.data.map((data, index) => {
                            // console.log(data.img)
                            return (
                                <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px' }} onClick={() => {
                                    var CartTemp = this.state.list
                                    if (CartTemp == null) {
                                        this.setState({ list: [data.name] })
                                    }
                                    if (this.state?.list?.indexOf(data.name) == -1) {
                                        CartTemp.unshift(data.name);
                                        this.setState({ list: CartTemp });
                                        // console.log(this.state.list)
                                    }
                                }}>

                                    <img src={data.img} width="70px" height="70px"></img>
                                    <p style={{ textTransform: 'capitalize', margin: '0px' }}>{data.name}</p>
                                </div>
                            )
                        })}

                    </div>
                    
                    {this.state.list !== null && this.state.list.length ? <>
                        <br/>
                        <p style={{ textAlign: 'left', fontSize: '14px', color: 'gray', margin: '0px', padding: '0px', textIndent: '30px' }}>you can set the quantity in order page .</p>
                        <div className="bottomCart">
                            <div align="left" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '10px' }} onClick={() => {
                                this.setState({ list: [] });
                            }}><Globe className="closeBut" /></div>
                            <div style={{ overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}> {this.state.list.map((data, index) => {
                                return (
                                    <p key={index} style={{ borderRadius: '50px', marginRight: '3px', fontSize: '12px', display: 'flex', padding: '3px', paddingLeft: '10px', paddingRight: '10px', textTransform: 'capitalize', border: "1px solid green" }} >{data} <div style={{ padding: '0px', margin: '0px', height: '20px' }} onClick={() => {
                                        let data = this.state.list;
                                        data.splice(index, 1)
                                        this.setState({ list: data })
                                    }}><Globe className="closeButItem" /></div></p>
                                )
                            })}</div>
                            <div align="right" style={{ marginTop: 'auto', marginBottom: 'auto', paddingRight: '5px', paddingLeft: '5px' }}><Link to={`/order/n/n/n/${this.state.list.join(',')}`}><input type="button" value="Add to cart" style={{ 
                                padding: '3px', paddingLeft: '15px', paddingRight: '15px', color: 'white', height: '30px', backgroundColor: 'rgb(47, 206, 113)', border: '0px solid red', borderRadius: '50px' }}></input></Link></div>

                        </div>
                    </> : null}
                </div>
            )
        } else {
            return (
                <div>null</div>
            )
        }

    }
}