import { GameShop } from './game'
import { SETTINGS } from './settings'

export const gameshop = (sectionID) => {
    let instanse
    const section = document.querySelector(`#${sectionID}`)
    const container = section.querySelector(`#gameshop`)
    const UI = section.querySelector(`.game-UI`)
    return {
        start(settings = {}) {
            if( !instanse ){
                section.style.display = 'block'
                if( SETTINGS.gamemode === 'edit' ){
                    UI.style.display = 'none'
                }
                instanse = new GameShop(container, settings)
            }
            return instanse
        },
        editmode(){
            
        },
        gamemode(){

        }
    }
}