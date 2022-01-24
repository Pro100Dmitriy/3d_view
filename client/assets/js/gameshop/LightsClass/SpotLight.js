import * as THREE from 'three'

export class SpotLight{
    constructor( {name, intensity, distance, decay, angle, penumbra, color, position, target, picked} ){
        this.name = name
        this.picked = picked
        this.create( intensity, distance, decay, angle, penumbra, color, position, target )
    }

    create( intensity = 1, distance = 100, decay = 4, angle = 1, penumbra = 1, color, position, target = false ){
        const Splight = new THREE.SpotLight( color )
        Splight.name = this.name
        Splight.position.set( position.x, position.y, position.z )
        if( target ) Splight.target.position.set( target.x, target.y, target.z )
        Splight.castShadow = true
        Splight.intensity = intensity
        Splight.distance = distance
        Splight.decay = decay
        Splight.angle = angle
        Splight.penumbra = penumbra

        Splight.shadow.camera.near = 0.5
        Splight.shadow.camera.far = 500

        Splight.shadowMapBias = 0.6
        Splight.shadowMapDarkness = 0.1
        Splight.shadow.mapSize.width = 4096
        Splight.shadow.mapSize.height = 4096
        this.light = Splight
        this.target = Splight.target
        // DRAG
        const geometryDragBox = new THREE.BoxGeometry()
        const lightDragBox = new THREE.Mesh( geometryDragBox, new THREE.MeshLambertMaterial({ wireframe: false }) )
        lightDragBox.name = this.name
        lightDragBox.position.set( position.x, position.y, position.z )
        this.drag = lightDragBox
        // HELLPER
        const SpHelper = new THREE.SpotLightHelper(Splight)
        SpHelper.visible = false
        this.helper = SpHelper
    }
}