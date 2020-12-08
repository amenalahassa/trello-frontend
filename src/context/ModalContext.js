import React from "react";
import AddBoardModal from "../pages/addBoard/AddBoardModal";
import AddTeamModal from "../pages/addTeam/AddTeamModal";
import UpdateTeamModal from "../pages/updateTeam/UpdateTeamModal";
import {WarningModal} from "../components/TiniComponents/WarningModal";

let ModalDispatchContext = React.createContext();
let ModalStateContext = React.createContext();



function ModalReducer(state, action) {
    switch (action.type) {
        case "UPDATE_TEAM":
            return { ...state, updateTeam : action.open };
        case "ADD_BOARD":
            return { ...state, addBoard : action.open };
        case "ADD_TEAM":
            return { ...state, addTeam : action.open };
        case "WARNING":
            return { ...state, warning : action.open };
        case "CLOSE_ALL":
            return { addBoard: false , addTeam: false, updateTeam: false, warning:false};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}


function ModalProvider({ children }) {
    var [state, dispatch] = React.useReducer(ModalReducer, {
        addBoard : false ,
        addTeam: false,
        updateTeam: false,
        warning:false,
    });

    return (
        <ModalStateContext.Provider value={state}>
            <ModalDispatchContext.Provider value={toggleModal}>
                {children}
                <div>
                    <AddBoardModal  open={ state.addBoard } />
                    <AddTeamModal  open={ state.addTeam } />
                    <UpdateTeamModal open={ state.updateTeam } />
                </div>
            </ModalDispatchContext.Provider>
        </ModalStateContext.Provider>

    );

    function toggleModal(state, open) {

        switch (state) {
            case "ADD_BOARD" :
                dispatch({
                    type: "ADD_BOARD", open
                })
                break
            case "ADD_TEAM" :
                dispatch({
                    type: "ADD_TEAM", open
                })
                break
            case "UPDATE_TEAM" :
                dispatch({
                    type: "UPDATE_TEAM", open
                })
                break
            case "WARNING" :
                dispatch({
                    type: "WARNING", open
                })
                break
            default :
                dispatch({
                    type: "CLOSE_ALL"
                })
        }

    }

}


function useModalDispatch() {
    var context = React.useContext(ModalDispatchContext);
    if (context === undefined) {
        throw new Error("useModalDispatch must be used within a ModalProvider");
    }
    return context;
}

function useModalState() {
    var context = React.useContext(ModalStateContext);
    if (context === undefined) {
        throw new Error("useModalState must be used within a ModalProvider");
    }
    return context;
}

export { useModalDispatch, ModalProvider, useModalState};
