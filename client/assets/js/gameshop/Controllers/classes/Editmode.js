import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { SETTINGS } from '../../settings'

export class Editmode{
    constructor({scene, renderer, camera, world, container, pickedArr, gropArr, pickedLight}){
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.world = world
        this.container = container
        this.pickableObjects = pickedArr
        this.modelGroupArr = gropArr
        this.pickableLight = pickedLight

        this.modelGroupArr.forEach( object => {
            object[3].mass = 0
        } )

        this.viewInfo = viewInformation()

        this.create()
    }W

    create(){
        this.orbitControls = new OrbitControls( this.camera , this.renderer.domElement )
        this.transformControls = new TransformControls( this.camera, this.renderer.domElement )
        this.transformControls.setSize = SETTINGS.axisScale

        this.orbitControls.utils = () => {}
        this.raycasterObject()
        this.raycasterLight()

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

    raycasterObject(){
        const raycaster = new THREE.Raycaster()
        // OBJECTS
        let intersectsObject
        let intersectedObject = []
        let originalObjectMaterials = []
        let highlightedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true
        })

        this.pickableObjects.forEach( picked => {
            originalObjectMaterials.push( picked.material )
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

            intersectsObject = raycaster.intersectObjects(this.pickableObjects, false)

            if (intersectsObject.length > 0) {
                intersectedObject = intersectsObject[0].object
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
                    selectedObj.material = originalObjectMaterials[i]
                }
            })
        }
    }

    raycasterLight(){
        const raycaster = new THREE.Raycaster()
        let intersectsLights
        let intersectedLight = []
        let originalLightMaterials = []
        let highlightedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true
        })

        this.pickableLight.forEach( picked => {
            originalLightMaterials.push( picked.material )
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

            intersectsLights = raycaster.intersectObjects(this.pickableLight, false)

            if (intersectsLights.length > 0) {
                intersectedLight = intersectsLights[0].object
            } else {
                intersectedLight = null
            }

            this.pickableLight.forEach( (selectedLight, i) => {
                if (intersectedLight && intersectedLight.name === selectedLight.name) {
                    this.transformControls.attach( selectedLight )
                    this.scene.add(this.transformControls)

                    this.viewInfo.open( selectedLight.name, selectedLight.position, selectedLight.rotation, selectedLight.scale )
                    selectedLight.material = highlightedMaterial
                } else {
                    selectedLight.material = originalLightMaterials[i]
                }
            })
        }
    }

    get getControls(){
        return this.orbitControls
    }

    get getTransform(){
        return this.transform
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