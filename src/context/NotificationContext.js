import React, {useEffect, useState} from "react";
import {useNotification} from "./GlobalHooks";
import {DisplayNotification} from "../components/TiniComponents/Notifications";
import {ModalProvider} from "./ModalContext";

var NotificationStateContext = React.createContext();
var NotificationDispatchContext = React.createContext();


function NotificationProvider({ children }) {
  const [ notification, displayNotification, resetNotification] = useNotification()
  let [state, setState] = useState({
    open: notification.open,
    displayNotification
  })

  useEffect(() => {
    console.log(notification)
    setState({
      open: notification.open,
      displayNotification
    })
  }, [notification])

  return (
    <NotificationStateContext.Provider value={state.open}>
      <NotificationDispatchContext.Provider value={state.displayNotification}>
        {children}
        <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
}

function useNotificationState() {
  var context = React.useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error("useNotificationState must be used within a NotificationProvider");
  }
  return context;
}

function useNotificationDispatch() {
  var context = React.useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error("useNotificationDispatch must be used within a NotificationProvider");
  }
  return context;
}

export { NotificationProvider, useNotificationState, useNotificationDispatch };

