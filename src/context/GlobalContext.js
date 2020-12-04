import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTeamToUpdateState} from "./TeamToUpdateContext";
import {returnArrayIfUndefined} from "../Module/biblio";
import Avatar from "@material-ui/core/Avatar";

function useNotification()
{
    const [notification, showNotification] = React.useState({
        open: false,
        type : "error",
        message : ''
    })

    // error
    // warning
    // success
    // info

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


function useTeamToUpdateEffect (setCurrent = () => {}, setCurrentName = () => {}, setCurrentSecteur = () => {}, setCurrentMember)
{
    const team = useTeamToUpdateState()

    const chips = useMemo(() => {
        if (team !==  null) return transformMemberToCHip(team)
    }, [team])

    useEffect(() => {
        if (team !== null )
        {
            setCurrent(team)
            setCurrentName(team.name)
            setCurrentSecteur(team.secteur)
            setCurrentMember(chips)
        }
    }, [team])


    function transformMemberToCHip (current)
    {
        let users = []
        returnArrayIfUndefined(current.user).forEach((el) => {
            users.push({
                key: Date.now() / (Math.random() * 10),
                type: "user",
                email: el.email,
                name: el.name,
                admin: Boolean(el.pivot.admin),
                photo : <Avatar>{el.name[0]}</Avatar>,
            })
        })

        returnArrayIfUndefined(current.invited).forEach((el) => {
            users.push({
                key: Date.now() / (Math.random() * 10),
                type: "invited",
                email: el.to_email,
            })
        })
        return users
    }
}



export { useNotification, useIsMountedRef, useTeamToUpdateEffect };