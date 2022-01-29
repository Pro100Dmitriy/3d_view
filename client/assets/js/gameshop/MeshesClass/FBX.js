import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

/**
 * 
 *  name: 'Hoodie_Samurai',
    file: './models/01_Hoodie-Samurai.fbx',
    boundingShape: false,
    position: {x: 22.47639, y: 5.9922, z: 9.9419},
    rotation: {x: 0, y: -0.45619, z: 0},
    scale: {x: 1, y: 1, z: 1},
    size: .05,
    material: new THREE.MeshStandardMaterial(),
    textures: {
        baseColorMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_BaseColor.png"),
        roughnessMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Roughness.png"),
        metalnesMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Metallic.png"),
        normalMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Normal.png"),
    },
    picked: false,
    productID: 2,
    mass: 1
 */

export class FBX{
    constructor( {name, file, boundingShape, position, rotation, scale, size, material, textures, mass, picked, productID, isHover} ){
        this.name = name
        this.picked = picked ?? false
        this.productID = productID ?? false
        this.isHover = isHover ?? false

        this.create( file, boundingShape, position, rotation, scale, size, material, textures, mass )
    }

    create( 
        file,
        boundingShape = false,
        position = {x: 0, y: 0, z: 0},
        rotation = {x: 0, y: 0, z: 0},
        scale = {x: 1, y: 1, z: 1},
        size = 0.05,
        material = new THREE.MeshLambertMaterial(),
        textures = false, 
        mass = 1
    ){
        new FBXLoader().load(
            file,
            fbx => {
                const model = fbx
                const mesh = model.children[0]
                
                model.name = this.name
                model.productID = this.productID
                model.receiveShadow = true
                model.castShadow = true

                mesh.material = this.loadTextures( material, textures )
                mesh.castShadow = true
                mesh.receiveShadow = true
                //mesh.frustumCulled = false

                mesh.scale.setScalar( size )
                mesh.geometry.computeVertexNormals()
                mesh.geometry.computeBoundingBox()

                let box = new THREE.Box3().setFromObject( model )
                let coordsByCenter = box.getCenter( new THREE.Vector3() )

                // X
                if( coordsByCenter.x !== 0 ){
                    mesh.position.x = -coordsByCenter.x
                }else{
                    mesh.position.x = 0
                }
                // Y
                if( coordsByCenter.y !== 0 ){
                    mesh.position.y = -coordsByCenter.y
                }else{
                    mesh.position.y = 0
                }
                // Z
                if( coordsByCenter.z !== 0 ){
                    mesh.position.z = -coordsByCenter.z
                }else{
                    mesh.position.z = 0
                }

                model.position.set( position.x, position.y, position.z )
                model.rotation.set( rotation.x, rotation.y ,rotation.z )
                model.scale.set( scale.x, scale.y, scale.z )

                this.model = model
                // DRAG ----------------------------------------------------------------
                let boundingBox = mesh.geometry.boundingBox
                let bounding = {
                    boundingHeight: (boundingBox.max.y - boundingBox.min.y) * size,
                    boundingWidth: (boundingBox.max.x - boundingBox.min.x) * size,
                    boundingDepth: (boundingBox.max.z - boundingBox.min.z) * size,
                }
                
                const modelDragBox = new THREE.Mesh(
                    new THREE.BoxGeometry( bounding.boundingWidth, bounding.boundingHeight, bounding.boundingDepth ),
                    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
                )
                modelDragBox.name = this.name
                modelDragBox.productID = this.productID
                modelDragBox.position.set( position.x, position.y, position.z )
                modelDragBox.rotation.set( rotation.x, rotation.y ,rotation.z )
                modelDragBox.scale.set( scale.x, scale.y, scale.z )
                modelDragBox.quaternion.copy( model.quaternion )
                // HELPER ---------------------------------------------------------------
                const boxHelper = new THREE.BoxHelper(modelDragBox, 0xffff00)
                boxHelper.name = this.name
                boxHelper.visible = false
                modelDragBox.boxHelper = boxHelper
                this.drag = modelDragBox
                this.helper = boxHelper
                // CANNON ---------------------------------------------------------------
                this.loadBoundingMesh( boundingShape, bounding, size, scale )
                    .then( resolve => {
                        const fbxBody = new CANNON.Body({ mass: mass })
                        fbxBody.addShape(resolve)
                        fbxBody.name = this.name
                        fbxBody.position.set( position.x, position.y, position.z )
                        fbxBody.quaternion.copy( modelDragBox.quaternion )
                        this.body = fbxBody
                    } )
                
                
                // -----------------------------------------------------------------------
                /**
                 * EXPORTED:
                 *  this.model
                 *  this.drag
                 *  this.helper
                 *  this.body
                 */
            },
            xhr => {
                console.log( (xhr.loaded / xhr.total) * 100 + '%  loaded' )
                const name = this.name.replace( '&', '' )
                const progressItem = document.querySelector(`#${ name }`) ?? false

                if( progressItem ){
                    const percent = Math.round( (xhr.loaded / xhr.total) * 100 )

                    console.log( typeof percent )
                    if( percent == '100' ){
                        progressItem.style.opacity = 0
                        setTimeout( () => progressItem.style.display = 'none', 300 )
                    }else{
                        progressItem.querySelector('.percent').innerHTML = percent
                        progressItem.querySelector('.progress-line').style.width = `${ percent }%`
                    }
                }else{
                    const downloadList = document.querySelector('#download-list')
                    const percent = Math.round( (xhr.loaded / xhr.total) * 100 )
    
                    const HTML = `
                        <li id="${ name }" class="download__list__item">
                            <p class="name medium-14">${ name }</p>
                            <p class="percent regular-14">${ percent }%</p>
                            <div class="progress-line"><span style="width: ${ percent }%"></span></div>
                        </li>
                    `
                    downloadList.insertAdjacentHTML( 'beforeend', HTML )

                    if( percent == 100 ){
                        let progressItem = document.querySelector(`#${ name }`) ?? false
                        progressItem.style.opacity = 0
                        setTimeout( () => progressItem.style.display = 'none', 300 )
                    }
                }
            },
            error => {
                console.log(error)
            }
        )
    }

