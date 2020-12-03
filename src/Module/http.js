import {log} from "./biblio";

const api = '/api'
let link = null

// Todo for debug, show the defaul error.message in a notif for user

export function sendTeam(url, http, data, callback, displayNotification, setLoading, setError)
{
    link = api + url
    http.post( link + '/team', {
        name: data.name,
        secteur: data.secteur,
    })
        .then((response) => {

            sendMembers(http,{
                team_id: response.data.team_id,
                members: data.members.map(a => a.email),
            },callback, displayNotification, setLoading, setError, )

        })
        .catch((err) => {
            catchError(err, setLoading, setError, displayNotification)
        })
}

export function sendMembers(http, datas, callback, displayNotification, setLoading, setError,)
{
    http.post( link + '/member', datas)
        .then((response) => {
            callback(response.data)
        })
        .catch((err) => {
            catchError(err, setLoading, setError, displayNotification)
        })
}

function catchError(error, setLoading, setError, displayNotification)
{
    if (error.response) {
        if (error.response.data.errors !== undefined) setError(error.response.data.errors)
        else displayNotification("Check you connection and try again please.")
        setLoading(false)
    } else if (error.request) {
        displayNotification("Check you connection and try again please.")
        setLoading(false)
    } else {
        log('Error', error.message);
        displayNotification("Try to reload the page please. See more in console.")
        setLoading(false)
    }
}

export function updateTeam(http, validated, success, error)
{
    let datas = {}
    datas.id = validated.id
    if (validated.name !== false)
    {
        datas.name = validated.name
    }
    if (validated.secteur !== false)
    {
        datas.secteur = validated.secteur
    }
    let members = [...validated.newMember, ...validated.oldMember]
    if (members.length > 0)
    {
        datas.members = members.map((v) => v.email)
    }
    console.log(datas)
    http.post(URLS.updateTeam, datas)
        .then((response) => {
            success(response.data)
        })
        .catch((err) => {
            error(err.message)
        })
}

// Todo populate this constante where you make a request
export const URLS = {
    updateTeam :  api + '/dashboard/team/update',
    aboutTeam :  api + '/dashboard/team/about',
}