import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import CannonUtils from './utils/cannonUtils'
import CannonDebugRenderer from './utils/cannonDebugRenderer'


export class Gameshop{
    MOUSE_BUTTON = ['left', 'middle', 'right']
    keys = {}
    mouse = {
        'position': {'x': 0, 'y': 0},
        'speed': {'x': 0, 'y': 0},
        'locked': false,
        'keys': {
            'left': false,
            'right': false,
            'middle': false,
            'wheel': 0
        }
    }
    events = {
        'keydown': null,
        'mousedown': null,
        'mouseup': null,
        'mousemove': null
    }
    delta = null

    constructor(obj){
        this.container = obj.container
        this.toggle_info = document.querySelector('#toggle_info')
        this.gameshop_info = document.querySelector('#gameshop_info')

        //settings
        this.gamemode = this.gameshop_info.querySelector('#gamemode').value

        //this.container.addEventListener('click', event => document.body.requestPointerLock() )
        this.toggle_info.addEventListener('click', event => {
            this.gameshop_info.classList.toggle('close')
        })

        this.initCannon()
        this.init()
        /** Loop Function */
        const loop = () => {
            requestAnimationFrame( loop )
            this.BLUupdate()
            this.render()
        }
        loop()
    }

    /**
     * CANNON
     */
    initCannon(){
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
    init(){
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

        // light
        this.allLights()

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
        switch( this.gamemode ){
            case 'Single':
                //this.controls = new PointerLockControls( this.camera , this.sphereBody )
                //this.scene.add( this.controls.getObject() )
                break
            case 'Custom':
                this.controls = new OrbitControls( this.camera , this.renderer.domElement )
                this.camera.lookAt(50,50,50)
                //this.controls.target.set(50, 50, 50)
                // this.controls.update()
                // controls.addEventListener('change', () => console.log("Controls Change"))
                // controls.addEventListener('start', () => console.log("Controls Start Event"))
                // controls.addEventListener('end', () => console.log("Controls End Event"))
                // this.controls.autoRotate = false
                // this.controls.autoRotateSpeed = 1
                // controls.enableDamping = true
                // controls.dampingFactor = .01
                // controls.enableKeys = true //older versions
                // controls.listenToKeyEvents(document.body)
                // controls.keys = {
                //     LEFT: "ArrowLeft", //left arrow
                //     UP: "ArrowUp", // up arrow
                //     RIGHT: "ArrowRight", // right arrow
                //     BOTTOM: "ArrowDown" // down arrow
                // }
                // controls.mouseButtons = {
                //     LEFT: THREE.MOUSE.ROTATE,
                //     MIDDLE: THREE.MOUSE.DOLLY,
                //     RIGHT: THREE.MOUSE.PAN
                // }
                // controls.touches = {
                //     ONE: THREE.TOUCH.ROTATE,
                //     TWO: THREE.TOUCH.DOLLY_PAN
                // }
                // controls.screenSpacePanning = true
                // controls.minAzimuthAngle = 0
                // controls.maxAzimuthAngle = Math.PI / 2
                // controls.minPolarAngle = 0
                // controls.maxPolarAngle = Math.PI
                // this.controls.maxDistance = 40
                // this.controls.minDistance = 1
                break
            default:
                break
        }


        this.allMeshes()

        /** Other Events */
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        /** Keyboard Events */
        // window.addEventListener('keydown', this.keydown.bind(this))
        // window.addEventListener('keyup', this.keyup.bind(this))

        /** Mouse Events */
        // window.addEventListener('mousedown', this.mousedown.bind(this))
        // window.addEventListener('mouseup', this.mouseup.bind(this))
        // window.addEventListener( 'mousemove', this.mousemove.bind(this) );
        // window.addEventListener( 'click', this.onclick.bind(this) );

        this.clock = new THREE.Clock()
        this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world)
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }

    switch_settings(){
        switch( this.gamemode ){
            case 'Single':
                //this.controls = new PointerLockControls( this.camera , this.sphereBody )
                //this.scene.add( this.controls.getObject() )
                break
            case 'Custom':
                this.controls = new OrbitControls( this.camera , this.renderer.domElement )
                break
            default:
                break
        }
    }

