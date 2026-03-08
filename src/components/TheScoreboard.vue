<script setup>
import '../aframe/timer.js';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  position: String,
});

const timeLeft = ref(120);
const highscore = ref(0);
const score = ref(0);

const onTimerUpdate = (evt) => {
  timeLeft.value = evt.detail.timeLeft;
};
const onScoreUpdate = (evt) => {
  score.value += evt.detail.points;
};
const onGameOver = () => { 
  document.querySelector('#scoreboard').components.sound.playSound();
  if (score.value > highscore.value) {
    highscore.value = score.value;
    score.value = 0;
  }
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
});
</script>

<template>
  <a-entity id="scoreboard" :position="position" timer="duration: 120" sound="src: url(assets/sounds/misc/buzzer.mp3); volume: 1; positional: true">
    <a-box width="1.5" height="1" depth="0.1" color="#34D5EB"></a-box>
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
