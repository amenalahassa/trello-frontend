import React from "react";

var DashboardContext = React.createContext();
var DashboardDispatchContext = React.createContext();



function DashboardProvider({ children }) {
    var [state, dispatch] = React.useState({})

    return (
        <DashboardContext.Provider value={state}>
            <DashboardDispatchContext.Provider value={dispatch}>
                {children}
            </DashboardDispatchContext.Provider>
        </DashboardContext.Provider>
    );
}


function useDashboard() {
    var context = React.useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
}


function useDashboardDispatch() {
    var context = React.useContext(DashboardDispatchContext);
    if (context === undefined) {
        throw new Error("useDashboardDispatch must be used within a DashboardProvider");
    }
    return context;
}


export { useDashboardDispatch, useDashboard, DashboardProvider };

