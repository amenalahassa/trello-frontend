import React, {useEffect, useState} from "react";
import {
    useHistory, useLocation,
    useParams, useRouteMatch
} from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import {Close as CloseIcon, MoreVert as MenuIcon, ArrowLeft as ArrowLeftIcon} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import SubBoardMenu from "../../components/SmallComponent/SubBoardMenu";
import GroupAvatars from "../../components/TiniComponents/GroupAvatars";
import FormControl from "@material-ui/core/FormControl";
import { ResizableInput} from "./components/Components";
import {useAxiosState} from "../../context/AxiosContext";
import {URLS} from "../../Module/http";
import {useDashboard, useDashboardDispatch} from "../../context/DashboardContext";
import Skeleton from "@material-ui/lab/Skeleton";
import {useNotificationDispatch} from "../../context/NotificationContext";
import Loader from "../../components/Loader";
import {useUserDispatch, useUserState} from "../../context/UserAuthContext";
import CardContent from "@material-ui/core/CardContent";
import notFoundLogo from "../../images/notfound.svg";
import warningLogo from "../../images/warning.svg";
import CardMedia from "@material-ui/core/CardMedia";
import {useIsMountedRef, useMatchWithRedirect} from "../../context/GlobalHooks";
import {
    getCurrentLocationOnCurrentWindow,
    resetAllLocalAndContextOnLogout,
    setItemInLocalStorage
} from "../../Module/biblio";
import {Menu} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import {ReloaderContext} from "../../context/GlobalContext";


// Todo: Use an sidebar for show menu board

