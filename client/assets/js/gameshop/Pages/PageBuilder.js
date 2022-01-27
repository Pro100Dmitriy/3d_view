import { readyHTML } from './single-product/single-product-template'
import { pageScript } from './single-product/single-product-scripts'

/**
 * Должен брать страницу и добавлять в html
 * Должен отправлять запросы в базу данных для открытия страницы
 */
export class PageBuilder{
    constructor(settings){
        this.root = settings.root
    }

    build(){
        this.root.insertAdjacentHTML( 'beforeend', readyHTML )
        pageScript()
    }

    render(){
        this.build()
    } 
}