    /**
     * RENDERER
     */
    BLUupdate(){
        //settings
        if( this.gameshop_info.querySelector('#gamemode').value !== this.gamemode ){
            //this.gamemode = this.gameshop_info.querySelector('#gamemode').value
        }
        //this.switch_settings()

        if( this.events.keydown )
            this.events.keydown(this.keys)
        this.camera.position.y = 1

        this.world.step(1/60)
        //this.controls.update( Date.now() - this.time )
        //this.controls.update()

        this.delta = Math.min(this.clock.getDelta(), 0.1)
        this.world.step(this.delta)

        this.cannonDebugRenderer.update()

        // Copy coordinates from Cannon to Three.js
        this.cube1[0].position.set(
            this.cube1[1].position.x,
            this.cube1[1].position.y,
            this.cube1[1].position.z
        )
        this.cube1[0].quaternion.set(
            this.cube1[1].quaternion.x,
            this.cube1[1].quaternion.y,
            this.cube1[1].quaternion.z,
            this.cube1[1].quaternion.w
        )

        this.cube2[0].position.set(
            this.cube2[1].position.x,
            this.cube2[1].position.y,
            this.cube2[1].position.z
        )
        this.cube2[0].quaternion.set(
            this.cube2[1].quaternion.x,
            this.cube2[1].quaternion.y,
            this.cube2[1].quaternion.z,
            this.cube2[1].quaternion.w
        )

        // Update ball positions
        // for(var i=0; i< this.balls.length; i++){
        //     this.ballMeshes[i].position.copy(this.balls[i].position);
        //     this.ballMeshes[i].quaternion.copy(this.balls[i].quaternion);
        // }

        // if(this.fbxLoaded){
        //     this.fbxMeshs.forEach( (mesh, index) => {
        //         mesh.position.set(
        //             this.fbxBodys[index].position.x,
        //             this.fbxBodys[index].position.y,
        //             this.fbxBodys[index].position.z
        //         )
        //         mesh.quaternion.set(
        //             this.fbxBodys[index].quaternion.x,
        //             this.fbxBodys[index].quaternion.y,
        //             this.fbxBodys[index].quaternion.z,
        //             this.fbxBodys[index].quaternion.w
        //         )
        //     } )
        // }
    }
    raycasterFun(){
        this.raycaster.setFromCamera( this.raymouse, this.camera )
        const intersects = this.raycaster.intersectObjects( this.scene.children )

        // for ( let i = 0; i < intersects.length; i ++ ) {
        //     intersects[ i ].object.material.color.set( 0xff0000 );
        // }
        if(intersects[intersects.length-1]){
            //this.infopage.innerHTML = intersects[intersects.length-1].object.name
        }
    }
    render(){
        this.raycasterFun()
        this.renderer.render(this.scene, this.camera)
        this.time = Date.now()
    }


    /**
     * Events Methods
     */
    call_event(evt, args){
        if( this.events[evt] )
            this.events[evt](args)
    }

    on( event_name, processor ){
        this.events[event_name] = processor
    }

    keydown( keys ){
        this.on('keydown', keys => {
            console.log(keys)
            // if( keys.KeyW ) this.camera.translateZ(-0.3)
            // else if( keys.KeyS ) this.camera.translateZ(0.3)

            // if( keys.KeyA ) this.camera.translateX(-0.3)
            // else if( keys.KeyD ) this.camera.translateX(0.3)

            // if( keys.KeyE ){
            //     this.gameshop_info.classList.toggle('close')
            // }
        })
        this.keys[keys.code] = true
    }
    keyup( event ){
        this.keys[event.code] = false
    }

    mousedown( event ){
        event.preventDefault()
        document.body.requestPointerLock()
        this.on('mousedown', mouse => {
            console.log('mousedown', mouse)
        })
        this.mouse.keys[this.MOUSE_BUTTON[event.button]] = true
        this.events.mousedown(this.mouse)
    }
    mouseup( event ){
        event.preventDefault()
        this.on('mouseup', mouse => {
            window.addEventListener('mousemove', this.mousemove.bind(this))
        })
        this.mouse.keys[this.MOUSE_BUTTON[event.button]] = false
        this.events.mouseup(this.mouse)
    }
    mousemove( event ){
        event.preventDefault()
        this.on('mousemove', mouse => {
            this.camera.rotateY( -mouse.speed.x * 0.0015 )
            this.camera.rotateX( -mouse.speed.y * 0.001 ) 
        })
        this.mouse.position.x = event.screenX
        this.mouse.position.y = event.screenY
        this.mouse.speed.x = event.movementX
        this.mouse.speed.y = event.movementY
        this.events.mousemove(this.mouse)
    }


