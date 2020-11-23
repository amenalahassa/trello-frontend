import React from "react";


// styles
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import {Typography} from "@material-ui/core";

function TeamMemberList(props) {
    var classes = useStyles();
    const { members, handleDeleteChip } = props

    return (
        <>
            <Typography className={classes.text}  >
                Your teammates
            </Typography>
            <Paper className={classes.root} elevation={2}>
                {members.map((data) => {
                    return (
                        <li key={data.key}>
                            <Chip
                                label={data.label}
                                onDelete={handleDeleteChip(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
        </>
    );
}

export default TeamMemberList;
