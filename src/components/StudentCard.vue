<template>
  <article class="relative w-full mb-4 overflow-hidden">
    <!-- <div :style="{ backgroundImage: `url(/images/crests/${student.house.toLowerCase()}-crest.svg)`}" class="absolute top-0 left-0 w-full h-full opacity-20 bg-no-repeat bg-top bg-[length:18rem]"></div> -->
    <!-- Background crest -->
    <div class="absolute top-0 left-0 p-4 grid w-full h-full">
      <img :src="`/images/crests/${student.house.toLowerCase()}-crest.svg`" class="w-2/3 lg:w-1/4 m-auto opacity-20">
    </div>
    <!-- Student basic info -->
    <div @click="showDetails = !showDetails, $emit('detailsExpanded')" class="relative grid grid-cols-[7rem_1fr] gap-4 cursor-pointer">
      <img :src="`/images/students/${student.photo}`" :alt="`${student.firstName} ${student.lastName}`" class="rounded-[26px]">
      <div class="text-xl flex flex-col items-start justify-between my-2 lg:text-3xl lg:grid lg:grid-cols-3 lg:items-center">
        <p>{{ student.firstName }}</p>
        <p>{{ student.lastName }}</p>
        <p>{{ student.house }}</p>
      </div>
    </div>
    <!-- Student detailed info -->
    <Transition name="slide">
      <div v-if="showDetails" class="relative max-h-80 text-xl overflow-hidden">
        <div class="mt-2 lg:flex lg:justify-between">
          <!-- Name and blood status -->
          <div class="text-base lg:text-xl flex flex-col justify-center gap-2 col-span-3 lg:col-span-2">
            <p>Full name: {{ student.lastName ? `${student.lastName}, ` : '' }}{{ student.firstName }} {{ student.middleName }} {{ student.nickName }}</p>
            <p>Blood status: {{ student.bloodStatus }}</p>
          </div>
          <!-- Badge case -->
          <div class="mt-4 lg:mt-0 flex gap-2 justify-between col-span-3 lg:col-span-1">
            <img :src="`images/badges/cap-${student.house.toLowerCase()}.svg`" :class="[ student.captain ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/prefect.svg" :class="[ student.prefect ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/inquisitor.svg" :class="[ student.inquisitor ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/expelled.svg" :class="[ student.expelled ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
          </div>
        </div>
        <!-- Button group -->
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 col-span-3 my-4">
          <!-- Prefect -->
          <button @click="togglePrefect" ref="prefectButton" @animationend="prefectButton.classList.remove('shake')" class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 flex justify-between">
            <p>Prefect</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.prefect">{{ student.prefect ? '-' : '+' }}</span>
            </Transition>
          </button>
          <!-- Inquisitor -->
          <button @click="toggleInquisitor" @animationend="inquisitorButton.classList.remove('shake')" ref="inquisitorButton" class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 flex justify-between">
            <p>Inquisitor</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.inquisitor">{{ student.inquisitor ? '-' : '+' }}</span>
            </Transition>
          </button>
          <!-- Expel -->
          <button @click="student.expelled = true" class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 col-span-2 lg:col-span-1">
            <p>Expel Student</p>
          </button>
        </div>
      </div>
    </Transition>
  </article>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  student: Object,
  students: Array,
  hideDetails: Boolean,
})

const prefectButton = ref(null)
const inquisitorButton = ref(null)
const showDetails = ref(false)

const housePrefects = computed (() => {
  return props.students.filter(student => student.prefect && student.house === props.student.house)
})

function togglePrefect() {
  if (props.student.prefect) {
    props.student.prefect = false
  } else if (housePrefects.value.length === 2) {
    prefectButton.value.classList.add('shake')
    // TODO: display error message - 2 of house
  } else if (housePrefects.value.some(student => student.gender === props.student.gender)) {
    prefectButton.value.classList.add('shake')
    // TODO: display error message - same gender
  } else {
    props.student.prefect = true
  }
}

function toggleInquisitor() {
  if (props.student.bloodStatus === 'Full-blooded' || props.student.house === 'Slytherin') {
    props.student.inquisitor = !props.student.inquisitor
  } else {
    inquisitorButton.value.classList.add('shake')
    // TODO: display error message - not full-blooded or slytherin
  }
}

watch(() => props.hideDetails, (value) => {
  if (value) showDetails.value = false
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 350ms ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>