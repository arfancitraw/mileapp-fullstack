<template>
  <div :class="task.completed ? 'task-item task-completed' : 'task-item task-pending'">
    <div style="flex: 1;">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <p class="task-meta">{{ new Date(task.createdAt).toLocaleDateString() }}</p>
    </div>
    <div style="display: flex; gap: 0.5rem; margin-left: 1rem; flex-shrink: 0;">
      <button
        @click="onEdit"
        class="btn btn-secondary"
        style="width: 60px; padding: 0.4rem 0.75rem; font-size: 0.85rem; text-align: center;"
      >
        Edit
      </button>
      <button
        @click="onDelete"
        class="btn btn-danger"
        style="width: 60px; padding: 0.4rem 0.75rem; font-size: 0.85rem; text-align: center;"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: Object
})

const emit = defineEmits(['edit', 'delete'])

const onEdit = () => emit('edit', props.task)
const onDelete = () => emit('delete', props.task.id)
</script>