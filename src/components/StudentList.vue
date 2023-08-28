<template>
  <section class="p-4">
    <div class="mb-4">
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr] mb-4">
        <input @input="$emit('search', $event.target.value)" :value="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 outline-none">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr] mb-4">
        <div class="cursor-pointer">
          <p @click="showFilteringMethods = !showFilteringMethods" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Filter by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showFilteringMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <Transition name="slide">
            <div v-if="showFilteringMethods" class="max-h-72 overflow-hidden">
              <p v-for="method in filteringMethods" :key="method.key" @click="filter = method.key, showFilteringMethods = false" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2">
                <span>{{ method.name }}</span>
              </p>
            </div>
          </Transition>
        </div>
        <img src="../assets/icons/badge.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="text-xl grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[5rem_1fr]">
        <div class="cursor-pointer">
          <p @click="showSortingMethods = !showSortingMethods" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
            <span>Sort by...</span>
            <img src="../assets/icons/chevron.svg" alt="chevron" :class="[ showSortingMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300">
          </p>
          <Transition name="slide">
            <div v-if="showSortingMethods" class="max-h-40 overflow-hidden">
              <p v-for="method in sortingMethods" :key="method.key" @click="sorting = method.key" class="bg-hogwarts-dark text-hogwarts-accent border-2 border-hogwarts-accent p-2 flex justify-between items-center">
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
        <StudentCard v-for="student in students" :key="student" :student="student" />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  students: Array,
  sorting: String,
  filter: String,
  search: String
})

const showFilteringMethods = ref(false)
const filteringMethods = ref([
  {
    key: 'all',
    name: 'All Students'
  },
  {
    key: 'current',
    name: 'Current Students'
  },
  {
    key: 'expelled',
    name: 'Expelled Students'
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