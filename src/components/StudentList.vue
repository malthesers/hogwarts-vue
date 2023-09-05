<template>
  <section class="p-4">
    <div class="mb-4">
      <!-- Searching -->
      <div class="text-xl grid gap-2 grid-cols-[auto_4rem] lg:grid-cols-[5rem_1fr] mb-4">
        <input @keydown.enter="verifyHacking" @input="$emit('updateSearch', $event.target.value)" :value="search" placeholder="Search..." :class="`bg-${theme}-dark border-${theme}-accent`" class="border-2 p-2 outline-none">
        <IconWand :class="`fill-${theme}-accent`" class="h-12 place-self-center lg:row-start-1 lg:col-start-1"/>
      </div>
      <!-- Filtering -->
      <div class="text-xl grid gap-2 grid-cols-[auto_4rem] lg:grid-cols-[5rem_1fr] mb-4">
        <div class="cursor-pointer">
          <!-- Filtering header -->
          <p @click="showFilteringMethods = !showFilteringMethods" :class="`bg-${theme}-dark border-${theme}-accent`" class="border-2 p-2 flex justify-between items-center">
            <span>Filter by...</span>
            <IconChevron :class="[ `fill-${theme}-accent`, showFilteringMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300"/>
          </p>
          <!-- Filtering dropwdown -->
          <Transition name="slide">
            <div v-if="showFilteringMethods" class="max-h-72 overflow-hidden">
              <p v-for="(name, method) in filteringMethods" :key="method" @click="$emit('updateFilter', method), showFilteringMethods = false" :class="`bg-${theme}-dark border-${theme}-accent`" class="border-2 border-t-0 p-2">
                <span>{{ name }}</span>
              </p>
            </div>
          </Transition>
        </div>
        <IconBadge :class="`fill-${theme}-accent`" class="h-12 place-self-center lg:row-start-1 lg:col-start-1"/>
      </div>
      <!-- Sorting -->
      <div class="text-xl grid gap-2 grid-cols-[auto_4rem] lg:grid-cols-[5rem_1fr]">
        <div class="cursor-pointer">
          <!-- Sorting header -->
          <p @click="showSortingMethods = !showSortingMethods" :class="`bg-${theme}-dark border-${theme}-accent`" class="border-2 p-2 flex justify-between items-center">
            <span>Sort by...</span>
            <IconChevron :class="[ `fill-${theme}-accent`, showSortingMethods ? 'rotate-180' : 'rotate-0']" class="h-4 duration-300"/>
          </p>
          <!-- Sorting dropwdown -->
          <Transition name="slide">
            <div v-if="showSortingMethods" class="max-h-40 overflow-hidden">
              <p v-for="(name, method) in sortingMethods" :key="method" @click="updateSorting(method)" :class="`bg-${theme}-dark border-${theme}-accent`" class="border-2 border-t-0 p-2 flex justify-between items-center">
                <span>{{ name }}</span>
                <IconChevron :class="[ `fill-${theme}-accent`, sortingOrder === 1 ? 'scale-y-100' : '-scale-y-100', sorting === method ? '' : 'scale-y-0 opacity-0' ]" class="h-4 duration-300"/>
              </p>
            </div>
          </Transition>
        </div>
        <IconHat :class="`fill-${theme}-accent`" class="h-12 place-self-center lg:row-start-1 lg:col-start-1"/>
      </div>
    </div>
    <!-- List of students -->
    <div class="relative lg:p-4">
      <TransitionGroup name="student">
        <StudentCard
          v-for="(student, index) in displayedStudents"
          @detailsExpanded="expandedIndex = index"
          @curseHogwarts="emits('curseHogwarts')"
          :hideDetails="expandedIndex !== index"
          :isHacked="isHacked"
          :isCursed="isCursed"
          :students="students"
          :student="student"
          :theme="theme"
          :key="student"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  displayedStudents: Array,
  students: Array,
  isHacked: Boolean,
  isCursed: Boolean,
  sortingOrder: Number,
  sorting: String,
  filter: String,
  search: String,
  theme: String
})
const emits = defineEmits(['hackTheSystem', 'curseHogwarts', 'updateSearch', 'updateFilter', 'updateSorting', 'reverseSortingOrder', 'resetSortingOrder'])

const expandedIndex = ref()

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

function verifyHacking() {
  if (props.search === "imperio") emits('hackTheSystem')
}

function updateSorting(method) {
  emits('updateSorting', method)
  if (props.sorting === method) {
    emits('reverseSortingOrder')
  } else {
    emits('resetSortingOrder')
  }
}
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