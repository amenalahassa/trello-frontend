import React, {useEffect, useState} from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState} from "../context/UserAuthContext";
import CreateTeam from "../pages/createTeam";
import { useUserTeamState} from "../context/UserTeamContext";
import {ModalProvider} from "../context/ModalContext";
import {DashboardProvider} from "../context/DashboardContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  var { ifHasTeam } = useUserTeamState();

  // Todo : Modifier la page d'erreur
  return (
      <DashboardProvider>
          <ModalProvider>
            <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
            <Route
              exact
              path="/app"
              render={() => <Redirect to="/app/dashboard" />}
            />
            <PrivateRoute path="/app" component={Layout} />
            <PublicRoute path="/login" component={Login} />
            <Route component={Error} />
          </Switch>
            </HashRouter>
          </ModalProvider>
      </DashboardProvider>
  );

  // #######################################################################

    function PrivateRoute({component, ...rest }) {
        if (ifHasTeam === false)
        {
            component = CreateTeam
        }
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                            React.createElement(component, props)
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

}
