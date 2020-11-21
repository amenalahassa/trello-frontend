import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button
} from "@material-ui/core";

import {
  Add,
  NotificationsNone as NotificationsIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon
} from "@material-ui/icons";

import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import {Badge, Typography} from "../Wrappers";
import logo from "./trello.png"

// context

import Avatar from "@material-ui/core/Avatar";
import MenuProfil from "../MenuProfil";
import MenuAddElement from "../MenuAddElement";
import MenuBoard from "../MenuBoard";
import MenuNotification from "../MenuNotification";


const notifications = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  }
];


export default function Header(props) {
  var classes = useStyles();


  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [addMenu, setAddMenu] = useState(null);
  var [boardMenu, setBoardMenu] = useState(null);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <AppBar elevation={0} position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Button
            variant="contained"
            color="primary"
            size="medium"
            disableElevation
            startIcon={<DashboardIcon />}
            className={classes.buttonBoard}
            aria-controls="board-menu"
            onClick={e => setBoardMenu(e.currentTarget)}
        >
          Boards
        </Button>
        <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuAddButton}
            aria-controls="add-menu"
            onClick={e => setAddMenu(e.currentTarget)}
        >
          <Add classes={{ root: classes.headerMenuAddButtonIcon }} />
        </IconButton>
        <div className={classes.grow} >
          <Avatar alt="Remy Sharp" src={logo} />
          <Typography variant="h6" weight="medium" className={classes.logotype}>
            Trello
          </Typography>
        </div>
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={e => {
              setMailMenu(e.currentTarget);
            }}
            className={classes.headerMenuButton}
        >
          <Badge
              badgeContent={ notifications.length }
              color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <Avatar alt="Remy Sharp">JS</Avatar>
        </IconButton>
        <MenuBoard classes={classes} boardMenu={boardMenu} setBoardMenu={setBoardMenu} />
        <MenuAddElement  classes={classes} addMenu={addMenu} setAddMenu={setAddMenu} />
        <MenuNotification  classes={classes} notifications={notifications} mailMenu={mailMenu} setMailMenu={setMailMenu} />
        <MenuProfil classes={ classes} profileMenu={profileMenu} setProfileMenu={setProfileMenu}/>
      </Toolbar>
    </AppBar>
  );
}
