<template>
  <div :class="isEditing ? 'card editing' : 'card'">
    <div v-if="successMessage" style="margin-bottom: 1rem; padding: 0.75rem; background: #d1fae5; color: #047857; border-radius: var(--radius); display: flex; align-items: center; gap: 0.5rem;">
      <span>✅</span>
      <span>{{ successMessage }}</span>
    </div>

    <div v-if="errorMessage" style="margin-bottom: 1rem; padding: 0.75rem; background: #fee2e2; color: #b91c1c; border-radius: var(--radius); display: flex; align-items: center; gap: 0.5rem;">
      <span>❌</span>
      <span>{{ errorMessage }}</span>
    </div>
    <h3 style="margin-bottom: 1.25rem; font-size: 1.25rem; font-weight: 600;">
      {{ isEditing ? 'Edit Task' : 'Add New Task' }}
    </h3>
    <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">Description (optional)</label>
        <textarea
          v-model="form.description"
          class="form-textarea"
        ></textarea>
      </div>
      
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <input
          v-model="form.completed"
          type="checkbox"
          id="completed"
          style="width: 18px; height: 18px;"
        />
        <label for="completed" style="font-weight: 500; color: var(--gray-800);">Mark as completed</label>
      </div>
      
      <div style="display: flex; gap: 0.75rem;">
        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ isEditing ? 'Update Task' : 'Add Task' }}
        </button>
        <button
          v-if="isEditing"
          @click="onCancel"
          type="button"
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ title: '', description: '', completed: false })
  },
  isEditing: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ ...props.initialData })
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    await emit('submit', { ...form })

    if (props.isEditing) {
      successMessage.value = 'Task updated successfully!'
      errorMessage.value = ''
      await nextTick()
      setTimeout(() => {
        successMessage.value = ''
        emit('cancel')
      }, 1500)
    } else {
      form.title = ''
      form.description = ''
      form.completed = false
      successMessage.value = 'Task created successfully!'
      errorMessage.value = ''
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Operation failed. Please try again.'
    successMessage.value = ''
  }
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.editing {
  border: 2px solid var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2); }
  70% { box-shadow: 0 0 0 8px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
}
</style>