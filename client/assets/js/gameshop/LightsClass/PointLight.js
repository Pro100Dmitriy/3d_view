import * as THREE from 'three'

export class PointLight{
    constructor( {name, color, intensity = 1} ){
        this.name = name

        this.create( color, intensity )
    }

    create( color, intensity ){
        const PLight = new THREE.PointLight( color, intensity )
        PLight.name = this.name
        PLight.position.set(0, 100, 80)
        PLight.castShadow = true
        this.light = PLight
    }
}