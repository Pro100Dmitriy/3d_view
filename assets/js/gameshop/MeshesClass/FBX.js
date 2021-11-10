import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export class FBX{
    constructor( {name, file, position, scaleScalar, scale, material, texture, picked} ){
        this.name = name
        this.picked = picked

        this.create( file, position, scaleScalar, scale, material, texture )
    }

    create( file, {x, y, z}, scaleScalar, scale, material = false, texture = false ){
        let loader = new FBXLoader()
        loader.load(file, fbx => {
            const fbxMesh = fbx
            fbxMesh.name = this.name
            let fbxMaterial
            if( material ){
                fbxMaterial = material
            }else{
                fbxMaterial = new THREE.MeshLambertMaterial()
            }
            if( texture ){
                material.map = texture
                fbxMesh.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = fbxMaterial
                    }
                })
            }            
            fbxMesh.receiveShadow = true
            fbxMesh.castShadow = true
            fbxMesh.scale.setScalar(scaleScalar)
            fbxMesh.position.x = x
            fbxMesh.position.y = y
            fbxMesh.position.z = z
            this.mesh = fbxMesh
            // CANNON
            fbxMesh.position.x = 0
            fbxMesh.position.y = 0
            const fbxShape = new CANNON.Box(new CANNON.Vec3(...scale))
            const fbxBody = new CANNON.Body({ mass: 1 })
            fbxBody.addShape(fbxShape)
            fbxBody.position.x = fbxMesh.position.x
            fbxBody.position.y = fbxMesh.position.y
            fbxBody.position.z = fbxMesh.position.z
            this.body = fbxBody
        })
    }
}