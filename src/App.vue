<template>
  <main class="bg-[#392a48] text-[#FAECBF] font-merinda min-h-screen">
    <section class="max-w-7xl mx-auto grid grid-cols-[13rem_auto]">
      <OverviewPanel/>
    </section>
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'

const familyNames = ref({...families})
const formattedStudents = ref([])

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, familyNames.value)
    formattedStudents.value.push(formatStudent)
  })
})
</script>