import {log} from "./biblio";

export function sendTeam(http, data, callback)
{
    // Todo : Gestion des cas d'erreurs
    http.post('/api/save/team', {
        name: data.name,
        secteur: data.secteur,
    })
        .then((response) => {
           if (data.members.length !== 0)
           {
               http.post('/api/save/member', {
                   team_id: response.data.team_id,
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