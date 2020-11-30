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

// Todo : change the notification component, use Snackbar
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

export function viewportSize(){
    var test = document.createElement( "div" );

    test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
    document.documentElement.insertBefore( test, document.documentElement.firstChild );

    var dims = { width: test.offsetWidth, height: test.offsetHeight };
    document.documentElement.removeChild( test );

    return dims;
}

export function isOutdated(before, after)
{
    before = Math.floor(before / 1000)
    after = Math.floor(after / 1000)
    let time = after - before
    return time > (3600 * 3);
}

export function getFromLocalStorage(key)
{
    if(typeof localStorage!='undefined') {
        return JSON.parse(localStorage.getItem(key))
    }
}

export function setItemInLocalStorage(key, val)
{
   localStorage.setItem(key, JSON.stringify(val))
}