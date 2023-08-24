<template>
  <section class="p-4">
    <StudentCard v-for="student in students" :key="student" :student="student" />
  </section>
</template>

<script setup>
const props = defineProps({
  students: Array
})
</script>