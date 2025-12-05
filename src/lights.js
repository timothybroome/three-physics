import * as THREE from 'three'

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0x0000ff, 0.0)
// scene.add(ambientLight)

export const directionalLight = new THREE.DirectionalLight(0xffff00, 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 0)

export const directionalLight_1 = new THREE.DirectionalLight(0x0000ff, 1)
directionalLight_1.castShadow = true
directionalLight_1.shadow.mapSize.set(1024, 1024)
directionalLight_1.shadow.camera.far = 15
directionalLight_1.shadow.camera.left = - 7
directionalLight_1.shadow.camera.top = 7
directionalLight_1.shadow.camera.right = 7
directionalLight_1.shadow.camera.bottom = - 7
directionalLight_1.position.set(-5, 5, 0)
