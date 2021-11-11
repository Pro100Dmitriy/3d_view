import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Editmode{
    constructor({scene, renderer, camera, container, meshesArr}){
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.container = container
        this.pickableObjects = meshesArr

        this.create()
    }

    create(){
        const controls = new OrbitControls( this.camera , this.renderer.domElement )

        controls.utils = () => {}
        this.raycaster()
        
        this.controls = controls
        return this
    }

    get getControls(){
        return this.controls
    }

    raycaster(){
        const raycaster = new THREE.Raycaster()
        let intersects
        let intersectedObject = []
        let originalMaterials = new THREE.MeshBasicMaterial( {color: 0xe5e5e5, } );
        let highlightedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00
        })
        const viewInfo = viewInformation()

        document.addEventListener( 'click', onDocumentClick.bind(this), false )
        function onDocumentClick( event ){
            raycaster.setFromCamera(
                {
                    x: (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
                    y: -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
                },
                this.camera
            )

            console.log(this.pickableObjects)
            intersects = raycaster.intersectObjects(this.pickableObjects, false)

            if (intersects.length > 0) {
                intersectedObject = intersects[0].object
            } else {
                intersectedObject = null
            }
            this.pickableObjects.forEach((o, i) => {
                if (intersectedObject && intersectedObject.name === o.name) {
                    viewInfo.open( intersectedObject.name )
                    this.pickableObjects[i].material = highlightedMaterial
                } else {
                    this.pickableObjects[i].material = originalMaterials
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