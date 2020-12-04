import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close as CloseIcon} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";


export function MenuToolBar(props) {
    let {title, onClose, classes = style(), variant="h6", type = "modal" } = props
    return (
        <Toolbar className={clsx(classes.toolbar, {
            [classes.modalStyle]: type === "modal",
            [classes.menuStyle]: type === "menu",
        })}>
            <Typography variant={variant} align="center" className={classes.title}>
                {title}
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="close-menu" onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </Toolbar>
    )
}

const style = makeStyles(theme => ({
    toolbar: {
        borderBottom: "1px #00000021 solid",
        minHeight:48,
        paddingLeft:16,
        paddingRight:10,
    },
    title:{
        flex:1,
        fontWeight:400,
    },
    menuStyle :{
        boxShadow: "0 0px 0px 0 grey !important",
    },
    modalStyle : {
        boxShadow: "0 0 1.2px 0 grey",
    }
}))