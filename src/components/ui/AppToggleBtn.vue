<template>
    <button class="toggle-btn">
      <AppMdiIcon :icon-path="mdiFilterVariant" size="22" />
    </button>
</template>

<script lang="ts" setup>
import AppMdiIcon from '@/components/ui/AppMdiIcon.vue'
import { mdiFilterVariant } from '@mdi/js';
</script>

<style lang="scss" scoped>
  .toggle-btn{
    border: none;
    color: #000000;
    border: 1px solid #D2D7D6;
    background-color: #ffffff;
    border-radius: 6px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    &.show{
      border-color: #D2D7D6;
      color: #fa9a8d;
      border: 1px solid #FFF5F2;
      background-color: #FFF5F2;
    }
  }
</style>
