<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'| 'text'| 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => ({
  'app-button': true,
  [`app-button--${props.variant}`]: true,
  [`app-button--${props.size}`]: true,
  'app-button--disabled': props.disabled,
  'app-button--full-width': props.fullWidth,
}));

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
.app-button {
  box-sizing: border-box;
  font-family: 'Golos Text', sans-serif;
  font-style: normal;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  vertical-align: middle;
  border-radius: 100px;
  column-gap: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* .app-button--small {} */

.app-button--medium {
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  height: 58px;
  padding: 16px 20px;
}

.app-button--large {
  height: 50px;
  padding: 14px 24px;
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
}

.app-button--primary {
  border: 1px solid var(--baseOrangeColor);
  background-color: var(--baseOrangeColor);
  color: #ffffff;
  &:hover{
    border: 1px solid var(--baseOrangeColorHover);
    background-color: var(--baseOrangeColorHover);
  }
}
.app-button--secondary {
  color: #13151a;
  background: var(--baseGrayColor);
  border: 1px solid var(--baseGrayColor);
}

.app-button--tertiary{
  background-color: var(--secondaryColorHover);
  color: #fff;
  border: none;
  border-radius: 6px;
  &:hover{
    background-color: var(--secondaryColor);
  }
}


.app-button--text{
  border: none;
  background-color: transparent;
  padding: 0;
  height: auto;
  color: var(--buttonTextColor);
  &:hover{
    color: var(--secondaryColor);
  }
}

/*

.app-button--danger {}

.app-button--danger:hover {}

.app-button--success {}

.app-button--success:hover {} */

.app-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-button--full-width {
  width: 100%;
}
</style>
