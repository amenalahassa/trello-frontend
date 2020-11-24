import React, {useState} from "react";
import * as axios from "axios";

var AxiosContext = React.createContext();

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

function AxiosProvider({ children }) {
  var [state, setstate] = useState({query : instance})

  return (
    <AxiosContext.Provider value={state}>
        {children}
    </AxiosContext.Provider>
  );
}
function useAxiosState() {
    var context = React.useContext(AxiosContext);
    if (context === undefined) {
        throw new Error("useAxiosState must be used within a AxiosProvider");
    }
    return context.query;
}

export { AxiosProvider, useAxiosState };

