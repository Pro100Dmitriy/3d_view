class DownloadStack{
    constructor(){
        this.stackHTML = document.querySelector('#download-list')
        this.openButton = document.querySelector('#open_gameshop')
        this.stack = new Map()
    }

    add( name, percent ){
        if( this.stack.size >= 7 ){
            let i = 0
            for( let item of this.stack.values() ){
                if( item ) i += 1
            }
            if( i >= 7 ) this.openButton.removeAttribute( 'disabled' )
        }

        if( !this.stack.has( name ) ){
            this.stack.set( name, false )
            this.createTemplate( name, percent  )
        }else{
            this.updateTemplate( name, percent )
        }
    }

    createTemplate( name, percent ){
        const HTML = `
            <li id="${ name }" class="download__list__item">
                <p class="name medium-14">${ name }</p>
                <p class="percent regular-14">${ percent }%</p>
                <div class="progress-line"><span style="width: ${ percent }%"></span></div>
            </li>
        `
        this.stackHTML.insertAdjacentHTML( 'beforeend', HTML )

        if( percent == 100 ){
            this.stack.set( name, true )
            this.deleteTemplate( name )
        }
    }

    updateTemplate( name, percent ){
        const progressItem = document.querySelector(`#${ name }`) ?? false
        if( progressItem ){
            progressItem.querySelector('.percent').innerHTML = percent
            progressItem.querySelector('.progress-line span').style.width = `${ percent }%`
        }

        if( percent == 100 ){
            this.stack.set( name, true )
            this.deleteTemplate( name )
        }
    }

    deleteTemplate( name ){
        const progressItem = document.querySelector(`#${ name }`) ?? false
        if( progressItem ){
            setTimeout( () => progressItem.style.opacity = 0, 300 )
            setTimeout( () => progressItem.remove(), 1000 )
        }
    }
}

export const downloadStack = new DownloadStack()