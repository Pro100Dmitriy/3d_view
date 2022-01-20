import * as THREE from 'three'

export class SpotLight{
    constructor( {name, color} ){
        this.name = name

        this.create( color )
    }

    create( color ){
        const Splight = new THREE.SpotLight( color )
        Splight.name = this.name
        Splight.position.set( 30, 50, 40 )
        Splight.target.position.set( 0, 0, 0 )
        Splight.castShadow = true
        Splight.intensity = 1

        Splight.shadow.camera.near = 20
        Splight.shadow.camera.far = 50
        Splight.shadow.camera.fov = 40

        Splight.shadowMapBias = 0.1
        Splight.shadowMapDarkness = 0.4
        Splight.shadow.mapSize.width = 5*512
        Splight.shadow.mapSize.height = 5*512
        this.light = Splight
    }
}