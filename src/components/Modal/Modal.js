import React from "react";

// styles
import useStyles from "./styles";
import {styles} from "./styles";
import Dialog from "@material-ui/core/Dialog";

//Own components
import { Transition } from './Components/Components'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import withStyles from "@material-ui/core/styles/withStyles";


// Todo : Very the responsively of this component

function Modal(props) {
  var classes = useStyles();
  let { handleClose, open , children} = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
      <div>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            scroll="body"
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick
            disableEscapeKeyDown
        >
          {children}
        </Dialog>
      </div>
  )
}

export default  withStyles(styles)(Modal);


