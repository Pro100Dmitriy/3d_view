class DownloadStack{
    constructor(){
        this.stackHTML = document.querySelector('#download-list')
        this.stack = new Set()
    }

    add( name, percent ){
        console.log( this.stack )
        if( !this.stack.has( name ) ){
            if( percent == 100 ){
                //this.createTemplate( name, percent  )
                //this.deleteTemplate( name, percent )
            }else{
                this.stack.add( name )
                this.createTemplate( name, percent  )
            }
        }else{
            if( percent == 100 ){
                this.stack.delete( name )
                this.deleteTemplate( name, percent )
            }else{
                this.updateTemplate( name, percent )
            }
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
    }

    updateTemplate( name, percent ){
        const progressItem = document.querySelector(`#${ name }`) ?? false
        if( progressItem ){
            progressItem.querySelector('.percent').innerHTML = percent
            progressItem.querySelector('.progress-line span').style.width = `${ percent }%`
        }
    }

    deleteTemplate( name, percent ){
        const progressItem = document.querySelector(`#${ name }`) ?? false
        if( progressItem ){
            setTimeout( () => progressItem.style.opacity = 0, 300 )
            setTimeout( () => progressItem.remove(), 4000 )
        }
    }
}

export const downloadStack = new DownloadStack()



/**
 * 
 * 

    const downloadList = document.querySelector('#download-list')
    
    const progressItem = document.querySelector(`#${ name }`) ?? false

    if( progressItem ){
        const percent = Math.round( (xhr.loaded / xhr.total) * 100 )

        if( percent == '100' ){
            setTimeout( () => progressItem.style.opacity = 0, 300 )
            setTimeout( () => progressItem.remove(), 10000 )
        }else{
            progressItem.querySelector('.percent').innerHTML = percent
            progressItem.querySelector('.progress-line span').style.width = `${ percent }%`
        }
    }else{
        const percent = Math.round( (xhr.loaded / xhr.total) * 100 )

        const HTML = `
            <li id="${ name }" class="download__list__item">
                <p class="name medium-14">${ name }</p>
                <p class="percent regular-14">${ percent }%</p>
                <div class="progress-line"><span style="width: ${ percent }%"></span></div>
            </li>
        `
        downloadList.insertAdjacentHTML( 'beforeend', HTML )

        if( percent == 100 ){
            let progressItem = document.querySelector(`#${ name }`) ?? false
            setTimeout( () => progressItem.style.opacity = 0, 300 )
            setTimeout( () => progressItem.remove(), 10000 )
        }
    }
 */