import React, {useEffect, useState} from "react";
import {
  Route,
  Switch,
  withRouter,  useHistory,  HashRouter
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components


// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context

import Header from "../Header/Header";
import {
    getCurrentLocationOnCurrentWindow,
    resetAllLocalAndContextOnLogout,
    setItemInLocalStorage,
    viewportSize
} from "../../Module/biblio";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {useAxiosState} from "../../context/AxiosContext";
import {useIsMountedRef, useMatchWithRedirect} from "../../context/GlobalHooks";
import { useUserDispatch, useUserState} from "../../context/UserAuthContext";
import {useNotificationDispatch} from "../../context/NotificationContext";
import StartBoard from "../../pages/startBoard";

// Todo : Back sidebar for responsive site

function Layout(props) {

    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()
    const history = useHistory()
    const [isLoading, setLoading] = useState(true);
    const  [currentBoard, setCurrentBoard] = useState(null)
    const displayNotification = useNotificationDispatch()
    const classes = useStyles( { backgroundImage : getResizeBackgroundImage(currentBoard)});

    const setDatas = useDashboardDispatch()
    const http = useAxiosState()
    const isMountedRef = useIsMountedRef()
    const authDispatch = useUserDispatch()




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
                      setLoading(false)
                  }
              })
              .catch((error) => {
                  if (error.response) {
                      switch (error.response.status) {
                          case 401:
                              displayNotification("You logged in a while ago. Please re-authenticate you.")
                              setItemInLocalStorage('intented-route', getCurrentLocationOnCurrentWindow())
                              resetAllLocalAndContextOnLogout(authDispatch, history)
                              break
                      }
                  }
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
