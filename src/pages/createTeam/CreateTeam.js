import React, {useEffect} from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TeamMemberList from "../../components/SmallComponent/TeamMemberList";


import {deleteMember, sendTeam} from "./Modules";
import {useAxiosState} from "../../context/AxiosContext";

import "../../Module/notify"
import {toggleHasTeam, useUserTeamDispatch} from "../../context/UserTeamContext";
import {checkIfMemberEmailIsValide, log, showNotification} from "../../Module/biblio";
import AddTeam from "../../components/SmallComponent/AddTeam";


// UI :
// Todo : change the background, chose an image, and an undraw image for icon.
//        Todo : just get the category constant to client, in use map to display it


export default function CreateTeam(props) {

  let classes = useStyles();

  const [category, setCategory] = React.useState("")
  const [categoryList, setCategoryList] = React.useState()
  const [members, setMember] = React.useState([])
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState({})
  const [email, setEmail] = React.useState("")
  const [isLoading, setLoading ] = React.useState(false)

  const http = useAxiosState()
  const userTeamDispatch = useUserTeamDispatch()


  useEffect(() => {
    http.get('/api/ressources/category')
        .then((response) => {
          setCategoryList(response.data)
        })
        .catch(() => {
          showNotification("danger","Check your connection and reload please." )
        })
  }, [])

  const save = () => {
    setLoading(true)
    sendTeam(http, {
      name,
      secteur : category,
      members,
    }, next, catchError, setLoading, setError)
  }

  const next = (time) => {
    setTimeout(() => {
      setEmail("")
      setName("")
      setMember([])
      setLoading(false)
      toggleHasTeam(userTeamDispatch)
      props.history.push('/')
    }, time)
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
              categoryList={categoryList}
              members={members} setMember={setMember}
              name={name} setName={setName}
              error={error} setError={setError}
              category={category} setCategory={setCategory}
              email={email} setEmail={setEmail}
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

function catchError(error, setLoading, setError)
{
  if (error.response) {
    setError(error.response.data.errors)
    setLoading(false)
  } else if (error.request) {
    showNotification("danger","Check you connection and try again please." )
    setLoading(false)
  } else {
    log('Error', error.message);
    showNotification("danger","Try to reload the page please. See more in console." )
    setLoading(false)
  }
}


