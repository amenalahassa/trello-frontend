import React from "react";

import {Menu} from '@material-ui/core'


import {Dashboard as DashboardIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";



function MenuBoard(props) {

    let { boardMenu, setBoardMenu, classes } = props

    return (
        <Menu
            id="board-menu"
            open={Boolean(boardMenu)}
            anchorEl={boardMenu}
            onClose={() => setBoardMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >
            <List
                component="nav"
                aria-labelledby="nested-list-personal"
                subheader={
                    <ListSubheader component="div" id="nested-list-personal">
                        Current board
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="My board" />
                </ListItem>
            </List>
            <List
                component="nav"
                aria-labelledby="nested-list-team"
                subheader={
                    <ListSubheader component="div" id="nested-list-team">
                        Your boards
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team board" />
                </ListItem>
            </List>
        </Menu>
  );
}

export default MenuBoard;
