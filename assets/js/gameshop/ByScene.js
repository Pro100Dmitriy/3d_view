import * as THREE from 'three';
import { AmbientLight } from './LightsClass/AmbientLight';
import { PointLight } from './LightsClass/PointLight';
import { SpotLight } from './LightsClass/SpotLight';
import { Cube } from "./MeshesClass/Cube";
import { FBX } from "./MeshesClass/FBX";

export const MeshByScene = [
    new Cube({
        name: 'Cube 1',
        scale: [1,1,1],
        position:  [10,10,3],
        mass: 1,
        picked: true
    }),
    new Cube({
        name: 'Cube 2',
        scale: [1,1,1],
        position:  [0,10,0],
        mass: 1,
        picked: true
    }),
    new Cube({
        name: 'Cube 3',
        scale: [1,1,1],
        position:  [0,10,20],
        mass: 1,
        picked: true
    }),
    new Cube({
        name: 'Cube 4',
        scale: [1,1,1],
        position:  [50,10,20],
        mass: 1,
        picked: true
    }),
    new Cube({
        name: 'Border',
        scale: [70,20,5],
        position:  [-3.673, 0.994, -4],
        mass: 0,
        picked: false
    }),
    new FBX({
        name: 'Hoodie',
        file: './models/01_Substace_Painter_Space.fbx',
        position: {x: 5, y: 10, z: 10},
        scaleScalar: .05,
        scale: [1,1,1],
        material: new THREE.MeshLambertMaterial(),
        texture: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_BaseColor.png"),
        picked: true
    })
]


export const LightsByScene = [
    new AmbientLight({
        name: 'ambient_01',
        color: '0x111111',
        intensity: 0.5
    }),
    new SpotLight({
        name: 'spotlight_01',
        color: '0xffffff'
    }),
    new AmbientLight({
        name: 'ambient_02',
        color: '0x404040',
        intensity: 0.5
    }),
    new PointLight({
        name: 'pointlight_01',
        color: '0xFFFFFF',
        intensity: 0.5
    })
]