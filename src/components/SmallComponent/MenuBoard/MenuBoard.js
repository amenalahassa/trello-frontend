import React from "react";

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


function MenuBoard(props) {

    let { boards, teams, boardMenu, setBoardMenu, classes } = props
    let showPlaceholder = false
    teams = getBoardOfTeams(teams)
    boards = boards === undefined ? [] : boards

    if (boards.length === 0 && teams.length === 0)
    {
        showPlaceholder = true
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
                    <List
                        component="nav"
                        aria-labelledby="nested-list-personal"
                        subheader={
                            <ListSubheader component="div" id="nested-list-personal">
                                Current board
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="My board" />
                        </ListItem>
                    </List>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-team"
                        subheader={
                            <ListSubheader component="div" id="nested-list-team">
                                Your boards
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Team board" />
                        </ListItem>
                    </List>
                </div>
            }
        </Menu>
  );
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

function getBoardOfTeams(team)
{
    let boards  = []
    if (team === undefined || team.length === 0)
    {
        return []
    }
    team.forEach((el) => {
        el.boards.forEach((ele) => {
            let board = {...ele, team_name: el.name}
            boards.push(board)
        })
    })
    return boards
}