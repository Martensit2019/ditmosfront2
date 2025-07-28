<template>
  <component
    :is="tag"
    :class="linkClasses"
    :href="isExternal ? to : undefined"
    :to="isExternal ? undefined : to"
    :target="target"
    :rel="computedRel"
    @click="handleClick"
  >
    <!-- Слот для иконки перед текстом -->
    <span v-if="$slots['before-icon']" class="before-icon">
      <slot name="before-icon"></slot>
    </span>

    <!-- Текст из пропса -->
    <span class="link-text">{{ text }}</span>

    <!-- Слот для иконки после текста -->
    <span v-if="$slots['after-icon']" class="after-icon">
      <slot name="after-icon"></slot>
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

interface Props {
  to: string | RouteLocationRaw;
  text: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  underline?: 'always' | 'hover' | 'none';
  target?: '_blank' | '_self' | '_parent' | '_top';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'primary',
  size: 'medium',
  underline: 'none',
  target: '_self',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const isExternal = computed(() => {
  return typeof props.to === 'string' &&
    (props.to.startsWith('http') || props.to.startsWith('mailto:') || props.to.startsWith('tel:'));
});

const tag = computed(() => isExternal.value ? 'a' : 'router-link');

const computedRel = computed(() => {
  return isExternal.value && props.target === '_blank' ? 'noopener noreferrer' : undefined;
});

const linkClasses = computed(() => ({
  'app-link': true,
  [`app-link--${props.variant}`]: true,
  [`app-link--${props.size}`]: true,
  [`app-link--underline-${props.underline}`]: true,
  'app-link--disabled': props.disabled,
}));

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click', event);

  if (isExternal.value && props.target !== '_blank') {
    window.location.href = props.to as string;
  }
};
</script>

<style lang="scss" scoped>
.app-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.link-text {
  order: 1;
}

.before-icon {
  order: 0;
  display: inline-flex;
  align-items: center;
}

.after-icon {
  order: 2;
  display: inline-flex;
  align-items: center;
}

/* Варианты */

.app-link--primary {
  color: #f64027;
  font-family: Inter,sans-serif;
}
.app-link--primary:hover {
  color: #f75d47;
}
// .app-link--secondary {}
// .app-link--secondary:hover {}

.app-link--text {
  color: inherit;
}

/* Размеры */

// .app-link--small {}

.app-link--medium {
  font-family: Inter,sans-serif;
  font-size: 14px;
  font-weight: 500!important;
  line-height: 20px;
}

// .app-link--large {}

/* Подчеркивание */
.app-link--underline-always {
  text-decoration: underline;
}

.app-link--underline-hover {
  text-decoration: none;
}

.app-link--underline-hover:hover {
  text-decoration: underline;
}

.app-link--underline-none {
  text-decoration: none;
}

/* Состояния */
.app-link--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
