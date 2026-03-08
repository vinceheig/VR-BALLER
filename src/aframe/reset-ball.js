AFRAME.registerComponent('reset-ball', {
    init: function () {
        this.isResetting = false;
        this.el.addEventListener('click', this.reset.bind(this));
        console.log('bound');
    },
    reset: function (evt) {
        if (this.isResetting) return; // Ignore les collisions pendant le reset

        console.log('Ball reset', document.querySelector('#ball'));
        const ballEl = document.querySelector('#ball');
        this.isResetting = true;

        // Désactiver les collisions immédiatement
        this.el.setAttribute('physx-body', 'type: static; emitCollisionEvents: false');

        const physxBody = ballEl.components['physx-body'];
        if (physxBody && physxBody.rigidBody) {
            physxBody.rigidBody.setLinearVelocity({ x: 0, y: 0, z: 0 }, true);
            physxBody.rigidBody.setAngularVelocity({ x: 0, y: 0, z: 0 }, true);

            const newPos = new THREE.Vector3(0, 3, -1.5);
            const rotation = ballEl.object3D.quaternion;
            physxBody.rigidBody.setGlobalPose({
                translation: newPos,
                rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w }
            }, true);
        }

        // Réactiver les collisions après un délai suffisant
        setTimeout(() => {
            this.el.setAttribute('physx-body', 'type: static; emitCollisionEvents: true');
            this.isResetting = false;
            console.log('Collisions réactivées');
        }, 1000); // 1 seconde pour être sûr que la balle est loin
    },
});

//button click sound: https://pixabay.com/sound-effects/search/button/
