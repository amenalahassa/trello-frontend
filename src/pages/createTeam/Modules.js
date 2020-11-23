import {showNotification} from "../../Module/biblio";

export function sendTeam(http, data, callback, catchError, setLoading, setError)
{
    http.post('/api/save/team', {
        name: data.name,
        secteur: data.secteur,
    })
        .then((response) => {
           if (data.members.length !== 0)
           {
                sendMembers(http,{
                   team_id: response.data.team_id,
                   memberrs: data.members.map(a => a.label),
               },
                    callback,
                    "warning",
                    "<p>The sending of members's email failed. </p><p>You can try again later.</p> <p>Check your connection please.</p>" )
           }
           else
           {
               callback(1000)
           }
        })
        .catch((err) => {
            catchError(err, setLoading, setError)
        })
}

export function sendMembers(http, datas, callback,type,  errorMessage){

    http.post('/api/save/member', datas)
                   .then(() => {
                       callback(1000)
                   })
                   .catch((err) => {
                       showNotification(type, errorMessage)
                       callback(10000)
                   })
    return null
}

export function deleteMember(chipToDelete) {
        return ((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };