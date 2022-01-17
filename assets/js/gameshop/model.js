import { GameShop } from './game'

export const gameshop = (containerID, sectionID) => {
    let instanse
    const section = document.querySelector(`#${sectionID}`)
    const container = document.querySelector(`#${containerID}`)
    return {
        start(settings = {}) {
            if( !instanse ){
                section.style.display = 'block'
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