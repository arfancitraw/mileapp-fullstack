<template>
  <div class="container" style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div class="card" style="width: 100%; max-width: 420px; text-align: center;">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 700; color: var(--gray-800);">Task Manager</h1>
        <p style="color: var(--gray-600); margin-top: 0.5rem;">Sign in to manage your tasks</p>
      </div>

      <form @submit.prevent="handleLogin" style="text-align: left;">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary"
          style="width: 100%;"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div v-if="error" style="margin-top: 1.25rem; padding: 0.75rem; background: #fee2e2; color: #b91c1c; border-radius: var(--radius); display: flex; align-items: center; gap: 0.5rem;">
        <span>❌</span>
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const email = ref('john@example.com')
const password = ref('password123')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/login', { email: email.value, password: password.value })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    router.push('/tasks')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>