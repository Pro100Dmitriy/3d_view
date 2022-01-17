export const pause = () => {
    const pointofview = document.querySelector('#pause')
    const controls = {enabled: true}

    const havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document
    if( havePointerLock ){
        let element = document.body

        const pointerlockchange = ( event ) => {
            if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                controls.enabled = true
                pointofview.style.display = 'none';
            } else {
                controls.enabled = false
                pointofview.style.display = 'block';
            }
        }
        const pointerlockerror = ( event ) => {
            pointofview.style.display = 'block'
        }

        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        pointofview.addEventListener( 'click', event => {
            pointofview.style.display = 'none'
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }, false )

    }else{
        pointofview.style.display = 'block'
        pointofview.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API'
    }

    return {
        html: pointofview,
        controls,
        open(){
            pointofview.style.display = 'block'
            controls.enabled = false
        },
        close(){
            pointofview.style.display = 'none'
        }
    }
}