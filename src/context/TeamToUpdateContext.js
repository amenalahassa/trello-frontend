import React from "react";

var TeamToUpdateStateContext = React.createContext();
var SetTeamToUpdateContext = React.createContext();


function TeamToUpdateProvider({ children }) {
  const [state, dispatch] = React.useState(null)

  return (
    <TeamToUpdateStateContext.Provider value={state}>
      <SetTeamToUpdateContext.Provider value={dispatch}>
        {children}
      </SetTeamToUpdateContext.Provider>
    </TeamToUpdateStateContext.Provider>
  );
}

function useTeamToUpdateState() {
  var context = React.useContext(TeamToUpdateStateContext);
  if (context === undefined) {
    throw new Error("useTeamToUpdateState must be used within a TeamToUpdateProvider");
  }
  return context;
}

function useSetTeamToUpdate() {
  var context = React.useContext(SetTeamToUpdateContext);
  if (context === undefined) {
    throw new Error("useSetTeamToUpdate must be used within a TeamToUpdateProvider");
  }
  return context;
}

export { TeamToUpdateProvider, useTeamToUpdateState, useSetTeamToUpdate};
