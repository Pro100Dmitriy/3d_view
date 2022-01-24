/*

sendRequest( {
    method: 'GET',
    url: ajax_url,
    action: 'loadmore',
    data: {
        category: category_id,
        min,
        max,
        order,
        taxonomyID: taxonomy
    },
    onloadstart_callback(){
        
    }
} )
.then( data => {

} )
.catch( error => {

} )

*/
export function sendRequest( sendObject ){
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()

        // let dataURL = ''
        // let dataKeys = Object.keys( sendObject.data )
        // dataKeys.forEach( key => {
        //     dataURL += `&${key}=${sendObject.data[key]}`
        // } )

        xhr.open( 'GET', `api/shop/:1` )
        xhr.onloadstart = sendObject.onloadstart_callback()
        xhr.onload = () => {
            resolve( xhr.response )
        }
        xhr.onerror = () => {
            reject( xhr.response )
        }
        xhr.send()

    } )
}