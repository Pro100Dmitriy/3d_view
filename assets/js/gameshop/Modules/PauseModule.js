export const pause = () => {
    const pointofview = document.querySelector('#pause')
    return {
        func: null,
        open( request, func ){
            this.func = func
            pointofview.style.display = 'block'
            window.cancelAnimationFrame( request )

            pointofview.addEventListener( 'click', this.close )
        },
        close(){
            pointofview.style.display = 'none'
            return requestAnimationFrame( this.func )
        }
    }
}