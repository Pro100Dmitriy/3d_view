import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { PageBuilder } from '../../Pages/PageBuilder'

export class Gamemode{
    constructor( {scene, renderer, camera, world, container, products} ){
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.container = container
        this.products = products ?? false
        this.world = world

        this.pageBuilder = new PageBuilder({root: document.querySelector('app-root')})

        this.addSphere()
        this.create()
    }
    
    create(){
        this.container.addEventListener('click', event => document.body.requestPointerLock() )
        document.addEventListener( 'keydown', event => {
            if( event.key == 'e' ){
                if( this.selectedProdID ){
                    this.pageBuilder.open( this.selectedProdID )
                }
            }
        } )

        this.camera.position.x = this.sphereBody.position.x
        this.camera.position.y = this.sphereBody.position.y
        this.camera.position.z = this.sphereBody.position.z

        this.raycaster()
        const controls = new PointerLockControls( this.camera , this.sphereBody )
        this.scene.add( controls.getObject() )

        this.controls = controls
        return this
    }

    addSphere(){
        // Create a sphere
        //const mass = 3, radius = 5
        const mass = 2, radius = 4
        this.sphereShape = new CANNON.Sphere(radius)
        this.sphereBody = new CANNON.Body({ mass: mass })
        this.sphereBody.addShape(this.sphereShape)
        this.sphereBody.position.set(0,15,0)
        this.sphereBody.linearDamping = .5
        this.world.addBody(this.sphereBody)
    }

    raycaster(){
        if( !this.products ) return

        const raycaster = new THREE.Raycaster()
        raycaster.far = 50

        let intersects
        let intersectedObject = []

        document.addEventListener( 'mousemove', onDocumentMousemove.bind(this), false )
        function onDocumentMousemove( event ){
            raycaster.setFromCamera(
                {
                    x: ( (window.innerWidth / 2) / this.renderer.domElement.clientWidth) * 2 - 1,
                    y: -( (window.innerHeight / 2) / this.renderer.domElement.clientHeight) * 2 + 1
                },
                this.camera
            )

            intersects = raycaster.intersectObjects(this.products, false)

            if (intersects.length > 0) {
                intersectedObject = intersects[0].object
            } else {
                intersectedObject = null
            }

            this.products.forEach( selectedProd => {
                if (intersectedObject && intersectedObject.name === selectedProd.name) {
                    this.selectedProdID = selectedProd.productID
                    //this.preview.open( selectedProd.name, selectedProd.productID )
                    if( this.selectedProdID ){
                        this.pageBuilder.preview( this.selectedProdID )
                    }
                } else {}
            })
        }
    }

    get getControls(){
        return this.controls
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
    this.utils = function (){
        camera.position.y = 1
    }
};