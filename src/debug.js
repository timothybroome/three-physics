import GUI from 'lil-gui'
import { createSphere, createBoxes, objectsToUpdate } from './objects.js'
import { world } from './physics.js'
import { playHitSound } from './sounds.js'

/**
 * Debug
 */
export const setupDebug = (scene) => {
    const gui = new GUI()
    const debugObject = {}

    debugObject.createSphere = ()  => {
        createSphere(
            Math.random() * 0.5, {
                x: (Math.random() - 0.5) * 3, 
                y: 3, 
                z: (Math.random() - 0.5) * 3
            })   
    }
    debugObject.createBoxes = ()  => {
        createBoxes(
            Math.random(), 
            Math.random(),
            Math.random(),
            {
                x: (Math.random() - 0.5) * 3, 
                y: 3, 
                z: (Math.random() - 0.5) * 3
            })   
    }

    debugObject.reset = () => {
        for(const object of objectsToUpdate){
            object.body.removeEventListener('collide', playHitSound);
            world.removeBody(object.body);
            scene.remove(object.mesh)
        }
        objectsToUpdate.splice(0, objectsToUpdate.length)
    }

    gui.add(debugObject, 'createSphere')
    gui.add(debugObject, 'createBoxes')
    gui.add(debugObject, 'reset')

    return gui
}
