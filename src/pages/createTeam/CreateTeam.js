import React from "react";
import {Grid, Paper, Typography, Button, CircularProgress, Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TeamMemberList from "../../components/TeamMemberList";


import { categories } from './categories'
import {log} from "../../Module/biblio";

export default function CreateTeam() {
  let classes = useStyles();
  const [category, setCategory] = React.useState(categories[0].value)
  const [chipData, setChipData] = React.useState([])
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isInvalide, setIsInvalide] = React.useState(true)
  const [isLoading, setLoading ] = React.useState(false)

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

  function saveTeam() {
    setLoading(true)

    // Todo : send data to server
    setTimeout(() => {
      setEmail("")
      setName("")
      setIsInvalide(true)
      setChipData([])
      setLoading(false)
    }, 2000)
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
                label="Required"
                variant="filled"
                helperText="Please enter your team's name"
                placeholder="African Hero"
                value={name}
                onChange={(event => setName(event.target.value))}
                required
                fullWidth
                className={classes.textfielInput}
            />
            <TextField
                id="filled-select-currency"
                select
                value={category}
                onChange={(event => setCategory(event.target.value))}
                label="Required"
                helperText="Please choose your field of activity"
                variant="filled"
                fullWidth
                required
                className={classes.textfielInput}
            >
              {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <div>
              <TextField
                  id="filled-helperText"
                  label="Add a member"
                  helperText="Please enter email of a member to add (optinal)"
                  variant="outlined"
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
