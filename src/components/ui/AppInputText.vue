<template>
  <InputText
    v-bind="$attrs"
    v-model="localValue"
    :placeholder="placeholder"
    :class="['input', { error }]"
    @blur="handleBlur"
    @keyup.enter="handleEnter"
  />
  <small v-if="error" class="p-error">{{ errorMessage }}</small>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/InputText'

interface IProps {
  modelValue?: string
  errorMessage?: string
  placeholder?: string
  error?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  errorMessage: '',
  placeholder: 'Введите текст...',
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'enter'): void
}>()

const localValue = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  },
})

function handleBlur() {
  emit('blur')
}

function handleEnter() {
  emit('enter')
}
</script>

<style scoped>
.input {
  width: 100%;
}
.error {
  border: 1px solid var(--secondaryColor);
}

.p-error {
  display: block;
  margin-top: 5px;
  color: var(--secondaryColor);
}
</style>
