import React from "react";

// styles
import useStyles from "./styles";
import Modal from "../../components/Modal";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ImageGridList from "./Components/Components";
import {Typography} from "@material-ui/core";

//Own components



// Todo : Very the responsively of this component

function AddBoard(props) {
    let classes = useStyles();
    let {boardsImages, handleClose} = props

    const [error, setError] = React.useState({})
    const [name, setName] = React.useState("")

    const cancel = () => {
        // Todo : Reset all input
        handleClose()
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
                      <Typography > Choose your board background (optional) </Typography>
                      <ImageGridList images = {boardsImages} />
                  </DialogContent>
                  <DialogActions className={classes.button}>
                      <Button autoFocus onClick={handleClose} color="primary" >
                          Disagree
                      </Button>
                      <Button onClick={handleClose} color="primary" autoFocus variant="contained">
                          Agree
                      </Button>
                  </DialogActions>
              </div>
          </Modal>
      </div>
  )
}

export default  AddBoard;


