<template>
  <!-- Modal Overlay -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="handleBackdropClick"
  >
    <!-- Modal Content -->
    <div 
      class="bg-zinc-800 text-gray-300 rounded-xl p-6 w-full max-w-md mx-4 relative border border-zinc-600"
      @click.stop
      role="dialog" 
      aria-modal="true"
    >
      <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
        <Pencil class="text-gray-400" :size="20" /> Edit Todo
      </h3>
      
      <button
        @click="onClose"
        class="absolute right-3 top-3 w-8 h-8 rounded-full bg-zinc-700 text-gray-300 hover:bg-zinc-600 flex items-center justify-center transition"
        aria-label="Close edit modal"
      >
        <X :size="18" />
      </button>
      
      <input
        type="text"
        :value="editedTodo"
        @input="handleInputChange"
        class="w-full bg-zinc-700 text-gray-300 border border-zinc-600 rounded-lg px-3 py-2 mb-4 placeholder-gray-500 focus:outline-none focus:border-zinc-500"
        aria-label="Edit todo title"
        ref="inputRef"
      />
      
      <div class="flex gap-3 justify-end">
        <button
          class="px-4 py-2 border border-zinc-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 hover:text-gray-200 rounded-xl transition"
          @click="onClose"
          aria-label="Cancel editing"
        >
          Cancel
        </button>
        
        <button
          class="px-4 py-2 border border-zinc-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 hover:text-gray-200 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
          :disabled="isPending"
          @click="handleUpdate"
          aria-label="Update todo"
        >
          <template v-if="isPending">
            <Loader2 class="animate-spin" :size="16" />
            Updating...
          </template>
          <template v-else>
            Update
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Pencil, X, Loader2 } from 'lucide-vue-next'

interface Todo {
  id: number
  todo: string
  completed: boolean
}

interface TodoResponse {
  id: number
  todo: string
  message?: string
}

interface EditTodoModalProps {
  todo: Todo
}

const props = defineProps<EditTodoModalProps>()

const emit = defineEmits<{
  close: []
  updated: [todo: Todo]
}>()

const editedTodo = ref<string>(props.todo.todo)
const isPending = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)

const handleInputChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  editedTodo.value = target.value
}

const handleUpdate = async (): Promise<void> => {
  if (!editedTodo.value.trim()) return

  isPending.value = true
  
  try {
    const res = await fetch(`https://dummyjson.com/todos/${props.todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: editedTodo.value })
    })

    const data: TodoResponse = await res.json()
    
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update')
    }

    emit('updated', { ...props.todo, todo: data.todo })
    emit('close')
    
  } catch (error) {
    console.error('Error updating todo:', error)
  } finally {
    isPending.value = false
  }
}

const onClose = (): void => {
  emit('close')
}

const handleBackdropClick = (): void => {
  onClose()
}

const handleKeyDown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    onClose()
  }
  if (e.key === 'Enter' && !isPending.value) {
    handleUpdate()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  // Focus the input when modal opens
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select() // Select all text for easy editing
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>