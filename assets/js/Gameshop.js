import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

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
        'keydown': null
    }

    constructor(obj){
        this.container = obj.container
        this.init()
    }

    init(){
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 50000)
        this.camera.position.z = 100
        
        this.renderer = new THREE.WebGL1Renderer({alpha: true, antialias: true})
        this.renderer.setClearColor(0xFFFFFF, 0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.domElement.setAttribute("id", 'object')
        this.container.appendChild( this.renderer.domElement )

        const aLight = new THREE.AmbientLight(0x404040, 1)
        this.scene.add(aLight)

        const pLight = new THREE.PointLight(0xFFFFFF, 1)
        pLight.position.set(0, 100, 80)
        this.scene.add(pLight)

        this.hoodie = this.addObjModel('test.obj', {x: 0, y: -20, z: 50}, [10, 10, 10])

        window.addEventListener('keydown', this.keydown.bind(this))
        window.addEventListener('keyup', this.keyup.bind(this))

        window.addEventListener('mousedown', this.mousedown.bind(this))
        window.addEventListener('mouseup', this.mouseup.bind(this))
        window.addEventListener('mousemove', this.mousemove.bind(this))

        const animation = this.animation = () => {
            if( this.events.keydown )
                this.events.keydown(this.keys)
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame( this.animation )
        }

        animation()
    }

    keydown( keys ){
        this.on('keydown', keys => {
            if( keys.KeyW ) this.camera.position.z -= 0.3
            else if( keys.KeyS ) this.camera.position.z += 0.3

            if( keys.KeyA ) this.camera.position.x -= 0.3
            else if( keys.KeyD ) this.camera.position.x += 0.3
        })
        this.keys[keys.code] = true
    }
    keyup( event ){
        this.keys[event.code] = false
    }

    mousedown( event ){
        this.on('mousedown', mouse => {})
        this.mouse.keys[this.MOUSE_BUTTON[event.button]] = true
    }
    mouseup( event ){
        this.mouse.keys[this.MOUSE_BUTTON[event.button]] = true
    }
    mousemove( event ){
        this.on('mousemove', mouse => {
            console.log(mouse)
            this.camera.rotation.y -= mouse.speed.x * 0.05
        })
        this.mouse.position.x = event.screenX
        this.mouse.position.y = event.screenY
        this.mouse.speed.x = event.movementX
        this.mouse.speed.y = event.movementY
    }

    on( event_name, processor ){
        this.events[event_name] = processor
    }

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
                this.renderer.render(this.scene, this.camera)
                return object
        	}
        );
    }
}

















// const geometry = new THREE.TorusGeometry( 10,3,16,100 )
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } )
// const torus = new THREE.Mesh( geometry, material )
// torus.position.z = 50
// //scene.add(torus)

// /** Create Plane */
// const plane_geometry = new THREE.PlaneGeometry( 100, 100 );
// const plane_material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( plane_geometry, plane_material );
// plane.rotation.x = 90
// scene.add( plane );

// renderer.render(scene, camera)

// window.addEventListener('keydown', event => {
//     if( event.key == 'w' ) run()
//     else if( event.key == 's' ) back()

//     if( event.key == 'a' ) left()
//     else if( event.key == 'd' ) right()
//     animation()
// })

// function run(){
//     camera.position.z -= 1
// }

// function back(){
//     camera.position.z += 1
// }

// function left(){
//     camera.position.x -= 1
// }

// function right(){
//     camera.position.x += 1
// }