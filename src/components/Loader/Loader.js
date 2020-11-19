import React from "react";

import {CircularProgress, Fade, Typography} from '@material-ui/core'

// styles
import useStyles from "./styles";

function Loader(props) {
  var classes = useStyles();

  const errormsg = props.onError
  return (
    <div className={classes.root}>
        <>
            { errormsg === null ?
                <CircularProgress size={46} color="secondary" />
                :  <Fade in={true}>
                    <Typography variant="h4" color="secondary" >
                        { errormsg }
                    </Typography>
                </Fade>
            }
        </>
    </div>
  );
}

export default Loader;
