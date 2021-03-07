import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from "./components/bottomNav";
const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    fontSize:'5px !important',
  },
});
export default function App(props) {
  const [value, setValue] = React.useState(0);
  console.log(props.index)
  const classes = useStyles();
  return (
    <div>

      {/* <AppBar /> */}
     <BottomNav index={props.index}/>
         <Drawer />

    </div>
  )
}