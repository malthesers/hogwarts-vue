<template>
  <article class="relative w-full mb-4">
    <div :class="`bg-[url('@/images/crests/${student.house}-crest.svg')]`" class="absolute top-0 left-0 w-full h-full opacity-20 bg-no-repeat bg-center bg-[length:15rem]"></div>
    <div @click="showDetails = !showDetails" class="relative grid grid-cols-[7rem_1fr] gap-4 cursor-pointer">
      <img :src="`/images/students/${student.photo}`" :alt="`${student.firstName} ${student.lastName}`" class="rounded-[26px]">
      <div class="text-xl flex flex-col items-start justify-between my-2 sm:text-3xl sm:grid sm:grid-cols-3 sm:items-center">
        <p>{{ student.firstName }}</p>
        <p>{{ student.lastName }}</p>
        <p>{{ student.house }}</p>
      </div>
    </div>
    <Transition name="slide">
      <div v-if="showDetails" class="relative max-h-80 grid grid-cols-3 text-xl overflow-hidden">
        <div class="flex flex-col justify-center col-span-2">
          <p>Full name: {{ student.lastName }}, {{ student.firstName }}</p>
          <p class="mt-2">Blood status: {{ student.bloodStatus }}</p>
        </div>
        <div class="mt-4 flex justify-between">
          <img :src="`images/badges/cap-${student.house.toLowerCase()}.svg`" :class="[ student.captain ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/prefect.svg" :class="[ student.prefect ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/inquisitor.svg" :class="[ student.inquisitor ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/expelled.svg" :class="[ student.expelled ? 'opacity-100' : 'opacity-50']" class="h-20">
        </div>
        <div class="grid grid-cols-3 col-span-3 gap-1 my-4">
          <button class="bg-hogwarts-accent text-hogwarts-dark p-1">Prefect</button>
          <button class="bg-hogwarts-accent text-hogwarts-dark p-1">Inquisitor</button>
          <button class="bg-red-600 text-hogwarts-accent p-1">Expel Student</button>
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
  transition: max-height 300ms ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}
</style>