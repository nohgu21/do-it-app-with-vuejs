<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="openModal"
      class="btn bg-zinc-700 text-gray-300 font-semibold rounded-xl hover:bg-zinc-600 transition px-4 py-2 flex items-center gap-2"
      ref="addTodoBtnRef"
    >
      <Plus :size="16" />Add Todo
    </button>

    <!-- Modal Overlay -->
    <div 
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="handleBackdropClick"
    >
      <!-- Modal Content -->
      <div 
        class="bg-zinc-800 text-gray-300 rounded-lg p-6 w-full max-w-md mx-4"
        @click.stop
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" class="font-bold text-lg mb-4">Add a New Task</h3>

        <form @submit.prevent="onSubmit">
          <input
            type="text"
            placeholder="e.g. Bake plantain pie"
            :class="[
              'w-full bg-zinc-700 text-gray-300 placeholder:text-gray-500 rounded-lg mb-4 px-3 py-2 border',
              formErrors.todo ? 'border-red-500' : 'border-zinc-600'
            ]"
            v-model="formData.todo"
            @input="validateTodo"
            ref="todoInputRef"
          />

          <p v-if="formErrors.todo" class="text-red-400 text-sm mb-4">
            {{ formErrors.todo }}
          </p>

          <div class="flex gap-3 justify-end">
            <button
              type="button"
              class="px-4 py-2 border border-zinc-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 hover:text-gray-200 rounded-xl transition flex items-center gap-2"
              @click="handleModalClose"
            >
              <X :size="16" />Cancel
            </button>

            <button
              type="submit"
              :disabled="!isFormValid || isPending"
              class="px-4 py-2 border border-zinc-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 hover:text-gray-200 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
            >
              <Plus :size="16" />
              {{ isPending ? 'Adding...' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Plus, X } from 'lucide-vue-next'

interface TodoFormData {
  todo: string
}

interface TodoResponse {
  id: number
  todo: string
  completed: boolean
  userId: number
  message?: string
}

const emit = defineEmits<{
  'todo-added': [todo: TodoResponse]
}>()

const addTodoBtnRef = ref<HTMLButtonElement | null>(null)
const todoInputRef = ref<HTMLInputElement | null>(null)
const isPending = ref(false)
const isModalOpen = ref(false)

const formData = reactive<TodoFormData>({
  todo: ''
})

const formErrors = reactive({
  todo: ''
})

const isFormValid = computed(() => {
  return formData.todo.trim().length > 0 && !formErrors.todo
})

const validateTodo = (): void => {
  if (!formData.todo.trim()) {
    formErrors.todo = 'Todo is required'
  } else {
    formErrors.todo = ''
  }
}

const resetForm = (): void => {
  formData.todo = ''
  formErrors.todo = ''
}

const openModal = (): void => {
  isModalOpen.value = true
  nextTick(() => {
    todoInputRef.value?.focus()
  })
}

const closeModal = (): void => {
  isModalOpen.value = false
  nextTick(() => {
    addTodoBtnRef.value?.focus()
  })
}

const handleBackdropClick = (): void => {
  handleModalClose()
}

const onSubmit = async (): Promise<void> => {
  validateTodo()
  if (!isFormValid.value) return

  isPending.value = true

  try {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: formData.todo,
        completed: false,
        userId: 1,
      }),
    })

    const data: TodoResponse = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to add task')

    emit('todo-added', data)
    resetForm()
    closeModal()

  } catch (error) {
    console.error('Error adding todo:', error)
  } finally {
    isPending.value = false
  }
}

const handleModalClose = (): void => {
  resetForm()
  closeModal()
}

const handleKeyDown = (e: KeyboardEvent): void => {
  if (!isModalOpen.value) return

  if (e.key === 'Escape') {
    handleModalClose()
  }
  if (e.key === 'Enter' && formData.todo.trim() && !isPending.value) {
    e.preventDefault()
    onSubmit()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>