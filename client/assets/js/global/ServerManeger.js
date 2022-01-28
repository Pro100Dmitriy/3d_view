export class ServerManeger{
    constructor(){}

    post( data ){
        return new Promise( (resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open( 'POST', data.url )

            xhr.responseType = 'json'
            xhr.setRequestHeader( 'Content-Type', 'application/json' )

            xhr.onloadstart = data.onloadstart_callback()
            xhr.onload = () => resolve( xhr.response )
            xhr.onerror = () => reject( xhr.response )

            xhr.send(data.body)
        } )
    }

    get( data ){
        return new Promise( (resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open( 'GET', data.url )

            xhr.responseType = 'json'
            xhr.setRequestHeader( 'Content-Type', 'application/json' )

            xhr.onloadstart = data.onloadstart_callback()
            xhr.onload = () => resolve( xhr.response )
            xhr.onerror = () => reject( xhr.response )

            xhr.send()
        } )
    }

    patch( data ){

    }

    delete( data ){

    }
}


export const SERVER = new ServerManeger()