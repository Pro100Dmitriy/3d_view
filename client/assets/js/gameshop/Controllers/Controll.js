import { Editmode } from './classes/Editmode'
import { Gamemode } from './classes/Gamemode'

export class Controll{
    constructor(type, scene, renderer, camera, world, container, pickedArr, gropArr, products, pickedLight ){
        switch (type){
            case 'edit':
                return new Editmode({
                    scene,
                    renderer,
                    camera,
                    world,
                    container,
                    pickedArr,
                    gropArr,
                    pickedLight
                }).getControls
            case 'game':
                return new Gamemode({
                    scene,
                    renderer,
                    camera,
                    world,
                    container,
                    products
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




