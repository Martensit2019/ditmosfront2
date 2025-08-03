<template>
  <HeroBanner :banner />
  <template v-if="isLoading">
    <div style="height: 200px; display: flex; justify-content: center; align-items: center">
      LOADING ...
    </div>
  </template>
  <template v-else>
    <TheFilters ref="filters" :total="questionnaires.length" :isTopic />
    <QuestionnairesEmpty v-if="!questionnaires.length" />
    <QuestionnairesList :questionnaires :isTopic />
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionnairesListRequest } from '@/api'
import type { IQuestionnaire } from '@/api/types'
import HeroBanner from '@/components/HeroBanner.vue'
import TheFilters from '@/components/TheFilters.vue'
import QuestionnairesEmpty from '@/components/QuestionnairesEmpty.vue'
import QuestionnairesList from '@/components/QuestionnairesList.vue'

const route = useRoute()
const router = useRouter()

const questionnairesListId = route.params.id

const banner = ref({
  img: '',
  title: '',
  subtitle: '',
})

const filters = ref()
// const isSelectedRegions = computed(() => filters.value && filters.value.isSelected) // для выбранного региона, пока фильтр по регионам отключили
const questionnaires = ref<IQuestionnaire[]>([])
const isTopic = false
const isLoading = ref<boolean>(false)

const getQuestionnairesList = async () => {
  try {
    isLoading.value = true
    const { data } = await getQuestionnairesListRequest(questionnairesListId as string)
    if (data) {
      if (!data.length) return router.push({ name: 'notFound' })
      const { img, title, description, children } = data[0]
      banner.value = { img, title: `Анкеты по теме ${title}`, subtitle: description }
      questionnaires.value = JSON.parse(JSON.stringify(children))
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

// watch(isSelectedRegions, (oldVal, newVal) => {
//   if (
//     (oldVal === false && newVal === undefined) ||
//     (oldVal === null && newVal === false) ||
//     (oldVal === false && newVal === null)
//   ) {
//     return
//   }

//   if (!isSelectedRegions.value) {
//     getQuestionnairesList()
//   } else {
//     questionnaires.value = []
//   }
// })

onMounted(() => {
  getQuestionnairesList()
})
</script>
