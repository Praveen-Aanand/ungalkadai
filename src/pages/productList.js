import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ProductData } from "../store";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
        background: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(1),
        color: 'gray'
    },
}));



export default function ProductList() {
    console.log('hello here home')
    return (
        <div>
            <AppBarThis />
        </div>
    )
}

function AppBarThis() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root} elevation={3} >
            <Toolbar variant="dense">
                <Typography variant="h6" color="secondary">
                    My Products
           </Typography>
            </Toolbar>
        </AppBar>
    )
}


function ProdList() {
    const fireData = ProductData.useState(s => s);

    return (
        <div>
            {fireData.map((data) => {
                <p>{data}</p>
            })}
        </div>
    )
}