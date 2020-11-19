import React, {useEffect, useState} from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import {useUserDispatch, useUserState} from "../context/UserContext";
import {useAxiosState} from "../context/AxiosContext";
// import {log} from "../Module/biblio";
import Loader from "./Loader";
import CreateTeam from "../pages/createTeam";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  // Todo : Modifier la page d'erreur
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
          <Route
              exact
              path="/creatTeam"
              component={CreateTeam} />}
          />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <BeforeDashbord path="/app" component={Layout} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }

    function BeforeDashbord({ component, ...rest }) {

        const http = useAxiosState()
        const userDispatch = useUserDispatch()

        const [isLoading, setLoading] = useState(true);
        const [hasTeam, setHasTeam] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
            HasTeam(http, setLoading, setHasTeam, setError, userDispatch)
        }, []);

        if (isLoading) {
            return <Loader onError = { error } /> ;
        }

        return (
            <Route
                {...rest}
                render={props =>
                    hasTeam ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/creatTeam",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function HasTeam (axios, setLoading, setHasTeam, setError, userDispatch) {
      axios.get("/api/hasTeam").then(response => {
         setTimeout(() => {
             setHasTeam(response.data.userHasTeam)
             setLoading(false)
         }, 2000)
      })
      .catch(function (error){
          setError("Check your connection and try again please.")
          // Todo : Try to only dispatch user state only when the user request twice
          // userDispatch({ type: "NETWORK_FAILURE" });
          console.log('Error', error.message)
      })
  }
}
