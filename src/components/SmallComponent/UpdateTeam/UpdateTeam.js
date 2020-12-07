import React, {useEffect, useMemo, useState} from "react";

import {Button, Tooltip, Typography} from '@material-ui/core'

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
    checkIfMemberEmailIsValide,
    deleteMember,
 returnStringIfUndefined,
} from "../../../Module/biblio";
import {useTeamToUpdateEffect} from "../../../context/GlobalHooks";
import useStyles from "./style";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import {Delete} from "@material-ui/icons";
import {useDashboard} from "../../../context/DashboardContext";



function UpdateTeam(props) {

    let { classes , categoryList , setMember , members, updating } = props
    const [emailValidated, validateEmail] = React.useState(true)

    useTeamToUpdateEffect(undefined, props.setName , props.setCategory, setMember)

    const handleKeyDown = (values) => {
        validateEmail(checkIfMemberEmailIsValide(values, members))
        props.setEmail(values)
    }

    const addMember = () => {
        let member = {
            key: Date.now() / (Math.random() * 10),
            email: props.email,
            type: "new",
        }
        setMember([member, ...members])
        validateEmail(true)
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
                    helperText={!!props.error.name ? props.error.name : <Typography variant={"caption"}>{updating === true && "Required"}</Typography>}
                    placeholder="The name of your team"
                    value={returnStringIfUndefined(props.name)}
                    onChange={(event => {props.setName(event.target.value); props.setError({})})}
                    required
                    disabled={!updating}
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
                    value={returnStringIfUndefined(props.category)}
                    onChange={(event => {props.setCategory(event.target.value); props.setError({})})}
                    helperText={!!props.error.secteur ? props.error.secteur : <Typography variant={"caption"}>{updating === true && "Required"}</Typography>}
                    fullWidth
                    required
                    disabled={!updating}
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
                    { updating === true && <div>
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
                                disabled={emailValidated === true}
                                onClick={() => addMember()}
                        >
                            Add
                        </Button>
                    </div>}
                    {members.length !== 0 &&
                    <TeamUserList
                        list={members}
                        updating={updating}
                        setMember={setMember}
                        handleDeleteChip = {handleDeleteChip}
                    />}
                    <Typography hidden={!!props.error.members} variant="caption" color="secondary" display="block">{!!props.error.members ? props.error.members : ""}</Typography>
                </div>
            </div>
        </form>
  );

}

export default UpdateTeam;

function TeamUserList(props) {
    var classes = useStyles();
    const {  handleDeleteChip , list, updating, setMember } = props
    let user = useDashboard().user

    const toKnowIfUserIsAdmin = () =>
    {
        let admin = false
        list.forEach((member) => {
            if (member.email === user.email && member.admin === true) admin = true
        })
        return admin
    }

    const handleDeleteAllMembers = () =>
    {
        setMember(list.filter((item) => item.email === user.email))
    }

    return (
        <>
            <CardHeader
                action={ toKnowIfUserIsAdmin() && updating === true &&
                <div>
                    {list.length > 1 &&
                    <Tooltip title={<Typography variant={"caption"}>Delete all members</Typography>} arrow>
                        <IconButton aria-label="settings" onClick={() => handleDeleteAllMembers()}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    }
                </div>
                }
                title={<Typography  variant="subtitle2"> Members</Typography>}
            />
            <Paper className={classes.root} elevation={2}>
                {list.map((data) => {
                    if (data.type !== "user") return (<InvitedChip data={data} key={data.key}/>)
                    return (<UserChip data={data} key={data.key}/>)
                })}
            </Paper>
        </>
    );

    function UserChip ({ data })
    {
        if ((data.email === user.email && data.admin === true) || toKnowIfUserIsAdmin() === false || updating === false)
        {
            return (
                <li>
                    <Chip
                        label={data.name}
                        avatar={data.photo}
                        className={classes.chip}
                    />
                </li>
            )
        }
        return (
            <li>
                <Chip
                    label={data.name}
                    avatar={data.photo}
                    onDelete={handleDeleteChip(data)}
                    className={classes.chip}
                />
            </li>
        )
    }

    function InvitedChip ({ data })
    {
        if (toKnowIfUserIsAdmin() === false || updating === false)
        {
            return (
                <li >
                    <Chip
                        label={data.email}
                        className={classes.chip}
                    />
                </li>
            )
        }
        return (
            <li >
                <Chip
                    label={data.email}
                    onDelete={handleDeleteChip(data)}
                    className={classes.chip}
                />
            </li>
        )
    }


}