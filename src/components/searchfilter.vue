<template>
  <div class="flex flex-col md:flex-row items-center gap-4 bg-zinc-800 rounded-xl p-4 mb-6 shadow-sm">
    <Search :size="16" class="text-gray-400" />
    <input
      type="text"
      aria-label="Search todos by title"
      placeholder="Search your tasks here..."
      :value="searchTodo"
      @input="handleSearchInput"
      @keydown="handleSearchKeyDown"
      class="input input-bordered bg-zinc-800 text-gray-300 placeholder:text-gray-500 rounded-lg w-full md:w-2/3 border-zinc-600 focus:border-gray-400"
    />
    <Filter :size="16" class="text-gray-400" />
    <select
      aria-label="Filter by completion status"
      :value="todoStatusFilter"
      @change="handleFilterChange"
      class="select select-bordered bg-zinc-800 text-gray-300 rounded-lg w-full md:w-1/3 border-zinc-600 focus:border-gray-400"
    >
      <option value="all">All Tasks</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { Search, Filter } from 'lucide-vue-next'

interface SearchFilterProps {
  searchTodo: string
  todoStatusFilter: "all" | "completed" | "pending"
}

const props = defineProps<SearchFilterProps>()

const emit = defineEmits<{
  'update-search': [value: string]
  'update-filter': [value: "all" | "completed" | "pending"]
}>()

const handleSearchInput = (e: Event): void => {
  const target = e.target as HTMLInputElement
  emit('update-search', target.value)
}

const handleSearchKeyDown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    console.log('Search triggered by Enter key')
  }
}

const handleFilterChange = (e: Event): void => {
  const target = e.target as HTMLSelectElement
  emit('update-filter', target.value as "all" | "completed" | "pending")
}
</script>