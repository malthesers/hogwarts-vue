<template>
  <section class="p-4">
    <div class="mb-4">
      <!-- Searching -->
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr] mb-4">
        <input @input="$emit('updateSearch', $event.target.value)" :value="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 outline-none">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <!-- Filtering -->
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr] mb-4">
        <div class="cursor-pointer">
          <!-- Filtering header -->
          <p @click="showFilteringMethods = !showFilteringMethods" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Filter by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showFilteringMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <!-- Filtering dropwdown -->
          <Transition name="slide">
            <div v-if="showFilteringMethods" class="max-h-72 overflow-hidden">
              <p v-for="(name, method) in filteringMethods" :key="method" @click="$emit('updateFilter', method), showFilteringMethods = false" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2">
                <span>{{ name }}</span>
              </p>
            </div>
          </Transition>
        </div>
        <img src="../assets/icons/badge.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <!-- Sorting -->
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr]">
        <div class="cursor-pointer">
          <!-- Sorting header -->
          <p @click="showSortingMethods = !showSortingMethods" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Sort by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showSortingMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <!-- Sorting dropwdown -->
          <Transition name="slide">
            <div v-if="showSortingMethods" class="max-h-40 overflow-hidden">
              <p v-for="(name, method) in sortingMethods" :key="method" @click="$emit('updateSorting', method)" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
                <span>{{ name }}</span>
                <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ sorting === method ? 'rotate-180' : 'rotate-0' ]" class="h-4 duration-300">
              </p>
            </div>
          </Transition>
        </div>
        <img src="../assets/icons/sorting-hat.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
    </div>
    <!-- List of students -->
    <div class="relative sm:p-4">
      <TransitionGroup name="student">
        <StudentCard v-for="student in displayedStudents" :key="student" :student="student" :students="students"/>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  displayedStudents: Array,
  students: Array,
  sorting: String,
  filter: String,
  search: String
})

const showFilteringMethods = ref(false)
const filteringMethods = ref({
  all: 'All Students',
  current: 'Current Students',
  expelled: 'Expelled Students',
  captain: 'Captains',
  prefect: 'Prefects',
  inquisitor: 'Inquisitors'
})

const showSortingMethods = ref(false)
const sortingMethods = ref({
  firstName: 'First name',
  lastName: 'Last name',
  house: 'House'
})
</script>

<style scoped>
.student-move,
.student-enter-active,
.student-leave-active {
  transition: all 500ms ease;
}

.student-enter-from,
.student-leave-to {
  opacity: 0;
}

.student-leave-active {
  position: absolute;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 250ms ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}
</style>