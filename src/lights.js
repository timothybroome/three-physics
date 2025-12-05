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

const fadePeriod = 2000;
const fadeOutDuration = 1000;
const fadeInDuration = fadePeriod - fadeOutDuration;
const colors = [
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 },
]

let fadeOutStartTime = null;
let fadeInStartTime = null;
let currentColor = colors[0];

export const updateLights = () => {
    const currentTime = performance.now();
    const fadeOutTime = fadeOutStartTime ? currentTime - fadeOutStartTime : null;
    const fadeInTime = fadeInStartTime ? currentTime - fadeInStartTime : null;
    
    if (fadeOutTime && fadeOutTime < fadeOutDuration) {
        const progress = fadeOutTime / fadeOutDuration;
     
        const r = currentColor.r * (1 - progress);
        const g = currentColor.g * (1 - progress);
        const b = currentColor.b * (1 - progress);
        directionalLight.color.setRGB(r / 255, g / 255, b / 255);
    } else if (fadeInTime && fadeInTime < fadeInDuration) {
        const progress = fadeInTime / fadeInDuration;
    
        const r = currentColor.r * progress;
        const g = currentColor.g * progress;
        const b = currentColor.b * progress;
        directionalLight.color.setRGB(r / 255, g / 255, b / 255);
    } else {
        fadeOutStartTime = null;
        fadeInStartTime = null;
    }

    if (fadeOutTime && fadeOutTime >= fadeOutDuration) {
        fadeOutStartTime = null;
        fadeInStartTime = currentTime;
        currentColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    } else if (fadeInTime && fadeInTime >= fadeInDuration) {
        fadeInStartTime = null;
        fadeOutStartTime = currentTime;
    }

    if (!fadeOutStartTime && !fadeInStartTime) {
        fadeOutStartTime = currentTime;
    }
    
}