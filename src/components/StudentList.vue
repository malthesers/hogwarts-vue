<template>
  <section class="p-4">
    <div class="mb-4">
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr] mb-4">
        <input v-model="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2 outline-none">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr] mb-4">
        <div class="cursor-pointer">
          <p @click="showFilteringMethods = !showFilteringMethods" class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Filter by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showFilteringMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <Transition name="slide">
            <div v-if="showFilteringMethods" class="max-h-60 overflow-hidden">
              <p v-for="method in filteringMethods" :key="method.key" @click="filter = method.key" class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2">
                <span>{{ method.name }}</span>
              </p>
            </div>
          </Transition>
        </div>
        <img src="../assets/icons/badge.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr]">
        <div class="cursor-pointer">
          <p @click="showSortingMethods = !showSortingMethods" class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Sort by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showSortingMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <Transition name="slide">
            <div v-if="showSortingMethods" class="max-h-40 overflow-hidden">
              <p v-for="method in sortingMethods" :key="method.key" @click="sorting = method.key" class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2 flex justify-between items-center">
                <span>{{ method.name }}</span>
                <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ sorting === method.key ? 'rotate-180' : 'rotate-0' ]" class="h-4 duration-300">
              </p>
            </div>
          </Transition>
        </div>
        <img src="../assets/icons/sorting-hat.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
    </div>
    <div class="relative sm:p-4">
      <TransitionGroup name="student">
        <StudentCard v-for="student in filteredStudents" :key="student" :student="student" />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  students: Array
})

const showExpelled = ref(false)
const sorting = ref('firstName')
const filter = ref('All Students')
const search = ref('')

const showFilteringMethods = ref(false)
const filteringMethods = ref([
  {
    key: '*',
    name: 'All Students'
  },
  {
    key: 'captain',
    name: 'Captains'
  },
  {
    key: 'prefect',
    name: 'Prefects'
  },
  {
    key: 'inquisitor',
    name: 'Inquisitors'
  },
])

const showSortingMethods = ref(false)
const sortingMethods = ref([
  {
    key: 'firstName',
    name: 'First name'
  },
  {
    key: 'lastName',
    name: 'Last name'
  },
  {
    key: 'house',
    name: 'House'
  }
])

const filteredStudents = computed(() => {
  let filteredStudents = []
  // Show either active or expelled students
  filteredStudents = props.students.filter(student => student.expelled === showExpelled.value)
  // Includes search query
  filteredStudents = props.students.filter(student => student.fullName.toLowerCase().includes(search.value.toLowerCase()) || search.value === '')
  // Sorts by chosen sorting method
  filteredStudents.sort((a, b) => { return a[sorting.value] > b[sorting.value] ? 1 : -1 })

  return filteredStudents
})
</script>

<style scoped>
input {
  -webkit-appearance: none;
}

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