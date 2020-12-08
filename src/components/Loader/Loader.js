import React from "react";

import {CircularProgress, Fade, Typography} from '@material-ui/core'

// styles
import useStyles from "./styles";

function Loader() {
  var classes = useStyles();

  return (
    <div className={classes.root}>
        <>
            <CircularProgress size={46} color="secondary" />
        </>
    </div>
  );
}

export default Loader;
