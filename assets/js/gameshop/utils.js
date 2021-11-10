function picker(combineArr){
    let bodyArr = []
    let meshesArr = []
    combineArr.forEach( combine => {
        meshesArr.push( combine[0] )
        bodyArr.push( combine[1] )
    } )
    return {
        meshesArr,
        bodyArr
    }
}


export const utils = {
    picker
}