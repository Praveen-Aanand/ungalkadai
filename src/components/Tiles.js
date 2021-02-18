import '../App.css'
import { Link } from "react-router-dom";

export default function Tiles(props) {

// console.log(JSON.parse(data))
    return(
     <div>
         <br/>
                <h4 style={{ textAlign: "left", textIndent: '10px', marginTop:'0px',marginBottom: '5px' }}>Cook @ Home</h4>
          <div  style={{overflowX:'scroll'}}>
          <table>
              <tr>
                  {props.data.map((item,index)=>{
                      return(
                          <td key={index}>
                            <Link to={`/order/n/n/n/${item.list}`}  style={{ textDecoration: 'none' }}>
                            <div  className="sqcard" >
                             <img height={props.height} width={props.width} style={{borderRadius:'10px'}} src={item.img}></img>
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