import * as THREE from 'three'
import './sounds.js'
import './textures.js'
import './physics.js'
import { floor } from './objects.js'
import { directionalLight, directionalLight_1, updateLights } from './lights.js'
import { camera, createControls, setupResizeHandler } from './camera.js'
import { createRenderer } from './renderer.js'
import { startAnimation } from './animation.js'
import { setupDebug } from './debug.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Make scene globally accessible for object creation
window.__threeScene = scene

/**
 * Floor
 */
scene.add(floor)

/**
 * Lights
 */
scene.add(directionalLight)
scene.add(directionalLight_1)

/**
 * Camera
 */
scene.add(camera)

// Controls
const controls = createControls(canvas)

/**
 * Renderer
 */
const renderer = createRenderer(canvas)

/**
 * Resize handler
 */
setupResizeHandler(camera, renderer)

/**
 * Debug
 */
setupDebug(scene)

/**
 * Animate
 */
startAnimation(scene, camera, renderer, controls, updateLights)