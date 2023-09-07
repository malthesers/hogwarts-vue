<template>
  <aside>
    <div class="lg:fixed w-full lg:max-w-[13rem] grid grid-cols-2 lg:grid-cols-1 lg:gap-4 p-4 text-center">
      <div class="flex flex-col justify-center mb-4 col-span-2 xs:col-span-1">
        <div>
          <p class="text-3xl lg:text-4xl mb-2">Hogwarts</p>
          <p class="text-xl lg:text-2xl mb-2">Class of 1991</p>
        </div>
        <div>
          <p class="text-lg lg:text-xl mb-2">Students</p>
          <div class="flex justify-center gap-2 mb-2">
            <!-- Total count -->
            <span class="w-8 h-8 inline-grid place-content-center">
              <img src="/images/crests/hogwarts-crest.svg" class="w-auto h-8 grid-center opacity-50">
              <span class="text-2xl grid-center z-10">{{ students.length }}</span>
            </span>
            <!-- Expelled count -->
            <span class="w-8 h-8 inline-grid place-content-center">
              <img src="/images/badges/expelled.svg" class="w-auto h-8 grid-center opacity-50">
              <span class="text-2xl grid-center z-10">{{ expelledStudents.length }}</span>
            </span>
          </div>
          <!-- House count -->
          <div class="flex justify-center">
            <span v-for="house in houses" :key="house" class="w-8 h-8 inline-grid place-content-center">
              <img :src="`./images/crests/${house}-crest.svg`" class="w-auto h-8 grid-center opacity-50">
              <span class="text-2xl grid-center z-10">{{ studentsCount[house].length }}</span>
            </span>
          </div>
        </div>
      </div>
      <!-- Hogwarts crest and current display -->
      <img :src="`./images/crests/${theme}-crest.svg`" alt="Hogwarts Crest" class="w-full max-w-[12rem] mx-auto col-span-2 xs:col-span-1">      
      <div class="text-xl sm:text-2xl mt-4 lg:mt-0 col-span-2 lg:col-span-1 lg:row-start-2 lg:row-end-2">
        <p class="inline-block">Currently Displayed: </p>
        <Transition name="fade" mode="out-in">
          <span :key="currentLength" class="inline-block w-8 ml-2 text-left">{{ currentLength }}</span>
        </Transition>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  currentLength: Number,
  students: Array,
  theme: String
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