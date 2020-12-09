import React, {useEffect, useState} from "react";
import {
  Route,
  Switch,
  withRouter, useLocation, useHistory, useRouteMatch, HashRouter
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components


// pages
import Dashboard, {Placeholder} from "../../pages/dashboard/Dashboard";

// context

import Header from "../Header/Header";
import {viewportSize} from "../../Module/biblio";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {useAxiosState} from "../../context/AxiosContext";
import {useIsMountedRef, useMatchWithRedirect} from "../../context/GlobalHooks";
import Loader from "../Loader";
import {signOut, useUserDispatch, useUserState} from "../../context/UserAuthContext";
import {useNotificationDispatch} from "../../context/NotificationContext";
import StartBoard from "../../pages/startBoard";

// Todo : Back sidebar for responsive site

function Layout(props) {

    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()
    let history = useHistory()
    const [isLoading, setLoading] = useState(true);
    let  [currentBoard, setCurrentBoard] = useState(null)
    const displayNotification = useNotificationDispatch()
    const classes = useStyles( { backgroundImage : getResizeBackgroundImage(currentBoard)});

    const setDatas = useDashboardDispatch()
    const http = useAxiosState()
    const isMountedRef = useIsMountedRef();
    const userDispatch = useUserDispatch();



  useEffect(() => {
      if (isAuthenticated === false && matchWithRedirect === null)
      {
          history.push('/login')
      }
      if (isAuthenticated === true)
      {
          http.get('/api/dashboard/info')
              .then((response) => {
                  if (isMountedRef.current)
                  {
                      setDatas(response.data)
                      console.log(response.data)
                      // console.log(location)
                      // console.log(history)
                      // console.log(match)
                      setLoading(false)
                  }
              })
              .catch((error) => {
                  // if (error.response) {
                  //     if (error.response.status === 401)
                  //     {
                  //         signOut(http, userDispatch, history)
                  //     }
                  // }
                  // Todo remove this
                  console.log('Error', error.message);
                  // Todo when the user is not yet authenticated, disconnect it
                  displayNotification("Check you connection and reload the page please.")
              })
      }
  }, [])


  return (
    <div className={classes.root}>
        <>
            <HashRouter >
                <Header history={props.history} isLoading={isLoading} setCurrentBoard={setCurrentBoard} />
                <div
                    className={classnames(classes.content)}
                >
                    <Switch>
                        {/* Todo define a default route, with error display */}
                        {/*<Route   exact path="/"  component={Loader} />*/}
                        <Route   path="/board/:id"  component={Dashboard} />} />
                        <Route   path="/startBoard"  component={StartBoard} />
                    </Switch>
                </div>
            </HashRouter>
        </>
    </div>
  );

  function getResizeBackgroundImage(link)
  {
      if (link !== null)
      {
          let image = link.image  + "&w=" + viewportSize().width + "&h=" + viewportSize().height +"&fm=jpg&fit=crop"
          return `url(${image})`
      }
      let image = "https://source.unsplash.com/" + viewportSize().width + "x" + viewportSize().height + "/?africa,evening,smile,joy,world"
      return  `url(${image})`
  }
}

export default withRouter(Layout);
