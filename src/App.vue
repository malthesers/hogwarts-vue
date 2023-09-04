<template>
  <main :class="`bg-${theme}-light text-${theme}-accent`" class="min-h-screen font-merinda pb-20">
    <section class="max-w-6xl mx-auto grid lg:grid-cols-[13rem_auto]">
        <OverviewPanel
          :currentLength="displayedStudents.length"
          :students="students"
          :theme="theme"/>
        <StudentList
          @hackTheSystem="hackTheSystem"
          @curseHogwarts="isCursed = true, filter = 'all'"
          @updateSearch="(value) => search = value"
          @updateFilter="(value) => filter = value"
          @updateSorting="(value) => sorting = value"
          :displayedStudents="displayedStudents"
          :students="students"
          :isHacked="isHacked"
          :isCursed="isCursed"
          :sorting="sorting"
          :filter="filter"
          :search="search"
          :theme="theme"
        />
    </section>
    <MessageContainer
      :theme="theme"
    />
    <HogwartsCrest
      @changeTheme="(value) => changeTheme(value)"
      @closeHouseSelector="showHouseSelector = false"
      @openHouseSelector="showHouseSelector = true"
      :showHouseSelector="showHouseSelector"
      :isHacked="isHacked"
      :theme="theme"
    />
  </main>
</template>

<script setup>
import studentsData from './assets/students.json'
import families from './assets/families.json'
import formatStudent from './composables/reformatting.js'
import getMyself from './composables/hacking.js'

const showHouseSelector = ref(true)
const theme = ref('hogwarts')

const isHacked = ref(false)
const isCursed = ref(false)

const familyNames = ref({...families})
const students = ref([])

const search = ref('')
const filter = ref('all')
const sorting = ref('firstName')

const displayedStudents = computed(() => {
  // Deep clone students array
  let displayedStudents = [ ...students.value ]

  // Filter by house theme
  if (theme.value !== 'hogwarts') displayedStudents = displayedStudents.filter(student => student.house.toLowerCase() === theme.value)

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
  if (isHacked.value) displayedStudents.sort((a, b) => { return a.firstName === 'Malthe' ? -1 : 1 })

  return displayedStudents
})

function changeTheme(house) {
  // Close house selector and change theme
  showHouseSelector.value = false
  theme.value = house
}

function hackTheSystem() {
  if (!isHacked.value) {
    isHacked.value = true

    // Reset student display and theme settings
    search.value = ''
    filter.value = 'all'
    sorting.value = 'firstName'
    theme.value = 'hogwarts'

    // Open house selector
    showHouseSelector.value = true

    // Inject myself into students
    students.value.push(getMyself())

    // Randomise blood statuses
    students.value.forEach(student => {
      if (student.bloodStatus === 'Pure-blood') {
        student.bloodStatus = ['Muggle-born', 'Half-blood', 'Squib'][Math.floor(Math.random() * 3)]
      } else {
        student.bloodStatus = 'Pure-blood'
      }
    })
  }
}

watch(displayedStudents, () => {
  setTimeout(() => {
    // Curse Hogwarts if hacked
    if (isCursed.value) {
      document.querySelectorAll('p, input, img').forEach(element => {
        element.addEventListener("click", (e) => {
          e.target.classList += ' duration-200'
          e.target.style.filter = "grayscale(75%)"
          e.target.style.transform = ['rotate(-15deg)', 'rotate(-5deg)', 'rotate(5deg)', 'rotate(15deg)'][Math.floor(Math.random() * 4)]
          e.target.textContent = "ḭ̷̺̖͎̬̇̋̑͌́͂͋̌͋̎̓̊̊̽͜͠ ̴̧͍̼̪̋͂̊̑͊̏̓̈́̃̊͂̚̚͝͠w̶̬̪̾̆͘ä̵̠͎̗́̊̓̕ŗ̴̡̡̗̭̝̲̤͍̤͕̋ń̴̫͉͖̯̣͔͈̻͚̠̯͂̐̅́̎́̒̽͊̾̓̓͝e̴̡̢̫̫̗̗͎͎̠̥̥̫͕̱̹͐̈́̂̅͌ḑ̸͇̤͓̫̬̼̻̫͎͙͕͈̒̊͊̿̽̂̐́́̃̀̐́͝ͅ ̷͖̝̦̇͒̎̈́̃͐͛́͊̓̕͜͜͝y̴̧̡͓͍̾͗̀̂͜o̶̤͕̩̟̹͛̓̎̄̓͊̎̈͘̚͜͜͝͠ů̴̗̦̭̐̒̕"
        })
      })
    }
  }, 200)
})

watch(theme, () => {
  document.querySelector("body").setAttribute('theme', theme.value)
})

onMounted(() => {
  studentsData.forEach((student) => {
    const formattedStudent = formatStudent(student, studentsData, familyNames.value)
    students.value.push(formattedStudent)
  })
})
</script>