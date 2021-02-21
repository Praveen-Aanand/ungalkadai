import '../App.css'
import firebase from "firebase";
import React from 'react'
export default function ContactUs(props) {
const contactReq=()=>{
    firebase.firestore().collection("callReq").doc(props.auth.uid).set({
        phoneNumber:props.auth.phoneNumber
    }).then((data)=>{
        //console.log("request")
        var dom=document.getElementById('reqbut');
        dom.value='Requested';
        dom.disabled=true;
        dom.style.backgroundColor='rgb(38, 123, 17)';
        document.getElementById("reqtxt").textContent="Our Team will contact you soon."
    }).catch((data)=>{
        //console.log(data)
        var dom=document.getElementById('reqbut');
        dom.value='ERROR';
        dom.style.backgroundColor='red';
        document.getElementById("reqtxt").textContent="Please check your internet."

    })
}
    return(
        <div className="contactus">
            <table>
                <tr>
                    <td width="75%">
                        <tr><b style={{textAlign:'left'}}>Direct call</b></tr>
                        <tr><small id="reqtxt">Our Team will contact you.</small></tr>
                    </td>
                    <td><input type="button" id="reqbut" value="Request" style={{backgroundColor:'rgb(19, 184, 19)',border:'0px', borderRadius:'50px',padding:'7px',paddingLeft:'12px',paddingRight:'12px',color:'white'}} onClick={()=>contactReq()}></input></td>
                </tr>
            </table>
        </div>
    )
}