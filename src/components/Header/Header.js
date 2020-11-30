import React, {useEffect, useState} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";

import {
  Add,
  Dashboard as DashboardIcon,
    People as PeopleIcon,
} from "@material-ui/icons";


// styles
import useStyles from "./styles";

// components
import {Typography} from "../Wrappers";
import logo from "./trello.png"

// context

import Avatar from "@material-ui/core/Avatar";
import MenuProfil from "../SmallComponent/MenuProfil";
import MenuAddElement from "../SmallComponent/MenuAddElement";
import MenuBoard from "../SmallComponent/MenuBoard";
import MenuTeam from "../SmallComponent/MenuTeam/MenuTeam";
import Skeleton from "@material-ui/lab/Skeleton";


const notifications = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  }
];

//Todo : Set a placeholder when the data is loading


export default function Header(props) {
    const classes = useStyles();

    // local
    const [teamMenu, setTeamMenu] = useState(null);
    const [addMenu, setAddMenu] = useState(null);
    const [boardMenu, setBoardMenu] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);



  const { isLoading, setBackgroundImage } = props

  return (
    <div>
        <div>
            <AppBar elevation={0} position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    disabled={isLoading}
                    startIcon={<DashboardIcon className={classes.buttonIcon}/>}
                    className={classes.buttonBoard}
                    aria-controls="board-menu"
                    onClick={e => setBoardMenu(e.currentTarget)}
                >
                    Boards
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    disabled={isLoading}
                    startIcon={<PeopleIcon className={classes.buttonIcon}/>}
                    className={classes.buttonTeam}
                    aria-controls="team-menu"
                    onClick={e => setTeamMenu(e.currentTarget)}
                >
                    Teams
                </Button>
                <div className={classes.grow} >
                    <Avatar alt="Remy Sharp" src={logo} />
                    <Typography variant="h6" weight="medium" className={classes.logotype}>
                        Trello
                    </Typography>
                </div>
                <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuAddButton}
                    aria-controls="add-menu"
                    disabled={isLoading}
                    onClick={e => setAddMenu(e.currentTarget)}
                >
                    <Add className={classes.headerMenuAddButtonIcon } />
                </IconButton>
                {isLoading ?
                    <Skeleton variant="circle" className={classes.avatarSquelon}><Avatar></Avatar></Skeleton>
                    :
                    <IconButton
                        aria-haspopup="true"
                        color="inherit"
                        className={classes.headerMenuButton}
                        aria-controls="profile-menu"
                        onClick={e => setProfileMenu(e.currentTarget)}
                    >
                        <Avatar alt="Remy Sharp">JS</Avatar>
                    </IconButton>
                }
                <MenuBoard  setBackgroundImage={setBackgroundImage} classes={classes} boardMenu={boardMenu} setBoardMenu={setBoardMenu} />
                <MenuTeam  classes={classes} teamMenu={teamMenu} setTeamMenu={setTeamMenu} />
                <MenuAddElement
                     classes={classes}
                     addMenu={addMenu}
                     setAddMenu={setAddMenu}
                />
                <MenuProfil classes={ classes} profileMenu={profileMenu} setProfileMenu={setProfileMenu} history={props.history}/>
            </Toolbar>
            </AppBar>
        </div>

    </div>
  );
}
