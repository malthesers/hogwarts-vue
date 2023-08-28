<template>
  <main class="min-h-screen bg-hogwarts-light text-hogwarts-accent font-merinda">
    <section class="max-w-6xl mx-auto grid sm:grid-cols-[13rem_auto]">
        <OverviewPanel :students="students"/>
        <StudentList @search="(value) => search = value" :students="filteredStudents" :sorting="sorting" :filter="filter" :search="search"/>
    </section>
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'

const familyNames = ref({...families})
const students = ref([])

const sorting = ref('firstName')
const filter = ref('all')
const search = ref('')

const filteredStudents = computed(() => {
  // Deep clone students array
  let filteredStudents = [ ...students.value ]

  // Include search query in name
  filteredStudents = filteredStudents.filter(student => student.fullName.toLowerCase().includes(search.value.toLowerCase()) || search.value === '')

  // Filter by chosen method
  if (filter.value === 'expelled') {
    filteredStudents = filteredStudents.filter(student => student.expelled)
  } else if (filter.value === 'current') {
    filteredStudents = filteredStudents.filter(student => !student.expelled)
  } else {
    filteredStudents = filteredStudents.filter(student => student[filter.value] || filter.value === 'all')
  }

  // Sort by chosen method
  filteredStudents.sort((a, b) => { return a[sorting.value] > b[sorting.value] ? 1 : -1 })

  return filteredStudents
})

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, studentsData, familyNames.value)
    students.value.push(formattedStudent)
  })
})
</script>