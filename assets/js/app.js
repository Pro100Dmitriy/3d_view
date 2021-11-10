import '../sass/style.sass'
import { gameshop } from './gameshop/model'

const open = document.querySelector('#open_gameshop')
const GAME = gameshop('gameshop')

open.addEventListener('click', ()=>{
    GAME.start()
})
