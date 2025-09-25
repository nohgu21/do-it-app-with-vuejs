<template>
  <div v-if="hasError" class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="text-center">
      <div class="mb-8">
        <div class="text-6xl mb-4">😬</div>
        <h1 class="text-4xl font-bold text-white mb-4">
          Yikes. Something went wrong 😬
        </h1>
        <p class="text-xl text-gray-400 mb-8">
          It's not you, it's us. Try refreshing or head back home.
        </p>
        <div class="space-x-4">
          <button 
            @click="refresh"
            class="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Refresh
          </button>
          <router-link 
            to="/"
            class="bg-zinc-600 hover:bg-zinc-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Go Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)

onErrorCaptured((error: Error, instance, info: string) => {
  console.error('Error caught by boundary:', error, { instance, info })
  hasError.value = true
  return false
})

const refresh = () => {
  window.location.reload()
}
</script>