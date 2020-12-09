import React from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";

import {useAxiosState} from "../../context/AxiosContext";
import "../../Module/notify"
import {toggleHasTeam, useUserTeamDispatch} from "../../context/UserTeamContext";
import {getIntentedUrl, setItemInLocalStorage} from "../../Module/biblio";
import AddTeam from "../../components/SmallComponent/AddTeam";
import {DisplayNotification} from "../../components/TiniComponents/Notifications";
import {useNotification} from "../../context/GlobalHooks";
import {sendTeam, URLS} from "../../Module/http";
import {useNotificationDispatch} from "../../context/NotificationContext";


// UI :
// Todo : change the background, chose an image, and an undraw image for icon.


export default function CreateTeam(props) {

  let classes = useStyles();

  const [category, setCategory] = React.useState("")
  const [members, setMember] = React.useState([])
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState({})
  const [email, setEmail] = React.useState("")
  const [isLoading, setLoading ] = React.useState(false)
  const http = useAxiosState()
  const userTeamDispatch = useUserTeamDispatch()
  const displayNotification = useNotificationDispatch()


  const save = () => {
    setLoading(true)
    sendTeam(URLS.saveTeam, http, {
      name,
      secteur : category,
      members,
    }, next, displayNotification, setLoading, setError)
  }

  const next = () => {
    setEmail("")
    setName("")
    setMember([])
    setLoading(false)
    setItemInLocalStorage('ifHasTeam', true)
    toggleHasTeam(userTeamDispatch)
    props.history.push(getIntentedUrl())
  }



  return (
    <Grid container className={classes.container}>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.logotype}>
          <img className={classes.logotypeIcon} src={logo} alt="logo" />
          <Typography className={classes.logotypeText}>
            Create your first team
          </Typography>
        </div>
        <div>
          <AddTeam
              classes={classes}
              members={members} setMember={setMember}
              name={name} setName={setName}
              error={error} setError={setError}
              category={category} setCategory={setCategory}
              email={email} setEmail={setEmail}
              displayNotification={displayNotification}
          />
          <div className={classes.saveButtonContainer}>
            {isLoading ? (
                    <Fade in={isLoading}>
                      <CircularProgress size={26} color="secondary"/>
                    </Fade>
                ) :
                <Fade in={!isLoading}>
                  <Button variant="contained" color="primary"
                          size="large"
                          fullWidth
                          className={classes.buttonSave}
                          onClick={() => save()}
                          disabled={
                            name.length === 0 ||
                            category.length === 0
                          }
                  >
                    Save
                  </Button>
                </Fade>
            }
          </div>
        </div>
      </Paper>
    </Grid>
  );

}




