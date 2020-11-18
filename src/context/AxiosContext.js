import React, {useState} from "react";
import * as axios from "axios";
import {delete_cookie, log} from '../Module/biblio'

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
    return context;
}


export { login, AxiosProvider, useAxiosState,  logout, register};

function login (email, password,  dispatch , history, setIsLoading, setError, setErrorMsg) {
    instance.get('/sanctum/csrf-cookie').then(response => {
            instance.post('/api/login', {
                email,
                password,
            })
                .then(function (response) {
                    setError(null)
                    setIsLoading(false)
                    localStorage.setItem('id_token', response.data.token)
                    dispatch({ type: 'LOGIN_SUCCESS' })
                    history.push('/app/dashboard')
                })
                .catch(function (error) {
                    catchError(error, setErrorMsg, setError, setIsLoading)
                });
        })
        .catch(function (error) {
            catchError(error, setErrorMsg, setError, setIsLoading)
        });
}

function register (name, email, password, password_confirmation,  dispatch , history, setIsLoading, setError, setErrorMsg) {
        instance.get('/sanctum/csrf-cookie').then(response => {
            instance.post('/api/register', {
                name,
                email,
                password,
                password_confirmation
            })
                .then(function (response) {
                    setError(null)
                    setIsLoading(false)
                    localStorage.setItem('id_token', response.data.token)
                    dispatch({ type: 'REGISTER_SUCCESS' })
                    history.push('/app/dashboard')
                })
                .catch(function (error) {
                    catchError(error, setErrorMsg, setError, setIsLoading)
                });
        })
        .catch(function (error) {
            catchError(error, setErrorMsg, setError, setIsLoading)
        });
}

function logout(dispatch, history)
{
  instance.get('/api/logout')
      .then(function (){
          localStorage.removeItem("id_token")
          delete_cookie('XSRF-TOKEN')
          dispatch({ type: "SIGN_OUT_SUCCESS" });
          history.push("/login");
      })
      .catch(function (error) {
        log(error)
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
        // Something happened in setting up the request that triggered an Error
        let msg = "Try to reload the page please. See more in console."
        setErrorMsg(msg)
        log('Error', error.message);
        setError(true)
        setIsLoading(false)
    }
}