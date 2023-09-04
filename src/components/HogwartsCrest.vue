<template>
  <footer :class="[ showHouseSelector ? 'h-full' : 'h-20', `bg-${theme}-dark`]" class="fixed z-20 bottom-0 w-full grid place-content-center duration-500">
    <p :class="[ showHouseSelector ? 'scale-100 mb-8' : 'scale-0 mb-0']" class="text-3xl sm:text-4xl text-center duration-200">Select a House</p>
    <div @click.self="emits('openHouseSelector')" ref="hogwartsCrest" :class="[ showHouseSelector ? 'w-[20rem] sm:w-[30rem]' : '[&>*]:pointer-events-none w-[6rem] mb-20' ]" class="hogwarts-crest-container grid mx-auto cursor-pointer duration-500">
      <!-- Frame -->
      <img class="hogwarts-crest-frame" src="../assets/hogwarts-parts/hogwarts-frame.svg">
      <!-- Background colours -->
      <img ref="gryffindorColour" class="hogwarts-crest-red" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-red.svg">
      <img ref="slytherinColour" class="hogwarts-crest-green" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-green.svg">
      <img ref="hufflepuffColour" class="hogwarts-crest-yellow" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-yellow.svg">
      <img ref="ravenclawColour" class="hogwarts-crest-blue" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-blue.svg">
      <!-- House crests -->
      <img @click="emits('changeTheme', 'gryffindor')" @mouseenter="animateGryffindor" @mouseleave="unanimateGryffindor" ref="gryffindorMascot" class="hogwarts-crest-gryffindor" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-gryffindor.svg">
      <img @click="emits('changeTheme', 'slytherin')" @mouseenter="animateSlytherin" @mouseleave="unanimateSlytherin" ref="slytherinMascot" class="hogwarts-crest-slytherin" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-slytherin.svg">
      <img @click="emits('changeTheme', 'hufflepuff')" @mouseenter="animateHufflepuff" @mouseleave="unanimateHufflepuff" class="hogwarts-crest-hufflepuff-body" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-body.svg">
      <img @click="emits('changeTheme', 'hufflepuff')" @mouseenter="animateHufflepuff" @mouseleave="unanimateHufflepuff" ref="hufflepuffMascot" class="hogwarts-crest-hufflepuff-head" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-head.svg">
      <img @click="emits('changeTheme', 'ravenclaw')" @mouseenter="animateRavenclaw" @mouseleave="unanimateRavenclaw" ref="ravenclawMascot" class="hogwarts-crest-ravenclaw" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-ravenclaw.svg">
      <!-- Hogwarts insignia -->
      <img @click="emits('changeTheme', 'hogwarts')" @mouseenter="animateInsignia" @mouseleave="unanimateInsignia" ref="insignia" class="hogwarts-crest-insignia" src="../assets/hogwarts-parts/hogwarts-insignia.svg">
      <img @animationend="animateCrest" ref="mist" src="../assets/imperio-mist.svg" alt="imperio mist" class="w-0 place-self-center z-20">
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  showHouseSelector: Boolean,
  isHacked: Boolean,
  theme: String
})
const emits = defineEmits(['openHouseSelector', 'closeHouseSelector', 'changeTheme'])

const hogwartsCrest = ref(null)
const gryffindorColour = ref(null)
const slytherinColour = ref(null)
const hufflepuffColour = ref(null)
const ravenclawColour = ref(null)
const gryffindorMascot = ref(null)
const slytherinMascot = ref(null)
const hufflepuffMascot = ref(null)
const ravenclawMascot = ref(null)
const insignia = ref(null)
const mist = ref(null)

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

function animateCrest() {
  const interval = 400
  // Animate the houses clockwise - Gryffindor
  setTimeout(() => {
    animateGryffindor()
  }, interval * 1)
  // Animate the houses clockwise - Slytherin
  setTimeout(() => {
    unanimateGryffindor()
    animateSlytherin()
  }, interval * 2)
  // Animate the houses clockwise - Ravenclaw
  setTimeout(() => {
    unanimateSlytherin()
    animateRavenclaw()
  }, interval * 3);
  // Animate the houses clockwise - Hufflepuff
  setTimeout(() => {
    unanimateRavenclaw()
    animateHufflepuff()
  }, interval * 4)
  // Animate the houses clockwise - Insignia
  setTimeout(() => {
    unanimateHufflepuff()
    animateInsignia()
  }, interval * 5)
  // Show the Hogwarts display of all students
  setTimeout(() => {
    unanimateInsignia()
    emits('closeHouseSelector')
  }, interval * 6)
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

onMounted(() => {
  animateCrest()
})

watch(() => props.isHacked, () => {
  mist.value.classList.add('appear')
})
</script>

<style scoped>
.appear {
  animation-name: appear;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  transform-origin: center;
}

@keyframes appear {
  0% {
    width: 0%;
    height: 0%;
    opacity: 0%;
    transform: rotate(0deg);
  }

  20% {
    width: 80%;
    height: 80%;
    opacity: 100%;
    transform: rotate(-720deg);
  }

  40% {
    transform: rotate(-1440deg);
  }

  60% {
    transform: rotate(-2160deg);
  }

  80% {
    width: 80%;
    height: 80%;
    opacity: 100%;
    transform: rotate(-2880deg);
  }

  100% {
    width: 0%;
    height: 0%;
    opacity: 0%;
    transform: rotate(-3600deg);
  }
}
</style>