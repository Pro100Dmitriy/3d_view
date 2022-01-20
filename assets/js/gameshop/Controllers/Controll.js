import { Editmode } from './classes/Editmode'
import { Gamemode } from './classes/Gamemode'

export class Controll{
    constructor(type, scene, renderer, camera, world, container, pickedArr, gropArr){
        switch (type){
            case 'edit':
                return new Editmode({
                    scene,
                    renderer,
                    camera,
                    world,
                    container,
                    pickedArr,
                    gropArr
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




