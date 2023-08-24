<template>
  <aside>
    <div class="fixed max-w-[13rem] grid gap-4 p-4 text-center">
      <div>
        <div>
          <h1 class="text-3xl mb-2">Hogwarts</h1>
          <h2 class="text-xl mb-2">Class of 1991</h2>
        </div>
        <div>
          <h2 class="text-xl mb-2">Students</h2>
          <div class="flex justify-center gap-2 mb-2">
            <span class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/badges/expelled.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ expelledStudents.length }}</p>
            </span>
            <span class="w-8 h-8 inline-grid place-content-center">
              <img src="/images/crests/hogwarts-crest.svg" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ students.length }}</p>
            </span>
          </div>
          <div class="flex justify-center mb-2">
            <span v-for="house in houses" :key="house" class="w-8 h-8 inline-grid place-content-center">
              <img :src="`/images/crests/${house}-crest.svg`" class="w-auto h-8 grid-center opacity-50">
              <p class="text-2xl grid-center z-10">{{ studentsCount[house].length }}</p>
            </span>
          </div>
        </div>
      </div>
      <div>
        <img src="../assets/crests/hogwarts-crest.svg" alt="Hogwarts Crest">
      </div>
      <h3 class="text-2xl">Currently Displayed: </h3>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  students: Array
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