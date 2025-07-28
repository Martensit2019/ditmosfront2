<template>
  <template v-if="isLoading">
    <div style="height: 200px; display: flex; justify-content: center; align-items: center">
      LOADING ...
    </div>
  </template>
  <template v-else>
    <QuestionnaireQuiz :quiz />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import QuestionnaireQuiz from '@/components/QuestionnaireQuiz.vue'
import { getQuizByIdRequest } from '@/api'

const route = useRoute()
const questionnaireId = route.params.quizId

const quiz = ref(null)
const isLoading = ref<boolean>(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await getQuizByIdRequest(questionnaireId as string)
    if (data) {
      quiz.value = JSON.parse(JSON.stringify(data[0]))
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})
</script>
