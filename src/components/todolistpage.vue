<template>
  <main class="font-lato min-h-screen bg-black text-gray-300 px-4 py-8 flex items-center justify-center">
    <div class="w-full max-w-3xl space-y-6">
      <!-- Rendering my greetings as the header -->
      <div class="text-center space-y-1">
        <Greeting />
        <p class="text-sm text-gray-400">How are you? What are you doing today?</p>
      </div>
      <!-- Rendering my filter & search -->
      <SearchFilter
        :search-todo="searchTodo"
        @update-search="setSearchTodo"
        :todo-status-filter="todoStatusFilter"
        @update-filter="setTodoStatusFilter"
      />
      <AddTodoModal 
        :is-open="modalOpen" 
        @close="() => setModalOpen(false)" 
      />
      <!-- Rendering my Todo/task list -->
      <MyTodoList
        :search-todo="searchTodo"
        :todo-status-filter="todoStatusFilter"
        :current-page="currentPage"
        @update-page="setCurrentPage"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Greeting from '../components/greeting.vue'
import MyTodoList from '../components/todolist.vue'
import AddTodoModal from '../components/todomodal.vue'
import SearchFilter from '../components/searchfilter.vue'

const modalOpen = ref<boolean>(false)
const searchTodo = ref<string>("")
const todoStatusFilter = ref<"all" | "completed" | "pending">("all")
const currentPage = ref<number>(1)

const setModalOpen = (value: boolean) => {
  modalOpen.value = value
}

const setSearchTodo = (value: string) => {
  searchTodo.value = value
}

const setTodoStatusFilter = (value: "all" | "completed" | "pending") => {
  todoStatusFilter.value = value
}

const setCurrentPage = (value: number) => {
  currentPage.value = value
}
</script>