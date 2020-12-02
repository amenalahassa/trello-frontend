import React, {useEffect, useState} from "react";

import {Menu} from '@material-ui/core'

import {Typography} from "../../Wrappers";
import {GroupWork as GroupWorkIcon, Delete as DeleteIcon} from '@material-ui/icons'
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {useDashboard} from "../../../context/DashboardContext";
import {getCategoryLabelByKey, log} from "../../../Module/biblio";


// Todo : Show the correct value of a category, not his key

function MenuTeam(props) {

    let { teamMenu, setTeamMenu, classes } = props

    let  [teams, setTeams] = useState([])

    let userData =  useDashboard().user

    useEffect(() => {
       if (userData !== undefined)
       {
           setTeams(userData.teams)
       }
    }, [userData])

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
           <div>
               {teams.map((val, key) => {
                   return <TeamItem val={val} key={key} />
               })}
           </div>
        </Menu>
  );
}

export default MenuTeam;


function ShowInfo(props)
{
    let { val } = props
    let categoryList = useDashboard().team_category
    return <><Typography display="block" variant="caption" size="xm" >{getCategoryLabelByKey(categoryList, val.secteur)}</Typography><Typography variant="caption" display="block" size="xm">{val.user_count + " Members | " + val.boards_count + " Boards"}</Typography></>
}

function TeamItem({val})
{
    return <ListItem button>
        <ListItemAvatar>
            <Avatar>
                <GroupWorkIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={<Typography variant="h6">{val.name}</Typography>}
            secondary={<ShowInfo  val={val}/>}
        />
    </ListItem>
}

