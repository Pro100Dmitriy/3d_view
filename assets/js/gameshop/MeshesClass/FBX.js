import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export class FBX{
    constructor( {name, file, boundingShape, position, scaleScalar, scale, material, texture, picked, mass} ){
        this.name = name
        this.picked = picked

        this.loadBoundingMesh( boundingShape, scaleScalar )
        this.create( file, position, scaleScalar, scale, material, texture, mass )
    }

    create( file, {x, y, z}, scaleScalar, scale, material = false, texture = false, mass = 1 ){
        let loader = new FBXLoader()
        loader.load(
            file,
            fbx => {
                const fbxMesh = fbx
                const onlyMesh = fbxMesh.children[0]
                onlyMesh.geometry.computeBoundingBox()
                let boundingBox = onlyMesh.geometry.boundingBox
                let boundingHeight = (boundingBox.max.y - boundingBox.min.y) * scaleScalar
                let boundingWidth = (boundingBox.max.x - boundingBox.min.x) * scaleScalar
                let boundingDepth = (boundingBox.max.z - boundingBox.min.z) * scaleScalar

                fbxMesh.name = this.name
                let fbxMaterial
                if( material ){
                    fbxMaterial = material
                }else{
                    fbxMaterial = new THREE.MeshLambertMaterial()
                }
                if( texture ){
                    material.map = texture
                    if( onlyMesh.isMesh ){
                        onlyMesh.material = fbxMaterial

                        onlyMesh.castShadow = true
                        onlyMesh.frustumCulled = false
                        onlyMesh.geometry.computeVertexNormals()
                    }
                }else{
                    if( onlyMesh.isMesh ){
                        onlyMesh.castShadow = true
                        onlyMesh.frustumCulled = false
                        onlyMesh.geometry.computeVertexNormals()
                    } 
                }

                fbxMesh.receiveShadow = true
                fbxMesh.castShadow = true
                onlyMesh.scale.setScalar(scaleScalar)

                let box = new THREE.Box3().setFromObject( fbxMesh )
                let center = new THREE.Vector3()
                let coordsByCenter = box.getCenter( center )

                // X
                if( coordsByCenter.x !== 0 ){
                    onlyMesh.position.x = -coordsByCenter.x
                }else{
                    onlyMesh.position.x = 0
                }
                // Y
                if( coordsByCenter.y !== 0 ){
                    onlyMesh.position.y = -coordsByCenter.y
                }else{
                    onlyMesh.position.y = 0
                }
                // Z
                if( coordsByCenter.z !== 0 ){
                    onlyMesh.position.z = -coordsByCenter.z
                }else{
                    onlyMesh.position.z = 0
                }

                fbxMesh.position.x = x
                fbxMesh.position.y = y
                fbxMesh.position.z = z

                this.mesh = fbxMesh
                // DRAG
                const modelDragBox = new THREE.Mesh(
                    new THREE.BoxGeometry( boundingWidth, boundingHeight, boundingDepth ),
                    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
                )
                modelDragBox.name = fbxMesh.name
                modelDragBox.position.x = x
                modelDragBox.position.y = y
                modelDragBox.position.z = z
                //HELPER
                const boxHelper = new THREE.BoxHelper(modelDragBox, 0xffff00)
                boxHelper.name = fbxMesh.name
                boxHelper.visible = false
                modelDragBox.boxHelper = boxHelper
                this.drag = modelDragBox
                this.helper = boxHelper
                // CANNON
                let vertices, indices, fbxShape

                if( this.boundingMesh ){
                    vertices = this.boundingMesh.geometry.attributes.position.array
                    indices = Object.keys(vertices).map(Number)
                    fbxShape = new CANNON.Trimesh( vertices, indices )
                    fbxShape.scale.x = scaleScalar
                    fbxShape.scale.y = scaleScalar
                    fbxShape.scale.z = scaleScalar
                }else{
                    fbxShape = new CANNON.Box(new CANNON.Vec3(boundingWidth/2, boundingHeight/2, boundingDepth/2))
                }
                const fbxBody = new CANNON.Body({ mass: mass })
                fbxBody.addShape(fbxShape)
                fbxBody.position.x = x
                fbxBody.position.y = y
                fbxBody.position.z = z
                this.body = fbxBody

                /**
                 * EXPORTED:
                 * this.mesh
                 * this.modelGroup
                 * this.drag
                 * this.helper
                 * this.body
                 */
            },
            xhr => {
                console.log( (xhr.loaded / xhr.total) * 100 + '%  loaded' )
            },
            error => {
                console.log(error)
            }
        )
    }

    loadBoundingMesh( boundingShape = false, scaleScalar = 1 ){
        if( !boundingShape ){
            this.boundingMesh = false
            return
        } 
        
        let loader = new FBXLoader()
        loader.load(
            boundingShape,
            bounding => {
                const fbxBoundingMesh = bounding
                fbxBoundingMesh.children[0].geometry.computeBoundingBox()
                this.boundingMesh = fbxBoundingMesh.children[0]
            },
            xhr => {
                console.log( (xhr.loaded / xhr.total) * 100 + '%  loaded' )
            },
            error => {
                console.log(error)
            }
        )
    }
}