import React from "react";

import {Menu, MenuItem, Typography} from '@material-ui/core'


import classNames from "classnames";
import {Person as AccountIcon} from "@material-ui/icons";
import {signOut, useUserDispatch} from "../../../context/UserAuthContext";
import {useAxiosState} from "../../../context/AxiosContext";
import {useDashboard} from "../../../context/DashboardContext";
import {log, resetAllLocalAndContextOnLogout} from "../../../Module/biblio";
import {useEchoState} from "../../../context/EchoContext";



function MenuProfil(props) {

    let { profileMenu, setProfileMenu, classes, history } = props
    var userDispatch = useUserDispatch();
    let axiosInstance = useAxiosState()
    let user =  useDashboard().user
    const echo = useEchoState()

    const logout = () =>
    {
        axiosInstance.get('/api/logout')
            .then(function (){
                echo.leave('App.Models.User.' + user.id)
                resetAllLocalAndContextOnLogout(userDispatch, history)
            })
            .catch(function (error) {
                // Todo Display the cause of echec to user
                log(error)
            });
    }

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
                  { user && user.name}
              </Typography>
              <Typography
                  className={classes.profileMenuEmail}
                  color="primary"
              >
                  {user && user.email}
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
                  onClick={() => logout()}
              >
                  Sign Out
              </Typography>
          </div>
      </Menu>
  );
}

export default MenuProfil;
