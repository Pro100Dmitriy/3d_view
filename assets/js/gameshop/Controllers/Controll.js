import { Editmode } from './classes/Editmode'
import { Gamemode } from './classes/Gamemode'

export class Controll{
<<<<<<< HEAD
    constructor(type, scene, renderer, camera, world, container, meshesArr, combineArr){
=======
    constructor(type, scene, renderer, camera, world, container, meshesArr){
        let controls, transform
>>>>>>> d42b5f961c60f07cbc1ae530e7a181406bd7306e
        switch (type){
            case 'edit':
                return new Editmode({
                    scene,
                    renderer,
                    camera,
                    world,
                    container,
                    meshesArr,
                    combineArr
                }).getControls
            case 'game':
                return new Gamemode({
                    scene,
                    renderer,
                    camera,
                    world,
                    container
                }).getControls
            default:
                return new Editmode({
                    scene,
                    renderer,
                    camera,
                    container,
                    meshesArr
                }).getControls
        }
    }
}