    loadBoundingMesh( boundingShape, bounding, size, scale ){
        if( boundingShape ){
            return new Promise( resolve => {
                new FBXLoader().load(
                    boundingShape,
                    fbx => {
                        fbx.children[0].geometry.computeBoundingBox()
                        let boundingMesh = fbx.children[0]
                        let vertices = boundingMesh.geometry.attributes.position.array
                        let indices = Object.keys(vertices).map(Number)
                        let fbxShape = new CANNON.Trimesh( vertices, indices )
                        fbxShape.scale.set( size * scale.x, size * scale.y, size * scale.z )
                        resolve( fbxShape )
                    },
                    xhr => {
                        console.log( (xhr.loaded / xhr.total) * 100 + '%  loaded' )
                    },
                    error => {
                        console.log(error)
                    }
                )
            } )
        }else{
            return new Promise( resolve => {
                resolve( new CANNON.Box(new CANNON.Vec3(bounding.boundingWidth/2, bounding.boundingHeight/2, bounding.boundingDepth/2)) )
            } )
        }
    }

    loadTextures( material, textures ){
        if( material.type != 'MeshStandardMaterial' ) return material
        if( textures ){
            if( 'baseColorMap' in textures ) material.map = textures.baseColorMap
            if( 'roughnessMap' in textures ) material.roughnessMap = textures.roughnessMap
            if( 'metalnessMap' in textures ) material.metalnessMap = textures.metalnessMap
            if( 'normalMap' in textures ) material.normalMap = textures.normalMap
        }
        return material
    }
}






















// let fbxShape, vertices, indices
// if( boundingShape ){
//     vertices = this.boundingMesh.geometry.attributes.position.array
//     indices = Object.keys(vertices).map(Number)
//     fbxShape = new CANNON.Trimesh( vertices, indices )
//     fbxShape.scale.set( size, size, size )
// }else{
//     fbxShape = new CANNON.Box(new CANNON.Vec3(bounding.boundingWidth/2, bounding.boundingHeight/2, bounding.boundingDepth/2)) 
// }
// const fbxBody = new CANNON.Body({ mass: mass })
// fbxBody.addShape(fbxShape)
// fbxBody.name = this.name
// fbxBody.position.set( position.x, position.y, position.z )
// this.body = fbxBody


    // loadBoundingMesh( boundingShape = false ){
    //     if( !boundingShape ) return

    //     new FBXLoader().load(
    //         boundingShape,
    //         fbx => {
    //             fbx.children[0].geometry.computeBoundingBox()
    //             this.boundingMesh = fbx.children[0]
    //         },
    //         xhr => {
    //             console.log( (xhr.loaded / xhr.total) * 100 + '%  loaded' )
    //         },
    //         error => {
    //             console.log(error)
    //         }
    //     )
    // }