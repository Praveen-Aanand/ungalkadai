import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export default function NearBy() {
    const data=JSON.parse(JSON.stringify([
        {
            sname:"sree sweets",
            saddress:"thiruvarambur",
            img:"https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FshopPics%2Fsree-sweets-tiruverambur.jpg?alt=media&token=3979d163-3d7d-4dd1-9fe1-174c2bb787e1",
            cato:["sweets","bakery"]
        },
        {
            sname:"parvathi stores",
            saddress:"thiruvarambur",
            img:"https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FshopPics%2Fparvathi-stores.png?alt=media&token=79653ff9-8f9e-4036-be1c-fd3b484ede1f",
            cato:['grocery','fruites','vegitables']
        },
       
        {
            sname:"bala murugan",
            saddress:"thuvakudi malai",
            img:"https://firebasestorage.googleapis.com/v0/b/ungakadai.appspot.com/o/images%2FshopPics%2Fballa-murugan.png?alt=media&token=17bf4666-f1da-4702-8db5-411f6188fb13",
            cato:["grocery","bakery"]
        }
    ]));
// console.log(JSON.parse(data))
    return(
     <div>
                <h4 style={{ textAlign: "left", textIndent: '10px', marginTop:'0px',marginBottom: '5px' }}>NearBy</h4>
          <div className="nearby">
          <table>
              <tr>
                  {data.map((item,index)=>{
                      return(
                          <td key={index}>
                            <Link to={`/order/${item.sname}/${item.saddress}/${item.cato}`}  style={{ textDecoration: 'none' }}>
                            <div  className="nearbycard">
                             {/* <img height="100" src={item.img}></img> */}
                             <p>{item.sname}</p>
                             <small>{item.saddress}</small>
                             </div>
                             </Link>
                          </td>
                      )
                  })}
              </tr>
          </table>
      </div>  
     </div>
    );
}