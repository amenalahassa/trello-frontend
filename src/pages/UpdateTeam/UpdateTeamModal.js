import React, {useState} from "react";
import Modal from "../../components/Modal";
import {Button, CircularProgress, Fade, Tooltip, Typography} from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";
import {toggleUpdateTeamModal, toggleWarningModal, useModalDispatch, useModalState} from "../../context/ModalContext";
import useStyles from "../addTeam/styles";
import DialogContent from "@material-ui/core/DialogContent";
import {useAxiosState} from "../../context/AxiosContext";
import {useDashboard, useDashboardDispatch} from "../../context/DashboardContext";
import {DisplayNotification} from "../../components/TiniComponents/Notifications";
import {useNotification, useTeamToUpdateEffect} from "../../context/GlobalContext";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import UpdateTeam from "../../components/SmallComponent/UpdateTeam";
import {checkIfDataChanged, log} from "../../Module/biblio";
import {deleteTeam, MessageError, updateTeam} from "../../Module/http";
import {MenuToolBar} from "../../components/TiniComponents/MenuToolBar";
import {WarningModal} from "../../components/TiniComponents/WarningModal";




// Todo : Very the responsively of this component

function UpdateTeamModal(props) {
    let classes = useStyles();

    let modalState = useModalState()
    let modalDispatch = useModalDispatch()
    let setDatas = useDashboardDispatch()
    const http = useAxiosState()
    let categoryList = useDashboard().team_category
    let user = useDashboard().user

    const [current, setCurrent] = useState({})
    const [isLoading, setLoading] = React.useState(false)
    const [members, setMember] = React.useState([])
    const [membersList, setMemberList] = React.useState([])
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState({})
    const [category, setCategory] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [updating, beginUpdate] = React.useState(false)
    const [ notification, displayNotification, resetNotification ] = useNotification()
    const [deleteText, setText] = useState("")

    useTeamToUpdateEffect(setCurrent, undefined, undefined, setMemberList)

    const cancel = () => {
        setEmail("")
        setName("")
        setMember([])
        setLoading(false)
        beginUpdate(false)
        toggleUpdateTeamModal(modalDispatch, false)
    }

    const save = () => {
        setLoading(true)
        let [newMember, oldMember] = getMember()
        const validated = {
            id: current.id,
            name : checkIfDataChanged(current.name, name),
            secteur: checkIfDataChanged(current.secteur, category),
            newMember: newMember,
            oldMember: getOldMember(oldMember),
        }
        updateTeam(http,validated, onSuccess, onError)
    }

    const getMember = () => {
        let newMember = []
        let oldMember = []
        for (const member of members) {
            if (member.type === "new") newMember.push(member)
            else oldMember.push(member)
        }
        return [newMember, oldMember]
    }

    const getOldMember = (old) => {
        let oldMember = []
        membersList.forEach((member) => {
            let contains = false
            old.forEach((el) => {
                if (el.email === member.email) {
                    contains = true
                }
            })
            if (contains === false) oldMember.push(member)
        })
        return oldMember
    }

    const toKnowIfUserIsAdmin = () =>
    {
        let admin = false
        members.forEach((member) => {
            if (member.email === user.email && member.admin === true) admin = true
        })
        return admin
    }

    const handleDeleteTeam = () => {
        setText("You're deleting "+ current.name +". Cancel if not.")
        toggleWarningModal(modalDispatch, true)
    }

    const delette = (end) => {
        deleteTeam(http, current.id, onSuccess, onDeleteError, end, displayNotification)
    }

    return (
        <div>
            <Modal {...props}>
                <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
                <div>
                    <MenuToolBar title="Update a team" onClose={() => cancel()} />
                    <CardHeader
                        action={ toKnowIfUserIsAdmin() && updating === true &&
                        <Tooltip title={<Typography variant={"caption"}>Delete this team</Typography>} arrow>
                            <IconButton aria-label="settings" onClick={() => {handleDeleteTeam()}}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        }
                        title={<Typography  variant="h4">{current.name}</Typography>}
                        subheader={boardCount(current.boards_count)}
                    />
                   <DialogContent>
                    <UpdateTeam
                        classes={classes}
                        updating={updating}
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
                                   <Button onClick={() => updating === true ? save() : beginUpdate(true)}  color="primary" autoFocus variant="contained">
                                       { updating === true ? "Save" : "Update"}
                                   </Button>
                               </Fade>
                           }
                       </div>
                   </DialogActions>
               </div>
            </Modal>
            <WarningModal open={ modalState.warning } text={deleteText} callback={delette}  />
        </div>
    )

    function boardCount(count)
    {
        if (count === 0) return "This team don't have board yet."
        if (count === 1) return "This team has one board."
        if (count > 1) return `This team have ${count} boards.`
    }

    function onSuccess(response)
    {
        setDatas(response)
        cancel()
    }

    function onError (error)
    {
        catchError(error)
    }

    function catchError(error)
    {
        if (error.response) {
            if (error.response.data.errors !== undefined) setError(error.response.data.errors)
            else displayNotification("Check you connection and try again please.")
            setLoading(false)
        } else if (error.request) {
            displayNotification("Check you connection and try again please.")
            setLoading(false)
        } else {
            log('Error', error.message);
            displayNotification("Try to reload the page please. See more in console.")
            setLoading(false)
        }
    }

    function onDeleteError()
    {
        displayNotification(MessageError.unknown)
    }

}

export default  UpdateTeamModal;


