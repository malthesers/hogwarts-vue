<template>
  <div class="fixed z-10 top-0 left-0 w-full h-full p-4 pointer-events-none">
    <TransitionGroup name="slide" tag="div" class="relative max-w-2xl mx-auto">
      <div v-for="message in messages" :key="message" class="absolute w-full p-2 flex justify-between bg-hogwarts-dark border-hogwarts-accent border-2 rounded-lg">
        <div>
          <p class="text-md sm:text-2xl">{{ message.title }}</p>
          <p class="text-sm sm:text-lg">{{ message.description }}</p>
        </div>
        <img src="../assets/icons/messenger-owl.svg" alt="messenger owl" class="w-12 place-self-center">
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import useMessages from '../composables/messages.js'
const { messages } = useMessages()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-150%);
  /* opacity: 0; */
}
</style>