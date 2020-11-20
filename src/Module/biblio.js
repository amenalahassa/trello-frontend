import $ from "jquery";

window.jQuery = $;
window.$ = $;
export function log(v = "ok")
{
    console.log(v)
}

export function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function showNotification (type = "info", message) {
    let title = ""
    if (type === "warning")
    {
        title = "<strong>Attention ! : </strong><br><br>"
    }
    if (type === "info")
    {
        title =  "<strong>Inportant information ! : </strong><br><br>"
    }

    if (type === "danger")
    {
        title = "<strong>Errors ! : </strong><br><br>"
    }

    $.notify({
        title,
        message,
    }, {
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        type,
    });
}