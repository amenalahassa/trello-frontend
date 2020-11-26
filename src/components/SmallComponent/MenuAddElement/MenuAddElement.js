import React from "react";

import {Menu} from '@material-ui/core'


import {Dashboard as DashboardIcon, People as PeopleIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "../../Wrappers";



function MenuAddElement(props) {

    let { methode, addMenu, setAddMenu, classes } = props

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
            <List >
                <ListItem button onClick={() => exec(methode.handleClickOpen)}>
                    <ListItemAvatar>
                        <Avatar>
                            <DashboardIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="h6" weight="medium" >Add a board</Typography>} secondary={ <span> <Typography variant="caption" display="block"  >A board is made up of cards ordered on lists. </Typography> <Typography variant="caption" display="block" >Use it to manage projects, track information, or organize anything.</Typography></span>} />
                </ListItem>
                <ListItem button >
                    <ListItemAvatar>
                        <Avatar>
                            <PeopleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="h6" weight="medium" >Add a Team</Typography>} secondary={<span><Typography variant="caption" display="block" >A team is a group of boards and people.</Typography><Typography variant="caption" display="block" >Use it to organize your company, side hustle, family, or friends.</Typography></span>} />
                </ListItem>
            </List>
        </Menu>
  );

    function exec(methode)
    {
        setAddMenu(null)
        methode()
    }
}

export default MenuAddElement;

