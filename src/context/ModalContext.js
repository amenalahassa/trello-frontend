import React from "react";

var ModalStateContext = React.createContext();
var ModalDispatchContext = React.createContext();


function ModalReducer(state, action) {
    switch (action.type) {
        case "ADD_BOARD":
            return { ...state, addBoard : action.open };
        case "CLOSE_ALL":
            return { addBoard: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}


function ModalProvider({ children }) {
    var [state, dispatch] = React.useReducer(ModalReducer, {
        addBoard : false ,
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


export { useModalDispatch, useModalState, ModalProvider, toggleAddBoardModal};

function toggleAddBoardModal(dispatch, open) {
     dispatch({
        type: "ADD_BOARD", open
      })
}
