<template>
  <!-- <div class="result"> -->
  <div v-if="!!results" class="result">
    <div class="container">
      <h1 class="result__title">Результат</h1>
      <template v-if="results">
        <ResultHeader />
        <ResultViolations v-if="isViolations" :violations />
        <ResultSurvey v-if="isQuestions" :questions />
        <ResultFooter />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useResultsStore } from '@/stores/result'
import ResultHeader from '@/components/QuestionnaireResult/ResultHeader.vue'
import ResultViolations from '@/components/QuestionnaireResult/ResultViolations.vue'
import ResultSurvey from '@/components/QuestionnaireResult/ResultSurvey.vue'
import ResultFooter from '@/components/QuestionnaireResult/ResultFooter.vue'
import type { IQuestionsWithWrongAnswer, IViolations } from '@/api/types'

const router = useRouter()
const store = useResultsStore()

const results = store.results
if (!results) router.push({ name: 'notFound' })

const violations = ref<IViolations[] | null>(store.violations || null)
const questions = ref<IQuestionsWithWrongAnswer[] | null>(
  store.results?.questionsWithWrongAnswer || null,
)

const isViolations = computed(() => !!(violations && violations.value?.length))
const isQuestions = computed(
  () =>
    !!(
      store.results &&
      store.results.questionsWithWrongAnswer &&
      store.results.questionsWithWrongAnswer.length
    ),
)
</script>

<style lang="scss" scoped>
.result {
  &__title {
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 74px;
    line-height: 74px;
    color: #13151a;
    margin-bottom: 32px;
    @media (max-width: 700px) {
      font-size: 42px;
      line-height: 40px;
    }
  }
}
</style>
