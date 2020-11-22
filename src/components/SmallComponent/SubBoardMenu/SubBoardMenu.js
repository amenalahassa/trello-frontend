import React from "react";

import {Menu} from '@material-ui/core'


import {Dashboard as DashboardIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";



function SubBoardMenu(props) {

    let {aboutMenu, setAboutMenu, classes } = props

    return (
        <Menu
            id="about-sub-board-menu"
            open={Boolean(aboutMenu)}
            anchorEl={aboutMenu}
            onClose={() => setAboutMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >

            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="Change the name " />
                </ListItem>
                <ListItem button >
                    <ListItemText primary="Delete this board" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="Change background image" />
                </ListItem>
                <ListItem button >
                    <ListItemText primary="Remove a teammate" />
                </ListItem>
            </List>
        </Menu>
  );
}

export default SubBoardMenu;
