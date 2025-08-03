<template>
  <HeroBanner :banner />
  <template v-if="isLoading">
    <div style="height: 200px; display: flex; justify-content: center; align-items: center">
      LOADING ...
    </div>
  </template>
  <template v-else>
    <TheFilters ref="filters" :total :isTopic="true" />
    <QuestionnairesEmpty v-if="!questionnaires.length" />
    <QuestionnairesList v-else :questionnaires :isTopic="true" />
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { IQuestionnaire } from '@/api/types'
import { getQuestionnairesRequest } from '@/api'
import HeroBanner from '@/components/HeroBanner.vue'
import TheFilters from '@/components/TheFilters.vue'
import QuestionnairesEmpty from '@/components/QuestionnairesEmpty.vue'
import QuestionnairesList from '@/components/QuestionnairesList.vue'

const banner = {
  img: 'https://quiz.knd.mos.ru/assets/png/questionnaires-hero.png',
  title: 'Анкеты <br />для каждого бизнеса',
  subtitle:
    ' Специально разработанные сервисы<br />позволят вам проверить вероятность нарушений<br />и получить рекомендации по их устранению',
}

const total = ref(0)
const filters = ref()
// const isSelectedRegions = computed(() => filters.value && filters.value.isSelected) // для выбранного региона, пока фильтр по регионам отключили

const questionnaires = ref<IQuestionnaire[]>([])
const isLoading = ref(false)

const getQuestionnaires = async () => {
  try {
    isLoading.value = true
    const { data } = await getQuestionnairesRequest()
    if (data) {
      total.value = data.length
      questionnaires.value = data
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

// для выбранного региона, пока фильтр по регионам отключили
// watch(isSelectedRegions, (oldVal, newVal) => {
//   if (
//     (oldVal === false && newVal === undefined) ||
//     (oldVal === null && newVal === false) ||
//     (oldVal === false && newVal === null)
//   ) {
//     return
//   }

//   if (!isSelectedRegions.value) {
//     getQuestionnaires()
//   } else {
//     total.value = 0
//     questionnaires.value = []
//   }
// })

onMounted(() => {
  getQuestionnaires()
})
</script>
