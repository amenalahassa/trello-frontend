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
import boardLogo from './board.svg'
import {useDashboard} from "../../../context/DashboardContext";
import {getFromLocalStorage, log, setItemInLocalStorage} from "../../../Module/biblio";


function MenuBoard(props) {

    let  { boardMenu, setBoardMenu, classes, setBackgroundImage } = props
    let  showPlaceholder = false
    let  userData =  useDashboard().user
    let  [boardTeams, setBoardTeams] = useState([])
    let  [boards, setBoards] = useState([])
    let  [currentBoard, setCurrentBoard] = useState(null)


    useEffect(() => {
        if (userData !== undefined)
        {
            let boardOfTeams = getBoardOfTeams(userData.teams)
            let mineBoard = userData.boards
            let currentBoard = getCurrentBoard(mineBoard, boardOfTeams)

            setBoardTeams(boardOfTeams)
            setBoards(mineBoard)
            setBackgroundImage(currentBoard === null ? null : currentBoard.image )
            setCurrentBoard(currentBoard)

            showPlaceholder = true

            if (boards.length !== 0 && boardTeams.length !== 0)
            {
                showPlaceholder = false
            }

        }
    }, [userData])

    const changeCurrentBoard = (current, type) => {
        let next
        if (type === 'personal')
        {
            next = {
                id: current.id,
                name: current.name,
                image: current.image,
                desc: "Personal board",
            }
        }
        else
        {
            next = {
                id: current.id,
                name: current.name,
                image: current.image,
                desc: current.team_name + " board",
            }
        }
        setItemInLocalStorage('currentBoard', next)
        setBackgroundImage( next.image )
        setCurrentBoard(next)
        setBoardMenu(null)
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
            {showPlaceholder === true ?
                <Placeholder classes={classes}/>
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
                                    <ListItemText primary={val.name} />
                                </ListItem>
                            )}
                        </List>
                    }
                </div>
            }
        </Menu>
  );
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

function Placeholder(props)
{
    let { classes } = props
    return  <div className={classes.card}>
        <CardMedia
            className={classes.media}
            image={boardLogo}
            title="Ted talk"
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
            >Add a board</Button>
        </CardContent>
    </div>

}


