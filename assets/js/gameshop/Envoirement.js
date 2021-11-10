import { MeshByScene, LightsByScene } from './ByScene'

export class Envoirement{
    lightsArr = []

    meshesArr = []
    bodyArr = []
    combineArr = []
    pickedObject = []

    constructor(scene, world){
        this.scene = scene
        this.world = world
    }

    illuminate(){
        LightsByScene.forEach( object => {
            this.lightsArr.push( object.light )
            this.scene.add( object.light )
        } )
    }

    build(){
        MeshByScene.forEach( object => {
            console.log(object)
            this.meshesArr.push( object.mesh )
            this.bodyArr.push( object.body )
            this.combineArr.push( [ object.mesh, object.body] )

            if( object.picked ){
                this.pickedObject.push( object.mesh )
            }

            this.scene.add( object.mesh )
            this.world.addBody( object.body )
        } )
    }

    get getMeshesArr(){
        return this.meshesArr
    }

    get getBodyArr(){
        return this.bodyArr
    }

    get getCombineArr(){
        return this.combineArr
    }

    get getPickedObject(){
        return this.pickedObject
    }

    get getLihtsArr(){
        return this.lightsArr
    }
}