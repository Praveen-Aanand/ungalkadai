import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    position:'fixed',
    bottom:'0px',
    width:'100%'
  },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
//   const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       backgroundColor: theme.palette.background.paper,
//     },
//   }));

export default function IconTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.index);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
      <div>
           <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
       <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
      </SwipeableViews>
    <Paper  className={classes.root}>
         
      <Tabs
        value={value}
        onChange={handleChange}
        style={{boxShadow:'0px 0px 5px 0.5px gray'}}
        variant="fullWidth" 
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab  icon={<HomeRoundedIcon />} aria-label="home" />
        <Tab  icon={<ExploreRoundedIcon />} aria-label="explore" />
        <Tab  icon={<ShoppingCartRoundedIcon />} aria-label="cart" />
        <Tab  icon={<SettingsRoundedIcon />} aria-label="setting" />
        
      </Tabs>
    </Paper>
    </div>
  );
}
