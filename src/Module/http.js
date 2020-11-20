import {log, showNotification} from "./biblio";
import $ from "jquery";

export function sendTeam(http, data, callback, catchError, setLoading, setError)
{
    http.post('/api/save/team', {
        name: data.name,
        secteur: data.secteur,
    })
        .then((response) => {
           if (data.members.length !== 0)
           {
               http.post('/api/save/member', {
                   team_id: response.data.team_id,
                   memberrs: data.members.map(a => a.label),
               })
                   .then(() => {
                       callback(1000)
                   })
                   .catch((err) => {
                       showNotification("warning","<p>The sending of members's email failed. </p><p>You can try again later.</p> <p>Check your connection please.</p>" )
                       callback(10000)
                   })
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