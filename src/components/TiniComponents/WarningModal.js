import Modal from "../Modal";
import React from "react";
import {MenuToolBar} from "./MenuToolBar";
import { Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {makeStyles} from "@material-ui/styles";
import {useModalDispatch} from "../../context/ModalContext";

export function WarningModal(props)
{
    let modalDispatch = useModalDispatch()

    let {text = "this is a warning", callback, classes = style(), ...restProps } = props

    const cancel = () => {
        modalDispatch("WARNING", false)
    }
    const next = () => {
        callback(cancel)
    }
    return (
        <div>
            <Modal {...restProps} maxWidth={"sm"} fullWidth={true}  >
                <MenuToolBar title={<Typography variant="caption" className={classes.title}>Warning</Typography>} onClose={() => cancel()} type={"warning"} />
                <DialogContent className={classes.content}>
                    {text}
                </DialogContent>
                <DialogActions className={classes.button}>
                    <Button autoFocus onClick={() => cancel()} color="primary" >
                        Cancel
                    </Button>
                    <Button  onClick={() => next()} autoFocus variant="contained" className={classes.buttonColor}>
                        Continue
                    </Button>
                </DialogActions>
            </Modal>
        </div>
    )
}

const style = makeStyles(theme => ({
    button:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(4),
        marginRight:theme.spacing(2),
    },
    content:{
        paddingTop:theme.spacing(4),
        paddingBottom:theme.spacing(4),
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
        fontSize:15,
    },
    buttonColor: {
        backgroundColor: "#3CD4A0",
        color:"white"
    },
    title: {
        fontSize:21,
    }
}))