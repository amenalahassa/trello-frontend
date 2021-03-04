import React, {useEffect, useState} from "react";
import Echo from 'laravel-echo';
import Cookies from 'js-cookie';
import {useUserState} from "./UserAuthContext";

window.io = require('socket.io-client');

let EchoContext = React.createContext();


function EchoProvider({ children }) {
    let { isAuthenticated } = useUserState();
    const echo = useState( new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ":6001",
        auth: {
            headers: {
                /** I'm using access tokens to access  **/
                "X-XSRF-TOKEN" : Cookies.get('XSRF-TOKEN')
            }
        }
    }))

    useEffect(() => {
        if (isAuthenticated === true)
        {
            // console.log('1', echo)
            // echo[0].connector.options.auth.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
            // echo[1](echo[0])
            // console.log('2', echo)
            debugger
            console.log('2',  Cookies.get('XSRF-TOKEN'))
        }
    }, [isAuthenticated])

  return (
    <EchoContext.Provider value={echo[0]}>
        {children}
    </EchoContext.Provider>
  );
}
function useEchoState() {
    var context = React.useContext(EchoContext);
    if (context === undefined) {
        throw new Error("useEchoState must be used within a EchoProvider");
    }
    return context;
}

export { EchoProvider, useEchoState  };

