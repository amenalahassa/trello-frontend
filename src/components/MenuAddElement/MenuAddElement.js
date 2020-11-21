import React from "react";

import {Menu} from '@material-ui/core'


import {Dashboard as DashboardIcon, People as PeopleIcon, Person as AccountIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";



function MenuAddElement(props) {

    let { addMenu, setAddMenu, classes } = props

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
            <List className={classes.root}>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <DashboardIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add a board" secondary="Description of a board" />
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <PeopleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add a team" secondary="Description of a team" />
                </ListItem>
            </List>
        </Menu>
  );
}

export default MenuAddElement;
