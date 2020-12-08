import React from "react";
import {Route, Switch, Redirect, BrowserRouter, HashRouter} from "react-router-dom";

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
import {NotificationProvider} from "../context/NotificationContext";
import {TeamToUpdateProvider} from "../context/TeamToUpdateContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  var { ifHasTeam } = useUserTeamState();

    // Todo : Modifier la page d'erreur
  return (
      <DashboardProvider>
        <NotificationProvider>
            <TeamToUpdateProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/authentication" />} />
                            <AuthMiddleware path="/authentication" component={Layout} />
                            <TeamMiddleware path="/welcome" component={CreateTeam}/>
                            <GuestMiddleware path="/login" component={Login} />
                            <Route component={Error} />
                        </Switch>
                    </BrowserRouter>
                </ModalProvider>
            </TeamToUpdateProvider>
        </NotificationProvider>
      </DashboardProvider>
  );

  // #######################################################################

    function AuthMiddleware({component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/welcome/firstTeam",
                            }}
                        />
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
    function GuestMiddleware({ component, ...rest }) {
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
    function TeamMiddleware({ component, path, ...rest }) {
        return (
            <>
                <Route exact path={path + "/firstTeam"}>
                    {
                        ifHasTeam !== false ? (
                            <Redirect
                                push
                                to={{
                                    pathname: "/welcome/",
                                }}
                            />
                        ) : (
                            React.createElement(component, {...rest} )
                        )
                    }
                </Route>
                <Route
                    exact path={path} component={Layout}
                />
            </>
        );
    }



}
