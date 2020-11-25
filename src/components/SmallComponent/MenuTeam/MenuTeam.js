import React from "react";

import {Menu} from '@material-ui/core'

import {Typography} from "../../Wrappers";
import {GroupWork as GroupWorkIcon, Delete as DeleteIcon} from '@material-ui/icons'
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";


// Todo : Show the correct value of a category, not his key

function MenuTeam(props) {

    let {teams, teamMenu, setTeamMenu, classes } = props

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
            {teams && teams.map((val, key) => {
               return <TeamItem val={val} key={key} classes={classes} />
            })}
        </Menu>
  );
}

export default MenuTeam;


function showInfo(classes, secteur, people, board)
{
    return <div><Typography size="sm" >{secteur}</Typography><Typography size="sm">{people + " Members | " + board + " Boards"}</Typography></div>
}

function TeamItem({val, classes})
{
    return <ListItem button>
        <ListItemAvatar>
            <Avatar>
                <GroupWorkIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={val.name}
            secondary={showInfo(classes.textDescTeam, val.secteur,val.user_count, val.boards_count)}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}
