// import React from "react";

export function log(v = "ok")
{
    console.log(v)
}

export function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}