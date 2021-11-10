import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols'
import CannonDebugRenderer from '../utils/cannonDebugRenderer'

export class Initialization{
    constructor(prop){
        this.container = prop.container

        this.initCANNON()
        this.initTHREE()
        
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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000)
        this.camera.position.x = 10
        this.camera.position.y = 10
        this.camera.position.z = 10
        
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog( 0xd8fff4, 0, 500 )
        this.scene.add(new THREE.AxesHelper(5))

        // Raycaster
        this.raycaster = new THREE.Raycaster();
        this.raymouse = new THREE.Vector3();
        this.raymouse.x = ( (window.innerWidth / 2) / window.innerWidth ) * 2 - 1
        this.raymouse.y = - ( (window.innerHeight / 2) / window.innerHeight ) * 2 + 1
        this.raymouse.z = - ( (window.innerHeight / 2) / window.innerHeight ) * 2 + 1

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

        // Controll
        this.controls = new OrbitControls( this.camera , this.renderer.domElement )


        this.clock = new THREE.Clock()
        this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world)
    }
}