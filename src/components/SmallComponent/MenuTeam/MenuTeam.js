import React, {useEffect, useState} from "react";

import {Button, Menu} from '@material-ui/core'
import {Typography} from "../../Wrappers";
import {GroupWork as GroupWorkIcon} from '@material-ui/icons'
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import {useDashboard} from "../../../context/DashboardContext";
import {displayBaseOnNumber, getCategoryLabelByKey, returnArrayIfUndefined} from "../../../Module/biblio";
import {
     toggleAddTeamModal,
    toggleUpdateTeamModal,
    useModalDispatch,
    useModalState
} from "../../../context/ModalContext";
import {useNotification} from "../../../context/GlobalContext";
import {DisplayNotification} from "../../TiniComponents/Notifications";
import {useAxiosState} from "../../../context/AxiosContext";
import {URLS} from "../../../Module/http";
import {useSetTeamToUpdate} from "../../../context/TeamToUpdateContext";
import CardMedia from "@material-ui/core/CardMedia";
import teamLogo from "../../../images/team.svg";
import CardContent from "@material-ui/core/CardContent";
import {MenuToolBar} from "../../TiniComponents/MenuToolBar";


// Todo : Show the correct value of a category, not his key

function MenuTeam(props) {

    let { teamMenu, setTeamMenu, classes } = props
    const http = useAxiosState()

    const  [teams, setTeams] = useState([])
    const [ notification, displayNotification, resetNotification ] = useNotification()

    let userData =  useDashboard().user
    let modalState = useModalState()
    let modalDispatch = useModalDispatch()
    let setTeamToUpdate = useSetTeamToUpdate()


    useEffect(() => {
       if (userData !== undefined)
       {
           setTeams(userData.teams)
       }
    }, [userData])

    const showTeam = (id) =>
    {
        http.post( URLS.aboutTeam, {
            id,
        })
            .then((response) => {
                setTeamToUpdate(response.data.team)
                showUpdateTeamModal()
            })
            .catch((error) => {
                displayNotification(error.message)
            })
    }

    const showUpdateTeamModal = () =>
    {
        setTeamMenu(null)
        toggleUpdateTeamModal(modalDispatch, true)
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
                <MenuToolBar title="Teams" onClose={() => setTeamMenu(null)} type="menu" />
                {returnArrayIfUndefined(teams).length === 0 ? <div><Placeholder classes={classes} setTeamMenu={setTeamMenu}/></div> :
                    <div>
                        <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
                        <div>
                            {teams.map((val, key) => {
                                return <TeamItem val={val} key={key} show={showTeam}  />
                            })}
                        </div>
                    </div>
                }
            </div>
        </Menu>
  );

}

export default MenuTeam;


function ShowInfo(props)
{
    let { val } = props
    let categoryList = useDashboard().team_category
    return <><Typography display="block" variant="caption" size="xm" >{getCategoryLabelByKey(categoryList, val.secteur)}</Typography><Typography variant="caption" display="block" size="xm">{(val.user_count + val.invited_count) + " Members" + displayBaseOnNumber(val.boards_count, 'Board') }</Typography></>
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


function Placeholder({ classes, setTeamMenu })
{

    let modalDispatch = useModalDispatch()

    return  (
        <div className={classes.card}>
            <CardMedia
                className={classes.media}
                image={teamLogo}
                title="A team"
                component="img"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        "A team is a group of boards and people. Use it to organize your company, side hustle, family, or friends."
                    }
                </Typography>
                <Button variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        className={classes.buttonAddBoard}
                        onClick={() => showModal()}
                >Add a team</Button>
            </CardContent>
        </div>
    )

    function showModal()
    {
        setTeamMenu(null)
        toggleAddTeamModal(modalDispatch, true)
    }

}


