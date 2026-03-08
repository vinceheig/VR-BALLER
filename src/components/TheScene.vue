<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/life-like-automaton.js';
  import '../aframe/physx-grab.js';
  import '../aframe/simple-grab.js';
  import '../aframe/clickable.js';
  import '../aframe/outline.js';
  import '../aframe/autoscale.js';
  import '../aframe/listen-to.js';
  import '../aframe/physx-force-pushable.js';
  import '../aframe/score.js';
  import '../aframe/reset-ball.js';
  import '../aframe/sound-variation.js';
  import '../aframe/hoop-rim.js';
import TheGameControls from './TheGameControls.vue';
import TheScoreboard from './TheScoreboard.vue';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    obb-collider="showColliders: false;"
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
    xr-mode-ui="XRMode: xr"
    physx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
      gravity: 0 -9.81 0;
    "
    outline
    stats
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="basketball-model" src="assets/basketball.glb"></a-asset-item>
      <a-asset-item id="court" src="assets/indoor_basketball_court.glb"></a-asset-item>
      <a-asset-item id="bottle" src="assets/water_bottle.glb"></a-asset-item>
      <a-asset-item id="gym-bag" src="assets/sports_bag.glb"></a-asset-item>
      <a-asset-item id="bench" src="assets/wooden_bench_low-poly.glb"></a-asset-item>
      <img id="court-floor" :src="`assets/basketball-court/51439.jpg`"/>
      <img id="wall-poster" :src="`assets/poster.png`"/>
    </a-assets>

    <template v-if="allAssetsLoaded">
    </template>
    <a-entity position=" 0 0 0">
      <!-- Floor -->
      <a-gltf-model src="#court" position="0 -0.1 0" rotation="0 0 0" scale="1.5 1.5 1.5"></a-gltf-model>
     <a-plane
      physx-body="type: static"
      position="0 0.15 0"
      rotation="-90 0 0"
      width="3"
      height="3"
      visible="false"
    ></a-plane>
    <a-gltf-model
      src="#gym-bag"
      position="-1.7 0.1 0.7"
      rotation="0 100 0"
      scale="2 2 2"
    ></a-gltf-model>
    <a-gltf-model
      src="#bench"
      position="0 0.1 1.8"
      rotation="0 0 0"
      scale="0.7 0.7 0.7"
    ></a-gltf-model>
    <a-gltf-model
      src="#bottle"
      position="0.5 0.6 1.8"
      rotation="0 -45 0"
      scale="0.1 0.1 0.1"
    ></a-gltf-model>
    <!-- Walls -->
      <a-box
        position="1.5 1.5 -3.75"
        rotation="0 90 0"
        width="6"
        height="6"
        depth="0.1"
        color="brown"
         physx-body="type: static"
      ></a-box>
      <a-box
        position="-1.5 1.5 -3.75"
        rotation="0 90 0"
        width="6"
        height="6"
        depth="0.1"
        color="brown"
         physx-body="type: static"
      ></a-box>
       <a-box
        position="0 3 -6.6"
        width="3"
        height="3"
        depth="0.1"
        src="#wall-poster"
        material="metalness: 0.5"
         physx-body="type: static"
      ></a-box>
      <TheScoreboard 
        position="0 4.5 -4"/>
      <!-- Table -->
       <a-box
       physx-body="type: static"
       obb-collider
        position="0 1 -3.76"
        rotation="10 0 0"
        width="3"
        height="0.1"
        depth="6"
        src="#court-floor"
        material="metalness: 0.6"
       ></a-box>
        <!-- Game reset pannel -->
         
        <TheGameControls/>

        <!-- Hoop -->

        <a-entity position="0 0.3 -3">
        <a-gltf-model
          src="assets/basketball_hoop.glb"
          position="0.5 1 -1"
          scale="3 3 3"
        ></a-gltf-model>
        
        <a-box
          id="hoop-backboard"
          position="0.03 2.4 -1.1"
          width="2.5"
          height="1.7"
          depth="0.2"
          obb-collider
          physx-body="type: static; emitCollisionEvents: true;"
          sound="src: url(assets/sounds/backboard/backboard.mp3); on: obbcollisionstarted; volume: 1; positional: true"
          visible="false"
        ></a-box>

        <a-entity
          id="hoop-rim"
          position="0.035 1.75 -0.435"
          hoop-rim="radius: 0.42; segments: 12; thickness: 0.03; color: orange"
          visible="false"
        ></a-entity>

        <!-- NET TRIGGER: hitbox invisible au centre position="0.04 1.73 -0.435"-->
        <a-cylinder
          id="hoop-net"
          class="hoop-trigger"
          obb-collider
          position="0.04 1.75 -0.435"
          radius="0.40"
          height="0.05"
          visible="false"
          score
          sound="src: url(assets/sounds/net/net1.mp3); on: obbcollisionstarted; volume: 0.7; positional: true"
        ></a-cylinder>
        <a-cylinder
          id="hoop-net-2"
          class="hoop-trigger"
          obb-collider
          position="0.035 1.5 -0.435"
          radius="0.34"
          height="0.05"
          visible="false"
        ></a-cylinder>
      </a-entity>
      <a-box 
      position="0 10 -4.5"
      width="6.5"
      height="1"
      depth="1.5"
      color="black"
      ></a-box>
      <!-- Ball -->
    <a-gltf-model
      id = "ball"
      src="#basketball-model"
      obb-collider="centerModel: true"
      physx-body="type: dynamic; mass: 0.2; angularDamping: 0.1; linearDamping: 0.1; shape=sphere; material=restitution: 0.8"
      scale="0.07 0.07 0.07"
      position="0 3 -1.5"
      physx-grabbable
      sound-variation
      sound="src: url(assets/sounds/bounce/bounce1.mp3); volume: 0.2; on: obbcollisionstarted; positional: true"
    ></a-gltf-model>
    </a-entity>
    <a-light type="ambient" color="blue"></a-light>
    <a-light id="hoop-light" type="point" color="white" intensity="10" position="0 4 4"></a-light>
    <a-light type="point" color="white" intensity="10" position="0 0 0"></a-light>
    <TheCameraRig/>
    

  </a-scene>
</template>
<!-- Lisences 

     Assets:
     -Baketball model: https://sketchfab.com/3d-models/basketball-8d17cb0964334a6cbe4b0e293c238956

 

-->
