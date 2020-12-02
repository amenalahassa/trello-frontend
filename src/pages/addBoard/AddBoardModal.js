import React from "react";

// styles
import useStyles from "./styles";
import Modal from "../../components/Modal";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ImageGridList from "./Components/Components";
import {CircularProgress, Fade, Typography} from "@material-ui/core";
import {useDashboard, useDashboardDispatch} from "../../context/DashboardContext";
import {toggleAddBoardModal, useModalDispatch} from "../../context/ModalContext";
import {useAxiosState} from "../../context/AxiosContext";
import {log, showNotification} from "../../Module/biblio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

//Own components



// Todo : Very the responsively of this component

function AddBoardModal(props) {
    let classes = useStyles();

    let boardsImages = useDashboard().board_background

    let modalDispatch = useModalDispatch()
    let http = useAxiosState()
    let setDatas = useDashboardDispatch()
    let userData =  useDashboard().user
    let teams = userData ? userData.teams : []


    const [error, setError] = React.useState({})
    const [name, setName] = React.useState("")
    const [team, setTeam] = React.useState(1)
    const [selectedImage, setSelectedImage] = React.useState("")
    const [isLoading, setLoading] = React.useState(false)
    const [ownerValue, setOwnerValue] = React.useState('')

    const handleRadioChange = (event) => {
        setOwnerValue(event.target.value);
        setError({});
    };

    const cancel = () => {
        reset()
        toggleAddBoardModal(modalDispatch, false)
    }

    const reset = () => {
        setName("")
        setSelectedImage('')
        setOwnerValue('')
        setTeam(1)
        setLoading(false)
    }

    function save() {
        setLoading(true)
        http.post('/api/dashboard/save/board', {
            name,
            backgroundImage: selectedImage,
            owner: ownerValue === "team" ? team : 0,
        })
            .then((response) => {
                setDatas(response.data)
                log(response.data)
                cancel()
            })
            .catch((err) => {
                catchError(err)
            })
    }

    return (
      <div>
          <Modal {...props}>
              <div>
                  <DialogTitle disableTypography id="responsive-dialog-title">{<Typography  variant="h4">Add a board</Typography>}</DialogTitle>
                  <DialogContent>
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
                          placeholder="The name of your board"
                          value={name}
                          onChange={(event => {setName(event.target.value); setError({})})}
                          required
                          fullWidth
                          className={classes.textfielInput}
                      />
                      <div className={classes.inputSelect}>
                          <Typography > Choose your the owner (requires) </Typography>
                          <RadioGroup aria-label="board-owner" name="board-owner" value={ownerValue} onChange={handleRadioChange}>
                              <FormControlLabel value="personal" control={<Radio />} label="Your personal board" />
                              <FormControlLabel value="team" control={<Radio />} label="A team board" />
                          </RadioGroup>
                          {ownerValue !== "team" ? '' :
                              <TextField
                                  id="filled-select-sector"
                                  error={!!error.owner}
                                  InputProps={{
                                      classes: {
                                          underline: classes.textFieldUnderline,
                                          input: classes.textField,
                                      },
                                  }}
                                  margin="normal"
                                  select
                                  value={team}
                                  onChange={(event => {setTeam(event.target.value); setError({})})}
                                  helperText={!!error.owner ? "The provided value are incorrect" : "Required"}
                                  fullWidth
                                  required
                                  className={classes.textfielInput}
                              >
                                  <MenuItem value=""  disabled>
                                      Choose a team
                                  </MenuItem>
                                  {teams && teams.map((option) => (
                                      <MenuItem key={option.id} value={option.id}>
                                          {option.name}
                                      </MenuItem>
                                  ))}
                              </TextField>
                          }
                      </div>
                      <div>
                          <Typography > Choose your board background (optional) </Typography>
                          <ImageGridList images = {boardsImages} setSelectedImage={setSelectedImage} />
                          <Typography hidden={!!error.backgroundImage} variant="caption" display="block">{!!error.backgroundImage ? error.backgroundImage : ""}</Typography>
                      </div>
                  </DialogContent>
                  <DialogActions className={classes.button}>
                      <Button autoFocus onClick={() => cancel()} color="primary" >
                          Cancel
                      </Button>
                      <div className={classes.saveButtonContainer}>
                          {isLoading ? (
                                  <Fade in={isLoading}>
                                      <CircularProgress size={26} color="secondary"/>
                                  </Fade>
                              ) :
                              <Fade in={!isLoading}>
                                  <Button disabled={name.length === 0 || selectedImage.length === 0 || ownerValue.length === 0} onClick={() => save()} color="primary" autoFocus variant="contained">
                                      Save
                                  </Button>
                              </Fade>
                          }
                      </div>
                  </DialogActions>
              </div>
          </Modal>
      </div>
  )
    function catchError(error)
    {
        if (error.response) {
            setError(error.response.data.errors)
            setLoading(false)
        } else if (error.request) {
            cancel()
            showNotification("danger","Check you connection and try again please." )
            setLoading(false)
        } else {
            cancel()
            log('Error', error.message);
            showNotification("danger","Try to reload the page please. See more in console." )
            setLoading(false)
        }
    }

}

export default  AddBoardModal;


