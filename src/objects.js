import * as THREE from 'three'
import CANNON from 'cannon'
import { environmentMapTexture } from './textures.js'
import { world, defaultMaterial } from './physics.js'
import { playHitSound } from './sounds.js'

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */

const floorSize = 10;
export const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(floorSize, floorSize),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5

const targerSize = floorSize * 0.25
export const target = new THREE.Mesh(
    new THREE.PlaneGeometry(targerSize, targerSize),
    new THREE.MeshStandardMaterial({
        color: '#FF0000',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)   
target.receiveShadow = true
target.rotation.x = - Math.PI * 0.5
target.position.set(targerSize, 0.01 , 0)

/**
 * Utils
 */
export const objectsToUpdate = [];

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

export const createSphere = (radius, position) => {
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.scale.set(radius, radius, radius);
    mesh.castShadow = true;
    mesh.position.copy(position);
    
    // Note: scene.add(mesh) will be called from main script
    const scene = window.__threeScene;
    scene.add(mesh);

    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position);
    body.addEventListener('collide', playHitSound);
    world.addBody(body);

    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})
export const createBoxes = (width, height, depth, position) => {
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.scale.set(width, height, depth);
    mesh.castShadow = true;
    mesh.position.copy(position);
    
    // Note: scene.add(mesh) will be called from main script
    const scene = window.__threeScene;
    scene.add(mesh);

    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5,height* 0.5,depth * 0.5))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position);
    body.addEventListener('collide', playHitSound);
    world.addBody(body);

    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

// createSphere(0.5, {x:0,y:3,z: 0});
// createSphere(0.5, {x:0.25,y:4,z: 0});
// createSphere(0.5, {x:3,y:3,z: 0});
