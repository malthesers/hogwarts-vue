<template>
  <section class="p-4">
    <div>
      <div class="grid gap-2 grid-cols-[auto_3rem] sm:grid-cols-[7rem_1fr]">
        <input>
        <img src="../assets/icons/magnifying-wand.svg" alt="magnifying wand" class="h-12 place-self-center sm:row-start-1 sm:col-start-1">
      </div>
    </div>
    <div class="p-4">
      <StudentCard v-for="student in students" :key="student" :student="student" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  students: Array
})
</script>