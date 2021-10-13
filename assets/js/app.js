import '../sass/style.sass'
import { Gameshop } from './Gameshop.js'

const open = document.querySelector('#open_gameshop')
const gameshop = document.querySelector('#gameshop')
open.addEventListener('click', start)

function start(event){
    gameshop.style.display = 'block'
    open.style.display = 'none'
    const GAME = new Gameshop({
        container: gameshop
    })
}

start()
