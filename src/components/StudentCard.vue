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
      <div class="text-xl flex flex-col items-start justify-between my-2 md:text-3xl sm:grid sm:grid-cols-3 sm:items-center">
        <p>{{ student.firstName }}</p>
        <p>{{ student.lastName }}</p>
        <p>{{ student.house }}</p>
      </div>
    </div>
    <!-- Student detailed info -->
    <Transition name="slide">
      <div v-if="showDetails" class="relative max-h-96 text-xl overflow-hidden">
        <div class="mt-2 md:flex md:justify-between">
          <!-- Name and blood status -->
          <div class="text-base md:text-xl flex flex-col justify-center gap-2 col-span-3 lg:col-span-2">
            <p>Full name: {{ student.lastName ? `${student.lastName}, ` : '' }}{{ student.firstName }} {{ student.middleName }} {{ student.nickName }}</p>
            <p>Blood status: {{ student.bloodStatus }}</p>
          </div>
          <!-- Badge case -->
          <div class="mt-4 md:mt-0 flex gap-2 justify-between col-span-3 lg:col-span-1">
            <img :src="`images/badges/cap-${student.house.toLowerCase()}.svg`" :class="[ student.captain ? 'opacity-100' : 'opacity-50']" class="h-16 sm:h-20 duration-300">
            <img src="images/badges/prefect.svg" :class="[ student.prefect ? 'opacity-100' : 'opacity-50']" class="h-16 sm:h-20 duration-300">
            <img src="images/badges/inquisitor.svg" :class="[ student.inquisitor ? 'opacity-100' : 'opacity-50']" class="h-16 sm:h-20 duration-300">
            <img src="images/badges/expelled.svg" :class="[ student.expelled ? 'opacity-100' : 'opacity-50']" class="h-16 sm:h-20 duration-300">
          </div>
        </div>
        <!-- Button group -->
        <div :class="{ 'opacity-30' : student.expelled }" class="grid sm:grid-cols-2 md:grid-cols-3 gap-2 my-4 duration-200">
          <!-- Prefect -->
          <button @click="togglePrefect" @animationend="prefectButton?.classList.remove('shake')" ref="prefectButton" :disabled="student.expelled" :class="`bg-${theme}-accent text-${theme}-dark border-${theme}-dark`" class="border-2 p-2 flex justify-between">
            <p>Prefect</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.prefect">{{ student.prefect ? '-' : '+' }}</span>
            </Transition>
          </button>
          <!-- Inquisitor -->
          <button @click="toggleInquisitor" @animationend="inquisitorButton?.classList.remove('shake')" ref="inquisitorButton" :disabled="student.expelled" :class="`bg-${theme}-accent text-${theme}-dark border-${theme}-dark`" class="border-2 p-2 flex justify-between">
            <p>Inquisitor</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.inquisitor">{{ student.inquisitor ? '-' : '+' }}</span>
            </Transition>
          </button>
          <!-- Expel -->
          <button @click="expelStudent" @animationend.self="expelledButton.classList.remove('shake')" ref="expelledButton" :disabled="student.expelled" :class="`bg-${theme}-accent text-${theme}-dark border-${theme}-dark`" class="border-2 p-2 flex justify-between relative sm:col-span-2 md:col-span-1">
            <Transition name="fade" mode="out-in">
              <p :key="student.expelled">{{ student.expelled ? 'Expelled' : 'Expel Student' }}</p>
            </Transition>
            <img v-if="!student.expelled" @animationend="student.expelled = true" ref="howler" src="../assets/icons/howler.svg" alt="howler expulsion icon" class="absolute w-20 rotate-[10deg] top-[-7%] right-[3%]">
          </button>
        </div>
      </div>
    </Transition>
  </article>
</template>

<script setup>
import curseHogwarts from '../composables/curse';
import useMessages from '../composables/messages';

const props = defineProps({
  hideDetails: Boolean,
  isHacked: Boolean,
  isCursed: Boolean,
  students: Array,
  student: Object,
  theme: String
})
const emits = defineEmits(['detailsExpanded', 'curseHogwarts'])

const { addToMessages } = useMessages()

const showDetails = ref(false)

const howler = ref(null)
const prefectButton = ref(null)
const inquisitorButton = ref(null)
const expelledButton = ref(null)

const expulsionAttempts = ref(0)

const housePrefects = computed (() => {
  return props.students.filter(student => student.prefect && student.house === props.student.house)
})

function togglePrefect() {
  if (props.student.prefect) {
    props.student.prefect = false
  } else if (housePrefects.value.length === 2) {
    prefectButton.value.classList.add('shake')
    addToMessages('house', props.student.house)
  } else if (housePrefects.value.some(student => student.gender === props.student.gender)) {
    prefectButton.value.classList.add('shake')
    addToMessages('house', props.student.house)
  } else {
    props.student.prefect = true
  }
}

function toggleInquisitor() {
  if (props.student.bloodStatus === 'Pure-blood' || props.student.house === 'Slytherin') {
    props.student.inquisitor = !props.student.inquisitor

    if (props.student.inquisitor && props.isHacked) {
      setTimeout(() => {
        props.student.inquisitor = false
        addToMessages('hacking', props.student.firstName)
      }, 2000)
    }
  } else {
    inquisitorButton.value.classList.add('shake')
    addToMessages('inquisitor', props.student.firstName)
  }
}

function expelStudent() {
  if (props.student.firstName === 'Malthe') {
    // Increment expulsion attempts
    expulsionAttempts.value++

    expelledButton.value.classList.add('shake')

    if (expulsionAttempts.value === 1) {
      addToMessages('expulsion1')
    } else if (expulsionAttempts.value === 2) {
      addToMessages('expulsion2')
    } else if (expulsionAttempts.value === 3) {
      addToMessages('expulsion3')
      emits('curseHogwarts')
      curseHogwarts()
    } else {
      addToMessages('curse')
    }
  } else {
    howler.value.classList.add('howler')
  }
}

watch(() => props.hideDetails, (value) => {
  if (value) showDetails.value = false
})

watch(showDetails, () => {
  if (props.isCursed) curseHogwarts()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 400ms ease-in-out;
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