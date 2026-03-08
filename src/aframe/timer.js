AFRAME.registerComponent('timer', {
    schema: {
        duration: { type: 'number', default: 60 },
    },

    init: function () {
        this.timeLeft = this.data.duration;
        this.running = false;

        // Écoute l'événement start depuis le bouton
        window.addEventListener('game-start', () => {
            this.startTimer();
        });
    },

    startTimer: function () {
        this.timeLeft = this.data.duration;
        this.running = true;
        window.dispatchEvent(new CustomEvent('timer-update', { detail: { timeLeft: this.timeLeft } }));
    },

    stopTimer: function () {
        this.running = false;
        window.dispatchEvent(new CustomEvent('game-over', { detail: { gameStarted: false}}));
    },

    tick: function (time, delta) {
        if (!this.running) return;

        this.timeLeft -= delta / 1000;

        if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.stopTimer();
        }

        window.dispatchEvent(new CustomEvent('timer-update', { 
            detail: { timeLeft: Math.ceil(this.timeLeft) } 
        }));
    }
});