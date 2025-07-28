<template>
  <div ref="dropdown" class="dropdown">
    <div class="dropdown__head" @click="toggle">
      <div class="dropdown__info">Показывать по</div>
      <div class="dropdown__count">{{ count }}</div>
      <div class="dropdown__arrow"></div>
    </div>
    <div v-if="isOpen" class="dropdown__options">
      <ul>
        <li
          v-for="(option, idx) in options"
          :key="idx"
          class="dropdown__option"
          @click="setOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref<number>(6)
const isOpen = ref<boolean>(false)
const dropdown = ref()

const options = [6, 12, 18, 24]

const setOption = (option: number) => {
  count.value = option
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleClick = (e: Event) => {
  const target = e.target as HTMLElement
  const parentDropdown = target!.closest('.dropdown')
  if (parentDropdown === dropdown.value) return
  if (isOpen.value) isOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})
onUnmounted(() => {
  window.removeEventListener('click', handleClick)
})
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
}
li {
  list-style-type: none;
}
.dropdown {
  &__head {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    cursor: pointer;
    position: relative;
  }
  &__info {
    color: #677775;
  }
  &__count {
    color: #f64027;
    margin: 0 10px;
  }
  &__arrow {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent #f64027 transparent;
    transform: rotate(180deg);
    margin-top: 9px;
  }
  &__options {
    background: #ffffff;
    border: 1px solid #c8c8c8;
    box-shadow: 0 0 6px #00000029;
    position: absolute;
    width: 170px;
    z-index: 100;
  }
  &__option {
    padding: 12px;
    &:hover {
      background-color: #eaeaea;
      cursor: pointer;
    }
  }
}
</style>
