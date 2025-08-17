<template>
  <div class="questcard" :class="{ all: questionnaire.link === '/questionnaires' }">
    <div class="questcard__title">{{ questionnaire.title }}</div>
    <div class="questcard__description">{{ questionnaire.description }}</div>
    <RouterLink :to="questionnaire.link" class="questcard__link">
      <AppCircle :color="bgCircle">
        <img v-if="questionnaire.icon" :src="iconUrl" alt="" />
        <AppMdiIcon v-else :icon-path="mdiArrowRight" size="24" />
      </AppCircle>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IPopular } from '@/api/types'
import AppMdiIcon from '@/components/ui/AppMdiIcon.vue'

import { mdiArrowRight } from '@mdi/js'
import AppCircle from './ui/AppCircle.vue'

interface IProps {
  questionnaire: IPopular
}
const props = defineProps<IProps>()
const bgCircle = computed(() =>
  props.questionnaire.link === '/questionnaires'
    ? 'var(--baseOrangeColor)'
    : 'var(--baseGreenColor)',
)

const iconUrl = computed(() => `./src/assets/i/${props.questionnaire.icon}.svg`)
</script>

<style lang="scss" scoped>
.questcard {
  flex-basis: calc(33% - 20px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  background: var(--baseWhiteColor);
  border-radius: 16px;
  &.all {
    background: var(--bgPeach);
  }
  @media screen and (max-width: 990px) {
    flex-basis: calc(50% - 30px);
  }
  @media screen and (max-width: 780px) {
    flex-basis: 100%;
  }
  &:nth-child(1) {
    @media screen and (max-width: 780px) {
      border-bottom: 1px solid var(--grayBorderColor);
      padding-bottom: 20px;
    }
  }

  &__title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    @media screen and (max-width: 990px) {
      font-size: 22px;
    }
  }
  &__description {
    color: #5d6570;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 28px;
  }
  &__link {
    margin-top: auto;
    width: 60px;
    @media (max-width: 600px) {
      margin-left: auto;
    }
  }
}
</style>
