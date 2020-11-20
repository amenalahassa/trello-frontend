import {log} from "./biblio";


export function sendTeam(http, data, callback)
{
    http.post('/api/save/team', {
        name: data.name,
        secteur: data.secteur,
    })
        .then((response) => {
           if (data.members.length !== 0)
           {
               let id = response.data.team_id
               http.post('/api/save/member', {
                   team_id: id,
                   members: data.members.map(a => a.label),
               })
                   .then(() => {
                       callback()
                   })
                   .catch((err) => {
                       log(err)
                   })
           }
           else
           {
               callback()
           }
        })
        .catch((err) => {
            log(err)
        })
}