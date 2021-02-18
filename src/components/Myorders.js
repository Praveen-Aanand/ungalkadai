import { useEffect, useState } from "react";
import '../App.css'
import firebase from "firebase";

export default function MyOrder(props) {
    const [orders, setOrders] = useState('load');
    const togglePopup = (data, index) => {
        document.getElementById('or' + index).style.display = data;
        document.getElementById('orb' + index).style.display = data;
    }
    useEffect(() => {
        //console.log(props.uid)
        const db = firebase.firestore();
        return db.collection('order').where("uid", "==", props.uid).orderBy('time', 'desc').limit(15).onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => {
                postData.push({ ...doc.data(), id: doc.id })
                //console.log(doc.data())
            });
            if (postData.length !== 0) {
                setOrders(postData);
            } else {
                setOrders('empty');
            }
        });
    }, []);
    if (orders == 'load') {
        return (
            <div>
                loading...
            </div>
        )
    }
    else if (orders == "empty") {
        return (
            <div>
                
            </div>
        )
    }
    else {
        return (
            <div>
                <h4 style={{ textAlign: "left", textIndent: '10px', marginBottom: '10px' }}>My Orders</h4>
                {orders.map((data, index) => {
                    return (
                        <div key={index} >
                            <div onClick={() => togglePopup('block', index)} className="OrderCard">
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td width="50%">

                                            <tr><div style={{textTransform:'uppercase'}}><b>{data.status}</b></div></tr>
                                            <tr><div>{data.Sname}</div></tr>
                                        </td>
                                        <td >
                                            Items ({data.Items.length})
                                    </td>
                                        {data.amount ? <td >
                                            ₹ {data.amount}/-
                                    </td> : <td></td>}
                                    </tr>
                                </table>

                            </div>
                            <div id={`orb` + index} className="bottomSheetBg" onClick={() => togglePopup('none', index)}></div>
                            <div id={`or` + index} className="bottomSheetOrder">
                                <b style={{ textAlign: "left", margin: '2px' ,textTransform:'uppercase'}}>Id #{data.Uotp}-{data.status}</b>
                                <h3 style={{ marginBottom: '5px' }}>{data.Sname}</h3>
                                <hr></hr>
                                <b>Items</b>
                                <table width="100%" style={{ textAlign: "center" }}>
                                    {data.Items.map((item) => {
                                        return (
                                            <tr>
                                                <td style={{width:'50%'}}>{item.name}</td>
                                                <td style={{width:'50%'}}>{item.quant}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <table width="100%" style={{ textAlign: "center" }}>
                                    <tr>
                                    {data.images.map((item) => {
                                        return (
                                           
                                                <td style={{width:'30%'}}><img src={item} width="100%"></img></td>
                                              
                                        
                                        )
                                    })}
                                    </tr>
                                </table>
                                {data.amount ? <h3 >
                                    ₹ {data.amount}/-
                                    </h3> : <small>Our delivery men will call you soon.</small>}
                               {data.status=="new"?<input type="button" value="CANCLE" style={{
                                   backgroundColor:'orangered', 
                                   color:'white',
                                   border:'0px',
                                   padding:'10px',width:"70%"}}></input>:null}
                            </div>
                        </div>
                    );
                })}
            </div>
        )

    }
}