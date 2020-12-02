import React, {useEffect, useRef} from "react";

function useNotification()
{
    const [notification, showNotification] = React.useState({
        open: false,
        type : "error",
        message : ''
    })

    const displayNotification = (message, type = "error") => {
        showNotification({
            open: true, message, type,
        })
    }

    const resetNotification = (value) =>
    {
        showNotification({
            ...notification,
            open: value,
        })
    }
    return [ notification, displayNotification, resetNotification ]
}


function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
        isMountedRef.current = true;
        return () => isMountedRef.current = false;
    });
    return isMountedRef;
}
export { useNotification, useIsMountedRef };