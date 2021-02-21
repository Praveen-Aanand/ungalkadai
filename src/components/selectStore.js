import '../App.css';
import React from 'react'
import { Link, Redirect } from "react-router-dom";
export function SelectStore() {
    return(
        <div className="MainCard">
            <p><b>Shop Anything</b> from any Store</p>
            <Link to='/order'>
            <input type="button" value="PLACE A ORDER" className="MainButton"></input>
            </Link>
        </div>
    );

}