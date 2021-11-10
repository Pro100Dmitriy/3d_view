import { GameShop } from './game'

export const gameshop = (containerID) => {
    let instanse
    const container = document.querySelector(`#${containerID}`)
    return {
        start(settings = {}) {
            if( !instanse ){
                container.style.display = 'block'
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