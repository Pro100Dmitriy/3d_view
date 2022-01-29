import * as THREE from 'three'
import { AmbientLight } from './LightsClass/AmbientLight'
import { PointLight } from './LightsClass/PointLight'
import { SpotLight } from './LightsClass/SpotLight'
import { Cube } from "./MeshesClass/Cube"
import { FBX } from "./MeshesClass/FBX"


export const MeshByScene = [
    // BORDERS
    new Cube({
        name: 'Border_01',
        position: {x: 46.6055, y: 1.168, z: 5.99067},
        rotation: {x: 0, y: -0.4264, z: 0},
        scale: {x: 3.213, y: 3.213, z: 3.213},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_02',
        position:  {x: 47.6267, y: 3.1557, z: -1.1418},
        rotation: {x: 0, y: 0.01321, z: 0},
        scale: {x: 6.73191, y: 6.73191, z: 6.73191},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_03',
        position:  {x: 41.2585, y: 5.0996, z: -10.1960},
        rotation: {x: 0, y: 0.4931, z: 0},
        scale: {x: 11.6845, y: 10.3307065281, z: 12.131417277},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_04',
        position:  {x: 25.6270, y: 8.8406, z: -34.1583},
        rotation: {x: 0, y: -1.2297, z: 0},
        scale: {x: 16.9197, y: 17.99167545, z: 16.502083},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_05',
        position:  {x: 30.588772, y: 7.019642, z: -23.17796},
        rotation: {x: 0, y: -0.2627, z: 0},
        scale: {x: 14.8671309465, y: 14.8671309465, z: 14.8671309465},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    // new FBX({
    //     name: 'Sale_Cube',
    //     file: './models/Sale_Cube.fbx',
    //     boundingShape: './models/Sale_Cube.fbx',
    //     position: {x: -13.192049288245203, y: 11.200921267992209, z: -28.395558263602183},
    //     rotation: {x: -3.1415, y: 1.2890857097316215, z: -3.1415},
    //     scale: {x: 1.398, y: 1.398, z: 1.398},
    //     size: .05,
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: {
    //         baseColorMap: new THREE.TextureLoader().load("./models/Sale_Cube_Sale_Cube_BaseColor.png"),
    //         roughnessMap: new THREE.TextureLoader().load("./models/Sale_Cube_Sale_Cube_Roughness.png"),
    //         metalnessMap: new THREE.TextureLoader().load("./models/Sale_Cube_Sale_Cube_Metallic.png"),
    //         normalMap: new THREE.TextureLoader().load("./models/Sale_Cube_Sale_Cube_Normal.png"),
    //     },
    //     mass: 0,
    //     picked: true,
    //     productID: false,
    //     isHover: true
    // }),
    new Cube({
        name: 'Border_07',
        position:  {x: -40.170279, y: 13.1658649, z: -13.940256},
        rotation: {x: 0, y: -0.5150648, z: 0},
        scale: {x: 26.5503761712, y: 26.5503761712, z: 26.5503761712},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_08',
        position:  {x: 8.55730, y: 9.91863, z: -28.994266},
        rotation: {x: 0, y: -0.4953597, z: 0},
        scale: {x: 13.9878208827, y: 20.87686534843, z: 14.51730141090},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_09',
        position: {x: -88.528, y: 44.5765, z: -9.8459},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_10',
        position:  {x: -102.979, y: 35.563, z: 17.084},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_11',
        position:  {x: -91.0507, y: 38.43079, z: 43.400389},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_12',
        position: {x: -74.81138, y: 29.775, z: 71.0578},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_13',
        position:  {x: -44.55748, y: 44.5765, z: -57.30137},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_14',
        position:  {x: -21.0469, y: 35.563, z: 114.5888},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_15',
        position: {x: -49.5111, y: 36.26333, z: 98.547},
        rotation:{x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_16',
        position:  {x: -72.50137, y: 28.76451, z: -35.48749},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_17',
        position: {x: 12.186346532423016, y: 39.21192127596233, z: -64.63400846276564},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_18',
        position:  {x: -16.26374870255499, y: 35.563, z: -74.17485627821264},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_19',
        position: {x: 79.10128712184716, y: 32.51801384855316, z: 29.493969200763942},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_20',
        position:  {x: 69.88002899758169, y: 26.977966627242125, z: 56.80196470574796},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_21',
        position: {x: 6.968057928682384, y: 34.75905902657123, z: 102.46130958631201},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_23',
        position: {x: 53.22856067483545, y: 44.5765, z: 82.91642709353724},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_24',
        position: {x: 89.6135489764664, y: 29.49240085772948, z: 3.7042687010781385},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_25',
        position: {x: 79.6254932542966, y: 35.93738768406464, z: -21.749565762961808},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_26',
        position: {x: 70.80583745124605, y: 26.977966627242125, z: -43.55627206543806},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_27',
        position: {x: 55.424967896586836, y: 44.5765, z: -61.4951011086513},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 29, y: 90.13, z: 29.2},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_28',
        position: {x: 33.660033585856, y: 27.21606418106677, z: 108.48335372042433},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    new Cube({
        name: 'Border_30',
        position: {x: 30.410142067613137, y: 26.977966627242125, z: -73.66719454120397},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 28.37, y: 71.38, z: 25.695},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    // BORDERS
    // FBX
    // new FBX({
    //     name: 'Hoodie_Space',
    //     file: '../../models/01_Substace_Painter_Space.fbx',
    //     position: {x: 5, y: 5.8534, z: 9.660},
    //     rotation: {x: 0, y: 0, z: 0},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .05,
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: {
    //         baseColorMap: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_BaseColor.png"),
    //         roughnessMap: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_Roughness.png"),
    //         metalnessMap: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_Metallic.png"),
    //         normalMap: new THREE.TextureLoader().load("./models/02_Hoodie_Low_model_Hoodie_standart_Normal.png"),
    //     },
    //     mass: 0,
    //     picked: false,
    //     productID: 1,
    //     isHover: true
    // }),
    new Cube({
        name: 'Hoodie_Space_Table',
        position:  {x: 4.939, y: -0.564, z: 7.5678},
        rotation: {x: 0, y: -0.681, z: 0},
        scale: {x: 7.485, y: 8.109, z: 7.682},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    // new FBX({
    //     name: 'Hoodie_Samurai',
    //     file: './models/01_Hoodie-Samurai.fbx',
    //     boundingShape: false,
    //     position: {x: 22.47639, y: 5.9922, z: 9.9419},
    //     rotation: {x: 0, y: -0.45619, z: 0},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .05,
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: {
    //         baseColorMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_BaseColor.png"),
    //         roughnessMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Roughness.png"),
    //         metalnessMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Metallic.png"),
    //         normalMap: new THREE.TextureLoader().load("./models/01_Hoodie-Samurai__Low_Hoodie-Samurai_Normal.png"),
    //     },
    //     mass: 1,
    //     picked: false,
    //     productID: 2,
    //     isHover: true
    // }),
    new Cube({
        name: 'Hoodie_Samurai_Table',
        position: {x: 22.550, y: -0.564, z: 9.3305},
        rotation: {x: 0, y: -1.2138, z: 0},
        scale: {x: 7.485, y: 8.109, z: 7.682},
        material: new THREE.MeshStandardMaterial(),
        mass: 0,
        picked: false
    }),
    // new FBX({
    //     name: 'Hoodie_Black&White',
    //     file: './models/01_Hoodie_Black&White.fbx',
    //     boundingShape: false,
    //     position: {x: -13.2279, y: 5.9223, z: 7.8961},
    //     rotation: {x: 0, y: 0.6867, z: 0},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .05,
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: {
    //         baseColorMap: new THREE.TextureLoader().load("./models/01_Hoodie_Black&White__Low_Hoodie_Black&White_BaseColor.png"),
    //         roughnessMap: new THREE.TextureLoader().load("./models/01_Hoodie_Black&White__Low_Hoodie_Black&White_Roughness.png"),
    //         metalnessMap: new THREE.TextureLoader().load("./models/01_Hoodie_Black&White__Low_Hoodie_Black&White_Metallic.png"),
    //         normalMap: new THREE.TextureLoader().load("./models/01_Hoodie_Black&White__Low_Hoodie_Black&White_Normal.png"),
    //     },
    //     mass: 0,
    //     picked: false,
    //     productID: 3,
    //     isHover: true
    // }),
    new Cube({
        name: 'Hoodie_Black&White_Table',
        position: {x: -14.026, y: -0.564, z: 6.415},
        rotation: {x: 0, y: 0.286, z: 0},
        scale: {x: 7.485, y: 8.109, z: 7.682},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 0,
        picked: false
    }),
    // FBX
    // SMALL CUBE
    new Cube({
        name: 'Cube_01',
        position: {x: -17.21, y: 4.9969, z: 5.313},
        rotation: {x: 0, y: 1.0028, z: 0},
        scale: {x: 3.213, y: 3.213, z: 3.213},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 1,
        picked: false
    }),
    new Cube({
        name: 'Cube_02',
        position: {x: 0.795858, y: 1.168, z: 13.1576},
        rotation: {x: 0, y: -0.2627, z: 0},
        scale: {x: 3.213, y: 3.213, z: 3.213},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 1,
        picked: false
    }),
    new Cube({
        name: 'Cube_03',
        position: {x: 3.5238, y: 5.0261, z: 5.08965},
        rotation: {x: 0, y: 0.286, z: 0},
        scale: {x: 3.213, y: 3.213, z: 3.213},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 1,
        picked: false
    }),
    new Cube({
        name: 'Cube_04',
        position: {x: 2.51957, y: 7.14314, z: 4.51556},
        rotation: {x: 0, y: -0.5651, z: 0},
        scale: {x: 1, y: 1, z: 1},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 1,
        picked: false
    }),
    new Cube({
        name: 'Cube_05',
        position: {x: 4.47784, y: 7.15811, z: 4.870},
        rotation: {x: 0, y: 1.5031, z: 0},
        scale: {x: 1, y: 1, z: 1},
        material: new THREE.MeshPhysicalMaterial(),
        mass: 1,
        picked: false
    }),
    // SMALL CUBE
    // new FBX({
    //     name: 'Clock',
    //     file: './models/Clock.fbx',
    //     boundingShape: './models/Clock_Bounding.fbx',
    //     position: {x: 35.2882, y: 39.7019578, z: 15.1447545},
    //     rotation: {x: 2.0096268, y: 0.57480235, z: 0.938330880},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .1745, //.05
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: false,
    //     mass: 0,
    //     picked: false,
    //     isHover: true
    // }),
    // new FBX({
    //     name: 'Sandglass',
    //     file: './models/Sandglass.fbx',
    //     boundingShape: './models/Sandglass_Bounding.fbx',
    //     position: {x: -27.46261, y: 42.9158, z: 52.02382},
    //     rotation: {x: -0.6851, y: -0.01336, z: -0.40890},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .11, //.05
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: false,
    //     mass: 0,
    //     picked: false,
    //     isHover: false
    // }),
    // new FBX({
    //     name: 'iPhone',
    //     file: './models/iPhone__Low.fbx',
    //     boundingShape: false,
    //     position: {x: -26.95556, y: 39.062979, z: 17.844459},
    //     rotation: {x: 1.275338, y: 0.638142588, z: -1.1864217},
    //     scale: {x: 1, y: 1, z: 1},
    //     size: .33, //.05
    //     material: new THREE.MeshStandardMaterial(),
    //     textures: {
    //         baseColorMap: new THREE.TextureLoader().load("./models/iPhone__Low_lambert1_BaseColor.png")
    //     },
    //     mass: 0,
    //     picked: false,
    //     isHover: false
    // }),
]


export const LightsByScene = [
    new AmbientLight({
        name: 'ambient_01',
        color: 0xffffff,
        intensity: 0.2
    }),
    new SpotLight({
        name: 'Hoodie_Space_Light',
        intensity: 1,
        decay: 4,
        angle: 0.55,
        penumbra: 1,
        color: 0xffffff,
        position: {x: 5, y: 15.8534, z: 9.660},
        target: {x: 5, y: 5.8534, z: 9.660},
        picked: false
    }),
    new SpotLight({
        name: 'Hoodie_Samurai_Light',
        intensity: 1,
        decay: 4,
        angle: 0.55,
        penumbra: 1,
        color: 0xffffff,
        position: {x: 22.47639, y: 15.9922, z: 9.9419},
        target: {x: 22.47639, y: 5.9922, z: 9.9419},
        picked: false
    }),
    new SpotLight({
        name: 'Hoodie_Black&White_Light',
        intensity: 1,
        decay: 4,
        angle: 0.55,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -13.2279, y: 15.9223, z: 7.8961},
        target: {x: -13.2279, y: 5.9223, z: 7.8961},
        picked: false
    }),
    new SpotLight({
        name: 'Clock_Light',
        intensity: 1,
        distance: 2000,
        decay: 4,
        angle: 0.35,
        penumbra: 0.5,
        color: 0xffffff,
        position: {x: 24.4889, y: 1, z: 37.943437},
        target: {x: 35.2882, y: 39.7019578, z: 15.1447545},
        picked: false
    }),
    new SpotLight({
        name: 'Sale-Cube_Light',
        intensity: 0.8,
        distance: 500,
        decay: 4,
        angle: 0.8,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -8.13830219, y: 1, z: -8.1357589},
        target: {x: -12.35762, y: 20.79132, z: -29.75655},
        picked: false
    }),
    new SpotLight({
        name: 'Cube_7_Light',
        intensity: 0.6,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -13.9014716, y: 1, z: -3.2703958},
        target: {x: -40.170279, y: 23, z: -13.940256},
        picked: false
    }),
    new SpotLight({
        name: 'Sun_Light',
        intensity: 0.15,
        distance: 1000,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: 2.3784256030285746, y: 79.68738123634537, z: 16.500743751944018},
        picked: false
    }),
    // BORDER LIGHTS
    new SpotLight({
        name: 'Light_Border_18',
        intensity: 0.3,
        distance: 2000,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -17.244869651446255, y: 1, z: -52.572690116401276},
        target: {x: -16.26374870255499, y: 55.563, z: -74.17485627821264},
        picked: true
    }),
    new SpotLight({
        name: 'Light_Border_25',
        intensity: 0.25,
        distance: 2000,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: 55.4291459245843, y: 1, z: -11.14109422089939},
        target: {x: 79.6254932542966, y: 55.93738768406464, z: -21.749565762961808},
        picked: true
    }),
    new SpotLight({
        name: 'Light_Border_23',
        intensity: 0.25,
        distance: 2000,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: 29.238097242334362, y: 1, z: 63.317353908559824},
        target: {x: 53.22856067483545, y: 74.5765, z: 82.91642709353724},
        picked: true
    }),
    new SpotLight({
        name: 'Light_Border_15',
        intensity: 0.25,
        distance: 1500,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -27.760709965279823, y: 1, z: 73.02178596714766},
        target: {x: -49.5111, y: 66.26333, z: 98.547},
        picked: true
    }),
    new SpotLight({
        name: 'Light_Border_09',
        intensity: 0.25,
        distance: 2000,
        decay: 4,
        angle: 1,
        penumbra: 1,
        color: 0xffffff,
        position: {x: -62.715378503877005, y: 1, z: -1.2094923778869173},
        target: {x: -88.528, y: 64.5765, z: -9.8459},
        picked: true
    }),
    // new AmbientLight({
    //     name: 'ambient_02',
    //     color: '0x404040',
    //     intensity: 0.5
    // }),
    // new PointLight({
    //     name: 'pointlight_01',
    //     color: '0xFFFFFF',
    //     intensity: 0.5
    // })
]



// 18, 25, 23, 15, 9