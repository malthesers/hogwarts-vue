<template>
  <footer :class="[ showHouseSelector ? 'h-full' : 'h-20', `bg-${theme}-dark`]" class="fixed z-20 bottom-0 w-full grid place-content-center duration-500">
    <p :class="[ showHouseSelector ? 'scale-100 mb-8' : 'scale-0 mb-0']" class="text-3xl sm:text-4xl text-center duration-200">Select a House</p>
    <div @click.self="emits('openHouseSelector')" ref="hogwartsCrest" :class="[ showHouseSelector ? 'w-[20rem] sm:w-[30rem]' : '[&>*]:pointer-events-none w-[6rem] mb-20' ]" class="hogwarts-crest-container grid mx-auto cursor-pointer duration-500">
      <!-- Frame -->
      <img class="hogwarts-crest-frame" src="../assets/hogwarts-parts/hogwarts-frame.svg">
      <!-- Background colours -->
      <img id="gryffindor-colour" class="hogwarts-crest-red" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-red.svg">
      <img id="slytherin-colour" class="hogwarts-crest-green" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-green.svg">
      <img id="hufflepuff-colour" class="hogwarts-crest-yellow" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-yellow.svg">
      <img id="ravenclaw-colour" class="hogwarts-crest-blue" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-blue.svg">
      <!-- House crests -->
      <img @click="emits('changeTheme', 'gryffindor')" @mouseenter="animateHouse('gryffindor')" @mouseleave="unanimateHouse('gryffindor')" id="gryffindor-part" class="hogwarts-crest-gryffindor" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-gryffindor.svg">
      <img @click="emits('changeTheme', 'slytherin')" @mouseenter="animateHouse('slytherin')" @mouseleave="unanimateHouse('slytherin')" id="slytherin-part" class="hogwarts-crest-slytherin" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-slytherin.svg">
      <img @click="emits('changeTheme', 'hufflepuff')" @mouseenter="animateHouse('hufflepuff')" @mouseleave="unanimateHouse('hufflepuff')" class="hogwarts-crest-hufflepuff-body" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-body.svg">
      <img @click="emits('changeTheme', 'hufflepuff')" @mouseenter="animateHouse('hufflepuff')" @mouseleave="unanimateHouse('hufflepuff')" id="hufflepuff-part" class="hogwarts-crest-hufflepuff-head" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-head.svg">
      <img @click="emits('changeTheme', 'ravenclaw')" @mouseenter="animateHouse('ravenclaw')" @mouseleave="unanimateHouse('ravenclaw')" id="ravenclaw-part" class="hogwarts-crest-ravenclaw" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-ravenclaw.svg">
      <!-- Hogwarts insignia -->
      <img @click="emits('changeTheme', 'hogwarts')" @mouseenter="animateHouse('hogwarts')" @mouseleave="unanimateHouse('hogwarts')" id="hogwarts-part" class="hogwarts-crest-insignia" src="../assets/hogwarts-parts/hogwarts-insignia.svg">
      <img @animationend="animateCrest" ref="mist" src="../assets/hogwarts-parts/imperio-mist.svg" alt="imperio mist" class="w-0 place-self-center z-20">
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

const houses = ['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw']

const hogwartsCrest = ref(null)
const mist = ref(null)

function animateHouse(house) {
  addHighlight(house)
  document.querySelector(`#${house}-part`).classList.add('animate')
}

function unanimateHouse(house) {
  removeHighlights()
  document.querySelector(`#${house}-part`).classList.remove('animate')
}

function addHighlight(exception) {
  houses.forEach(house => {
    if (exception !== house || exception === 'hogwarts') document.querySelector(`#${house}-colour`).classList.add('opacity-50')
  })
}

function removeHighlights() {
  houses.forEach(house => {
    document.querySelector(`#${house}-colour`).classList.remove('opacity-50')
  })
}

function animateCrest() {
  const housesOrder = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff', 'hogwarts', '']
  housesOrder.forEach((house, index) => {
    setTimeout(() => {
      if (index !== 0) unanimateHouse(housesOrder[index - 1]) // Skip unanimation on first iteration
      if (index !== 5) animateHouse(house)                    // Skip animation of '' on last iteration
      if (index === 5) emits('closeHouseSelector')            // Close house selector on last iteration
    }, 400 * (index + 1))
  })
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