/**
 * sounds
 */
const hitSound = new Audio("/sounds/hit.mp3");

export const playHitSound = (collision) => {

    const impactStrength = collision.contact.getImpactVelocityAlongNormal();

    console.log(collision)

    if(impactStrength > 1.5){
        hitSound.volume = Math.random()
        hitSound.currentTime = 0;
        hitSound.play();
    }
}
