<template>
  <Textarea
    v-model="localValue"
    :class="['textarea', { error: error }]"
    :placeholder="placeholder"
    :rows="rows"
    :cols="cols"
    :autoResize="autoResize"
    :disabled="disabled"
    @blur="handleBlur"
  />
  <small v-if="error" class="p-error">{{ errorMessage }}</small>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Textarea from 'primevue/textarea'

interface IProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  cols?: number
  autoResize?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: 'Введите текст...',
  rows: 5,
  cols: 30,
  autoResize: false,
  disabled: false,
  error: false,
  errorMessage: 'Ошибка заполнения поля',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  },
})

const handleBlur = () => {
  emit('blur')
}
</script>

<style scoped>
.textarea {
  width: 100%;
}
.error {
  border: 1px solid var(--secondaryColor);
}
.p-error {
  display: block;
  margin-bottom: 20px;
  color: var(--secondaryColor);
}
</style>
