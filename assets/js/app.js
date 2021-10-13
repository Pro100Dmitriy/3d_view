import '../sass/style.sass'

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50000)
camera.position.z = 100

const renderer = new THREE.WebGL1Renderer({alpha: true, antialias: true})
renderer.setClearColor(0xFFFFFF, 0)
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.domElement.setAttribute("id", 'object')
document.body.appendChild( renderer.domElement )

const aLight = new THREE.AmbientLight(0x404040, 1)
scene.add(aLight)

const pLight = new THREE.PointLight(0xFFFFFF, 1)
pLight.position.set(0, 100, 80)
scene.add(pLight)

const helper = new THREE.PointLightHelper(aLight)
scene.add(helper)

let loader = new OBJLoader()
let obj = null
loader.load( 
	'test.obj',
	object => {
        obj = object
        obj.scale.set(10, 10, 10 )
        obj.position.x = 0
        obj.position.y = -20
        obj.position.z = 50
		scene.add( obj )
        renderer.render(scene, camera)
	}
);

const geometry = new THREE.TorusGeometry( 10,3,16,100 )
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } )
const torus = new THREE.Mesh( geometry, material )
torus.position.z = 50
//scene.add(torus)

renderer.render(scene, camera)


function animation(){
    requestAnimationFrame( animation )

    obj.rotation.x += 0
    obj.rotation.y += 0.005
    obj.rotation.z += 0

    renderer.render(scene, camera)
}

animation()
