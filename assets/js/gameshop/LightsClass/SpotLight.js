import * as THREE from 'three'

export class SpotLight{
    constructor( {name, color} ){
        this.name = name

        this.create( color )
    }

    create( color ){
        const Splight = new THREE.SpotLight( color )
        Splight.name = this.name
        Splight.position.set( 10, 30, 20 )
        Splight.target.position.set( 0, 0, 0 )
        Splight.castShadow = true

        Splight.shadow.camera.near = 20
        Splight.shadow.camera.far = 50
        Splight.shadow.camera.fov = 40

        Splight.shadowMapBias = 0.1
        Splight.shadowMapDarkness = 0.7
        Splight.shadow.mapSize.width = 3*512
        Splight.shadow.mapSize.height = 3*512
        this.light = Splight
    }
}