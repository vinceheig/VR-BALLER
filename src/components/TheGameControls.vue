<script setup>
import '../aframe/clickable.js';
import '../aframe/reset-ball.js';
import '../aframe/game-start.js';

function exitImmersiveView() {
  if (document.querySelector("a-scene").is("vr-mode")) {
    document.querySelector("a-scene").exitVR();
    console.info("Exit VR mode… bye!");
  }
}
</script>
<template>
    <!-- Game reset pannel -->
            <a-box
              physx-body="type: static"
              height="1"
              depth="0.2"
              width="3"
              position="0 0.5 -0.75"
              color="brown"
            ></a-box>
            <a-entity>
            <!-- Ball reset -->
            <a-cylinder
              position="0 0.75 -0.65"
              rotation="-90 0 0"
              radius="0.11"
              height="0.02"
              color="black"
            ></a-cylinder>
            <a-sphere
              id="reset-button"
              radius="0.1"
              color="red"
              position="0 0.75 -0.65"
              clickable
              reset-ball
              animation="property: position; to: 0 0.75 -0.67; dur: 500; easing: easeInQuad; startEvents: click"
              animation__2="property: position; to: 0 0.75 -0.65; dur: 500; delay: 500; easing: easeInQuad; startEvents: click"
              sound="src: url(assets/sounds/misc/button.mp3); on: click; volume: 0.5; positional: true"
             ></a-sphere>
            <a-entity 
              id="start-text"
              text="value: RESET BALL; align: center; baseline: center;color: black; side: double"
              position="0 0.9 -0.65"
              height="0.2"
              width="0.2"
              color="black"
            ></a-entity>
            <!-- Start game -->
             <a-cylinder
              position="-0.5 0.75 -0.65"
              rotation="-90 0 0"
              radius="0.11"
              height="0.02"
              color="black"
            ></a-cylinder>
            <a-sphere
              id="start-button"
              radius="0.1"
              color="green"
              position="-0.5 0.75 -0.65"
              clickable
              game-start
              reset-ball
              animation="property: position; to: -0.5 0.75 -0.67; dur: 500; easing: easeInQuad; startEvents: click"
              animation__2="property: position; to: -0.5 0.75 -0.65; dur: 500; delay: 500; easing: easeInQuad; startEvents: click"
              sound="src: url(assets/sounds/misc/button.mp3); on: click; volume: 0.5; positional: true"
             ></a-sphere>
            <a-entity 
              id="start-text"
              text="value: START GAME; align: center; baseline: center;color: black; side: double"
              position="-0.5 0.9 -0.65"
              height="0.2"
              width="0.2"
              color="black"
            ></a-entity>
            <!-- Exit VR -->
             <a-cylinder
              position="0.5 0.75 -0.65"
              rotation="-90 0 0"
              radius="0.11"
              height="0.02"
              color="black"
            ></a-cylinder>
            <a-sphere
              id="start-button"
              radius="0.1"
              color="yellow"
              position="0.5 0.75 -0.65"
              clickable
              game-start
              @click="exitImmersiveView()"
              animation="property: position; to: 0.5 0.75 -0.67; dur: 500; easing: easeInQuad; startEvents: click"
              animation__2="property: position; to: 0.5 0.75 -0.65; dur: 500; delay: 500; easing: easeInQuad; startEvents: click"
              sound="src: url(assets/sounds/misc/button.mp3); on: click; volume: 0.5; positional: true"
             ></a-sphere>
            <a-entity 
              id="start-text"
              text="value: EXIT VR; align: center; baseline: center;color: black; side: double"
              position="0.5 0.9 -0.65"
              height="0.2"
              width="0.2"
              color="black"
            ></a-entity>
        </a-entity>
</template>