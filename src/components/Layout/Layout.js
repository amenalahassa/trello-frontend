import React, {useEffect, useState} from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components


// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context

import Header from "../Header/Header";
import {log, showNotification, viewportSize} from "../../Module/biblio";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {useModalState} from "../../context/ModalContext";
import {useAxiosState} from "../../context/AxiosContext";
import AddBoard from "../../pages/AddBoard";
// Todo : Back sidebar for responsive site

function Layout(props) {

    const [isLoading, setLoading] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState(null)

    const classes = useStyles( { backgroundImage : getResizeBackgroundImage(backgroundImage)});


  const modalState = useModalState()
  const setDatas = useDashboardDispatch()
  const http = useAxiosState()


  useEffect(() => {
    http.get('/api/dashboard/info')
        .then((response) => {
          setTimeout(() => {
            setDatas(response.data)
            setLoading(false)
          }, 1000)
        })
        .catch((error) => {
            log('Error', error.message);
            showNotification("danger","Check you connection and reload the page please." )
        })
  }, [])

  return (
    <div className={classes.root}>
        <>
            <Header history={props.history} isLoading={isLoading} setBackgroundImage={setBackgroundImage}  />
            <div
              className={classnames(classes.content)}
            >
              <Switch>
                <Route path="/app/dashboard" component={Dashboard}  />
              </Switch>
            </div>
            <div>
              <AddBoard  open={ modalState.addBoard } />
            </div>
        </>
    </div>
  );

  function getResizeBackgroundImage(link)
  {
      let image = ''
      if (link === null)
      {
          image =  "https://source.unsplash.com/" + viewportSize().width + "x" + viewportSize().height + "/?africa,evening,smile,joy,world"
      }
      else
      {
          image = link  + "&w=" + viewportSize().width + "&h=" + viewportSize().height +"&fm=jpg&fit=crop"
      }
      return  `url(${image})`

  }
}

export default withRouter(Layout);
