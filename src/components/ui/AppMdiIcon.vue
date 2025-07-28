<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="color"
    class="mdi-icon"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  iconPath: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
});
</script>

<style scoped>
.mdi-icon {
  display: inline-block;
  vertical-align: middle;
  margin: 0 2px;
}
</style>
