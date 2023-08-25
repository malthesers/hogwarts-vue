<template>
  <section class="p-4">
    <div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr]">
        <input v-model="search" placeholder="Search..." class="bg-hogwarts-dark text-hogwarts-accent text-xl border-2 border-hogwarts-accent p-2">
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
    </div>
    <div class="p-4">
      <StudentCard v-for="student in filteredStudents" :key="student" :student="student" />
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