import React from "react";


// styles
import useStyles from "./styles";
import {useModalDispatch} from "../../context/ModalContext";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function StartBoard()
{
    let classes = useStyles()
    let modalDispatch = useModalDispatch()


    return  (
        <div className={classes.root}>
            <div className={classes.card}>
                <CardHeader
                    title="To start, you need a board."
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                        {
                            "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything."
                        }
                    </Typography>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            className={classes.buttonAddBoard}
                            onClick={() => showModal()}
                    >Add a board</Button>
                </CardContent>
            </div>
        </div>
    )

    function showModal()
    {
        modalDispatch("ADD_BOARD", true)
    }

}

export default StartBoard