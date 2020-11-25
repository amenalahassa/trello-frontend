import React from "react";

import {Menu, MenuItem, Typography} from '@material-ui/core'


import classNames from "classnames";
import {Person as AccountIcon} from "@material-ui/icons";
import {signOut, useUserDispatch} from "../../../context/UserAuthContext";
import {useAxiosState} from "../../../context/AxiosContext";



function MenuProfil(props) {

    let {userEmail, userName, profileMenu, setProfileMenu, classes, history } = props
    var userDispatch = useUserDispatch();
    let axiosInstance = useAxiosState()

    return (
      <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
      >
          <div className={classes.profileMenuUser}>
              <Typography variant="h4" weight="medium">
                  {userName}
              </Typography>
              <Typography
                  className={classes.profileMenuEmail}
                  color="primary"
              >
                  {userEmail}
              </Typography>
          </div>
          <MenuItem
              className={classNames(
                  classes.profileMenuItem,
                  classes.headerMenuItem,
              )}
          >
              <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
              className={classNames(
                  classes.profileMenuItem,
                  classes.headerMenuItem,
              )}
          >
              <AccountIcon className={classes.profileMenuIcon} /> Settings
          </MenuItem>
          <div className={classes.profileMenuUser}>
              <Typography
                  className={classes.profileMenuLink}
                  color="primary"
                  onClick={() => signOut(axiosInstance, userDispatch, history)}
              >
                  Sign Out
              </Typography>
          </div>
      </Menu>
  );
}

export default MenuProfil;
