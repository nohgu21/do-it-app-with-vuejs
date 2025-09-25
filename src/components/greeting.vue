<template>
  <h1 class="text-2xl font-bold text-gray-200">{{ greeting }}</h1>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const greeting = ref<string>('')

onMounted(() => {
  console.log("Say hello to the user...")
  const hour = new Date().getHours()
  
  if (hour < 12) {
    greeting.value = 'Good Morning ☀️'
  } else if (hour < 17) {
    greeting.value = 'Good Afternoon 🌤️'
  } else {
    greeting.value = 'Good Evening 🌙'
  }
})
</script>