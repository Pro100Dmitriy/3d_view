import { MeshByScene, LightsByScene } from './ByScene'

export class Envoirement{
    lightsArr = []

    /**
     * this.mesh
     * this.modelGroup
     * this.drag
     * this.helper
     * this.body
     */
    meshesArr = []
    bodyArr = []
    combineArr = []
    pickedObject = []
    modelGroupArr = []
    products = []

    constructor(scene, world, gamemode){
        this.scene = scene
        this.world = world
        this.gamemode = gamemode
    }

    illuminate(){
        LightsByScene.forEach( object => {
            this.lightsArr.push( object.light )
            this.scene.add( object.light )
        } )
    }

    build(){
        MeshByScene.forEach( object => {
            this.meshesArr.push( object.mesh )
            this.bodyArr.push( object.body )
            this.combineArr.push( [object.mesh, object.body] )

            if( object.picked ){
                if( object.drag ){
                    this.pickedObject.push( object.drag )
                    this.products.push( object.drag )
                }else{
                    this.pickedObject.push( object.mesh )
                    this.products.push( object.mesh )
                }
            }

            if( object.drag ){
                this.modelGroupArr.push( [ object.mesh, object.drag, object.helper, object.body ] )
            }

            if( object.helper ) this.scene.add( object.helper )
            if( object.drag ) this.scene.add( object.drag )
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

    get modelGroupArr(){
        return this.modelGroupArr
    }

    get products(){
        return this.products
    }
}