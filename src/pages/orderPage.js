import { Component, useState, useEffect } from "react"
import '../App.css'
import firebase from "firebase";
import MultiImageInput from 'react-multiple-image-input';
import { Link, Redirect } from "react-router-dom";
import BackArrow from '../img/arrow-left-solid.svg'
// import { firebaseConfig } from "../components/firebase";
export default class OrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAdds: false,
            address: null,
            orderFinish: false,
            userpin: "",
            useraddress: "",
            pictures: [],
            list: [{ name: '', quant: 1 }],
            shopname: "" || this.props.match.params.shop != "n" ? this.props.match.params.shop : "",
            shopaddress: "" || this.props.match.params.address != "n" ? this.props.match.params.address : "",
            addPic: false
        }
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount() {

        // //console.log(this.props.match.params.pincode, this.props.match.params.parms)
        console.log(this.props.match.params.cato)
        console.log(this.props.match.params.list)
        if (this.props.match.params?.list) {
            console.log(this.props.match.params?.list)
            var data = [];
            this.props.match.params.list.split(",").map((item) => {
                console.log(item)
                let datalist = item.split("-");
                //    console.log({name:datalist[0],quant:1|| parseInt(datalist[1])})
                data.push({ name: datalist[0], quant: parseInt(datalist[1] || 1) } || 1)
            })
            data.push({ name: '', quant: 1 })
            this.setState({ list: data })
        }
        var firebaseConfig = {
            apiKey: "AIzaSyCOCrbg825KuNFIEz-MutP4qHErSZga520",
            authDomain: "ungakadai.firebaseapp.com",
            projectId: "ungakadai",
            storageBucket: "ungakadai.appspot.com",
            messagingSenderId: "308299846904",
            appId: "1:308299846904:web:8e6b785e1800eca3f8170d",
            measurementId: "G-PW74QPHN0Z"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
        } else {
            firebase.app(); // if already initialized, use that one
        }
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({ currentUser: user })
                var ads = await JSON.parse(localStorage.getItem('adds' + user.uid));
                if (ads) {
                    console.log(ads)
                    this.setState({ userpin: ads.userpin, useraddress: ads.useraddress });
                }
            } else {
                this.setState({ currentUser: user })
            }
        });
    }

    tonggleImg = () => {
        if (this.state.addPic === true) {
            var dom = document.getElementById('addIMG');
            dom.style.backgroundColor = "rgb(69, 180, 13)";
            dom.value = '+ Add';
            this.setState({ addPic: false, picture: [] })
        } else {
            var dom = document.getElementById('addIMG');
            dom.value = 'Remove';
            dom.style.backgroundColor = "red";

            this.setState({ addPic: true, picture: [] })
        }
    }

    changeName = (e, i) => {
        var temp = this.state.list;
        //console.log(temp.length, i)
        if (temp.length - 1 == i) {
            this.addItem();
        }
        temp[i].name = e.target.value;
        this.setState({ list: temp })
    }
    changeQuant = (e, i) => {
        var temp = this.state.list;
        // //console.log(temp)
        if (e < 1 && temp.length !== 1) {

            this.removeItem(i)
        } else {
            temp[i].quant = e;
            this.setState({ list: temp })
        }

    }
    removeItem = (i) => {
        var temp = this.state.list;
        temp.splice(i, 1);
        this.setState({ list: temp })
    }
    addItem = () => {
        var temp = this.state.list;
        temp.push({ name: '', quant: 1 })
        this.setState({ list: temp });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
        console.log("jh", this.state.pictures)
    }

    // tonggleAds=(bol)=>{
    //     document
    // }
    placeOrder = async () => {
        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }
        function createUUID() {
            return 'xxxx-xxxx-4xxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        var uid = createUUID();


        var useraddress = {
            userpin: this.state.userpin,
            useraddress: this.state.useraddress
        }
        localStorage.setItem("adds" + this.state.currentUser.uid, JSON.stringify(useraddress))
        document.getElementsByClassName('loder')[0].style.display = 'block';
        var images = [];
        if (this.state.pictures[0]) {
            //console.log("picture here")
            for (var key of Object.keys(this.state.pictures)) {
                //console.log(key + " -> " + this.state.pictures[key])
                var ref = await firebase.storage().ref().child('images/useruploads/' + uid + '/' + createUUID() + '.jpg');
                var fdata = await b64toBlob(this.state.pictures[key]);
                var uploadTask = await ref.put(fdata).then(async (snapshot) => {
                    await snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                        //console.log('File available at', downloadURL);
                        images.push(downloadURL)
                    })
                })
            }

        }
        var List = this.state.list;
        var finalList = List.pop();

        await firebase.firestore().collection('order').doc(uid).set({
            status: 'ordered',
            images: images,
            Items: List,
            uid: this.state.currentUser.uid,
            userPhoneNumber: this.state.currentUser.phoneNumber,
            Saddress: this.state.shopaddress || "Any store",
            Sname: this.state.shopname || 'Any store',
            Upin: document.getElementById('userpin').value,
            Uaddress: document.getElementById('userads').value,
            Uotp: Math.floor(1000 + Math.random() * 9000),
            time: firebase.firestore.Timestamp.now()
        }).then(() => {
            this.setState({ orderFinish: true })
            //console.log("hii")
        })
    }
    render() {
        if (this.state.orderFinish != false) {
            return <Redirect to="/" />
        } else {


            return (<div align="left" className="orderPage">
                <div className="bannerOrder">
                    <Link to="/" style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', textDecorationColor: "white", textDecoration: 'none', fontSize: "17px" }}><img src={BackArrow}></img></Link>
                    <small>Order Anything from Any Store</small>
                    <p><b>Note:</b>we won't deliver alcohol and any other illegal items. and its prohibited by law</p>
                </div>


                <div style={{ marginLeft: '10px' }}>
                    {/* "items" */}
                    <small style={{ margin: '0px', marginLeft: "5px" }}>Make a list of items you want</small>
                    <table width="95%">
                        {this.state.list ? this.state.list.map((data, index) => {
                            return (
                                <div className="orderList" key={index} >
                                    <tr  >
                                        <td style={{ width: "80%", padding: '0px' }}><input type="text" placeholder="item name" value={data.name} onInput={(e) => this.changeName(e, index)}></input></td>
                                        <td style={{ width: "20%", padding: '0px' }}>
                                            {data.name !== '' || data.name == null ? <tr>
                                                <td>
                                                    <input type="button" value="-" onClick={() => this.changeQuant(this.state.list[index].quant - 1, index)}></input>
                                                </td>
                                                <td>
                                                    <div style={{ color: 'rgb(37, 160, 37)', fontWeight: 800 }}>{data.quant}</div>
                                                </td>
                                                <td>
                                                    <input type="button" value="+" onClick={() => this.changeQuant(this.state.list[index].quant + 1, index)}></input>
                                                </td>
                                            </tr> : null}
                                        </td>
                                    </tr>
                                </div>
                            )
                        }) : null}
                    </table>


                    <br />



                    {/* store address */}
                    <form className="orderForm">
                        <small style={{ margin: '0px', marginLeft: "5px" }}>Shop Name (optional)</small><br />
                        <input type="text" value={this.state.shopname} onInput={(e) => { this.setState({ shopname: e.target.value }) }} placeholder="Shop name"></input><br />
                        <small style={{ margin: '0px', marginLeft: "5px" }}>Shop Address (optional)</small><br />
                        <textarea type="text" value={this.state.shopaddress} onInput={(e) => { this.setState({ shopaddress: e.target.value }) }} placeholder="Address"></textarea>
                    </form>
                    <br />
                    <table>
                        <tr>
                            <td><small>📷 Upload photos of medical prescription, specific product   (optional)</small></td>
                            <td><input type="button" id="addIMG" value={!this.state.addPic ? "+ Add" : "- Remove"} onClick={() => this.tonggleImg()} style={{ width: '100px', color: 'white', padding: '5px', backgroundColor: "rgb(69, 180, 13)", border: '0px', borderRadius: '8px' }}></input></td>
                        </tr>
                    </table>

                    {this.state.addPic ? <ImagePicker handler={this.onDrop.bind(this)} /> : null}
                    {/* order now */}
                </div>
                {this.state.list.length > 1 || this.state.pictures['0'] != undefined ? <div className="orderNow" align="center">

                    <input type="button" value="Order Now" onClick={() => this.setState({ showAdds: true })} />
                </div> : null}
                <div className="loder"> loading...</div>
                { this.state.showAdds ? <div>
                    <div id="addsbg" onClick={() => this.setState({ showAdds: false })}></div>
                    <div className="AddressForm">
                        {/* user address */}
                        <form className="orderForm">
                            <small style={{ margin: '0px', marginLeft: "5px" }}>Address </small><br />
                            <textarea type="text" id="userads" value={this.state.useraddress} onInput={(e) => { this.setState({ useraddress: e.target.value.trim() }) }} placeholder="Address"></textarea><br />
                            <small style={{ margin: '0px', marginLeft: "5px" }}>Pincode</small><br />
                            <input type="text" id='userpin' value={this.state.userpin} onInput={(e) => { this.setState({ userpin: e.target.value.trim() }) }} placeholder="pincode"></input><br />
                            {this.state.userpin != null && this.state.userpin != '' && this.state.useraddress != null && this.state.useraddress != '' ?
                                <div align="center"> <input type="button" className="orderafterads" value="Order Now" onClick={() => this.placeOrder()} /></div> :
                                null}
                        </form>
                    </div>
                </div> : null}

            </div>);
        }
    }
}


function ImagePicker(props) {
    const crop = {
        // unit: '%',
        // aspect: 4 / 3,
        // width: '100'
        minWidth: 100,
        miinHeight: 100
    };

    const [images, setImages] = useState({});
    useEffect(() => {
        //console.log('Listening: ', images);
        props.handler(images);
    }, [images]);
    return (
        <MultiImageInput
            max={3}
            images={images}
            setImages={setImages}
            theme={{
                background: 'white',
                outlineColor: 'gray',
                textColor: 'black',
                buttonColor: 'black',
                modalColor: 'white',
            }}
            cropConfig={{ ruleOfThirds: false, }}
        />
    );
}