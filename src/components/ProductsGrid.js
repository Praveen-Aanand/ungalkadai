import React, { useState, useEffect, Component } from 'react';
import Tabs from 'react-simply-tabs';
import {Close,Tick} from '../img/close';
import { Link } from "react-router-dom";
import Apple from '../img/prods/apple.jpeg'
import Banana from "../img/prods/banana.jpg"
import Beans from "../img/prods/beans.jpg"
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
            apple: Apple,
            grapes:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fgrapes.jpg?alt=media',
            banana:Banana,
            black_grapes:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fblackgrapes.jpg?alt=media',
            guava:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fguava.jpg?alt=media',
            orange:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Forange.jpg?alt=media',
            papaya:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fpapaya.jpg?alt=media',
            pomegranate:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fpomegranate.jpg?alt=media'
        },
        snacks:{
            lays:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Flays.jpg?alt=media&token=cf6d0490-81c6-41db-a39a-eeb3afb1b3a9',
            good_day:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fgoodday.jpeg?alt=media&token=1af0577a-f7a6-4b1c-9f32-bce8829cb2ae',
            kadalai_mettai:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fkadalai-mittai.jpg?alt=media&token=ad958a40-9c5e-4de9-8b13-104986f0e3aa',
            nabati:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fnabati.jpeg?alt=media&token=63a87daa-a3f8-4e10-b8c8-9e1762d7fbf0',
            oreo:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Foreo.jpg?alt=media&token=93a38d59-fb46-4204-a7bc-88868003d6a7',
            diary_milk:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fdiarymilk.jpeg?alt=media&token=de68c722-a2bd-448c-b7c8-f924b3c5dd34',
            fanta:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Ffanta.jpg?alt=media&token=8a214099-6e61-49e9-93f8-9811eee793c4',
            dark_fantasy:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fdark-fantasy.jpeg?alt=media&token=4b350b8d-9211-4290-a608-ef6608055ae2'
        },
        sweets:{
            laddu:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fladdu.jpg?alt=media&token=67583b8d-c218-44e8-b18e-a291d54ef0ab',
            mysore_pak:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fmysore-pak.jpg?alt=media&token=8274c88d-ad43-4f12-a16c-e4e340bdfe39',
            samosa:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fsamosa.jpg?alt=media&token=604ef12b-8852-423c-8ab2-6b6cb5953410',
            sandwich:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fsandwich.jpg?alt=media&token=586dcd30-521d-4d48-a74c-4e1345f30e06',
            ice_cream:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fice-cream.jpg?alt=media&token=213a4b0b-9686-4569-aea1-a1a800791241',
            jilebi:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fjilebi.jpg?alt=media&token=955db938-66f1-4438-b924-487791d2851d',
            gulab_jamun:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fgulab-jamun.jpg?alt=media&token=e083e6a5-6eb9-4296-8ab3-3a3bda61a49d',
            birth_day_cake:'https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FhomepageIMG%2Fbirthday-cake.jpeg?alt=media&token=071cba5a-9060-4f35-bc96-d52f055603af'
        }
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
            for (var key in data.snacks) {

                // console.log(key)
                // console.log(data.fruites[key])
                proddata.push({ name: key, img: data.snacks[key] })

            }
            setProductData({ data: proddata })
        }
        if (activeTabIndex == 3) {
            let proddata = [];
            for (var key in data.sweets) {

                // console.log(key)
                // console.log(data.fruites[key])
                proddata.push({ name: key, img: data.sweets[key] })

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
                                <div key={index} align="center" style={{ margin: '0px', marginBottom: '5px'}} onClick={() => {
                                    var CartTemp = this.state.list
                                //    console.log(CartTemp)
                                    if (CartTemp!==null) {
                                        if (CartTemp.indexOf(data.name)==-1) {
                                            CartTemp.unshift(data.name);
                                            this.setState({ list: CartTemp });
                                        }else{
                                            
                                            CartTemp.splice(CartTemp.indexOf(data.name), 1)
                                            this.setState({ list: CartTemp })
                                        }
                                    }else{
                                        this.setState({ list: [data.name] })
                                    }

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

                                    <img src={data.img} width="70px" height="70px"></img>
                                    <div align="center" >
                                        <table>
                                            <tr>
                                                <td>
                                                <p style={{ textTransform: 'capitalize', fontSize:'12px',margin: '0px', color:this.state?.list?.indexOf(data.name) !==-1 && this.state.list !==null?"rgb(18, 147, 18)":'black' }}>{data.name}</p>
                                                </td>
                                                <td>
                                                {this.state?.list?.indexOf(data.name) !==-1 && this.state.list !==null?<Tick className="ProdTick"/>:null}
                                                </td>
                                            </tr>
                                        </table>

                                    </div>
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
                            }}><Close className="closeBut" /></div>
                            <div style={{ overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}> {this.state.list.map((data, index) => {
                                return (
                                    <p key={index} style={{ borderRadius: '50px', marginRight: '3px', fontSize: '12px', display: 'flex', padding: '3px', paddingLeft: '10px', paddingRight: '10px', textTransform: 'capitalize', border: "1px solid green" }} >{data} <div style={{ padding: '0px', margin: '0px', height: '20px' }} onClick={() => {
                                        let data = this.state.list;
                                        data.splice(index, 1)
                                        this.setState({ list: data })
                                    }}><Close className="closeButItem" /></div></p>
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