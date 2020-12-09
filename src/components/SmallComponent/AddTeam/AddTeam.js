import React, {useEffect} from "react";

import {Button, Typography} from '@material-ui/core'

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TeamMemberList from "../TeamMemberList";
import {
    checkIfMemberEmailIsValide,
    deleteMember,
    getCategoryFromLocalStorage,
    setItemInLocalStorage
} from "../../../Module/biblio";
import {useAxiosState} from "../../../context/AxiosContext";
import {URLS} from "../../../Module/http";
import {useUserState} from "../../../context/UserAuthContext";
import {useMatchWithRedirect} from "../../../context/GlobalHooks";
import {useHistory} from "react-router-dom";



function AddTeam(props) {

    let { classes , setMember, displayNotification ,members} = props

    const [isInvalide, setIsInvalide] = React.useState(true)
    const [categoryList, setCategoryList] = React.useState([])

    const http = useAxiosState()
    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()
    let history = useHistory()

    useEffect(() => {
        setCategoryList(getCategoryFromLocalStorage(getCategoryOnServer))
    }, [])

    const handleKeyDown = (values) => {
        setIsInvalide(checkIfMemberEmailIsValide(values, members))
        props.setEmail(values)
    }

    const addMember = () => {
        let member = {
            key: Date.now() / (Math.random() * 10),
            email: props.email,
        }
        setMember([member, ...members])
        setIsInvalide(true)
        props.setEmail("")
    }

    const handleDeleteChip = (chipToDelete) => () => {
        setMember(deleteMember(chipToDelete));
    }

    return (
        <form  noValidate autoComplete="off">
            <div>
                <TextField
                    id="filled-helperText"
                    error={!!props.error.name}
                    InputProps={{
                        classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                        },
                    }}
                    margin="normal"
                    helperText={!!props.error.name ? props.error.name : "Required"}
                    placeholder="The name of your team"
                    value={props.name}
                    onChange={(event => {props.setName(event.target.value); props.setError({})})}
                    required
                    fullWidth
                    className={classes.textfielInput}
                />
                <TextField
                    id="filled-select-sector"
                    error={!!props.error.secteur}
                    InputProps={{
                        classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                        },
                    }}
                    margin="normal"
                    select
                    value={props.category}
                    onChange={(event => {props.setCategory(event.target.value); props.setError({})})}
                    helperText={!!props.error.secteur ? props.error.secteur : "Required"}
                    fullWidth
                    required
                    className={classes.textfielInput}
                >
                    <MenuItem value=""  disabled>
                        Your field of activity
                    </MenuItem>
                    {categoryList && categoryList.map((option) => (
                        <MenuItem key={option.key} value={option.key}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
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
                            placeholder="exemple@props.email.com"
                            className={classes.InputToGetMember}
                            value={props.email}
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
                    <Typography hidden={!!props.error.members} variant="caption" color="secondary" display="block">{!!props.error.members ? props.error.members : ""}</Typography>
                </div>
            </div>
        </form>
  );

    function getCategoryOnServer () {
        if (isAuthenticated === false && matchWithRedirect === null)
        {
            history.push('/login')
        }
        if (isAuthenticated === true)
        {
            http.get(URLS.ressources.category)
                .then((response) => {
                    setCategoryList(response.data)
                    // Todo find a way to update this by broadcasting when it change on server side
                    setItemInLocalStorage("category", response.data)
                })
                .catch(() => {
                    displayNotification("Check your connection and reload please." )
                })
        }
    }

}

export default AddTeam;

