import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Initialization } from './Initialization'

export class Game extends Initialization{
    constructor(){
        //this.container = document.querySelector('#gameshop')
        this.toggle_info = document.querySelector('#toggle_info')
        this.gameshop_info = document.querySelector('#gameshop_info')

        //settings
        this.gamemode = this.gameshop_info.querySelector('#gamemode').value

        this.toggle_info.addEventListener('click', event => {
            this.gameshop_info.classList.toggle('close')
        })

        super(prop)
        
        /** Loop Function */
        const loop = () => {
            requestAnimationFrame( loop )
        }
        loop()
    }
}