export default function Dashboard() {

    let classes = useStyles()
    let http = useAxiosState()
    const setDatas = useDashboardDispatch()
    // Todo use this name anywhere in the project
    const authDispatch = useUserDispatch()
    let { id } = useParams()
    let history = useHistory()
    let location = useLocation()
    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()
    const isMountedRef = useIsMountedRef();


    const [aboutMenu, setAboutMenu] = useState(null)
    const [board, setBoard] = useState({})
    const [loading, setLoading] = useState(false)
    const [OnUpdateName, handleUpdateName] = useState(false)
    const displayNotification = useNotificationDispatch()
    const [name, setName] = useState("")
    const [errors, setErrors] = useState({
        error: false,
        message:"",
        image:notFoundLogo,
        action:"",
        callback: () => {}
    })

    // Todo use route match to check if user is in correct url, if not, send it to not found page

    useEffect(() =>{
        if (isAuthenticated === false && matchWithRedirect === null)
        {
            history.push('/login')
        }
        if (isAuthenticated === true) {
           if (isMountedRef.current)
           {
               setLoading(true)
               loadBoard()
           }
        }
    }, [id])

    const updateName = () => {
        handleUpdateName(false)
        if (name.length <= 0 || name === board.name)
        {
            setName(board.name)
        }
        else
        {
            http.post(URLS.updateBoardName, {
                id: board.id,
                name,
            })
                .then((response) => {
                    setDatas(response.data)
                    loadBoard()
                })
                .catch((err) => {
                    setName(board.name)
                    displayNotification("Board name change failed. Check your connection and try again.", 'warning')
                })
        }
    }

    const loadBoard = () => {
        http.get(URLS.aboutBoard + id, {
            params: {
                id,
            }
        })
            .then((response) => {
                let { data : { board }} = response
                if (board === null)
                {
                    setErrors({
                        ...errors,
                        error: true,
                        message: "This board don't exist no more. Try to open another please.",
                        action: null,
                    })
                }
                else
                {
                    setBoard(board)
                    console.log(board)
                    setName(board.name)
                    setErrors({
                        ...errors,
                        error: false
                    })
                }
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Todo do like this anywhere
                            // When the user is not auth... but is logged in front
                            displayNotification("You logged in a while ago. Please re-authenticate you.")
                            setItemInLocalStorage('intented-route', getCurrentLocationOnCurrentWindow())
                            resetAllLocalAndContextOnLogout(authDispatch, history)
                            break
                        case 403:
                            // When the user try to access a board that he doesn't have access to
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Wait... You may don't have access to this board. Try to open another board please.",
                                action: null,
                            })
                            break
                        case 404:
                            // When the user try to access a board that dont exist
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. This board don't exist. Try to open another board please.",
                                action: null,
                            })
                            break
                        case 422:
                            // When the user send bad id like papa89
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. This board may not exist. if this error persist, try to open another please",
                                action: null,
                            })
                            break
                        default :
                            // By default
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. Try to open another please",
                                action: null,
                            })
                            break
                    }
                    setLoading(false)
                }

            })
    }

    return (
      <>
          <ReloaderContext.Provider value={loadBoard}>

              { loading ? <Loader/> :
                  <>
                      {errors.error ? <div className={classes.showErrorRoot} ><ShowError info={errors}/></div> :
                          <Grid
                              container
                              className={classes.gridParent}
                          >
                              <Grid item className={classes.gridBar} >
                                  <AppBar position="static" elevation={0} className={classes.hearderRoot}>
                                      <Toolbar className={classes.toolbar}>
                                          <div>
                                              {
                                                  OnUpdateName  ?
                                                      <FormControl className={classes.margin} >
                                                          <ResizableInput
                                                              autoFocus={true}
                                                              size={name.length}
                                                              id="modify-board-name-input"
                                                              value={name}
                                                              onChange={(event => setName(event.target.value))}
                                                              onBlur={() => updateName()} />
                                                      </FormControl>
                                                      :
                                                      <Typography variant="h4" className={classes.boardName} onClick={() => handleUpdateName(true)} >
                                                          {board.name}
                                                      </Typography>
                                              }
                                          </div>
                                          <Divider orientation="vertical" flexItem className={classes.divider} />
                                          { loading ?
                                              <div className={classNames(classes.team)}><Skeleton variant="rect" width={210} height={38} animation={"wave"}/></div> :
                                              <div className={classNames(classes.team)}><DashBoardOwner  type={board.type} owner={board.owner} id={board.id} /></div>
                                            }
                                          <Button
                                              variant="contained"
                                              color="primary"
                                              size="medium"
                                              disableElevation
                                              endIcon={<MenuIcon className={classes.buttonBoardIcon}/>}
                                              className={classes.buttonAboutBoard}
                                              aria-controls="about-sub-board-menu"
                                              onClick={(e) => setAboutMenu(e.currentTarget)}
                                              disabled={loading}
                                          >
                                              About this board
                                          </Button>
                                          <SubBoardMenu aboutMenu={aboutMenu} setAboutMenu={setAboutMenu} classes={classes} />
                                      </Toolbar>
                                  </AppBar>
                              </Grid>
                              <Grid item className={classes.gridContainer} >
                                  <div>Hello !</div>
                              </Grid>
                          </Grid>
                      }
                  </>
              }
          </ReloaderContext.Provider>
      </>
    );

}

function ShowError(props)
{
    let classes = useStyles()
    let { info } = props

    return  (
        <div className={classes.card}>
            <CardMedia
                className={classes.media}
                image={info.image}
                title="Error image "
                component="img"
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="secondary" component="p" className={classNames({[classes.cardText] : info.action !== null})}>
                    {info.message}
                </Typography>
                { info.action !== null && <Button variant="contained"
                         color="primary"
                         size="large"
                         fullWidth
                         className={classes.buttonAddBoard}
                         onClick={() => info.callback()}
                >{info.action}</Button>}
            </CardContent>
        </div>
    )

}


