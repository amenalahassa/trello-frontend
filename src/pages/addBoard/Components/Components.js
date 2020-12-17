import React, {useEffect, useState} from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import useStyles from './style'
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {useAxiosState} from "../../../context/AxiosContext";
import {URLS} from "../../../Module/http";
import {Typography} from "@material-ui/core";
import {useUserDispatch, useUserState} from "../../../context/UserAuthContext";
import {useMatchWithRedirect} from "../../../context/GlobalHooks";
import {useHistory} from "react-router-dom";
import {
    getCurrentLocationOnCurrentWindow,
    resetAllLocalAndContextOnLogout,
    setItemInLocalStorage
} from "../../../Module/biblio";
import {useNotificationDispatch} from "../../../context/NotificationContext";


export default function ImageGridList(props) {
    const classes = useStyles();
    let { setSelectedImage } = props

    let http = useAxiosState()
    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()
    let history = useHistory()
    const displayNotification = useNotificationDispatch()
    const authDispatch = useUserDispatch()


    const [images, setImages] = useState([])
    const [grid, setGrid] = useState([])

    useEffect(() => {
        if (isAuthenticated === false && matchWithRedirect === null)
        {
            history.push('/login')
        }
        if (isAuthenticated === true)
        {
            http.get(URLS.ressources.boardBackgroundImage)
                .then((response) => {
                    setImages(response.data.images)
                }).catch((error) => {
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
    },[isAuthenticated])

    useEffect(() => {
        if (images.length > 0)
        {
            let element = []
            images.forEach((val) => {
                element.push(initialise(val))
            })
            setGrid(element)
        }
    }, [images])


    const styles = {
        selected:{
            padding:"5px",
        },
        notSelected:{
            padding:"2px",
        }
    }

    if (images.length === 0)
    {
        return (<div className={classes.errorText}><Typography color="secondary" >Check your connection and reload the page to get background images please.</Typography></div>)
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} >
                    <ListSubheader component="div">Photos by <a href="https://unsplash.com/?utm_source=trello&utm_medium=referral">Unsplash</a></ListSubheader>
                </GridListTile>
                {grid.map((tile) => {
                    return <GridListTile
                        key={tile.id} cols={1}
                        onClick={()=> onSelect(tile.id)}
                        className={classes.listTitle}
                        style={{
                            ...( tile.state ? styles.selected : styles.notSelected ),
                        }}
                    >
                        <img src={tile.link + "&w=160&h=160&fm=jpg&fit=crop"} alt={tile.alt}/>
                        <GridListTileBar
                            className={classes.titleBar}
                            subtitle={<span>by: <a className={classes.titleLink}
                                                   target="_blank"
                                                   href={tile.authorLink + "?utm_source=trello&utm_medium=referral"}>{tile.authorName}</a></span>}
                        />
                    </GridListTile>
                })}
            </GridList>
        </div>
    );

    function initialise(tile)
    {
        return {
            id: tile.id,
            state: false,
            link: tile.urls.raw,
            alt: tile.alt_description,
            authorLink: tile.user.links.html,
            authorName: tile.user.name
        }
    }

    function onSelect(id)
    {
        let newGrid = []
        grid.forEach((val) => {
            if (val.id === id)
            {
                let currentState = !val.state
                if (currentState === true)
                {
                    setSelectedImage(val.link)
                }
                else
                {
                    setSelectedImage('')
                }
                newGrid.push({...val, state: currentState})

            }
            else
            {
                newGrid.push({...val, state:false})
            }
        })
        setGrid(newGrid)
    }

}