    /**
     * Shooter
     */
    ballMeshes = []
    boxMeshes = []
    balls=[]
    ballShape = new CANNON.Sphere(0.2)
    ballGeometry = new THREE.SphereGeometry(this.ballShape.radius, 32, 32)
    shootDirection = new THREE.Vector3()
    shootVelo = 15
    getShootDir(targetVec){
        const vector = targetVec
        targetVec.set(0,0,0)
        
        //console.log(vector, this.camera)
        this.raycaster.intersectObjects(vector, this.camera)
        const ray = new THREE.Ray(this.sphereBody.position, vector.sub(this.sphereBody.position).normalize() )
        targetVec.copy(ray.direction)
    }

    onclick( event ){
        if(true){
            let x = this.sphereBody.position.x
            let y = this.sphereBody.position.y
            let z = this.sphereBody.position.z
            const ballBody = new CANNON.Body({ mass: 1 })
            ballBody.addShape(this.ballShape)
            const ballMesh = new THREE.Mesh( this.ballGeometry, new THREE.MeshLambertMaterial({ color: 0xdddddd }) )
            this.world.addBody(ballBody)
            this.scene.add(ballMesh)
            ballMesh.castShadow = true
            ballMesh.receiveShadow = true
            this.balls.push(ballBody)
            this.ballMeshes.push(ballMesh)
            this.getShootDir(this.shootDirection)
            ballBody.velocity.set(  this.shootDirection.x * this.shootVelo,
                                    this.shootDirection.y * this.shootVelo,
                                    this.shootDirection.z * this.shootVelo)
    
            // Move the ball outside the player sphere
            x += this.shootDirection.x * (this.sphereShape.radius*1.02 + this.ballShape.radius);
            y += this.shootDirection.y * (this.sphereShape.radius*1.02 + this.ballShape.radius);
            z += this.shootDirection.z * (this.sphereShape.radius*1.02 + this.ballShape.radius);
            ballBody.position.set(x,y,z);
            ballMesh.position.set(x,y,z);
        }
    }

    /**
     * Scene
     */
    allLights(){
        const ambient = new THREE.AmbientLight( 0x111111 )
        this.scene.add( ambient )

        const Splight = new THREE.SpotLight( 0xffffff )
        Splight.position.set( 10, 30, 20 )
        Splight.target.position.set( 0, 0, 0 )
        Splight.castShadow = true

        Splight.shadow.camera.near = 20
        Splight.shadow.camera.far = 50
        Splight.shadow.camera.fov = 40

        Splight.shadowMapBias = 0.1
        Splight.shadowMapDarkness = 0.7
        Splight.shadow.mapSize.width = 2*512
        Splight.shadow.mapSize.height = 2*512
        this.scene.add( Splight )

        const ALight1 = new THREE.AmbientLight(0x404040, 1)
        this.scene.add(ALight1)

        const PLight2 = new THREE.PointLight(0xFFFFFF, 1)
        PLight2.position.set(0, 100, 80)
        PLight2.castShadow = true
        this.scene.add(PLight2)
    }

    allMeshes(){
        // this.hoodie = this.addObjModel('test.obj', {x: 0, y: -20, z: 50}, [10, 10, 10])
        // this.shop = this.addObjModel('test2.obj', {x: 0, y: -20, z: 50}, [10, 10, 10])
        // this.shop = this.addFbxModel('edges.fbx', {x: 0, y: 0, z: 50}, 10)
        this.cube1 = this.createCube([1,1,1], [10,10,3], 1)
        this.cube2 = this.createCube([1,1,1], [0,10,0], 1)
        //this.addFbxModel('hoodie.fbx', {x: 10, y: 10, z: 0}, 10, [1,1,1])

        //const material = new THREE.MeshLambertMaterial()
        //const texture = new THREE.TextureLoader().load("img/01_Hoodie_model_lambert1_BaseColor.png")
        //this.addFbxModel('hoodie_test.fbx', {x: 5, y: 10, z: 10}, .05, [1,1,1], material, texture)

        // Borders
        this.border1 = this.createCube([70,20,5], [-3.673, 0.994, -4], 0)
    }
    
    /**
     * Object Methods
     */
    addObjModel(path, {x, y, z}, scale){
        let loader = new OBJLoader()
        let obj = null
        loader.load(
        	path,
        	object => {
                obj = object
                obj.scale.set( ...scale )
                obj.position.x = x
                obj.position.y = y
                obj.position.z = z
        		this.scene.add( obj )
        	}
        );
    }

