import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserData } from '../store';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
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

    card: {
        boxShadow: '0px 0px 3px 0.1px gray',
        padding: '5px',
        borderRadius: '5px',
        margin: '5px'
    },
    cardText: {
        padding: '5px', margin: '0px'
    },
    opt: {
        '& span': {
            fontSize: '10px',
        },

    },

    optIcon: {
        color: 'green',
        background: '#0edf6562'
    }
}));

export default function Home() {
    const userState = UserData.useState(s => s)

    console.log(userState)
    return (
        <div>
            <AppBarThis userState={userState} />
            <DashBoard userState={userState} />
            <MainOpt userState={userState} />
        </div>
    )
}



function AppBarThis() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root} elevation={3} >
            <Toolbar variant="dense">

                <Typography variant="h6" >
                    <span style={{ color: 'gray', fontWeight: '500' }}>Nammakadai</span>
                    <span style={{ color: '#11cb5f', fontWeight: '300' }}>Shops</span>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

function DashBoard(props) {
    const classes = useStyles();

    return (
        <div style={{ margin: '3px' }}>
            <h3 style={{ marginLeft: '10px' }}>{props.userState.data.shopName}</h3>
            <table width="100%">
                <tr>
                    <td width="50%">
                        <div className={classes.card}>
                            <h5 className={classes.cardText}>Wallet</h5>
                            <h3 className={classes.cardText} align="center">₹1002.</h3>
                        </div>
                    </td>
                    <td width="50%">
                        <div className={classes.card}>
                            <h5 className={classes.cardText}>Total products</h5>
                            <h3 className={classes.cardText} align="center">5</h3>
                        </div>
                    </td>
                </tr>

            </table>
        </div>
    )
}

function MainOpt() {
    const classes = useStyles();

    return (
        <div>
            <table >
                <tr className={classes.opt}>
                    <td width="80px">
                        <Link to='/addproduct' component={RouterLink} >
                            <tr align="center">
                                <IconButton aria-label="delete" className={classes.optIcon}>
                                    <AddShoppingCartRoundedIcon />
                                </IconButton>
                            </tr>
                            <tr>
                                <span>Add Products</span>
                            </tr>
                        </Link>
                    </td>
                    <td width="80px">
                        <tr align="center">
                            <IconButton aria-label="delete" className={classes.optIcon}>
                                <AccountBalanceWalletRoundedIcon />
                            </IconButton>
                        </tr>
                        <tr>
                            <span>Money Request</span>
                        </tr>
                    </td>
                    <td width="80px">
                        <tr align="center">
                            <IconButton aria-label="delete" className={classes.optIcon}>
                                <RemoveShoppingCartRoundedIcon />
                            </IconButton>
                        </tr>
                        <tr>
                            <span>Out of stock</span>
                        </tr>
                    </td>
                </tr>
            </table>
        </div>
    )
}