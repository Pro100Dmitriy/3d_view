import * as THREE from 'three'
import * as CANNON from 'cannon-es'

/**
 * new Cube({
        name: 'Hoodie_Samurai_Table',
        position: {x: 22.550, y: -0.564, z: 9.3305},
        rotation: {x: 0, y: -1.2138, z: 0},
        scale: {x: 7.485, y: 8.109, z: 7.682},
        material: new THREE.MeshStandardMaterial(),
        mass: 0,
        picked: false
    }),
 */

export class Cube{
    constructor( {name, position, rotation, scale, material, mass, picked} ){
        this.name = name
        this.picked = picked ?? false

        this.create( position, rotation, scale, material, mass )
    }

    create(
        position = {x: 0, y: 0, z: 0},
        rotation = {x: 0, y: 0, z: 0},
        scale = {x: 0, y: 0, z: 0},
        material = new THREE.MeshLambertMaterial(),
        mass = 1
    ){
        const geometry = new THREE.BoxGeometry( scale.x, scale.y, scale.z )
        const materialMesh = material
        const model = new THREE.Mesh( geometry, materialMesh )
        model.name = this.name
        model.castShadow = true
        model.receiveShadow = true
        model.position.set( position.x, position.y, position.z )
        model.rotation.set( rotation.x, rotation.y, rotation.z )
        this.model = model
        // DRAG ----------------------------------------------------------------
        const geometryDragBox = new THREE.BoxGeometry( scale.x, scale.y, scale.z )
        const metarialDragBox = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        const modelDragBox = new THREE.Mesh( geometryDragBox, metarialDragBox )
        modelDragBox.name = this.name
        modelDragBox.position.set( position.x, position.y, position.z )
        modelDragBox.rotation.set( rotation.x, rotation.y, rotation.z )
        modelDragBox.quaternion.copy( model.quaternion )
        // HELPER ---------------------------------------------------------------
        const boxHelper = new THREE.BoxHelper(modelDragBox, 0xffff00)
        boxHelper.name = this.name
        boxHelper.visible = false
        modelDragBox.boxHelper = boxHelper
        this.drag = modelDragBox
        this.helper = boxHelper
        // CANNON ---------------------------------------------------------------
        const cubeShape = new CANNON.Box(new CANNON.Vec3( scale.x/2, scale.y/2, scale.z/2 ))
        const cubeBody = new CANNON.Body({mass: mass})
        cubeBody.addShape(cubeShape)
        cubeBody.position.set( position.x, position.y, position.z )
        cubeBody.quaternion.copy( modelDragBox.quaternion )
        this.body = cubeBody


        // -----------------------------------------------------------------------
        /**
         * EXPORTED:
         *  this.model
         *  this.drag
         *  this.helper
         *  this.body
         */ 
    }
}