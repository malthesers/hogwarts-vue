<template>
  <div class="fixed top-0 left-0 w-full h-full p-4">
    <TransitionGroup name="slide" tag="div" class="relative max-w-4xl mx-auto">
      <div v-for="n in 3" :key="n" class="absolute w-full p-2 flex justify-between bg-hogwarts-dark border-hogwarts-accent border-2 rounded-lg">
        <div>
          <p class="text-lg sm:text-2xl">Student was not made prefect!</p>
          <p class="text-sm sm:text-lg">House already has both of their prefects.</p>
        </div>
        <img src="../assets/icons/messenger-owl.svg" alt="messenger owl" class="w-12 place-self-center">
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>