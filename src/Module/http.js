import {log} from "./biblio";

const api = '/api'

// Todo for debug, show the defaul error.message in a notif for user

export function sendTeam(url, http, data, callback, displayNotification, setLoading, setError)
{
    http.post( url, {
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
    http.post(URLS.saveMember, datas)
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
        // Todo remove this
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
    http.post(URLS.updateTeam, datas)
        .then((response) => {
            success(response.data)
        })
        .catch((err) => {
            error(err)
        })
}

export function deleteTeam(http, id,  success, error, end, displayNotification)
{
    http.post(URLS.deleteTeam, {
        id,
    })
        .then((response) => {
            displayNotification("The team was successfuly deleted", "success")
            end()
            setTimeout(() => {
                success(response.data)
            }, 1000)
        })
        .catch(() => {
            end()
            error()
        })
}

// Todo populate this constante where you make a request
export const URLS = {
    updateTeam :  api + '/dashboard/team/update',
    aboutTeam :  api + '/dashboard/team/about',
    deleteTeam :  api + '/dashboard/team/delete',
    saveTeam :  api + '/dashboard/save/team',
    saveMember :  api + '/dashboard/save/member',
    aboutBoard :  api + '/dashboard/board/about/',
    updateBoardName: api + "/dashboard/board/update/name",
    ressources: {
        category: api + "/ressources/category",
        boardBackgroundImage: api + '/ressources/board/backgroundImage'
    },

}

export const MessageError = {
    unknown: "Something goes wrong. Check you connection and try again please.",
}