function DashBoardOwner({ type, owner, id})
{
    let classes = useStyles()
    const [openPersonal, setPersonal] = useState(null)
    const [openTeam, setTeam] = useState(null)

    return (
        <div className={classes.ownerRoot} >
            {type === "User" ? <PersonalOwner toggle={setPersonal}/> : <TeamOwner team={owner} toggle={setTeam} /> }
            <PersonalOwnerMenu board_id={id} open={openPersonal} toggle={setPersonal}/>
            <TeamOwnerMenu open={openTeam} toggle={setTeam}/>
        </div>
    )

    function PersonalOwner({ toggle })
    {
        return (
            <div className={classes.ownerRoot}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    className={classes.buttonBoard}
                    onClick={e => toggle(e.currentTarget) }
                >
                    Private Board
                </Button>
            </div>
        )
    }

    function TeamOwner({ toggle, team = {} })
    {

        return (
            <div className={classes.ownerRoot}>
                <Button
                    variant="text"
                    className={classes.buttonBoardText}
                    onClick={(e) => toggle(e.currentTarget) }
                >
                    {team.name}
                </Button>
                <GroupAvatars classes={classes.teamAvatar} users={team.user} invited={team.invited}/>
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.buttonBoard}
                >
                    Invite
                </Button>
            </div>
        )
    }

    function PersonalOwnerMenu({ open, toggle, board_id })
    {
        let classes = useStyles()
        let http = useAxiosState()
        const setDatas = useDashboardDispatch()
        const reloader = React.useContext(ReloaderContext);
        const displayNotification = useNotificationDispatch()
        const [edit, editing] = useState(false)
        const [team, setTeam] = useState("")
        const userData =  useDashboard().user
        const teams = userData ? userData.teams : []

        const handleChoosing = () => {
            editing(true)
        }

        const updateOwner = () => {
            http.post(URLS.updateBoardOwner, {
                id : board_id,
                owner: team,
            })
                .then((response) => {
                    toggle(null)
                    setDatas(response.data)
                    reloader()
                })
                .catch((err) => {
                    toggle(null)
                    displayNotification("Board type change failed. Check your connection and try again.", 'warning')
                })
        }

        return (
            <Menu
                id="profile-menu"
                open={Boolean(open)}
                anchorEl={open}
                onClose={() => toggle(null)}
                className={classes.buttonBoardMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem
            >
                <Toolbar className={classes.buttonBoardMenuToolBar}>
                    {edit === true && <IconButton fontSize="small" edge="start" color="inherit" onClick={() => editing(false)}>
                        <ArrowLeftIcon/>
                    </IconButton>}
                    <div className={classes.buttonBoardMenuHeaderMenuIcon}>
                        <Typography  className={classes.buttonBoardMenuHeaderMenuIconTitle}>Add to a team</Typography>
                        <IconButton  fontSize="small" edge="start" color="inherit"  onClick={() => toggle(null)} >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Toolbar>
                <MenuItem className={classes.buttonBoardMenuItem}>
                    {edit === false ? <Typography variant="body2" color="textSecondary">
                        {
                            "A team is a group of boards and people. Use it to organize your company, side hustle, family, or friends."
                        }
                    </Typography> :
                        <div className={classes.buttonBoardMenuItemSelect}>
                            { teams.length <= 0 ? <Typography variant="body2" color="textSecondary" >You don't have a team. Create one before. </Typography>  :
                                <Select
                                    displayEmpty
                                    value={team}
                                    onChange={(event => {
                                        setTeam(event.target.value);
                                    })}
                                    fullWidth
                                    required
                                    className={classes.buttonBoardMenuItemSelectInput}
                                >
                                    <MenuItem value="" disabled>
                                        Choose a team
                                    </MenuItem>
                                    {teams.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>}
                        </div>}
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            className={classes.buttonAddBoard}
                            disabled={edit === true && team === ""}
                            onClick={() => edit === true ? updateOwner() : handleChoosing()}
                    >{edit === false ? "Switch to a team  board" : "Add to this team"}</Button>
                </MenuItem>
            </Menu>
        )
    }

    function TeamOwnerMenu({ open, toggle })
    {
        return (
            <Menu
                id="profile-menu"
                open={Boolean(open)}
                anchorEl={open}
                onClose={() => toggle(null)}
                className={classes.headerMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem
            >
                <MenuItem>
                    Change the team
                </MenuItem>
            </Menu>
        )
    }



}