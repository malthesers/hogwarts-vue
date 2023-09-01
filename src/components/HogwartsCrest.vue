<template>
  <footer class="fixed z-20 bottom-0 w-full h-full bg-hogwarts-dark grid place-content-center">
    <div>
      <p class="text-3xl sm:text-4xl text-center mb-8">Select a House</p>
    </div>
    <div class="hogwarts-crest-container w-[20rem] sm:w-[30rem]">
      <!-- Frame -->
      <img class="hogwarts-crest-frame" src="../assets/hogwarts-parts/hogwarts-frame.svg">
      <!-- Background colours -->
      <img ref="gryffindorColour" class="hogwarts-crest-red" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-red.svg">
      <img ref="slytherinColour" class="hogwarts-crest-green" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-green.svg">
      <img ref="hufflepuffColour" class="hogwarts-crest-yellow" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-yellow.svg">
      <img ref="ravenclawColour" class="hogwarts-crest-blue" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-blue.svg">
      <!-- House crests -->
      <img @mouseenter="animateGryffindor" @mouseleave="unanimateGryffindor" ref="gryffindorMascot" class="hogwarts-crest-gryffindor" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-gryffindor.svg">
      <img @mouseenter="animateSlytherin" @mouseleave="unanimateSlytherin" ref="slytherinMascot" class="hogwarts-crest-slytherin" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-slytherin.svg">
      <img @mouseenter="animateHufflepuff" @mouseleave="unanimateHufflepuff" class="hogwarts-crest-hufflepuff-body" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-body.svg">
      <img @mouseenter="animateHufflepuff" @mouseleave="unanimateHufflepuff" ref="hufflepuffMascot" class="hogwarts-crest-hufflepuff-head" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-head.svg">
      <img @mouseenter="animateRavenclaw" @mouseleave="unanimateRavenclaw" ref="ravenclawMascot" class="hogwarts-crest-ravenclaw" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-ravenclaw.svg">
      <!-- Hogwarts insignia -->
      <img @mouseenter="animateInsignia" @mouseleave="unanimateInsignia" ref="insignia" class="hogwarts-crest-insignia" src="../assets/hogwarts-parts/hogwarts-insignia.svg">
    </div>
  </footer>
</template>

<script setup>
const gryffindorColour = ref(null)
const slytherinColour = ref(null)
const hufflepuffColour = ref(null)
const ravenclawColour = ref(null)
const gryffindorMascot = ref(null)
const slytherinMascot = ref(null)
const hufflepuffMascot = ref(null)
const ravenclawMascot = ref(null)
const insignia = ref(null)

function animateGryffindor() {
  addHighlight('gryffindor')
  gryffindorMascot.value.classList.add('animate')
}

function unanimateGryffindor() {
  removeHightlights()
  gryffindorMascot.value.classList.remove('animate')
}

function animateSlytherin() {
  addHighlight('slytherin')
  slytherinMascot.value.classList.add('animate')
}

function unanimateSlytherin() {
  removeHightlights()
  slytherinMascot.value.classList.remove('animate')
}

function animateHufflepuff() {
  addHighlight('hufflepuff')
  hufflepuffMascot.value.classList.add('animate')
}

function unanimateHufflepuff() {
  removeHightlights()
  hufflepuffMascot.value.classList.remove('animate')
}

function animateRavenclaw() {
  addHighlight('ravenclaw')
  ravenclawMascot.value.classList.add('animate')
}

function unanimateRavenclaw() {
  removeHightlights()
  ravenclawMascot.value.classList.remove('animate')
}

function animateInsignia() {
  addHighlight('')
  insignia.value.classList.add('animate')
}

function unanimateInsignia() {
  removeHightlights()
  insignia.value.classList.remove('animate')
}

function addHighlight(house) {
  if (house !== 'gryffindor') gryffindorColour.value.classList.add('opacity-50')
  if (house !== 'slytherin') slytherinColour.value.classList.add('opacity-50')
  if (house !== 'hufflepuff') hufflepuffColour.value.classList.add('opacity-50')
  if (house !== 'ravenclaw') ravenclawColour.value.classList.add('opacity-50')
}

function removeHightlights() {
  gryffindorColour.value.classList.remove('opacity-50')
  slytherinColour.value.classList.remove('opacity-50')
  hufflepuffColour.value.classList.remove('opacity-50')
  ravenclawColour.value.classList.remove('opacity-50')
}
</script>

<style scoped>
.hogwarts-crest-container {
  position: relative;
  aspect-ratio: 0.9014/1;
}

.hogwarts-crest-container > img {
  position: absolute;
  cursor: pointer;
  transition-duration: 300ms;
}

.hogwarts-crest-insignia {
  z-index: 6;
  width: 20%;
  left: 50%;
  top: 39%;
  transform: translateX(-50%) scale(1);
}

.hogwarts-crest-insignia.animate {
  transform: translateX(-50%) scale(1.3);
}

.hogwarts-crest-gryffindor {
  z-index: 5;
  width: 41.5587628866%;
  left: 13.35%;
  top: 8.95%;
  transform: scale(1);
  transform-origin: bottom left;
}

.hogwarts-crest-gryffindor.animate {
  transform: scale(1.1);
}

.hogwarts-crest-slytherin {
  z-index: 4;
  width: 28.865443299%;
  left: 50%;
  top: 11%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-slytherin.animate {
  transform: scale(1.2) rotate(-10deg);
}

.hogwarts-crest-hufflepuff-body {
  z-index: 2;
  width: 42.6274845361%;
  left: 4.63%;
  top: 52.99%;
  transform: scale(1);
  transform-origin: bottom left;
}

.hogwarts-crest-hufflepuff-head {
  z-index: 2;
  width: 23.3609690722%;
  left: 16%;
  top: 47%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-hufflepuff-head.animate {
  transform: scale(1.1) rotate(-20deg);
}

.hogwarts-crest-ravenclaw {
  z-index: 3;
  width: 46.3877938144%;
  left: 49%;
  top: 29%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-ravenclaw.animate {
  transform: scale(1.15) rotate(10deg);
}

.hogwarts-crest-frame {
  width: 100%;
  z-index: 1;
}

.hogwarts-crest-red {
  width: 42.5482680412%;
  left: 7.45%;
  top: 1.15%;
}

.hogwarts-crest-green {
  width: 42.1755051546%;
  right: 7.45%;
  top: 1.5%;
}

.hogwarts-crest-yellow {
  width: 47.3421237113%;
  left: 2%;
  top: 47.5%;
}

.hogwarts-crest-blue {
  width: 48.0876701031%;
  right: 2%;
  top: 47.5%;
}
</style>