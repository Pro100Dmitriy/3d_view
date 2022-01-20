import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { SETTINGS } from '../../settings'
import { transpileModule } from 'typescript'

export class Editmode{
    constructor({scene, renderer, camera, world, container, pickedArr, gropArr}){
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.world = world
        this.container = container
        this.pickableObjects = pickedArr
        this.modelGroupArr = gropArr

        this.modelGroupArr.forEach( object => {
            object[3].mass = 0
        } )

        this.viewInfo = viewInformation()

        this.create()
    }

    create(){
        this.orbitControls = new OrbitControls( this.camera , this.renderer.domElement )
        this.transformControls = new TransformControls( this.camera, this.renderer.domElement )
        this.transformControls.setSize = SETTINGS.axisScale

        this.orbitControls.utils = () => {}
        this.raycaster()

        this.transformControls.addEventListener( 'dragging-changed', event => {
            this.orbitControls.enabled = !event.value
        } )
        this.transformControls.addEventListener( 'change', event => {
            const selectedObj = this.transformControls.object
            let highlightedMaterial = new THREE.MeshBasicMaterial({
                wireframe: true,
            })

            this.viewInfo.open( selectedObj.name, selectedObj.position, selectedObj.rotation, selectedObj.scale )
            selectedObj.material = highlightedMaterial
        } )
        
        window.addEventListener('keydown', onKeyDown.bind(this) )
        function onKeyDown(event){
            switch (event.key) {
                case 'q':
                    this.transformControls.visible = false
                    break
                case 'w':
                    this.transformControls.setMode('translate')
                    break
                case 'e':
                    this.transformControls.setMode('rotate')
                    break
                case 'r':
                    this.transformControls.setMode('scale')
                    break
            }
        }

        return this
    }

    get getControls(){
        return this.orbitControls
    }

    get getTransform(){
        return this.transform
    }

    raycaster(){
        const raycaster = new THREE.Raycaster()
        let intersects
        let intersectedObject = []
        let originalMaterials = []
        let highlightedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true
        })

        this.pickableObjects.forEach( picked => {
            originalMaterials.push( picked.material )
        } )

        document.addEventListener( 'click', onDocumentClick.bind(this), false )
        function onDocumentClick( event ){
            raycaster.setFromCamera(
                {
                    x: (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
                    y: -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
                },
                this.camera
            )

            intersects = raycaster.intersectObjects(this.pickableObjects, false)

            if (intersects.length > 0) {
                intersectedObject = intersects[0].object
            } else {
                intersectedObject = null
            }
            this.pickableObjects.forEach( (selectedObj, i) => {
                if (intersectedObject && intersectedObject.name === selectedObj.name) {

                    this.transformControls.attach( selectedObj )
                    this.scene.add(this.transformControls)

                    this.viewInfo.open( selectedObj.name, selectedObj.position, selectedObj.rotation, selectedObj.scale )
                    selectedObj.material = highlightedMaterial

                } else {

                    selectedObj.material = originalMaterials[i]

                }
            })
        }
    }
}


/** Modules */
const viewInformation = () => {
    const pointofview = document.querySelector('#view-info')
    return {
        open( name, position, rotation, scale ){
            pointofview.innerHTML = `
                <p>${name}</p>
                <p>x: ${position.x}, y: ${position.y}, z: ${position.z}</p>
                <p>${rotation._x} ${rotation._y} ${rotation._z}</p>
                <p>${scale.x} ${scale.y} ${scale.z}</p>
            `
        }
    }
}