    fbxLoaded = false
    fbxMeshs = []
    fbxBodys = []
    addFbxModel(file, {x, y, z}, scaleScalar, scale, material = false, texture = false){
        let loader = new FBXLoader()
        //loader.setPath('../assets/model/')
        loader.load(file, fbx => {
            const fbxMesh = fbx
            let fbxMaterial
            if( material ){
                fbxMaterial = material
            }else{
                fbxMaterial = new THREE.MeshLambertMaterial()
            }
            if( texture ){
                material.map = texture
                fbxMesh.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = fbxMaterial
                    }
                })
            }            
            fbxMesh.receiveShadow = true
            fbxMesh.castShadow = true
            fbxMesh.scale.setScalar(scaleScalar)
            fbxMesh.position.x = x
            fbxMesh.position.y = y
            fbxMesh.position.z = z
            this.scene.add( fbxMesh )
            // CANNON
            fbxMesh.position.x = 0
            fbxMesh.position.y = 0
            const fbxShape = new CANNON.Box(new CANNON.Vec3(...scale))
            // const fbxShape = CannonUtils.CreateTrimesh(
            //     fbxMesh.children[0].geometry
            // )
            const fbxBody = new CANNON.Body({ mass: 1 })
            fbxBody.addShape(fbxShape)
            fbxBody.position.x = fbxMesh.position.x
            fbxBody.position.y = fbxMesh.position.y
            fbxBody.position.z = fbxMesh.position.z
            this.world.addBody(fbxBody)
            this.fbxLoaded = true

            this.fbxMeshs.push(fbxMesh)
            this.fbxBodys.push(fbxBody)
        })
    }

    createCube( scale, position, mass ){
        const geometry = new THREE.BoxGeometry( ...scale );
        const material = new THREE.MeshBasicMaterial( {color: 0xe5e5e5, } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = position[0]
        cube.position.y = position[1]
        cube.position.z = position[2]
        cube.castShadow = true
        this.scene.add( cube );
        // CANNON
        const cubeShape  = new CANNON.Box(new CANNON.Vec3( scale[0]/2, scale[1]/2, scale[2]/2 ))
        const cubeBody  = new CANNON.Body({mass: mass})
        cubeBody.addShape(cubeShape)
        cubeBody.position.x = cube.position.x
        cubeBody.position.y = cube.position.y
        cubeBody.position.z = cube.position.z
        this.world.addBody(cubeBody)
        return [cube, cubeBody]
    }
}


var PointerLockControls = function( camera, cannonBody ) {

    var eyeYPos = 2; // eyes are 2 meters above the ground
    var velocityFactor = 0.2;
    var jumpVelocity = 20;
    var scope = true;

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 2;
    yawObject.add( pitchObject );

    var quat = new THREE.Quaternion();

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var canJump = false;

    var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new CANNON.Vec3(0,1,0);
    cannonBody.addEventListener("collide",function(e){
        var contact = e.contact;

        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if(contact.bi.id == cannonBody.id)  // bi is the player body, flip the contact normal
            contact.ni.negate(contactNormal);
        else
            contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });

    var velocity = cannonBody.velocity;

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

        if ( scope.enabled === false ) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
    };

    var onKeyDown = function ( event ) {
        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ){
                    velocity.y = jumpVelocity;
                }
                canJump = false;
                break;
        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    this.enabled = false;

    this.getObject = function () {
        return yawObject;
    };

    this.getDirection = function(targetVec){
        targetVec.set(0,0,-1);
        quat.multiplyVector3(targetVec);
    }

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new THREE.Vector3();
    var euler = new THREE.Euler();
    this.update = function ( delta ) {

        if ( scope.enabled === false ) return;

        delta *= 0.1;

        inputVelocity.set(0,0,0);

        if ( moveForward ){
            inputVelocity.z = -velocityFactor * delta;
        }
        if ( moveBackward ){
            inputVelocity.z = velocityFactor * delta;
        }

        if ( moveLeft ){
            inputVelocity.x = -velocityFactor * delta;
        }
        if ( moveRight ){
            inputVelocity.x = velocityFactor * delta;
        }

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x;
        euler.y = yawObject.rotation.y;
        euler.order = "XYZ";
        quat.setFromEuler(euler);
        inputVelocity.applyQuaternion(quat);
        //quat.multiplyVector3(inputVelocity);

        // Add to the object
        velocity.x += inputVelocity.x;
        velocity.z += inputVelocity.z;

        yawObject.position.copy(cannonBody.position);
    };
};