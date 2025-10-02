<template>
  <div :class="isEditing ? 'card editing' : 'card'">
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
import { reactive } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ title: '', description: '', completed: false })
  },
  isEditing: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ ...props.initialData })

const handleSubmit = () => {
  emit('submit', { ...form })
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