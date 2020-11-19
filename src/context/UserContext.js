import React from "react";
import {login, logout, register} from "../context/AxiosContext";
// import { log  } from "../Module/biblio";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "REGISTER_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "NETWORK_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "REGISTER_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut , registerUser };

// ###########################################################

function loginUser(dispatch, email, password, history, setIsLoading, setError, setErrorMsg) {
  setError(false);
  setIsLoading(true);

  if (!!email && !!password) {
      login(email, password, dispatch , history, setIsLoading, setError, setErrorMsg)
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setErrorMsg(null);
    setIsLoading(false);
  }
}

function registerUser(dispatch, namevalue, email, password, passwordConfirmationValue, history, setIsLoading, setError, setErrorMsg) {
  setError(false);
  setIsLoading(true);
  if (!!email && !!password && !!namevalue && !!passwordConfirmationValue) {
    register(namevalue, email, password,passwordConfirmationValue, dispatch ,  history, setIsLoading, setError, setErrorMsg)
  } else {
    dispatch({ type: "REGISTER_FAILURE" });
    setError(true);
    setErrorMsg(null);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  logout(dispatch, history)
}
