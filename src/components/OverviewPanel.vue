<template>
  <aside>
    <div class="md:fixed w-full md:max-w-[13rem] grid grid-cols-2 md:grid-cols-1 md:gap-4 p-4 text-center">
      <div class="flex flex-col justify-center">
        <div>
          <h1 class="text-3xl md:text-4xl mb-2">Hogwarts</h1>
          <h2 class="text-xl md:text-2xl mb-2">Class of 1991</h2>
        </div>
        <div>
          <h2 class="text-lg md:text-xl mb-2">Students</h2>
          <div class="flex justify-center gap-2 mb-2">
            <!-- Total count -->
            <span class="w-8 h-8 inline-grid place-content-center">
              <img src="/images/crests/hogwarts-crest.svg" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ students.length }}</p>
            </span>
            <!-- Expelled count -->
            <span class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/badges/expelled.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ expelledStudents.length }}</p>
            </span>
          </div>
          <!-- House count -->
          <div class="flex justify-center">
            <span v-for="house in houses" :key="house" class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/crests/${house}-crest.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ studentsCount[house].length }}</p>
            </span>
          </div>
        </div>
      </div>
      <!-- Crest and current display -->
      <img src="../assets/crests/hogwarts-crest.svg" alt="Hogwarts Crest" class="w-full">      
      <h3 class="text-2xl mt-4 md:mt-0 col-span-2 md:col-span-1 md:row-start-2 md:row-end-2">
        <span>Currently Displayed: </span>
        <Transition name="fade" mode="out-in">
          <span :key="currentLength" class="inline-block w-8 text-left">{{ currentLength }}</span>
        </Transition>
      </h3>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  students: Array,
  currentLength: Number
})
const houses = ref(['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'])

const expelledStudents = computed(() => {
  return props.students.filter(student => student.expelled === true)
})

const studentsCount = computed(() => {
  return {
    gryffindor: props.students.filter(student => student.house === 'Gryffindor'),
    slytherin: props.students.filter(student => student.house === 'Slytherin'),
    hufflepuff: props.students.filter(student => student.house === 'Hufflepuff'),
    ravenclaw: props.students.filter(student => student.house === 'Ravenclaw')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>