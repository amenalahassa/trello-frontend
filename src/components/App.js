import React, {useEffect, useState} from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState} from "../context/UserAuthContext";
import {useAxiosState} from "../context/AxiosContext";
import Loader from "./Loader";
import CreateTeam from "../pages/createTeam";
import {log} from "../Module/biblio";
import {useUserTeamDispatch, useUserTeamState} from "../context/UserTeamContext";

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
        const userTeam = useUserTeamState()
        const userTeamDispatch = useUserTeamDispatch()

        const [isLoading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            if (userTeam === undefined)
            {
                http.get("/api/hasTeam").then(response => {
                    setTimeout(() => {
                        if (response.data.userHasTeam)
                        {
                            userTeamDispatch({
                                type: "HAS_TEAM",
                            })
                        }
                        else
                        {
                            userTeamDispatch({
                                type: "HAS_NOT_TEAM",
                            })
                        }
                        setLoading(false)
                    }, 2000)
                })
                    .catch(function (error){
                        setError("Check your connection and try again please.")
                        // Todo : Try, if it is possible, another solution to this case
                        localStorage.removeItem('id_token')
                        console.log('Error', error.message)
                    })
            }
            else
            {
                setLoading(false)
            }
            return undefined
        }, []);

        if (isLoading) {
            return <Loader onError = { error } /> ;
        }

        return (
            <Route
                {...rest}
                render={props =>
                    userTeam ? (
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

}
