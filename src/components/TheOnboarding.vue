<script setup>
  import { ref } from 'vue';

  defineProps({
    loaded: Boolean,
  });

  const showOnboarding = ref(true);

  function enterScene() {
    showOnboarding.value = false;
    if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
      document.querySelector('a-scene').enterVR();
    }
    document.querySelector('a-scene').emit('enter-scene');
  }
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div id="info">
      <h1>VR Baller</h1>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Enter scene</button>
      <div class="licences">
        <section>
          <h4>Movement modes support</h4>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              Not supported to play. Please use VR/AR
            </li>
            <li>
              VR/AR – Walking around (roomscale boundary recommended) 
              <br>Use index trigger to click on buttons
              <br>Press and maintain the grip trigger BEFORE hitting the ball to grab / Release trigger to throw
              <br><span style="color: red; font-weight: bold; font-weight: bold;">!!! Press the trigger before touching the ball to be able to grab it !!!</span>
            </li>
          </ul>
        </section>
        <section>
          <h4>Basé sur la boilerplate</h4>
          <blockquote><a href="https://github.com/Chabloz/a-frame-vite-vue-boilerplate">Github repo</a></blockquote>
        </section>
        <dl>
          <dt>
            <i>Included</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a>
          </dt><dd>
            <a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a>
          </dt><dd>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">simple-navmesh-constraint</a>
          </dt><dd>
            By Ada Rose Cannon under MIT License
          </dd>
          <dt>
            <i>3D Assets</i>
          </dt>
          <dt>
            <a href="https://sketchfab.com/3d-models/water-bottle-44e358fef98b47698de7294f111a21df" target="_blank">Water bottle model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/saqib24" target="_blank">saqib24</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/wooden-bench-low-poly-f5dbd295c70e448fb6a3c71f370c81a5" target="_blank">Wooden bench model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/MaX3Dd" target="_blank">MaX3Dd</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/sports-bag-4f3da061584a4c51be8cb4a54b7586a2" target="_blank">Sports bag model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/Zeps3D" target="_blank">Zeps3D</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/indoor-basketball-court-943a9bc962974d02aa34592084687c3c" target="_blank">Indoor basketball court model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/nguyennghiakk" target="_blank">nguyennghiakk</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/basketball-8d17cb0964334a6cbe4b0e293c238956" target="_blank">Basketball model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/thesidekick" target="_blank">thesidekick</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/basketball-hoop-3f97cfcd94e54d2e9ae5f53e1fd8af12" target="_blank">Basketball hoop model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/local.yany" target="_blank">local.yany</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
          <dt>
            <i>Sounds</i>
          </dt>
          <dt>
            <a href="https://pixabay.com/sound-effects/film-special-effects-basketball-85872/" target="_blank">Rim sound</a>
          </dt><dd>
            by Pixabay under <a href="https://pixabay.com/service/license-summary/" target="_blank">Pixabay Content License</a>
          </dd>
          <dt>
            <a href="https://orangefreesounds.com/basketball-hits-rim-sound-effect" target="_blank">Rim sound 1</a>
          </dt><dd>
            by OrangeFreeSounds under <a href="https://orangefreesounds.com/license/" target="_blank">Free for personal and commercial use</a>
          </dd>
          <dt>
            <a href="https://elevenlabs.io/sound-effects/basketball-swish" target="_blank">Net sound (Basketball Swish 4)</a>
          </dt><dd>
            by ElevenLabs under <a href="https://elevenlabs.io/terms" target="_blank">ElevenLabs Free License</a>
          </dd>
          <dt>
            <a href="https://mixkit.co/free-sound-effects/basketball/" target="_blank">Basketball bounce (Basketball ball hit)</a>
          </dt><dd>
            by Mixkit under <a href="https://mixkit.co/license/#sfx" target="_blank">Mixkit Sound Effects Free License</a>
          </dd>
          <dt>
            <a href="https://pixabay.com/sound-effects/search/basketball-rim/" target="_blank">Basketball backboard</a>
          </dt><dd>
            by Pixabay under <a href="https://pixabay.com/service/license-summary/" target="_blank">Pixabay Content License</a>
          </dd>
          <dt>
            <a href="https://mixkit.co/free-sound-effects/basketball/" target="_blank">Buzzer sound</a>
          </dt><dd>
            by Mixkit under <a href="https://mixkit.co/license/#sfx" target="_blank">Mixkit Sound Effects Free License</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 { font-size: 1.5rem }
  a {
    color: #eee;
    text-decoration: none;
  }
  .licences {
    margin: 2rem 0;
    padding-bottom: 1rem;
    font-size: 1rem;
    text-align: left;
  }
  .licences dt {
    padding-top: 0.75rem;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .licences dd {
    margin-left: 0;
    font-size: 0.8rem;
  }
  #info {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 1rem;
    padding: 2rem;
  }
  #onboarding {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('assets/poster.png');
    color: #ccc;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    font-family: monospace;
    z-index: 10000;
    overflow: auto;
  }
  #onboarding > * {
    margin: 0 auto;
    max-width: 50rem;
    width: calc(100vw - 10rem);
    text-align: center;
    border-radius: 0.3rem;
    padding: 1rem;
    font-size: 1.3rem;
  }
  #onboarding button {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
  }
  #onboarding li {
  font-size: 1rem;
  text-align: left;
}
</style>
