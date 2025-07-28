<template>
  <Dialog
    v-model:visible="internalVisible"
    :modal="modal"
    :position="position"
    :breakpoints="breakpoints"
    :style="style"
    :class="classDialog"
    @hide="$emit('hide')"
    @show="$emit('show')"
  >
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>

    <slot />

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Dialog from 'primevue/dialog';
import type { DialogProps } from 'primevue/dialog';

type PositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

interface Props {
  modelValue: boolean;
  modal?: boolean;
  position?: PositionType;
  breakpoints?: DialogProps['breakpoints'];
  style?: Record<string, string | number>;
  classDialog?: string | Record<string, boolean> | Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  modal: true,
  position: 'center',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'hide'): void;
  (e: 'show'): void;
}>();

const internalVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
