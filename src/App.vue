<template>
  <main class="min-h-screen bg-hogwarts-light text-hogwarts-accent font-merinda">
    <section class="max-w-6xl mx-auto grid lg:grid-cols-[13rem_auto]">
        <OverviewPanel :students="students" :currentLength="displayedStudents.length"/>
        <StudentList
          @hackTheSystem="hackTheSystem"
          @updateSearch="(value) => search = value"
          @updateFilter="(value) => filter = value"
          @updateSorting="(value) => sorting = value"
          :displayedStudents="displayedStudents"
          :students="students"
          :sorting="sorting"
          :filter="filter"
          :search="search"
        />
    </section>
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'
import getMyself from './composables/hacking.js'

const systemIsHacked = ref(false)

const familyNames = ref({...families})
const students = ref([])

const search = ref('')
const filter = ref('all')
const sorting = ref('firstName')

const displayedStudents = computed(() => {
  // Deep clone students array
  let displayedStudents = [ ...students.value ]

  // Include search query in name
  displayedStudents = displayedStudents.filter(student => student.fullName.toLowerCase().includes(search.value.toLowerCase()) || search.value === '')

  // Filter by chosen method
  if (filter.value === 'expelled') {
    displayedStudents = displayedStudents.filter(student => student.expelled)
  } else if (filter.value === 'current') {
    displayedStudents = displayedStudents.filter(student => !student.expelled)
  } else {
    displayedStudents = displayedStudents.filter(student => student[filter.value] || filter.value === 'all')
  }

  // Sort by chosen method
  displayedStudents.sort((a, b) => { return a[sorting.value] > b[sorting.value] ? 1 : -1 })

  // If hacked, add me to start of array
  if (systemIsHacked.value) displayedStudents.sort((a, b) => { return a.firstName === 'Malthe' ? -1 : 1 })

  return displayedStudents
})

function hackTheSystem() {
  if (!systemIsHacked.value) {
    systemIsHacked.value = true

    // Reset student display settings
    search.value = ""
    filter.value = "all"
    sorting.value = "firstName"

    // TODO: reset house theme
    // TODO: open crest animation
    // TODO: display imperio mist on crest

    // Inject myself into students
    students.value.push(getMyself())

    // Randomise blood statuses
    students.value.forEach(student => {
      console.log(student)
      if (student.bloodStatus === 'Pure-blood') {
        student.bloodStatus = ['Muggle-born', 'Half-blood', 'Squib'][Math.floor(Math.random() * 3)]
      } else {
        student.bloodStatus = 'Pure-blood'
      }
    })
  }
}

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, studentsData, familyNames.value)
    students.value.push(formattedStudent)
  })
})
</script>