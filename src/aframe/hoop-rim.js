AFRAME.registerComponent('hoop-rim', {
    schema: {
        radius: { type: 'number', default: 0.45 },
        segments: { type: 'number', default: 12 },
        thickness: { type: 'number', default: 0.03 },
        color: { type: 'string', default: 'orange' }
    },

    init: function () {
        const { radius, segments, thickness, color } = this.data;
        const angleStep = (2 * Math.PI) / segments;
        const segmentLength = 2 * radius * Math.tan(angleStep / 2);

        for (let i = 0; i < segments; i++) {
            const angle = i * angleStep;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            const box = document.createElement('a-box');
            box.setAttribute('position', `${x} 0 ${z}`);
            // Ajout de 90° pour orienter tangentiellement
            box.setAttribute('rotation', `0 ${-THREE.MathUtils.radToDeg(angle) + 90} 0`);
            box.setAttribute('width', `${segmentLength}`);
            box.setAttribute('height', `${thickness}`);
            box.setAttribute('depth', `${thickness}`);
            box.setAttribute('color', color);
            box.setAttribute('physx-body', 'type: static; emitCollisionEvents: true');
            box.setAttribute('sound', "src: url(assets/sounds/rim/rim1.mp3); volume: 0.1; on: contactbegin; positional: true")

            this.el.appendChild(box);
        }
    }
});