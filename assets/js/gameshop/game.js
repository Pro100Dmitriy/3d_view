import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugRenderer from '../utils/cannonDebugRenderer'

import { Envoirement } from './Envoirement'
import { Controll } from './Controllers/Controll'

import { pause } from './Modules/PauseModule'
import { SETTINGS } from './settings'

export class GameShop{
    constructor(container, settings = {}){
        this.container = container

        const saveScene = document.querySelector('#save_scene')

        // Modules
        this.pauseModule = pause()

        this.initCANNON()
        this.initTHREE()

        const loop = () => {
            this.request = requestAnimationFrame( loop )
            this.updater()
            this.render()
        }
        loop()

        window.addEventListener( 'keydown', onKeyDown.bind(this), false )
        function onKeyDown(event){
            if( event.code === 'Escape' ){
                this.pauseModule.open( this.request, loop )
            }
        }
        saveScene.addEventListener( 'click', onSaveScene.bind(this), false )
        function onSaveScene(event){
            console.log(this.scene)
            localStorage.setItem( `scene`, JSON.stringify(this.scene.children) )
        }
    }

    /**
     * CANNON
     */
    initCANNON(){
        // Setup our world
        this.world = new CANNON.World();
        this.world.quatNormalizeSkip = 0;
        this.world.quatNormalizeFast = false;

        const solver = new CANNON.GSSolver();

        this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
        this.world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;

        this.world.solver = new CANNON.SplitSolver(solver);
        this.world.gravity.set(0,-20,0);
        this.world.broadphase = new CANNON.NaiveBroadphase();

        // Create a plane
        this.groundShape = new CANNON.Plane()
        this.groundBody = new CANNON.Body({ mass: 0 })
        this.groundBody.addShape(this.groundShape)
        this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2)
        this.world.addBody(this.groundBody)
    }

    /**
     * THREE
     */
    initTHREE(){
        // camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000)
        this.camera.position.x = 10
        this.camera.position.y = 10
        this.camera.position.z = 10
        
        // scene
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog( 0x000000, 0, 500 )
        this.scene.add(new THREE.AxesHelper(5))

        // envoirement
        const envoirement = new Envoirement( this.scene, this.world, SETTINGS.gamemode )

        // light
        envoirement.illuminate()

        // floor
        const floorGeometry = new THREE.PlaneGeometry( 300, 300, 50, 50 )
        floorGeometry.applyMatrix4( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) )
        const floorMaterial = new THREE.MeshLambertMaterial( { color: 0x878787 } )
        const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial )
        floorMesh.castShadow = true
        floorMesh.receiveShadow = true
        this.scene.add( floorMesh )

        // Renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        this.renderer.setClearColor(this.scene.fog.color, 1)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.domElement.setAttribute("id", 'object')
        this.container.appendChild( this.renderer.domElement )

        // meshes
        envoirement.build()
        this.combineArr = envoirement.getCombineArr
        this.meshesArr = envoirement.getMeshesArr
        this.bodysArr = envoirement.getBodyArr
        this.pickedObject = envoirement.getPickedObject

        // controls
        this.controls = new Controll( SETTINGS.gamemode, this.scene, this.renderer, this.camera, this.world, this.container, this.meshesArr )

        /** Other Events */
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false )

        // debug
        this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world)
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }

    updater(){
        this.world.step(1/60)
        this.controls.update( Date.now() - this.time )
        this.controls.utils()

        if( SETTINGS.gamemode === 'game' ){
            this.cannonDebugRenderer.update()
            this.cannonObjectUpdater()
        }
        
    }

    cannonObjectUpdater(){
        this.combineArr.forEach( item => {
            item[0].position.set(
                item[1].position.x,
                item[1].position.y,
                item[1].position.z
            )
            item[0].quaternion.set(
                item[1].quaternion.x,
                item[1].quaternion.y,
                item[1].quaternion.z,
                item[1].quaternion.w
            )
        } )
    }

    render(){
        this.renderer.render(this.scene, this.camera)
        this.time = Date.now()
    }
}