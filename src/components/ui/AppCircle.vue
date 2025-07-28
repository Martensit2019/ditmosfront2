<template>
  <div
    class="app-circle"
    :style="baseStyles"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  size?: number
  textColor?: string
  hoverColor?: string
  hoverTextColor?: string
}>(), {
  color: 'var(--secondaryColorHover)',
  size: 56,
  textColor: '#FFF',
  hoverColor: '', // Пустая строка вместо undefined
  hoverTextColor: ''
})

const isHovered = ref(false)

const baseStyles = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: isHovered.value && props.hoverColor
    ? props.hoverColor
    : props.color,
  color: isHovered.value && props.hoverTextColor
    ? props.hoverTextColor
    : props.textColor,
  transition: 'all 0.3s ease'
}))
</script>

<style lang="scss" scoped>
.app-circle {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
