import * as THREE from 'three';
import { AmbientLight } from './LightsClass/AmbientLight';
import { PointLight } from './LightsClass/PointLight';
import { SpotLight } from './LightsClass/SpotLight';
import { Cube } from "./MeshesClass/Cube";
import { FBX } from "./MeshesClass/FBX";

export const MeshByScene = [
    new Cube({
        name: 'Border',
        scale: [70,20,5],
        position:  [-34.3035, 10.4242, -29.18],
        material: new THREE.MeshLambertMaterial({
            color: 0x388a89
        }),
        mass: 1,
        picked: true
    }),
    new FBX({
        name: 'Hoodie_Space',
        file: './models/01_Substace_Painter_Space.fbx',
        position: {x: 5, y: 10, z: 10},
        scaleScalar: .05,
        scale: [1,1,1],
        material: new THREE.MeshLambertMaterial(),
        texture: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_BaseColor.png"),
        picked: true,
        mass: 1
    }),
    new FBX({
        name: 'Hoodie_Samurai',
        file: './models/01_Hoodie-Samurai.fbx',
        position: {x: 25, y: 10, z: 10},
        scaleScalar: .05,
        scale: [1,1,1],
        material: new THREE.MeshLambertMaterial(),
        texture: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_BaseColor.png"),
        picked: true,
        mass: 1
    }),
    new FBX({
        name: 'Hoodie_Black&White',
        file: './models/01_Hoodie_Black&White.fbx',
        position: {x: -10, y: 10, z: 10},
        scaleScalar: .05,
        scale: [1,1,1],
        material: new THREE.MeshLambertMaterial(),
        texture: new THREE.TextureLoader().load("./models/01_Hoodie_Black&White__Low_Hoodie_Black&White_BaseColor.png"),
        picked: true,
        mass: 1
    }),
    new FBX({
        name: 'Clock',
        file: './models/Clock.fbx',
        boundingShape: './models/Clock_Bounding.fbx',
        position: {x: -25, y: 10, z: 10},
        scaleScalar: .05,
        scale: [1,1,1],
        material: new THREE.MeshLambertMaterial({
            color: 0xffffff
        }),
        texture: false,
        picked: true,
        mass: 0
    }),
]


export const LightsByScene = [
    // new AmbientLight({
    //     name: 'ambient_01',
    //     color: '0x111111',
    //     intensity: 0.2
    // }),
    new SpotLight({
        name: 'spotlight_01',
        color: '0xffffff'
    }),
    // new AmbientLight({
    //     name: 'ambient_02',
    //     color: '0x404040',
    //     intensity: 0.5
    // }),
    new PointLight({
        name: 'pointlight_01',
        color: '0xFFFFFF',
        intensity: 0.5
    })
]