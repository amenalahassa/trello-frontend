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
import UpdateTeamModal from "../../../pages/UpdateTeam/UpdateTeamModal";
import {toggleAddTeamModal, useModalDispatch, useModalState} from "../../../context/ModalContext";
import {useNotification} from "../../../context/GlobalContext";
import {DisplayNotification} from "../../TiniComponents/Notifications";
import Modal from "../../Modal";
import {useAxiosState} from "../../../context/AxiosContext";
import {URLS} from "../../../Module/http";


// Todo : Show the correct value of a category, not his key

function MenuTeam(props) {

    let { teamMenu, setTeamMenu, classes } = props
    const http = useAxiosState()

    const  [teams, setTeams] = useState([])
    const  [current, setCurrent] = useState(null)
    const [ notification, displayNotification, resetNotification ] = useNotification()

    let userData =  useDashboard().user
    let modalState = useModalState()
    let modalDispatch = useModalDispatch()


    useEffect(() => {
       if (userData !== undefined)
       {
           setTeams(userData.teams)
       }
    }, [userData])

    const showTeam = (id) =>
    {
        http.post( URLS.updateTeam, {
            id,
        })
            .then((response) => {
                setCurrent(response.data)
                console.log(response.data)
                showAddTeamModal()
            })
            .catch((error) => {
                displayNotification(error.message)
            })
    }

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
               <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
               <div>
                   {teams.map((val, key) => {
                       return <TeamItem val={val} key={key} show={showTeam}  />
                   })}
               </div>
               <div>
                   <UpdateTeamModal open={ modalState.updateTeam } current={current} />
               </div>
           </div>
        </Menu>
  );

    function showAddTeamModal()
    {
        setTeamMenu(null)
        toggleAddTeamModal(modalDispatch, true)
    }
}

export default MenuTeam;


function ShowInfo(props)
{
    let { val } = props
    let categoryList = useDashboard().team_category
    return <><Typography display="block" variant="caption" size="xm" >{getCategoryLabelByKey(categoryList, val.secteur)}</Typography><Typography variant="caption" display="block" size="xm">{(val.user_count + val.invited_count) + " Members | " + val.boards_count + " Boards"}</Typography></>
}

function TeamItem({val, show})
{
    return <ListItem button onClick={() => show(val.id)} >
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

