<template>
  <main class="font-lato min-h-screen bg-black flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md bg-zinc-800 text-gray-300 p-6 rounded-2xl shadow-xl space-y-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center text-gray-300 mt-8">
        Loading...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-400 mt-8">
        Error: {{ error }}
      </div>

      <!-- Not Found State -->
      <div v-else-if="!todo" class="text-center text-gray-300 mt-8">
        Todo not found.
      </div>

      <!-- Todo Content -->
      <template v-else>
        <button
          @click="handleGoBack"
          class="px-4 py-2 bg-zinc-700 border border-zinc-600 text-gray-300 font-semibold hover:bg-zinc-600 hover:text-gray-200 transition-all rounded-lg"
        >
          View complete list
        </button>

        <div class="space-y-1">
          <strong>Title:</strong>
          <p class="font-bold text-lg text-gray-200">{{ todo.todo }}</p>
        </div>

        <div class="space-y-1">
          <p class="font-bold text-lg">Status:</p>
          <span
            :class="[
              'inline-block px-3 py-1 text-sm rounded-full font-medium text-white',
              todo.completed ? 'bg-green-600' : 'bg-yellow-500'
            ]"
          >
            {{ todo.completed ? 'Completed' : 'Pending' }}
          </span>
        </div>

        <div class="space-y-1">
          <!-- Completed Task -->
          <h3 
            v-if="todo.completed"
            class="bg-green-600 text-white text-center py-3 rounded-lg font-semibold text-lg shadow-md"
          >
            Yipee 🎉 Task completed!
          </h3>

          <!-- Pending Task -->
          <template v-else>
            <p class="font-bold text-lg">What's this task about?</p>
            <input
              type="text"
              :value="description"
              @input="handleDescriptionChange"
              placeholder="Briefly describe your task..."
              class="w-full bg-zinc-700 text-gray-300 placeholder:text-gray-500 border border-zinc-600 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
            />
            <button
              @click="handleAddTask"
              class="w-full mt-3 px-4 py-2 bg-zinc-700 text-gray-300 hover:bg-zinc-600 border border-zinc-600 rounded-lg transition-colors"
            >
              Update Task
            </button>
          </template>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Todo {
  id: number
  todo: string
  completed: boolean
}

const route = useRoute()
const router = useRouter()

const todo = ref<Todo | null>(null)
const description = ref<string>('')
const isLoading = ref<boolean>(false)
const error = ref<string>('')

const fetchTodoDetails = async (id: string): Promise<Todo> => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`)
  if (!response.ok) throw new Error('Failed to fetch details to this task')
  return response.json()
}

const loadTodo = async () => {
  const id = route.params.id as string
  if (!id) {
    error.value = 'Todo ID is required'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    todo.value = await fetchTodoDetails(id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

const handleAddTask = (): void => {
  if (!description.value.trim()) {
    alert('Please enter a task description.')
    return
  }
  
  if (!todo.value) return

  console.log('New Task Added:', {
    title: todo.value.todo,
    status: todo.value.completed ? 'Completed' : 'Pending',
    description: description.value,
  })
  
  alert('Task added! (Check console for now)')
  description.value = ''
}

const handleDescriptionChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  description.value = target.value
}

const handleGoBack = (): void => {
  router.push('/')
}

// Load todo when component mounts
onMounted(() => {
  loadTodo()
})
</script>