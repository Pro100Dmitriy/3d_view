import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
<<<<<<< HEAD
import { SETTINGS } from '../../settings'
=======
>>>>>>> d42b5f961c60f07cbc1ae530e7a181406bd7306e

export class Editmode{
    constructor({scene, renderer, camera, world, container, meshesArr}){
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.world = world
        this.container = container
        this.pickableObjects = meshesArr

        this.create()
    }

    create(){
<<<<<<< HEAD
        this.orbitControls = new OrbitControls( this.camera , this.renderer.domElement )
        this.transformControls = new TransformControls( this.camera, this.renderer.domElement )
        this.transformControls.setSize = SETTINGS.axisScale
=======
        const controls = new OrbitControls( this.camera , this.renderer.domElement )
        const transform = new TransformControls( this.camera, this.renderer.domElement )

        transform.addEventListener( 'dragging-changed', event => {
            controls.enabled = !event.value
        })
>>>>>>> d42b5f961c60f07cbc1ae530e7a181406bd7306e

        this.orbitControls.utils = () => {}
        this.raycaster()
<<<<<<< HEAD

        this.transformControls.addEventListener( 'dragging-changed', event => {
            this.orbitControls.enabled = !event.value
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

=======
        
        this.controls = controls
        this.transform = transform
>>>>>>> d42b5f961c60f07cbc1ae530e7a181406bd7306e
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
            wireframe: false,
            color: 0x32c546
        })
        const viewInfo = viewInformation()

        this.pickableObjects.forEach( picked => {
            originalMaterials.push( picked.material )
        } )

        document.addEventListener( 'click', onDocumentClick.bind(this), false )
        function onDocumentClick( event ){
            console.log( this.scene )
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
<<<<<<< HEAD
            this.pickableObjects.forEach( (selectedObj, i) => {
                if (intersectedObject && intersectedObject.name === selectedObj.name) {

                    this.transformControls.attach( selectedObj )
                    this.scene.add(this.transformControls)

                    viewInfo.open( intersectedObject.name )
                    selectedObj.material = highlightedMaterial

                } else {

                    selectedObj.material = originalMaterials[i]

=======

            this.pickableObjects.forEach((o, i) => {
                const selected = this.pickableObjects[i]

                if (intersectedObject && intersectedObject.name === o.name) {
                    viewInfo.open( intersectedObject.name )

                    this.transform.attach(selected)
                    this.scene.add(this.transform)

                    selected.material = highlightedMaterial
                } else {
                    selected.material = originalMaterials
>>>>>>> d42b5f961c60f07cbc1ae530e7a181406bd7306e
                }
            })
        }
    }
}


/** Modules */
const viewInformation = () => {
    const pointofview = document.querySelector('#view-info')
    return {
        open( name ){
            pointofview.innerHTML = `<p>${name}</p>`
        }
    }
}