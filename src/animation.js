import * as THREE from 'three'
import { world } from './physics.js'
import { objectsToUpdate, updateTarget } from './objects.js'

/**
 * Animate
 */
export const startAnimation = (scene, camera, renderer, controls, updateLights) => {
    const clock = new THREE.Clock();
    let oldElapsedTime = clock.getElapsedTime();

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - oldElapsedTime;
        oldElapsedTime = elapsedTime;

        // update physics world
        // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position  )

        world.step( 1/60,  deltaTime, 3);

        for(const object of objectsToUpdate){
            object.mesh.position.copy(object.body.position);
            object.mesh.quaternion.copy(object.body.quaternion);
        }

        // sphere.position.copy(sphereBody.position);


        updateLights();

        updateTarget();
        
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}
