import React from "react";
import Modal from "../../components/Modal";
import {Button, CircularProgress, Fade, Typography} from "@material-ui/core";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import {toggleAddTeamModal, toggleUpdateTeamModal, useModalDispatch} from "../../context/ModalContext";
import useStyles from "../addTeam/styles";
import AddTeam from "../../components/SmallComponent/AddTeam";
import DialogContent from "@material-ui/core/DialogContent";
import {useAxiosState} from "../../context/AxiosContext";
import {useDashboard, useDashboardDispatch} from "../../context/DashboardContext";
import {DisplayNotification} from "../../components/TiniComponents/Notifications";
import {useNotification} from "../../context/GlobalContext";
import {sendTeam} from "../../Module/http";



// Todo : Very the responsively of this component

function UpdateTeamModal(props) {
    let classes = useStyles();

    let modalDispatch = useModalDispatch()
    let setDatas = useDashboardDispatch()
    const http = useAxiosState()
    let categoryList = useDashboard().team_category

    let { current } = props
    const [isLoading, setLoading] = React.useState(false)
    const [members, setMember] = React.useState([])
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState({})
    const [category, setCategory] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [ notification, displayNotification, resetNotification ] = useNotification()


    const cancel = () => {
        setEmail("")
        setName("")
        setMember([])
        setLoading(false)
        toggleUpdateTeamModal(modalDispatch, false)
    }

    const save = () => {
        setLoading(true)
        cancel()
    }


    return (
        <div>
            <Modal {...props}>
                <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
                <div>
                   <DialogTitle disableTypography id="responsive-dialog-title">{<Typography  variant="h4">Add a Team</Typography>}</DialogTitle>
                   <DialogContent>
                    <AddTeam
                        classes={classes}
                        categoryList={categoryList}
                        members={members} setMember={setMember}
                        name={name} setName={setName}
                        error={error} setError={setError}
                        category={category} setCategory={setCategory}
                        email={email} setEmail={setEmail}
                    />
                   </DialogContent>
                   <DialogActions className={classes.buttonModal}>
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
                                   <Button onClick={() => save()}  color="primary" autoFocus variant="contained">
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

}

export default  UpdateTeamModal;


