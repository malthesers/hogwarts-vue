<template>
  <article class="relative w-full mb-4 overflow-hidden">
    <!-- <div :style="{ backgroundImage: `url(/images/crests/${student.house.toLowerCase()}-crest.svg)`}" class="absolute top-0 left-0 w-full h-full opacity-20 bg-no-repeat bg-top bg-[length:18rem]"></div> -->
    <div class="absolute top-0 left-0 p-4 grid w-full h-full">
      <img :src="`/images/crests/${student.house.toLowerCase()}-crest.svg`" class="w-2/3 sm:w-1/4 m-auto opacity-20">
    </div>
    <div @click="showDetails = !showDetails" class="relative grid grid-cols-[7rem_1fr] gap-4 cursor-pointer">
      <img :src="`/images/students/${student.photo}`" :alt="`${student.firstName} ${student.lastName}`" class="rounded-[26px]">
      <div class="text-xl flex flex-col items-start justify-between my-2 sm:text-3xl sm:grid sm:grid-cols-3 sm:items-center">
        <p>{{ student.firstName }}</p>
        <p>{{ student.lastName }}</p>
        <p>{{ student.house }}</p>
      </div>
    </div>
    <Transition name="slide">
      <div v-if="showDetails" class="relative max-h-80 text-xl overflow-hidden">
        <div class="mt-2 sm:flex sm:justify-between">
          <div class="text-base sm:text-xl flex flex-col justify-center gap-2 col-span-3 sm:col-span-2">
            <p>Full name: {{ student.lastName }}, {{ student.firstName }}</p>
            <p>Blood status: {{ student.bloodStatus }}</p>
          </div>
          <div class="mt-4 sm:mt-0 flex gap-2 justify-between col-span-3 sm:col-span-1">
            <img :src="`images/badges/cap-${student.house.toLowerCase()}.svg`" :class="[ student.captain ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/prefect.svg" :class="[ student.prefect ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/inquisitor.svg" :class="[ student.inquisitor ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
            <img src="images/badges/expelled.svg" :class="[ student.expelled ? 'opacity-100' : 'opacity-50']" class="h-20 duration-300">
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 col-span-3 my-4">
          <button @click="student.prefect = !student.prefect" class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 flex justify-between">
            <p>Prefect</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.prefect">{{ student.prefect ? '-' : '+' }}</span>
            </Transition>
          </button>
          <button @click="student.inquisitor = !student.inquisitor" class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 flex justify-between">
            <p>Inquisitor</p>
            <Transition name="fade" mode="out-in">
              <span :key="student.inquisitor">{{ student.inquisitor ? '-' : '+' }}</span>
            </Transition>
          </button>
          <button class="bg-hogwarts-accent text-hogwarts-dark border-hogwarts-dark border-2 p-2 col-span-2 sm:col-span-1">
            <p>Expel Student</p>
          </button>
        </div>
      </div>
    </Transition>
  </article>
</template>

<script setup>
const props = defineProps({
  student: Object
})

const showDetails = ref(false)
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