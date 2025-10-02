<template>
  <div class="custom-select" :style="{ width: width }">
    <button
      @click="isOpen = !isOpen"
      class="select-button"
      :class="{ 'select-button--active': isOpen }"
      :style="{ width: '100%', textAlign: 'left', padding: '0.75rem', borderRadius: radius, backgroundColor: 'white', border: `1px solid ${borderColor}` }"
    >
      {{ selectedLabel || placeholder }}
      <span style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 0.75rem;">▼</span>
    </button>

    <div
      v-if="isOpen"
      class="select-dropdown"
      :style="{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: `1px solid ${borderColor}`, borderRadius: radius, boxShadow: shadow, zIndex: 10, maxHeight: '200px', overflowY: 'auto' }"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        :style="{ padding: '0.75rem 1rem', cursor: 'pointer', transition: 'background 0.2s', backgroundColor: isSelected(option) ? '#e0f2fe' : 'white' }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select...'
  },
  width: {
    type: String,
    default: '100%'
  },
  radius: {
    type: String,
    default: '12px'
  },
  borderColor: {
    type: String,
    default: '#cbd5e1'
  },
  shadow: {
    type: String,
    default: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

const isSelected = (option) => {
  return option.value === props.modelValue
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}
</script>

<style scoped>
.custom-select {
  position: relative;
  display: inline-block;
}
</style>