import React, {useEffect} from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TeamMemberList from "../../components/TeamMemberList";


import {sendTeam} from "../../Module/http";
import {useAxiosState} from "../../context/AxiosContext";

import "../../Module/notify"
import $ from 'jquery';
import {useUserTeamDispatch} from "../../context/UserTeamContext";
import {log} from "../../Module/biblio";
window.jQuery = $;
window.$ = $;


export default function CreateTeam(props) {


  let classes = useStyles();

  const [category, setCategory] = React.useState("")
  const [categoryList, setCategoryList] = React.useState([])
  const [chipData, setChipData] = React.useState([])
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isInvalide, setIsInvalide] = React.useState(true)
  const [isLoading, setLoading ] = React.useState(false)


  useEffect(() => {

    http.get('/api/ressources/category')
        .then((response) => {
          setCategory(response.data[0].key)
          setCategoryList(response.data)
        })
        .catch(() => {
          $.notify("Check your connection and reload please.");
        })

    return undefined
  }, [])

  const http = useAxiosState()
  const userTeamDispatch = useUserTeamDispatch()


  const handleKeyDown = (values) => {
    let invalide = false
    const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    if (emailExp.test(values)) {
      invalide = false
      for (const chipDatum of chipData) {
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
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const addMember = () => {
    let member = {
      key: Date.now() / (Math.random() * 10),
      label: email,
    }
    setChipData([member, ...chipData])
    setIsInvalide(true)
    setEmail("")
  }

  const saveTeam = () => {
    setLoading(true)
    sendTeam(http, {
      name,
      secteur : category,
      members : chipData
    }, next)
  }

  const next = (time) => {
    setTimeout(() => {
      setEmail("")
      setName("")
      setIsInvalide(true)
      setChipData([])
      setLoading(false)
      userTeamDispatch({
        type: "HAS_TEAM",
      })
      props.history.push('/app/dashboard')
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
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                helperText="Required"
                placeholder="The name of your team"
                value={name}
                onChange={(event => setName(event.target.value))}
                required
                fullWidth
                className={classes.textfielInput}
            />
            <TextField
                id="filled-select-currency"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                select
                value={category}
                onChange={(event => {setCategory(event.target.value)})}
                helperText="Required"
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
            {chipData.length !== 0 && <TeamMemberList chipData = {chipData} handleDeleteChip = {handleDeleteChip} />}
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
                          onClick={() => saveTeam()}
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

function catchError(error, setErrorMsg, setError, setIsLoading)
{
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errors = error.response.data.errors
    const keys = Object.keys(errors);
    let msg = ""
    keys.forEach((key, index) => {
      // msg += `${key}: ${errors[key]}` If you need key errors
      msg += `${errors[key]}`
    });
    setErrorMsg(msg)
    setError(true)
    setIsLoading(false)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    let msg = "Check you connection and try again please."
    setErrorMsg(msg)
    setError(true)
    setIsLoading(false)
  } else {
    // Something happened in setting up the request that triggered an CreateTeam
    let msg = "Try to reload the page please. See more in console."
    setErrorMsg(msg)
    log('Error', error.message);
    setError(true)
    setIsLoading(false)
  }
}
