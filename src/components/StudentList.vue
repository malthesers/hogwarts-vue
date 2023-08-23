<template>
  <section class="p-4">
    <article v-for="student in props.students" :key="student" class="w-full mb-4">
      <div/>
      <div class="grid grid-cols-[7rem_1fr] gap-4">
        <img :src="`/images/students/${student.photo}`" :alt="`${student.firstName} ${student.lastName}`" class="rounded-[26px]">
        <div class="text-3xl grid grid-cols-3 items-center">
          <p>{{ student.firstName }}</p>
          <p>{{ student.lastName }}</p>
          <p>{{ student.house }}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 text-xl">
        <div class="col-span-2 mt-4">
          <p>Full name: {{ student.lastName }}, {{ student.firstName }}</p>
          <p class="mt-2">Blood status: {{ student.bloodStatus }}</p>
        </div>
        <div class="mt-4 flex justify-between">
          <img :src="`images/badges/cap-${student.house.toLowerCase()}.svg`" :class="[ student.captain ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/prefect.svg" :class="[ student.prefect ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/inquisitor.svg" :class="[ student.inquisitor ? 'opacity-100' : 'opacity-50']" class="h-20">
          <img src="images/badges/expelled.svg" :class="[ student.expelled ? 'opacity-100' : 'opacity-50']" class="h-20">
        </div>
        <div class="grid grid-cols-3 col-span-3 gap-1 my-4">
          <button class="bg-[#faecbf] text-[#2f223a] p-1">Prefect</button>
          <button class="bg-[#faecbf] text-[#2f223a] p-1">Inquisitor</button>
          <button class="bg-red-600 text-[#faecbf] p-1">Expel Student</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
const props = defineProps({
  students: Array
})
</script>