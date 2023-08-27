<template>
  <section class="p-4">
    <div class="mb-4">
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr] mb-4">
        <input v-model="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2 outline-none">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr] mb-4">
        <input v-model="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr]">
        <input v-model="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
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

const search = ref('')

const filteredStudents = computed(() => {
  let filteredStudents = []
  filteredStudents = props.students.filter(student => student.fullName.toLowerCase().includes(search.value.toLowerCase()) || search.value === '')
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
  transition: all 0.5s ease;
}

.student-enter-from,
.student-leave-to {
  opacity: 0;
}

.student-leave-active {
  position: absolute;
}
</style>