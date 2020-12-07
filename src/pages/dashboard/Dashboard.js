import React, {useEffect, useRef, useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";


import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { MoreVert as MenuIcon} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import SubBoardMenu from "../../components/SmallComponent/SubBoardMenu";
import GroupAvatars from "../../components/TiniComponents/GroupAvatars";
import {toggleAddBoardModal, useModalDispatch} from "../../context/ModalContext";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import { ResizableInput} from "./components/Components";
import {useAxiosState} from "../../context/AxiosContext";
import {URLS} from "../../Module/http";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {DisplayNotification} from "../../components/TiniComponents/Notifications";
import {useNotification} from "../../context/GlobalContext";
import Skeleton from "@material-ui/lab/Skeleton";


// Todo: Use an sidebar for show menu board

export default function Dashboard(props) {
    let classes = useStyles()
    let http = useAxiosState()
    const [aboutMenu, setAboutMenu] = useState(null)
    const [board, setBoard] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [OnUpdateName, handleUpdateName] = useState(false)
    const [ notification, displayNotification, resetNotification ] = useNotification()


    const [name, setName] = useState("")
    const  setDatas = useDashboardDispatch()

    let { currentBoard, isLoading  } = props

    useEffect(() => {
        // setLoading(true)
        if (currentBoard !== null) setName(currentBoard.name)
        setBoard(currentBoard)
        console.log(currentBoard)
    }, [currentBoard])

    const updateName = () => {
        handleUpdateName(false)
        if (name.length <= 0 || name === currentBoard.name)
        {
            setName(currentBoard.name)
        }
        else
        {
            http.post(URLS.updateBoardName, {
                id: currentBoard.id,
                name,
            })
                .then((response) => {
                    setDatas(response.data)
                })
                .catch((err) => {
                    setName(currentBoard.name)
                    displayNotification("Board name change failed. Check your connection and try again.", 'warning')
                })
        }
    }


    return (
      <>
          <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
          { isLoading ? "" :
              <>
                  {board === null ? <div className={classes.placeholderRoot}><Placeholder classes={classes}/></div> :
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
                                      { loading ? <div className={classNames(classes.team)}><Skeleton variant="rect" width={210} height={38} animation={"wave"}/></div> :
                                          <div className={classNames(classes.team)}>
                                              <Button
                                                  variant="contained"
                                                  color="primary"
                                                  size="medium"
                                                  disableElevation
                                                  className={classes.buttonBoard}
                                                  aria-controls="about-sub-board-menu"
                                                  onClick={(e) => setAboutMenu(e.currentTarget)}
                                                  disabled={loading}
                                              >
                                                  {board.team === undefined ? "Personal" : board.team}
                                              </Button>
                                              <GroupAvatars classes={classes.teamAvatar}/>
                                              <Button
                                                  variant="contained"
                                                  color="primary"
                                                  size="medium"
                                                  disableElevation
                                                  className={classes.buttonBoard}
                                              >
                                                  Invite
                                              </Button>
                                          </div>}
                                      <Button
                                          variant="contained"
                                          color="primary"
                                          size="medium"
                                          disableElevation
                                          endIcon={<MenuIcon className={classes.buttonBoardIcon}/>}
                                          className={classes.buttonBoard}
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
      </>

    );


}

function Placeholder({ classes })
{

    let modalDispatch = useModalDispatch()


    return  (
        <div className={classes.card}>
            <CardHeader
                title="To start, you need a board."
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    {
                        "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything."
                    }
                </Typography>
                <Button variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        className={classes.buttonAddBoard}
                        onClick={() => showModal()}
                >Add a board</Button>
            </CardContent>
        </div>
    )

    function showModal()
    {
        toggleAddBoardModal(modalDispatch, true)
    }

}
