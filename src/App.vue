<template>
  <main class="min-h-screen bg-hogwarts-light text-hogwarts-accent font-merinda">
    <section class="max-w-6xl mx-auto grid sm:grid-cols-[13rem_auto]">
        <OverviewPanel :students="allStudents"/>
        <StudentList :students="students"/>
    </section>
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'

const familyNames = ref({...families})
const allStudents = ref([])

const students = computed(() => {
  return allStudents.value
})

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, studentsData, familyNames.value)
    allStudents.value.push(formattedStudent)
  })
})
</script>