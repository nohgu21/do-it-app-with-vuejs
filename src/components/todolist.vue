<template>
  <main class="bg-zinc-800 mt-4 rounded-xl p-4 space-y-6 shadow-lg text-gray-300" aria-label="Todo list section">
   
    <div v-if="isLoading" class="text-gray-300 text-center mt-8" role="status" aria-live="polite">
      Loading...
    </div>

   
    <div v-else-if="error" class="text-red-400 text-center mt-8">
      Error: {{ error }}
    </div>


    <div v-else-if="!data || !Array.isArray(data)" class="text-gray-300 text-center mt-8">
      No tasks found.
    </div>

   
    <template v-else>
      <ul class="space-y-4" role="list">
        <li 
          v-for="todo in paginatedTodos" 
          :key="todo.id" 
          role="listitem" 
          class="bg-zinc-700 hover:bg-zinc-600 px-4 py-3 rounded-xl transition-colors"
        >
          <router-link
            :to="`/todos/${todo.id}`"
            class="flex justify-between items-center font-medium"
            :aria-label="`View details for todo: ${todo.todo}`"
          >
            <span>{{ todo.todo }}</span>
            <span
              :class="[
                'text-sm px-2 py-1 rounded-full font-semibold',
                todo.completed ? 'bg-green-600' : 'bg-yellow-500'
              ]"
              :aria-label="`Status: ${todo.completed ? 'Completed' : 'Pending'}`"
            >
              {{ todo.completed ? 'Completed' : 'Pending' }}
            </span>
          </router-link>

          <div class="flex gap-2 mt-2">
            <button
              class="btn btn-xs bg-zinc-600 text-gray-300 hover:bg-zinc-500"
              aria-label="Edit"
              @click="handleEditClick(todo)"
            >
              <Pencil :size="16" />
            </button>

            <button
              @click="handleDeleteClick(todo.id)"
              class="btn btn-xs bg-zinc-700 text-red-400 border border-red-500 hover:bg-zinc-600"
              aria-label="Delete"
            >
              <Trash2 :size="16" />
            </button>
          </div>
        </li>
      </ul>

      <!-- Pagination -->
      <nav class="flex justify-between items-center" role="navigation" aria-label="Pagination Navigation">
        <button
          :disabled="currentPage === 1"
          @click="setCurrentPage(currentPage - 1)"
          class=" bg-zinc-700 rounded-lg text-gray-300 px-4 py-2 flex items-center hover:bg-zinc-600 disabled:bg-gray-600"
          aria-label="Previous Page"
        >
          <ChevronLeft :size="16" />Previous
        </button>

        <span class="text-sm" aria-live="polite" aria-atomic="true">
          Page {{ currentPage }} of {{ totalPages || 1 }}
        </span>

        <button
          :disabled="currentPage === totalPages || totalPages === 0"
          @click="setCurrentPage(currentPage + 1)"
          class="bg-zinc-700 text-gray-300 flex items-center rounded-lg px-4 py-2 hover:bg-zinc-600 disabled:bg-gray-600"
          aria-label="Next Page"
        >
          Next <ChevronRight :size="16" />
        </button>
      </nav>

      
      <EditTodoModal 
        v-if="selectedTodo" 
        :todo="selectedTodo" 
        @close="handleCloseModal" 
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-vue-next'
import EditTodoModal from './edittodo.vue'

interface Todo {
  id: number
  todo: string
  completed: boolean
}

interface MyTodoListProps {
  searchTodo: string
  todoStatusFilter: "all" | "completed" | "pending"
  currentPage: number
}

const props = defineProps<MyTodoListProps>()

const emit = defineEmits<{
  'update-page': [value: number]
}>()

const selectedTodo = ref<Todo | null>(null)
const data = ref<Todo[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string>('')
const limit = 10

// Fetch todos function
const fetchCachedTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://dummyjson.com/todos')
  if (!response.ok) throw new Error('Failed to fetch todos')
  const result = await response.json()
  return result.todos
}

// Load todos
const loadTodos = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    data.value = await fetchCachedTodos()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

// Computed properties
const filteredTodos = computed(() => {
  if (!data.value) return []
  
  return data.value.filter(
    (todo) =>
      todo.todo.toLowerCase().includes(props.searchTodo.toLowerCase()) &&
      (props.todoStatusFilter === "all" ||
        (props.todoStatusFilter === "completed" && todo.completed) ||
        (props.todoStatusFilter === "pending" && !todo.completed))
  )
})

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / limit))

const paginatedTodos = computed(() => {
  const skip = (props.currentPage - 1) * limit
  const start = skip
  const end = start + limit
  return filteredTodos.value.slice(start, end)
})

// Methods
const setCurrentPage = (page: number) => {
  emit('update-page', page)
}

const handleDeleteClick = async (todoId: number): Promise<void> => {
  const confirmDelete = window.confirm('Hmm... Are you sure you want to delete this task?')
  if (!confirmDelete) return

  try {
    const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: 'DELETE',
    })
    
    if (!res.ok) throw new Error('Failed to delete')
    
    // Remove from local data
    data.value = data.value.filter((todo) => todo.id !== todoId)
  } catch (err) {
    console.error('Error deleting todo:', err)
  }
}

const handleEditClick = (todo: Todo): void => {
  selectedTodo.value = todo
}

const handleCloseModal = (): void => {
  selectedTodo.value = null
}

// Watch for search/filter changes to reset page
watch([() => props.searchTodo, () => props.todoStatusFilter], () => {
  setCurrentPage(1)
})

// Load todos on mount
loadTodos()

console.log("Fetched Data:", data.value)
</script>