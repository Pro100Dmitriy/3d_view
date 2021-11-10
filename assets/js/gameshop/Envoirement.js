import * as THREE from 'three'
import { Constructor } from './Constructor'

export class Envoirement{
    meshesArr = []

    constructor(scene, world){
        this.scene = scene
        this.world = world
        this.constructor = new Constructor(this.scene, this.world)
    }

    lights(){
        const ambient = new THREE.AmbientLight( 0x111111 )
        this.scene.add( ambient )

        const Splight = new THREE.SpotLight( 0xffffff )
        Splight.position.set( 10, 30, 20 )
        Splight.target.position.set( 0, 0, 0 )
        Splight.castShadow = true

        Splight.shadow.camera.near = 20
        Splight.shadow.camera.far = 50
        Splight.shadow.camera.fov = 40

        Splight.shadowMapBias = 0.1
        Splight.shadowMapDarkness = 0.7
        Splight.shadow.mapSize.width = 2*512
        Splight.shadow.mapSize.height = 2*512
        this.scene.add( Splight )

        const ALight1 = new THREE.AmbientLight(0x404040, 1)
        this.scene.add(ALight1)

        const PLight2 = new THREE.PointLight(0xFFFFFF, 1)
        PLight2.position.set(0, 100, 80)
        PLight2.castShadow = true
        this.scene.add(PLight2)
    }

    meshes(){
        this.meshesArr.push( this.constructor.createCube([1,1,1], [10,10,3], 1) )
        this.meshesArr.push( this.constructor.createCube([1,1,1], [0,10,0], 1) )
        this.meshesArr.push( this.constructor.createCube([1,1,1], [0,10,20], 1) )
        this.meshesArr.push( this.constructor.createCube([1,1,1], [50,10,20], 1) )

        // Borders
        this.border1 = this.constructor.createCube([70,20,5], [-3.673, 0.994, -4], 0)

        return this.meshesArr
    }

}