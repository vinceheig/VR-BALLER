<script setup>
import '../aframe/timer.js';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  position: String,
});

const timeLeft = ref(120);
const highscore = ref(0);
const score = ref(0);
const ledColor = ref('#34D5EB');
const ledIntensity = ref(0);

let ledTimeout = null;

const onTimerUpdate = (evt) => {
  timeLeft.value = evt.detail.timeLeft;
};
const onScoreUpdate = (evt) => {
  score.value += evt.detail.points;
  // Allumer les LEDs en vert
  turnOnLEDs('#00ff00');
};
const onGameOver = () => { 
  document.querySelector('#scoreboard').components.sound.playSound();
  turnOnLEDs('red');
  if (score.value > highscore.value) {
    highscore.value = score.value;
    score.value = 0;
  }
}
const turnOnLEDs = (color) =>{
  // Allumer les LEDs de la couleur passée en paramètre
  ledColor.value = color;
  ledIntensity.value = 2;
  if (ledTimeout) clearTimeout(ledTimeout);
  ledTimeout = setTimeout(() => {
    ledColor.value = '#34D5EB';
    ledIntensity.value = 0;
  }, 800);
}
onMounted(() => {
  window.addEventListener('timer-update', onTimerUpdate);
  window.addEventListener('score', onScoreUpdate);
  window.addEventListener('game-over', onGameOver);
});
onUnmounted(() => {
  window.removeEventListener('timer-update', onTimerUpdate);
  window.removeEventListener('score', onScoreUpdate);
  window.removeEventListener('game-over', onGameOver);
  if (ledTimeout) clearTimeout(ledTimeout);
});
</script>

<template>
  <a-entity id="scoreboard" :position="position" timer="duration: 120" sound="src: url(assets/sounds/misc/buzzer.mp3); volume: 1; positional: true">
    <a-box width="1.5" height="1" depth="0.1" color="#34D5EB"></a-box>

    <!-- Lumière verte au score -->
    <a-light 
      type="point" 
      :color="ledColor" 
      :intensity="ledIntensity" 
      position="0 0 0.3"
    ></a-light>

    <!-- LEDs bord haut -->
    <template v-for="i in 7" :key="`top-${i}`">
      <a-sphere
        :position="`${-0.75 + (i - 1) * 0.25} 0.52 0`"
        radius="0.05"
        :color="ledColor"
        :emissive="ledColor"
        emissive-intensity="1"
      ></a-sphere>
    </template>

    <!-- LEDs bord bas -->
    <template v-for="i in 7" :key="`bottom-${i}`">
      <a-sphere
        :position="`${-0.75 + (i - 1) * 0.25} -0.52 0`"
        radius="0.05"
        :color="ledColor"
        :emissive="ledColor"
        emissive-intensity="1"
      ></a-sphere>
    </template>

    <!-- LEDs bord gauche -->
    <template v-for="i in 4" :key="`left-${i}`">
      <a-sphere
        :position="`-0.78 ${-0.25 + (i - 1) * 0.2} 0`"
        radius="0.05"
        :color="ledColor"
        :emissive="ledColor"
        emissive-intensity="1"
      ></a-sphere>
    </template>

    <!-- LEDs bord droit -->
    <template v-for="i in 4" :key="`right-${i}`">
      <a-sphere
        :position="`0.78 ${-0.25 + (i - 1) * 0.2} 0`"
        radius="0.05"
        :color="ledColor"
        :emissive="ledColor"
        emissive-intensity="1"
      ></a-sphere>
    </template>

    <!-- Affichage timer -->
    <a-entity :text="`value: ${timeLeft}s; align: center; baseline: center; color: brown; side: double; width: 1;`"
      scale="5 5 5" position="0 0.2 0.06"></a-entity>
    <!-- Affichage score -->
    <a-entity :text="`value: SCORE; align: center; baseline: center; color: brown; side: double`" scale="2 2 2"
      position="-0.4 0 0.06"></a-entity>
    <a-entity :text="`value: ${score}; align: center; baseline: center; color: brown; side: double`" scale="5 5 5"
      position="-0.4 -0.2 0.06"></a-entity>
    <!-- Affichage Highscore -->
    <a-entity :text="`value: HIGHSCORE; align: center; baseline: center; color: brown; side: double`" scale="2 2 2"
      position="0.4 0 0.06"></a-entity>
    <a-entity :text="`value: ${highscore}; align: center; baseline: center; color: brown; side: double`" scale="5 5 5"
      position="0.4 -0.2 0.06">
    </a-entity>
  </a-entity>
</template>



