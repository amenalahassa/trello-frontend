import React from "react";
import {Route, Switch, Redirect, BrowserRouter, HashRouter, useLocation} from "react-router-dom";

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
import {getCurrentLocationOnCurrentWindow, initializeIntendedUrl} from "../Module/biblio";

export default function App() {
  // global
    const { isAuthenticated } = useUserState();
    const { ifHasTeam } = useUserTeamState();
    initializeIntendedUrl(getCurrentLocationOnCurrentWindow())

    // Todo : Modifier la page d'erreur
    return (
      <DashboardProvider>
        <NotificationProvider>
            <TeamToUpdateProvider>
                    <BrowserRouter>
                        <ModalProvider>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect from="/" push to="/authentication" />} />
                                <AuthMiddleware path="/authentication" component={Layout} />
                                <TeamMiddleware path="/welcome" component={CreateTeam}/>
                                <GuestMiddleware path="/login" component={Login} />
                                <Route component={Error} />
                            </Switch>
                        </ModalProvider>
                    </BrowserRouter>
            </TeamToUpdateProvider>
        </NotificationProvider>
      </DashboardProvider>
  );

  // #######################################################################

    function AuthMiddleware({component,path, ...rest }) {
        return (
            <Route
                exact
                path="/authentication"
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
    function GuestMiddleware({ component, path, ...rest }) {
        return (
            <Route
                exact
                path={"/login"}
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
