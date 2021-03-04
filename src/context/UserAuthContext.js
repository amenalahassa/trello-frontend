import React from "react";
import {
    getFromLocalStorage,
    getIntentedUrl,
    isOutdated,
    log,
    resetAllLocalAndContextOnLogout,
} from "../Module/biblio";

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

    let now = Date.now()
    let before = getFromLocalStorage('expire_date')
    let isAuth = isOutdated(before, now) === true ? false : !!localStorage.getItem("id_token")
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: isAuth,
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

export { UserProvider, useUserState, useUserDispatch, loginUser , registerUser };

// ###########################################################

// Todo Reduce number of parameters of each function

function loginUser(axios, dispatchAuth, dispatchHasTeam , email, password, history, setIsLoading, setError, setErrorMsg) {
  setError(false);
  setIsLoading(true);

  if (!!email && !!password) {
      login(axios, email, password, dispatchAuth, dispatchHasTeam , history, setIsLoading, setError, setErrorMsg)
  } else {
    dispatchAuth({ type: "LOGIN_FAILURE" });
    setError(true);
    setErrorMsg(null);
    setIsLoading(false);
  }
}

function registerUser(axios,dispatchAuth, dispatchHasTeam , namevalue, email, password, passwordConfirmationValue, history, setIsLoading, setError, setErrorMsg) {
  setError(false);
  setIsLoading(true);
  if (!!email && !!password && !!namevalue && !!passwordConfirmationValue) {
    register(axios, namevalue, email, password,passwordConfirmationValue, dispatchAuth, dispatchHasTeam ,  history, setIsLoading, setError, setErrorMsg)
  } else {
    dispatchAuth({ type: "REGISTER_FAILURE" });
    setError(true);
    setErrorMsg(null);
    setIsLoading(false);
  }
}


function login (http, email, password,  dispatchAuth, dispatchHasTeam , history, setIsLoading, setError, setErrorMsg) {
    http.get('/sanctum/csrf-cookie').then(response => {
            http.post('/api/login', {
                email,
                password,
            })
                .then(function (response) {
                    setError(null)
                    setIsLoading(false)
                    localStorage.setItem('id_token', response.data.token)
                    localStorage.setItem('expire_date', JSON.stringify(Date.now()))
                    localStorage.setItem('ifHasTeam',  response.data.ifHasTeam)
                    toogleHasTeamDispatch(dispatchHasTeam, response.data.ifHasTeam)
                    dispatchAuth({ type: 'LOGIN_SUCCESS' })
                    history.push(getIntentedUrl())
                })
                .catch(function (error) {
                    catchError(error, setErrorMsg, setError, setIsLoading)
                });
        })
        .catch(function (error) {
            catchError(error, setErrorMsg, setError, setIsLoading)
        });
}

function register (http, name, email, password, password_confirmation, dispatchAuth, dispatchHasTeam , history, setIsLoading, setError, setErrorMsg) {
        http.get('/sanctum/csrf-cookie').then(response => {
            http.post('/api/register', {
                name,
                email,
                password,
                password_confirmation
            })
                .then(function (response) {
                    setError(null)
                    setIsLoading(false)
                    localStorage.setItem('id_token', response.data.token)
                    localStorage.setItem('expire_date', JSON.stringify(Date.now()))
                    localStorage.setItem('ifHasTeam',  response.data.ifHasTeam)
                    toogleHasTeamDispatch(dispatchHasTeam, response.data.ifHasTeam)
                    dispatchAuth({ type: 'REGISTER_SUCCESS' })
                    history.push(getIntentedUrl())
                })
                .catch(function (error) {
                    catchError(error, setErrorMsg, setError, setIsLoading)
                });
        })
        .catch(function (error) {
            catchError(error, setErrorMsg, setError, setIsLoading)
        });
}



function catchError(error, setErrorMsg, setError, setIsLoading)
{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errors = error.response.data.errors
        const keys = Object.keys(errors);
        let msg = ""
        keys.forEach((key, index) => {
            // msg += `${key}: ${errors[key]}` If you need key errors
            msg += `${errors[key]}`
        });
        setErrorMsg(msg)
        setError(true)
        setIsLoading(false)
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        let msg = "Check you connection and try again please."
        setErrorMsg(msg)
        setError(true)
        setIsLoading(false)
    } else {
        // Something happened in setting up the request that triggered an CreateTeam
        let msg = "Try to reload the page please. See more in console."
        setErrorMsg(msg)
        // Todo remove this
        console.log('Error', error.message);
        setError(true)
        setIsLoading(false)
    }
}

function toogleHasTeamDispatch(dispatch, state)
{
    if (state === true)
    {
        dispatch({type : "HAS_TEAM"})
    }
    else
    {
        dispatch({type : "HAS_NOT_TEAM"})
    }
}