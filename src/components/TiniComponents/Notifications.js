import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";


export function DisplayNotification(props)
{
    let {display, onClose = defaultOnClose, type = 'error', message, setDisplay} = props

    let [open, setOpen] = useState(false)

    let position = { vertical: 'top', horizontal: 'right' }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose()
        setOpen(false);
    };

    useEffect(() => {
        if (display === true)
        {
            setOpen(display)
            setDisplay(false)
        }
    }, [display])

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={position}
            TransitionComponent={TransitionLeft}
        >
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    )
}

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function defaultOnClose () {}