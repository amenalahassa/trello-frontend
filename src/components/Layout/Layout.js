import React from "react";
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

// Todo : Back sidebar for responsive site

function Layout(props) {
  var classes = useStyles();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <div
            className={classnames(classes.content)}
          >
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
