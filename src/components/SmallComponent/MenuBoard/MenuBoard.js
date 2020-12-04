import React, {useEffect, useState} from "react";

import {Button, Menu} from '@material-ui/core'
import {Dashboard as DashboardIcon} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import boardLogo from '../../../images/board.svg'
import {useDashboard} from "../../../context/DashboardContext";
import {getFromLocalStorage, setItemInLocalStorage} from "../../../Module/biblio";
import {toggleAddBoardModal, useModalDispatch} from "../../../context/ModalContext";
import {MenuToolBar} from "../../TiniComponents/MenuToolBar";


// Todo set on start up, the current default board to the first

function MenuBoard(props) {

    let  { boardMenu, setBoardMenu, classes, setDashboardBoard } = props

    let  [showPlaceholder, setPlaceholder] = useState(true)
    let  [boardTeams, setBoardTeams] = useState([])
    let  [boards, setBoards] = useState([])
    let  [currentBoard, setCurrentBoard] = useState(null)

    // Todo Use anywhere user to this value
    let  userData =  useDashboard().user


    useEffect(() => {
        if (userData !== undefined)
        {
            let boardOfTeams = getBoardOfTeams(userData.teams)
            let mineBoard = userData.boards
            let currentBoard = getCurrentBoard(mineBoard, boardOfTeams)
            let toShowPlaceholder = mineBoard.length === 0 && boardOfTeams.length === 0

            if (toShowPlaceholder === false && currentBoard === null)
            {
                let next
                if ( mineBoard.length > 0) next = createCurrentBoard(mineBoard[0], "personal")
                else  next = createCurrentBoard(boardOfTeams[0], "team")
                setItemInLocalStorage('currentBoard', next)
                setCurrentBoard(next)
                setDashboardBoard(next)
            }
            else {
                setCurrentBoard(currentBoard)
                setDashboardBoard(currentBoard)
            }

            setBoardTeams(boardOfTeams)
            setBoards(mineBoard)
            setPlaceholder(toShowPlaceholder);

        }
    }, [userData])

    const changeCurrentBoard = (current, type) => {
        let next = createCurrentBoard(current, type)
        setItemInLocalStorage('currentBoard', next)
        setCurrentBoard(next)
        setDashboardBoard(next)
        setBoardMenu(null)
    }

    const createCurrentBoard = (current, type) => {
        let next
        if (type === 'personal')
        {
            next = {
                desc: "Personal board",
                ...current
            }
        }
        else
        {
            next = {
                desc: current.team_name + " board",
                ...current
            }
        }
        return next
    }

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
            <div>
                <MenuToolBar title="Boards" onClose={() => setBoardMenu(null)} type="menu" />
                {showPlaceholder === true ?
                    <div><Placeholder classes={classes} setBoardMenu={setBoardMenu}/></div>
                    :
                    <div>
                        {currentBoard !== null &&
                        <List
                            component="nav"
                            aria-labelledby="nested-list-current"
                            subheader={
                                <ListSubheader component="div" id="nested-list-current" className={classes.sousMenuSubHeader}>
                                    Current board
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary={ currentBoard.name } secondary= {currentBoard.desc}  />
                            </ListItem>
                        </List>
                        }
                        {boards.length > 0 &&
                        <List
                            component="nav"
                            aria-labelledby="nested-list-personal"
                            subheader={
                                <ListSubheader component="div" id="nested-list-personal" className={classes.sousMenuSubHeader}>
                                    Your personals boards
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            {boards.map((val, key)=>
                                <ListItem button key={key} onClick={() => changeCurrentBoard(val, 'personal')}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} />
                                </ListItem>
                            )}
                        </List>
                        }
                        {boardTeams.length > 0 &&
                        <List
                            component="nav"
                            aria-labelledby="nested-list-team"
                            subheader={
                                <ListSubheader component="div" id="nested-list-team">
                                    Your teams boards
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            {boardTeams.map((val, key)=>
                                <ListItem button key={key} onClick={() => changeCurrentBoard(val, 'team')}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} secondary={val.team_name + ' board'} />
                                </ListItem>
                            )}
                        </List>
                        }
                    </div>
                }
            </div>
        </Menu>
  )


    function getBoardOfTeams(team)
    {
        let boardOfTeams  = []
        team.forEach((el) => {
            el.boards.forEach((ele) => {
                let board = {...ele, team_name: el.name}
                boardOfTeams.push(board)
            })
        })
        return boardOfTeams
    }

    function getCurrentBoard(personalBoard, teamBoard)
    {
        let currentSavedBoard = getFromLocalStorage('currentBoard')
        if (currentSavedBoard === null)
        {
            return null
        }
        else
        {
            if (findCurrentBoard(currentSavedBoard, personalBoard) === true || findCurrentBoard(currentSavedBoard, teamBoard) === true)
            {
                return currentSavedBoard
            }
            return null
        }
    }

    function findCurrentBoard(currentSavedBoard, board)
    {
        let finded  = false
        for (const el of board) {
            if (el.id === currentSavedBoard.id)
            {
                finded = true
                break
            }
        }
        return finded
    }
}

export default MenuBoard;

function Placeholder({ classes, setBoardMenu })
{

    let modalDispatch = useModalDispatch()

    return  (
        <div className={classes.card}>
            <CardMedia
                className={classes.media}
                image={boardLogo}
                title="A board"
                component="img"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
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
        setBoardMenu(null)
        toggleAddBoardModal(modalDispatch, true)
    }

}


