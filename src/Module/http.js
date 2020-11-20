import {log} from "./biblio";
import $ from "jquery";

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
                       callback(1000)
                   })
                   .catch((err) => {
                       // Todo : Test it
                       $.notify("The sending of members's email failed. You can try again later. Check your connection please.");
                       callback(3000)
                   })
           }
           else
           {
               callback(1000)
           }
        })
        .catch((err) => {
            log(err)
        })
}