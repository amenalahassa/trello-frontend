import React, {useEffect} from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TeamMemberList from "../../components/SmallComponent/TeamMemberList";


import {deleteMember, sendTeam} from "./Modules";
import {useAxiosState} from "../../context/AxiosContext";

import "../../Module/notify"
import {toggleHasTeam, useUserTeamDispatch} from "../../context/UserTeamContext";
import {log, showNotification} from "../../Module/biblio";


// UI :
// Todo : change the background, chose an image, and an undraw image for icon.
// Todo: Use Backdrop component, for loading


export default function CreateTeam(props) {

  let classes = useStyles();

  const [category, setCategory] = React.useState("")
  const [categoryList, setCategoryList] = React.useState([])
  const [members, setMember] = React.useState([])
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState({})
  const [email, setEmail] = React.useState("")
  const [isInvalide, setIsInvalide] = React.useState(true)
  const [isLoading, setLoading ] = React.useState(false)

  const http = useAxiosState()
  const userTeamDispatch = useUserTeamDispatch()


  useEffect(() => {

    http.get('/api/ressources/category')
        .then((response) => {
          setCategoryList(response.data)
          setCategory(response.data[0].key)
        })
        .catch(() => {
          showNotification("danger","Check your connection and reload please." )
        })

    return undefined
  }, [])


  const handleKeyDown = (values) => {
    let invalide = false
    const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    if (emailExp.test(values)) {
      invalide = false
      for (const chipDatum of members) {
        if (chipDatum.label === values)
        {
          invalide = true
          break
        }
      }
    }
    else {
      invalide = true
    }
    setIsInvalide(invalide)
    setEmail(values)
  }

  const handleDeleteChip = (chipToDelete) => () => {
    setMember(deleteMember(chipToDelete));
  };

  const addMember = () => {
    let member = {
      key: Date.now() / (Math.random() * 10),
      label: email,
    }
    setMember([member, ...members])
    setIsInvalide(true)
    setEmail("")
  }

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
      setIsInvalide(true)
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
        <form  noValidate autoComplete="off">
          <div>
            <TextField
                id="filled-helperText"
                error={!!error.name}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                helperText={!!error.name ? error.name : "Required"}
                placeholder="The name of your team"
                value={name}
                onChange={(event => {setName(event.target.value); setError({})})}
                required
                fullWidth
                className={classes.textfielInput}
            />
            <TextField
                id="filled-select-sector"
                error={!!error.secteur}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                select
                value={category}
                onChange={(event => {setCategory(event.target.value); setError({})})}
                helperText={!!error.secteur ? error.secteur : "Required"}
                fullWidth
                required
                className={classes.textfielInput}
            >
              <MenuItem value=""  disabled>
                Your field of activity
              </MenuItem>
              {categoryList.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <div>
              <TextField
                  id="filled-helperText"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  margin="normal"
                  helperText="Optional"
                  placeholder="exemple@email.com"
                  className={classes.InputToGetMember}
                  value={email}
                  onChange={(event => handleKeyDown(event.target.value))}
              />
              <Button variant="contained" color="secondary"
                      size="large"
                      className={classes.button}
                      disabled={isInvalide === true}
                      onClick={() => addMember()}
              >
                Add
              </Button>
            </div>
            {members.length !== 0 && <TeamMemberList members = {members} handleDeleteChip = {handleDeleteChip} />}
          </div>
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
        </form>
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


