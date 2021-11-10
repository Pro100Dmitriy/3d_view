import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export class Constructor{
    constructor(scene, world){
        this.scene = scene
        this.world = world
    }

    createCube( scale, position, mass ){
        const geometry = new THREE.BoxGeometry( ...scale );
        const material = new THREE.MeshBasicMaterial( {color: 0xe5e5e5, } );
        const cubeMesh = new THREE.Mesh( geometry, material );
        cubeMesh.position.x = position[0]
        cubeMesh.position.y = position[1]
        cubeMesh.position.z = position[2]
        cubeMesh.castShadow = true
        this.scene.add( cubeMesh );
        // CANNON
        const cubeShape  = new CANNON.Box(new CANNON.Vec3( scale[0]/2, scale[1]/2, scale[2]/2 ))
        const cubeBody  = new CANNON.Body({mass: mass})
        cubeBody.addShape(cubeShape)
        cubeBody.position.x = cubeMesh.position.x
        cubeBody.position.y = cubeMesh.position.y
        cubeBody.position.z = cubeMesh.position.z
        this.world.addBody(cubeBody)
        return [cubeMesh, cubeBody]
    }
}