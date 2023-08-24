<template>
  <main class="bg-[#392a48] text-[#FAECBF] font-merinda min-h-screen">
    <section class="max-w-7xl mx-auto grid grid-cols-[13rem_auto]">
      <div>
        <OverviewPanel/>
      </div>
      <div>
        <StudentList :students="students"/>
      </div>
    </section>
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'

const familyNames = ref({...families})
const formattedStudents = ref([])

const students = computed(() => {
  return formattedStudents.value
})

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, studentsData, familyNames.value)
    formattedStudents.value.push(formattedStudent)
    console.log(formattedStudent)
  })
})
</script>