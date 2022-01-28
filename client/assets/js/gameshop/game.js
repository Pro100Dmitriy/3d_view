import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugRenderer from './utils/cannonDebugRenderer'

import { Envoirement } from './Envoirement'
import { Controll } from './Controllers/Controll'

import { pause } from './Modules/PauseModule'
import { SETTINGS } from './settings'
import { SERVER } from '../global/ServerManeger'

export class GameShop{
    constructor(container, settings = {}){
        this.container = container

        // Modules
        this.pauseModule = pause()

        this.initCANNON()
        this.initTHREE()

        const loop = () => {
            this.request = requestAnimationFrame( loop )
            if( this.pauseModule.controls.enabled ){
                this.updater()
                this.render()
            }
            window.addEventListener( 'resize', this.onWindowResize.bind(this), false )
        }
        loop()

        this.pauseModule.open() 

        document.querySelector('#view-info').addEventListener('click', event => {
            //this.saveChanges()
        })
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

        // Floor
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
        this.scene.fog = new THREE.Fog( 0x9cbbc9, 0, 700 )
        this.scene.add(new THREE.AxesHelper(5))

        // envoirement
        const envoirement = new Envoirement( this.scene, this.world, SETTINGS.gamemode )

        // light
        envoirement.illuminate()
        this.pickedLight = envoirement.getPickedLight
        this.lightGroupArr = envoirement.getLightGroupArr

        // Floor
        const floorGeometry = new THREE.PlaneGeometry( 300, 300, 50, 50 )
        floorGeometry.applyMatrix4( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) )
        //const floorMaterial = new THREE.MeshLambertMaterial( { color: 0x878787 } )
        const floorMaterial = new THREE.MeshPhysicalMaterial( { color: 0xCCCCCC } )
        const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial )
        floorMesh.castShadow = true
        floorMesh.receiveShadow = true
        this.scene.add( floorMesh )

        // Renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        this.renderer.setClearColor(this.scene.fog.color, 1)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        //this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // this.renderer.shadowMap.type = THREE.BasicShadowMap
        this.renderer.shadowMap.type = THREE.PCFShadowMap
        // this.renderer.shadowMap.type = THREE.VSMShadowMap
        this.renderer.domElement.setAttribute("id", 'object')
        this.container.appendChild( this.renderer.domElement )

        // meshes
        envoirement.build()
        this.pickedObject = envoirement.getPickedObject
        this.modelGroupArr = envoirement.modelGroupArr
        this.isHoverArr = envoirement.isHoverArr

        // controls
        this.controls = new Controll( SETTINGS.gamemode, this.scene, this.renderer, this.camera, this.world, this.container, this.pickedObject, this.modelGroupArr, this.isHoverArr, this.pickedLight )

        /** Other Events */

        // debug
        if( SETTINGS.debug ){
            this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world)
        }
        if( SETTINGS.loadChanges ){
            this.loadChanges()
        }
    }

    /**
     * SERVER
     */
    saveChanges(){
        const changes = {}
        this.pickedObject.forEach( mesh => {
            changes[mesh.name] = {
                position: mesh.position,
                rotation: mesh.rotation,
                scale: mesh.scale
            }
        } )

        const save = {
            name: 'public_world',
            data: JSON.stringify(changes)
        }

        SERVER.post({ url: `/api/scene`, body: JSON.stringify(save),
            onloadstart_callback(){
                 console.log('wait') 
            }
        })
        .then( response => {
            console.log(response)
        } )
        .catch( error => {
            console.log( error )
        } )

    }
    
    async loadChanges(){
        let saveData
        await SERVER.get({ url: `/api/scene/public_world`,
            onloadstart_callback(){}
        })
        .then( response => {
            saveData = response[0] ? JSON.parse( response[0].data ) : false
        } )
        .catch( error => console.log( error ) )

        if( saveData ){
            this.pickedObject.forEach( mesh => {
                mesh.position.copy( saveData[mesh.name].position )
                mesh.rotation.copy( saveData[mesh.name].rotation )
                mesh.scale.copy( saveData[mesh.name].scale )
            } )
            this.modelGroupArr.forEach( item => {
                // mesh
                item[0].position.copy( item[1].position )
                item[0].rotation.copy( item[1].rotation )
                item[0].scale.set( ...item[1].scale )
                item[0].quaternion.copy( item[0].quaternion )
                // Helper
                item[2].position.copy( item[1].position )
                item[2].rotation.copy( item[1].rotation )
                item[2].scale.set( ...item[1].scale )
                item[2].update()
                // body
                item[3].position.copy( item[1].position )
                item[3].quaternion.copy( item[0].quaternion )
                if( item[3].shapes[0].scale ){
                    item[3].shapes[0].scale.x = item[3].shapes[0].scale.x * item[1].scale.x
                    item[3].shapes[0].scale.y = item[3].shapes[0].scale.y * item[1].scale.y
                    item[3].shapes[0].scale.z = item[3].shapes[0].scale.z * item[1].scale.z
                }else{
                    item[3].shapes[0].halfExtents.x = item[3].shapes[0].halfExtents.x * item[1].scale.x
                    item[3].shapes[0].halfExtents.y = item[3].shapes[0].halfExtents.y * item[1].scale.y
                    item[3].shapes[0].halfExtents.z = item[3].shapes[0].halfExtents.z * item[1].scale.z
                }
            } )
        } 
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.render()
    }

    updater(){
        this.world.step(1/60)
        this.controls.update( Date.now() - this.time )
        this.controls.utils()

        if( SETTINGS.gamemode === 'game' ){
            if( SETTINGS.debug ){
                this.cannonDebugRenderer.update()
            }
            this.cannonObjectUpdater()
        }
        if( SETTINGS.gamemode === 'edit' ){
            if( SETTINGS.debug ){
                this.cannonDebugRenderer.update()
            }
            this.groupObjectUpdater()
            this.groupLightUpdater()
        }
    }

    cannonObjectUpdater(){
        this.modelGroupArr.forEach( item => {
            item[1].position.copy( item[3].position )
            item[1].quaternion.copy( item[3].quaternion )
            item[0].position.copy( item[3].position )
            item[0].quaternion.copy( item[3].quaternion )
        } )
    }
    groupObjectUpdater(){
        this.modelGroupArr.forEach( item => {
            // mesh
            item[0].position.copy( item[1].position )
            item[0].rotation.copy( item[1].rotation )
            item[0].scale.set( ...item[1].scale )
            // Helper
            item[2].position.copy( item[1].position )
            item[2].rotation.copy( item[1].rotation )
            item[2].scale.set( ...item[1].scale )
            item[2].update()
            // body
            item[3].position.copy( item[1].position )
            item[3].quaternion.copy( item[1].quaternion )
        } )
    }
    groupLightUpdater(){
        this.lightGroupArr.forEach( item => {
            // light
            item[0].position.copy( item[1].position )
            item[0].rotation.copy( item[1].rotation )
            item[0].scale.set( ...item[1].scale )
            // Helper
            item[2].position.copy( item[1].position )
            item[2].rotation.copy( item[1].rotation )
            item[2].scale.set( ...item[1].scale )
            item[2].update()
        } )
    }

    render(){
        this.renderer.render(this.scene, this.camera)
        this.time = Date.now()
    }
}