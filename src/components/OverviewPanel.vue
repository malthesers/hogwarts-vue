<template>
  <aside>
    <div class="sm:fixed w-full sm:max-w-[13rem] grid grid-cols-2 sm:grid-cols-1 sm:gap-4 p-4 text-center">
      <div class="flex flex-col justify-center">
        <div>
          <h1 class="text-3xl sm:text-4xl mb-2">Hogwarts</h1>
          <h2 class="text-xl sm:text-2xl mb-2">Class of 1991</h2>
        </div>
        <div>
          <h2 class="text-lg sm:text-xl mb-2">Students</h2>
          <div class="flex justify-center gap-2 mb-2">
            <span class="w-8 h-8 inline-grid place-content-center">
              <img src="/images/crests/hogwarts-crest.svg" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ students.length }}</p>
            </span>
            <span class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/badges/expelled.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ expelledStudents.length }}</p>
            </span>
          </div>
          <div class="flex justify-center">
            <span v-for="house in houses" :key="house" class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/crests/${house}-crest.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ studentsCount[house].length }}</p>
            </span>
          </div>
        </div>
      </div>
      <img src="../assets/crests/hogwarts-crest.svg" alt="Hogwarts Crest" class="w-full">      
      <h3 class="text-2xl mt-4 sm:mt-0 col-span-2 sm:col-span-1 sm:row-start-2 sm:row-end-2">Currently Displayed: {{ currentLength }}</h3>
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