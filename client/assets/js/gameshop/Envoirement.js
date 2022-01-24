import { MeshByScene, LightsByScene } from './ByScene'

export class Envoirement{
    /**
     * IMPORTED LIGHTS:
     *  this.model
     *  this.drag
     *  this.helper
     *  this.body
     */
    pickedLight = []
    lightGroupArr = []

    constructor(scene, world, gamemode){
        this.scene = scene
        this.world = world
        this.gamemode = gamemode
    }

    illuminate(){
        LightsByScene.forEach( object => {

            if( object.picked ){
                if( object.drag ){
                    this.pickedLight.push( object.drag )
                }
            }

            if( object.drag ){
                this.lightGroupArr.push( [ object.light, object.drag, object.helper ] )
            }

            this.scene.add( object.light )
            if( object.target ) this.scene.add( object.target )
            if( object.helper ) this.scene.add( object.helper )
            if( object.drag ) this.scene.add( object.drag )
        } )
    }

    get getPickedLight(){
        return this.pickedLight
    }

    get getLightGroupArr(){
        return this.lightGroupArr
    }

    /**
     * IMPORTED OBJECT:
     *  this.model
     *  this.drag
     *  this.helper
     *  this.body
     */
    pickedObject = []
    modelGroupArr = []
    isHoverArr = []

    build(){
        MeshByScene.forEach( object => {
            if( object.isHover ) this.isHoverArr.push( object.drag )

            if( object.picked ){
                if( object.drag ){
                    this.pickedObject.push( object.drag )
                }else{
                    this.pickedObject.push( object.model )
                }
            }

            if( object.drag ){
                this.modelGroupArr.push( [ object.model, object.drag, object.helper, object.body ] )
            }

            if( object.helper ) this.scene.add( object.helper )
            if( object.drag ) this.scene.add( object.drag )
            this.scene.add( object.model )
            this.world.addBody( object.body )
        } )
    }

    get getPickedObject(){
        return this.pickedObject
    }

    get modelGroupArr(){
        return this.modelGroupArr
    }

    get isHoverArr(){
        return this.isHoverArr
    }
}