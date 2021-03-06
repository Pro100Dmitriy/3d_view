import { template } from './single-product/single-product-template'
import { pageScript } from './single-product/single-product-scripts'
import { SERVER } from '../../global/ServerManeger'


export class PageBuilder{
    constructor(settings){
        this.root = settings.root
        this.previewWindow = document.querySelector('#view-info')
    }

    build( HTML ){
        this.root.insertAdjacentHTML( 'beforeend', HTML )
        this.page = this.root.querySelector('#single-PM')
        this.pageMenu = this.root.querySelector('#single-PM-menu')
        this.closeButton = this.root.querySelector('#close-PM')
        this.closeButton.addEventListener( 'click', this.close.bind(this) )
        pageScript()
    }

    sendReguest( selectedProdID ){
        const buildHTML = data => {
            const HTML = template( data )
            this.build( HTML )
            //Open
            this.page.style.display = 'block'
            setTimeout( () => this.page.classList.add( 'PM-open' ), 100 )
            setTimeout( () => this.pageMenu.classList.add( 'PM__menu-open' ), 100 )
        }

        if( this.savedData !== false && this.savedData.productId == selectedProdID ){
            buildHTML( this.savedData )
        }else{
            SERVER.get({ url: `/api/position/${selectedProdID}`,
                onloadstart_callback(){}
            })
            .then( response => {
                const saveData = response[0] ? response[0] : false
                if( saveData !== false ) buildHTML( saveData )
            } )
            .catch( error => new Error( `Send request id failed ${error}` ) )
        }
    }

    open( selectedProdID ){
        this.sendReguest( selectedProdID )
    }

    close( event ){
        event.preventDefault()
        this.page.classList.remove( 'PM-open' )
        this.pageMenu.classList.remove( 'PM__menu-open' )
        setTimeout( () => this.page.style.display = 'none', 100 )
        setTimeout( () => this.root.innerHTML = '', 200 )
    }

    preview( selectedProdID ){
        if( selectedProdID === this.selectedID ) return
        this.selectedID = selectedProdID
        SERVER.get({ url: `/api/position/${selectedProdID}`,
            onloadstart_callback(){}
        })
        .then( response => {
            const saveData = response[0] ? response[0] : false
            if( saveData !== false ){
                this.savedData = saveData

                const title = saveData.name.replace( /(?<other>[\s??-????-??0-9a-zA-Z&<br>]+)\[i\](?<title>\w+)\[-i\]/gu, ( ...match ) => {
                    let groups = match.pop()
                    return `${groups.other.replace(/<br>/gu, ' ')}${groups.title.replace('<br>', ' ')}`
                } )
                const price = saveData.cost
                const imageSrc = saveData.imageSrc.map( src => src.replace( '\\', '/' ) )
                const href = 'http://localhost:5000/' //window.location.href http://localhost:5000/

                this.previewWindow.innerHTML = `
                    <div class="view-info__container">
                        <div style="background-image: url('${href}${imageSrc[0]}')" class="image"></div>
                        <div class="text">
                            <h3 class="medium-14">${ title }</h3>
                            <div class="price regular-14">????????: $${ price }.00</div>
                            <div class="regular-14 tutor">?????????????? <span>E</span> ?????? ??????????????????</div>
                        </div>
                    </div>
                `
            }
        } )
        .catch( error => new Error( `Send request id failed ${error}` ) )
    }
}