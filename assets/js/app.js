import '../sass/style.sass'
import { gameshop } from './gameshop/model'

const open = document.querySelector('#open_gameshop')
const GAME = gameshop('game-section')

open.addEventListener('click', ()=>{
    GAME.start()
})
