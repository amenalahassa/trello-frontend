import React, {useState} from "react";
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

export default function Dashboard(props) {
    var classes = useStyles();
    var [aboutMenu, setAboutMenu] = useState(null);


  return (
      <Grid
          container
            className={classes.gridParent}
      >
          <Grid item className={classes.gridBar} >
              <AppBar position="static" elevation={0} className={classes.hearderRoot}>
                  <Toolbar className={classes.toolbar}>
                      <Typography variant="h4" className={classes.boardName} >
                          Dev Team
                      </Typography>
                      <Divider orientation="vertical" flexItem className={classes.divider} />
                      <div className={classNames(classes.team)}>
                          <GroupAvatars classes = {classes.teamAvatar} />
                          <Button
                              variant="contained"
                              color="primary"
                              size="medium"
                              disableElevation
                              className={classes.buttonBoard}
                          >
                              Invite
                          </Button>
                      </div>
                      <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          disableElevation
                          endIcon={<MenuIcon className={classes.buttonBoardIcon}/>}
                          className={classes.buttonBoard}
                          aria-controls="about-sub-board-menu"
                          onClick={(e) => setAboutMenu(e.currentTarget)}
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

  );
}

