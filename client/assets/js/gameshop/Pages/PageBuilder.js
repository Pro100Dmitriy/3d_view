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
        SERVER.get({ url: `/api/position/${selectedProdID}`,
            onloadstart_callback(){
                console.log('Work')
            }
        })
        .then( response => {
            const saveData = response[0] ? response[0] : false
            if( saveData !== false ){
                const HTML = template( saveData )
                this.build( HTML )
                //Open
                this.page.style.display = 'block'
                setTimeout( () => this.page.classList.add( 'PM-open' ), 100 )
                setTimeout( () => this.pageMenu.classList.add( 'PM__menu-open' ), 100 )
            }
        } )
        .catch( error => new Error( `Send request id failed ${error}` ) )
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
            onloadstart_callback(){
                
            }
        })
        .then( response => {
            const saveData = response[0] ? response[0] : false
            if( saveData !== false ){
                const title = saveData.name.replace( /(?<other>[\sа-яА-Я0-9a-zA-Z&<br>]+)\[i\](?<title>\w+)\[-i\]/gu, ( ...match ) => {
                    let groups = match.pop()
                    return `${groups.other.replace(/<br>/gu, ' ')}${groups.title.replace('<br>', ' ')}`
                } )
                const price = saveData.cost
                const imageSrc = saveData.imageSrc.map( src => src.replace( '\\', '/' ) )

                this.previewWindow.innerHTML = `
                    <div class="view-info__container">
                        <div style="background-image: url('http://localhost:5000/${ imageSrc[0] }')" class="image"></div>
                        <div class="text">
                            <h3 class="medium-14">${ title }</h3>
                            <div class="price regular-14">Цена: $${ price }.00</div>
                            <div class="regular-14 tutor">Нажмите <span>E</span> для просмотра</div>
                        </div>
                    </div>
                `
            }
        } )
        .catch( error => new Error( `Send request id failed ${error}` ) )
    }
}