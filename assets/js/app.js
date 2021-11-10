import '../sass/style.sass'
import { Gameshop } from './Gameshop.js'
import { Game } from './games/Game.js'

const open = document.querySelector('#open_gameshop')
const gameshop = document.querySelector('#gameshop')

open.addEventListener('click', start)


function start(event){
    //document.body.requestPointerLock()
    gameshop.style.display = 'block'
    open.style.display = 'none'
    const GAME = new Gameshop({
        container: gameshop
    })
}

//start()

const GAME = new Game({
    container: gameshop
})
