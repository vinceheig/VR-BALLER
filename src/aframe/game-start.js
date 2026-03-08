AFRAME.registerComponent('game-start', {
    init: function () {
        this.el.addEventListener('click', this.startGame.bind(this));
    },
    startGame: function (evt) {
        // Démarre le timer
        window.dispatchEvent(new CustomEvent('game-start', { detail: { gameStarted: true } }));
    },
});

