<template>
  <section class="main__section questionnaires">
    <div class="container questionnaires__wrapper">
        <template v-for="questionnaire in questionnaires" :key="questionnaire.id">
          <QuestionnaireItem :questionnaire :isTopic />
        </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IQuestionnaire } from '@/api/types'
import QuestionnaireItem from './QuestionnaireItem.vue'

interface IProps {
  questionnaires: IQuestionnaire[]
  isTopic: boolean
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.questionnaires {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 32px;
    @media screen and (max-width: 1200px){
      column-gap: 0;
    }
  }
}
</style>
