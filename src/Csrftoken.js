import React from 'react'
import cookie from 'react-cookies'
export default function CsrfToken(props){
    return(
        <input type="hidden" value={cookie.load("csrftoken")} name="csrfmiddlewaretoken"/>
    )
}

