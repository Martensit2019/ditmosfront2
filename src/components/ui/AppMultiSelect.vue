<template>
  <div
    class="app-multi-select"
    :class="wrapperClass"
    v-bind="$attrs"
    @click="setPlaceholderSearchInput"
  >
    <MultiSelect
      v-model="selectedValues"
      :options="filteredOptions"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :filter="filter"
      :disabled="disabled"
      :class="[inputClass, { 'p-invalid': error, 'p-disabled': disabled }]"
      :display="display"
      :selection-limit="selectionLimit"
      :max-selected-labels="maxSelectedLabels"
      :show-toggle-all="showToggleAll"
      :panel-class="panelClass"
      :selected-items-label="selectedItemsLabel"
      showClear
      @filter="onFilter"
    >
      <!-- Если нет данных по введённому запросу, то такое сообщение: -->
      <template #emptyfilter> Результаты не найдены </template>
      <!-- Если нет опшинов, то такое сообщение: -->
      <template #empty> Результаты не найдены </template>
      <!-- <template> Результаты не найдены </template> -->
    </MultiSelect>

    <small v-if="error" class="p-error">{{ error }}</small>
    <small v-else-if="hint" class="p-hint">{{ hint }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiSelect from 'primevue/multiselect'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  optionLabel?: string
  optionValue?: string
  placeholder?: string
  filter?: boolean
  error?: string
  hint?: string
  disabled?: boolean
  display?: 'chip' | 'comma'
  selectionLimit?: number
  maxSelectedLabels?: number
  showToggleAll?: boolean
  wrapperClass?: string
  inputClass?: string
  panelClass?: string
  selectedItemsLabel?: string
  emptyFilterMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  optionLabel: 'label',
  optionValue: 'value',
  placeholder: 'Выберите',
  filter: false,
  disabled: false,
  display: 'chip',
  maxSelectedLabels: 1,
  showToggleAll: false,
  selectionLimit: undefined,
  selectedItemsLabel: '{0}',
  emptyFilterMessage: 'hhh',
})

const emit = defineEmits(['update:modelValue'])

const selectedValues = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value || []),
})

const filterValue = ref('')

const filteredOptions = computed(() => {
  if (!props.filter || !filterValue.value) return props.options

  return props.options.filter((option) => {
    const label = option[props.optionLabel]?.toString().toLowerCase() || ''
    return label.includes(filterValue.value.toLowerCase())
  })
})

const onFilter = (event: { value: string }) => {
  filterValue.value = event.value
}

const setPlaceholderSearchInput = () => {
  document
    .querySelectorAll('.p-inputtext.p-component.p-multiselect-filter')
    .forEach((item) => item.setAttribute('placeholder', 'Начните вводить значение'))
}
</script>

<style lang="scss">
.app-multi-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.p-multiselect-header {
  padding: 0 !important;
  .p-icon {
    display: none;
  }
  .p-multiselect-filter,
  .p-multiselect-filter:focus,
  .p-multiselect-filter:enabled {
    border-radius: 0 !important;
    border: none;
    border-bottom: 1px solid #eaeaea !important;
    border-color: #eaeaea !important;
    box-shadow: none;
  }
}

.p-error {
  color: var(--red-500);
  font-size: 0.875rem;
}

.p-hint {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.p-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
