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

export function checkIfMemberEmailIsValide(values,members )
{
    let invalide = false
    const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    if (emailExp.test(values)) {
        invalide = false
        for (const chipDatum of members) {
            if (chipDatum.email === values)
            {
                invalide = true
                break
            }
        }
    }
    else {
        invalide = true
    }
    return invalide
}

export function deleteMember(chipToDelete)
{
    return ((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
};

export function getCategoryLabelByKey(list, key)
{
    let label = null
    for (const listElement of list) {
        if (listElement.key === key)
        {
            label = listElement.label
            break
        }
    }
    return label
}

export function displayBaseOnNumber(count, word)
{
    if (count === 0) return ''
    if (count === 1) return " | " + count + " " + word
    if (count > 1) return " | " + count + " " + word + "s"
}

export function returnStringIfUndefined(value)
{
    if (value !== undefined) return value
    return ''
}

export function returnObjectIfUndefined(value)
{
    if (value !== undefined) return value
    return {}
}
export function returnArrayIfUndefined(value)
{

    if (value !== undefined) return value
    return []
}

export function checkIfDataChanged (old, now)
{
    return old !== now ? now : false;
}

export function getCategoryFromLocalStorage(onAbscence)
{
    let localCategory = getFromLocalStorage("category")
    if (localCategory !== null)
    {
        return localCategory
    }
    else {
        onAbscence()
    }
}