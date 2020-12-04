import React from "react";

import {Menu} from '@material-ui/core'


import {Dashboard as DashboardIcon, People as PeopleIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "../../Wrappers";
import {toggleAddBoardModal, toggleAddTeamModal, useModalDispatch} from "../../../context/ModalContext";
import {MenuToolBar} from "../../TiniComponents/MenuToolBar";



function MenuAddElement(props) {

    let { addMenu, setAddMenu, classes } = props
    let modalDispatch = useModalDispatch()

    return (
        <Menu
            id="add-menu"
            open={Boolean(addMenu)}
            anchorEl={addMenu}
            onClose={() => setAddMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >
            <MenuToolBar title="Add" onClose={() => setAddMenu(null)} type="menu" />
            <List >
                <ListItem button onClick={() => showAddBoardModal()}>
                    <ListItemAvatar>
                        <Avatar>
                            <DashboardIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="h6" weight="medium" >A board</Typography>} secondary={ <span> <Typography variant="caption" display="block"  >A board is made up of cards ordered on lists. </Typography> <Typography variant="caption" display="block" >Use it to manage projects, track information, or organize anything.</Typography></span>} />
                </ListItem>
                <ListItem button onClick={() => showAddTeamModal()} >
                    <ListItemAvatar>
                        <Avatar>
                            <PeopleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="h6" weight="medium" >A Team</Typography>} secondary={<span><Typography variant="caption" display="block" >A team is a group of boards and people.</Typography><Typography variant="caption" display="block" >Use it to organize your company, side hustle, family, or friends.</Typography></span>} />
                </ListItem>
            </List>
        </Menu>
  );

    function showAddBoardModal()
    {
        setAddMenu(null)
        toggleAddBoardModal(modalDispatch, true)
    }

    function showAddTeamModal()
    {
        setAddMenu(null)
        toggleAddTeamModal(modalDispatch, true)
    }
}

export default MenuAddElement;

