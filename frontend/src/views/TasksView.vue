<template>
  <div class="container" style="min-height: 100vh; padding-top: 2rem; padding-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1 style="font-size: 1.75rem; font-weight: 700; color: var(--gray-800);">My Tasks</h1>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>

    <!-- Task Form -->
    <TaskForm
      v-if="!editingTask"
      @submit="createTask"
    />
    <TaskForm
      v-else
      :initial-data="editingTask"
      :is-editing="true"
      @submit="updateTask"
      @cancel="editingTask = null"
    />

    <!-- Search -->
    <div style="margin-bottom: 1rem;">
      <input
        v-model="filters.search"
        type="text"
        class="form-input"
        placeholder="Search tasks by title or description..."
      />
    </div>

    <!-- Filters & Sort -->
    <div class="filter-controls" style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; align-items: center; max-width: 100%;">
      <CustomSelect
        v-model="filters.completed"
        :options="[
          { label: 'All Status', value: '' },
          { label: 'Completed', value: 'true' },
          { label: 'Pending', value: 'false' }
        ]"
        placeholder="All Status"
        style="min-width: 140px;"
      />

      <CustomSelect
        v-model="sortConfig.sortBy"
        :options="[
          { label: 'Sort by Date', value: 'createdAt' },
          { label: 'Sort by Title', value: 'title' }
        ]"
        placeholder="Sort by Date"
        style="min-width: 140px;"
      />

      <CustomSelect
        v-model="sortConfig.order"
        :options="[
          { label: 'Newest First', value: 'desc' },
          { label: 'Oldest First', value: 'asc' }
        ]"
        placeholder="Newest First"
        style="min-width: 160px;"
      />
    </div>

    <!-- Skeleton loader -->
    <div v-if="loading" style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="card skeleton" style="padding: 1.25rem;">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-meta"></div>
        <div class="skeleton-actions">
          <div class="skeleton-btn"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
      <div class="card skeleton" style="padding: 1.25rem;">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-meta"></div>
        <div class="skeleton-actions">
          <div class="skeleton-btn"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
      <div class="card skeleton" style="padding: 1.25rem;">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-meta"></div>
        <div class="skeleton-actions">
          <div class="skeleton-btn"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
    </div>

    <!-- No tasks -->
    <div v-else-if="tasks.length === 0" class="card" style="text-align: center; padding: 3rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
      <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">No tasks found</h3>
      <p style="color: var(--gray-600);">
        {{ filters.search ? 'Try a different search term.' : 'Create your first task!' }}
      </p>
    </div>

    <!-- Task List -->
    <transition-group name="fade" tag="div" style="display: flex; flex-direction: column; gap: 1rem;">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="startEdit"
        @delete="deleteTask"
      />
    </transition-group>

    <!-- Pagination -->
    <div v-if="meta.totalPages > 1" class="pagination">
      <button
        v-for="page in meta.totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="['page-btn', { 'active': meta.page === page }]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash-es'
import api from '@/utils/api'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import CustomSelect from '@/components/CustomSelect.vue'

const router = useRouter()
const tasks = ref([])
const loading = ref(false)
const editingTask = ref(null)

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user.id

// State
const filters = ref({
  completed: '',
  search: ''
})

const sortConfig = ref({
  sortBy: 'createdAt',
  order: 'desc'
})

const meta = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1
})

// Logout
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

// Fetch tasks from API
const fetchTasks = async () => {
  loading.value = true
  try {
    const params = {
      userId,
      page: meta.value.page,
      limit: meta.value.limit,
      sortBy: sortConfig.value.sortBy,
      order: sortConfig.value.order
    }

    // Add Filter
    if (filters.value.completed !== '') {
      params.completed = filters.value.completed
    }
    if (filters.value.search) {
      params.search = filters.value.search
    }
    
    const response = await api.get('/tasks', { params })
    tasks.value = response.data.data
    meta.value = { ...response.data.meta }
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    if (err.response?.status === 401) {
      logout()
    }
  } finally {
    loading.value = false
  }
}

// CRUD
const createTask = async (taskData) => {
  try {
    await api.post('/tasks', taskData)
    meta.value.page = 1
    fetchTasks()
  } catch (err) {
    alert('Failed to create task')
  }
}

const startEdit = (task) => {
  editingTask.value = { ...task }
  scrollToTop()
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const updateTask = async (updatedTask) => {
  try {
    await api.put(`/tasks/${updatedTask.id}`, updatedTask)
    editingTask.value = null
    fetchTasks()
  } catch (err) {
    alert('Failed to update task')
  }
}

const deleteTask = async (id) => {
  if (!confirm('Delete this task?')) return
  try {
    await api.delete(`/tasks/${id}`)
    if (tasks.value.length === 1 && meta.value.page > 1) {
      meta.value.page -= 1
    }
    fetchTasks()
  } catch (err) {
    alert('Failed to delete task')
  }
}

// Pagination
const goToPage = (page) => {
  meta.value.page = page
  fetchTasks()
}

// Init
onMounted(() => {
  if (!userId) {
    router.push('/login')
    return
  }
  fetchTasks()
})

// Watch all filter changes, sort, dan search
const debouncedFetch = debounce(() => {
  meta.value.page = 1
  fetchTasks()
}, 300)

watch([filters, sortConfig], debouncedFetch, { deep: true })
</script>