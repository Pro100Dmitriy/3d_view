import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugRenderer from '../utils/cannonDebugRenderer'

import { Envoirement } from './Envoirement'
import { Controll } from './Controll'

export class GameShop{
    constructor(container, settings = {}){
        this.container = container

        this.initCANNON()
        this.initTHREE()

        const loop = () => {
            requestAnimationFrame( loop )
            this.updater()
            this.render()
        }
        loop()
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

        // Create a sphere
        const mass = 3, radius = 5
        this.sphereShape = new CANNON.Sphere(radius)
        this.sphereBody = new CANNON.Body({ mass: mass })
        //this.sphereBody.addShape(this.sphereShape)
        this.sphereBody.position.set(0,25,0)
        this.sphereBody.linearDamping = .5
        //this.world.addBody(this.sphereBody)

        // Create a plane
        this.groundShape = new CANNON.Plane();
        this.groundBody = new CANNON.Body({ mass: 0 });
        this.groundBody.addShape(this.groundShape);
        this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        this.world.addBody(this.groundBody);
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

        // raycaster
        this.raycaster = new THREE.Raycaster();
        this.raymouse = new THREE.Vector3();
        this.raymouse.x = ( (window.innerWidth / 2) / window.innerWidth ) * 2 - 1
        this.raymouse.y = - ( (window.innerHeight / 2) / window.innerHeight ) * 2 + 1
        this.raymouse.z = - ( (window.innerHeight / 2) / window.innerHeight ) * 2 + 1

        // envoirement
        const envoirement = new Envoirement( this.scene, this.world )

        // light
        envoirement.lights()

        // floor
        const floorGeometry = new THREE.PlaneGeometry( 300, 300, 50, 50 )
        floorGeometry.applyMatrix4( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) )
        const floorMaterial = new THREE.MeshLambertMaterial( { color: 0xdddddd } )
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
        this.meshesArr = envoirement.meshes()

        // controls
        this.controls = new Controll( 'edit', this.scene, this.renderer, this.camera, this.sphereBody, this.container )

        /** Other Events */
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        // debug
        this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world)
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }

    raycasterFun(){
        this.raycaster.setFromCamera( this.raymouse, this.camera )
        const intersects = this.raycaster.intersectObjects( this.scene.children )

        // for ( let i = 0; i < intersects.length; i ++ ) {
        //     intersects[ i ].object.material.color.set( 0xff0000 );
        // }
        if(intersects[intersects.length-1]){
            console.log( intersects[intersects.length-1] )
            //this.infopage.innerHTML = intersects[intersects.length-1].object.name
        }
    }

    updater(){
        this.world.step(1/60)

        //this.delta = Math.min(this.clock.getDelta(), 0.1)
        //this.world.step(this.delta)

        this.cannonDebugRenderer.update()
        this.meshesArr.forEach( item => {
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
        this.raycasterFun()
        this.renderer.render(this.scene, this.camera)
    }
}