AFRAME.registerComponent('score', {
    init: function () {
        this.gameStarted = false;
        this.passedNet1 = false;

        window.addEventListener('game-start', () => this.gameStarted = true);
        window.addEventListener('game-over', () => {
            this.gameStarted = false;
            this.passedNet1 = false;
            score.value = 0;
        });

        // Lazy init: attend que la scène soit chargée
        const scene = document.querySelector('a-scene');
        scene.addEventListener('loaded', () => {
            const hoopNet1 = document.querySelector('#hoop-net');
            const hoopNet2 = document.querySelector('#hoop-net-2');

            if (!hoopNet1 || !hoopNet2) {
                console.error('hoop-net ou hoop-net-2 introuvable');
                return;
            }

            hoopNet1.addEventListener('obbcollisionstarted', (evt) => {
                const target = evt.detail.withEl;
                if (!target.id.includes('ball')) return;
                if (!this.gameStarted) return;

                const ballY = target.object3D.position.y;
                const hoopY = hoopNet1.object3D.position.y;

                if (ballY > hoopY && !this.passedNet1) {
                    this.passedNet1 = true;
                    console.log('Passed net 1');
                    setTimeout(() => { this.passedNet1 = false; }, 500);
                }
            });

            hoopNet2.addEventListener('obbcollisionstarted', (evt) => {
                const target = evt.detail.withEl;
                if (!target.id.includes('ball')) return;
                if (!this.gameStarted) return;

                if (this.passedNet1) {
                    this.passedNet1 = false;
                    console.log('SCORE!');
                    window.dispatchEvent(new CustomEvent('score', { detail: { points: 2 } }));
                }
            });
        });
    }
});