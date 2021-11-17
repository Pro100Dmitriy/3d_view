import * as THREE from 'three'

export class AmbientLight{
    constructor( {name, color, intensity = 1} ){
        this.name = name

        this.create( color, intensity )
    }

    create( color, intensity ){
        const Amlight = new THREE.AmbientLight( color, intensity )
        Amlight.name = this.name
        Amlight.castShadow = true
        this.light = Amlight
    }
}