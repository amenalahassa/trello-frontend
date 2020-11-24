import React from "react";

import {Menu, MenuItem} from '@material-ui/core'

import {Typography} from "../../Wrappers";
import UserAvatar from "../../UserAvatar";
import classNames from "classnames";
import {GroupWork as GroupWorkIcon, Delete as DeleteIcon} from '@material-ui/icons'
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";



function MenuTeam(props) {

    let {teamMenu, setTeamMenu, classes } = props

    return (
        <Menu
            id="team-menu"
            open={Boolean(teamMenu)}
            anchorEl={teamMenu}
            onClose={() => setTeamMenu(null)}
            MenuListProps={{ className: classes.headerMenuList }}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupWorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Team name"
                secondary={'3 people | 3 boards '}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        </Menu>
  );
}

export default MenuTeam;
