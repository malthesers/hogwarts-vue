<template>
  <div class="fixed z-10 top-0 left-0 w-full h-full p-4 pointer-events-none">
    <TransitionGroup name="slide" tag="div" class="relative max-w-2xl mx-auto">
      <div v-for="message in formattedMessages" :key="message" class="absolute w-full p-2 flex justify-between bg-hogwarts-dark border-hogwarts-accent border-2 rounded-lg">
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

const titles = ref({
  gender: 'Student was not made prefect!',
  house: 'Student was not made prefect!',
  inquisitor: 'Student was not made an inquisitor!',
  hacking: 'Student was not made an inquisitor!',
  expulsion1: 'Student could not be expelled!',
  expulsion2: 'Student could not be expelled!',
  expulsion3: 'Student could not be expelled!'
})

const descriptions = ref({
  gender: 'already has a prefect of that gender.',
  house: 'already has both of their prefects.',
  inquisitor: 'is neither a Slytherin nor pure of blood.',
  hacking: 'has been removed as an inquisitor.',
  expulsion1: 'Do not try to expel this student again.',
  expulsion2: 'I said do NOT try to expel this student again!',
  expulsion3: 'This is the last warning. Do NOT expel this student!'
})

const formattedMessages = computed(() => {
  let formattedMessages = []

  messages.value.forEach((msg) => {
    formattedMessages.push({
      title: titles.value[msg.type],
      description: `${msg.query} ${descriptions.value[msg.type]}`
    })
  })

  return formattedMessages
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-150%);
}
</style>