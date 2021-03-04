import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";


export function DisplayNotification(props)
{
    let {display, onClose = defaultOnClose, type = 'error', message, setDisplay} = props

    let [open, setOpen] = useState(false)
    const [snackPack, setSnackPack] = React.useState([]);
    const [messageInfo, setMessageInfo] = React.useState(undefined);

    let position = { vertical: 'top', horizontal: 'right' }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        messageInfo.close()
        setOpen(false);
    };

    useEffect(() => {
        if (display === true)
        {
            // setOpen(display)
            setSnackPack((prev) => [...prev,
                {   message,
                    close:onClose,
                    type:type,
                    key: new Date().getTime()
                }]);
            console.log('ok')
            setDisplay(false)
        }
        console.log('ok1')
    }, [display, message])

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
            console.log('ok22')
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            // setOpen(false);
            console.log('ok21')
        }
        console.log('ok2')
    }, [snackPack, messageInfo, open]);

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={position}
            TransitionComponent={TransitionLeft}
        >
            <Alert onClose={handleClose} severity={messageInfo ? messageInfo.type : undefined }>
                {messageInfo ? messageInfo.message : undefined}
            </Alert>
        </Snackbar>
    )
}

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function defaultOnClose () {}