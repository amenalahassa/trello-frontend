import React from "react";

var ModalStateContext = React.createContext();
var ModalDispatchContext = React.createContext();


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
            <ModalDispatchContext.Provider value={dispatch}>
                {children}
            </ModalDispatchContext.Provider>
        </ModalStateContext.Provider>
    );
}


function useModalState() {
    var context = React.useContext(ModalStateContext);
    if (context === undefined) {
        throw new Error("useModalState must be used within a ModalProvider");
    }
    return context;
}


function useModalDispatch() {
    var context = React.useContext(ModalDispatchContext);
    if (context === undefined) {
        throw new Error("useModalDispatch must be used within a ModalProvider");
    }
    return context;
}


export { useModalDispatch, useModalState, ModalProvider, toggleAddBoardModal, toggleAddTeamModal, toggleUpdateTeamModal, toggleWarningModal};

function toggleAddBoardModal(dispatch, open) {
     dispatch({
        type: "ADD_BOARD", open
      })
}
function toggleAddTeamModal(dispatch, open) {
    dispatch({
        type: "ADD_TEAM", open
    })
}

function toggleUpdateTeamModal(dispatch, open) {
    dispatch({
        type: "UPDATE_TEAM", open
    })
}

function toggleWarningModal(dispatch, open) {
    dispatch({
        type: "WARNING", open
    })
}
