import React, {useEffect, useState} from "react";
import {
  Route,
  Switch,
  withRouter,  useHistory,  HashRouter
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// import `${window.location.protocol + "//" + window.location.hostname + ":6001/socket.io/socket.io.js"}`;

// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context

import Header from "../Header/Header";
import {
    getCurrentLocationOnCurrentWindow, log,
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
import {useEchoState} from "../../context/EchoContext";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Cookies from 'js-cookie';
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

    const echo = useEchoState()


    useEffect(() => {
        // echo.channel('private-chan-demo')
        //     .listen('.test', e => console.log(e))
        // console.log('echo', echo)
    }, [])

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
                      connectToChannel(response.data.user.id)
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
                          default :
                              displayNotification("Check your connection and reload please.")
                              break
                      }
                  }
                  else
                  {
                      displayNotification("Check your connection and reload please.")
                  }
              })
      }
  }, [])

    const connectToChannel = (id) =>
    {
        // console.log('0', echo)
        console.log('0',  Cookies.get('XSRF-TOKEN'))
        echo.private('App.Models.User.' + id)
            .notification((notification) => {
                let message = <div>
                    <Typography variant="body2" color="textSecondary" component="p">{notification.content}</Typography>
                    <div className={classes.notificationBottom}>
                        <Button size="small" className={classes.notificationBottomButton}  color="secondary" variant="contained">
                            Refuse
                        </Button>
                        <Button onClick={() =>  displayNotification(message, 'info', true) }  size="small" color="primary"  variant="contained">
                            ok
                        </Button>
                    </div>
                </div>
                displayNotification(message, 'info', undefined)
            })
    }


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
