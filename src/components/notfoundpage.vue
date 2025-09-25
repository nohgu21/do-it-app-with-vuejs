<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="text-center">
      <div class="text-8xl font-bold text-white mb-4 tracking-wider">
        ERROR 404
      </div>
      <h1 class="text-4xl font-bold text-white mb-4">
        Oops. This page packed its bags and left
      </h1>
      <p class="text-xl text-gray-400 mb-8">
        We can't find it either. Maybe it went for a walk?
      </p>
      <p class="text-gray-500 mb-8">
        Try the homepage instead.
      </p>
      <router-link 
        to="/"
        class="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

// Usage example in main component or App.vue:
/*
<template>
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>
*/