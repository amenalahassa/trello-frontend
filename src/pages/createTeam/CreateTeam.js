import React, {useEffect} from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";

import {useAxiosState} from "../../context/AxiosContext";
import "../../Module/notify"
import {toggleHasTeam, useUserTeamDispatch} from "../../context/UserTeamContext";
import {log, setItemInLocalStorage} from "../../Module/biblio";
import AddTeam from "../../components/SmallComponent/AddTeam";
import {DisplayNotification} from "../../components/TiniComponents/Notifications";
import {useNotification} from "../../context/GlobalContext";
import {sendTeam} from "../../Module/http";


// UI :
// Todo : change the background, chose an image, and an undraw image for icon.


export default function CreateTeam(props) {

  let classes = useStyles();

  const [category, setCategory] = React.useState("")
  const [categoryList, setCategoryList] = React.useState()
  const [members, setMember] = React.useState([])
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState({})
  const [email, setEmail] = React.useState("")
  const [isLoading, setLoading ] = React.useState(false)
  const [ notification, displayNotification, resetNotification ] = useNotification()
  const http = useAxiosState()
  const userTeamDispatch = useUserTeamDispatch()


  useEffect(() => {
    http.get('/api/ressources/category')
        .then((response) => {
          setCategoryList(response.data)
        })
        .catch(() => {
          displayNotification("danger","Check your connection and reload please." )
        })
  }, [])

  const save = () => {
    setLoading(true)
    sendTeam('/save', http, {
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
    props.history.push('/')
  }


  return (
    <Grid container className={classes.container}>
      <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
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




