import React from "react";

var UserTeamStateContext = React.createContext();
var UserTeamDispatchContext = React.createContext();


function userTeamReducer(state, action) {
    switch (action.type) {
        case "HAS_NOT_TEAM":
            return { ...state, ifHasTeam: false };
        case "HAS_TEAM":
            return { ...state, ifHasTeam: true };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}


function UserTeamProvider({ children }) {
    var [state, dispatch] = React.useReducer(userTeamReducer, {
        ifHasTeam : null ,
    });

    return (
        <UserTeamStateContext.Provider value={state}>
            <UserTeamDispatchContext.Provider value={dispatch}>
                {children}
            </UserTeamDispatchContext.Provider>
        </UserTeamStateContext.Provider>
    );
}


function useUserTeamState() {
    var context = React.useContext(UserTeamStateContext);
    if (context === undefined) {
        throw new Error("useAxiosState must be used within a AxiosProvider");
    }
    return context;
}


function useUserTeamDispatch() {
    var context = React.useContext(UserTeamDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}


export { useUserTeamDispatch, useUserTeamState, UserTeamProvider};

export function toggleHasTeam(dispatch) {
     dispatch({
        type: "HAS_TEAM",
      })
}
