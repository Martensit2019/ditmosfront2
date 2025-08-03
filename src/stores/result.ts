import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  IQuestionsWithWrongAnswer,
  IQuiz,
  IResults,
  IViolations,
  WrongAnswerInfo,
} from '@/api/types'

export const useResultsStore = defineStore('survey-results', () => {
  const results = ref<IResults | null>(null)
  const isDialogEmailVisible = ref<boolean>(false)
  const isDialogConfirmVisible = ref<boolean>(false)

  const violations = computed(() => {
    if (!results.value) return null
    return Object.values(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      results.value.wrongAnswers.reduce((acc, item) => {
        if (!acc[item.violationName]) {
          acc[item.violationName] = {
            violationName: item.violationName,
            memo: [item.memo],
          }
        } else {
          acc[item.violationName].memo.push(item.memo)
        }
        return acc
      }, {}),
    ) as IViolations[]
  })

  const percent = computed(() => results.value && results.value.percent)

  const setResults = (
    quiz: IQuiz,
    questionsWithWrongAnswer: IQuestionsWithWrongAnswer[],
    wrongAnswers: WrongAnswerInfo[],
    progressStepTotal: number,
  ) => {
    let percent = progressStepTotal
      ? Math.round((wrongAnswers.length / progressStepTotal) * 100)
      : 0

    if (percent > 100) percent = 100

    let title
    if (!percent) {
      title = 'Несоответствий не выявлено'
    } else if (percent <= 20) {
      title = 'Выявлены незнaчительные несоответствия'
    } else if (percent > 20 && percent < 60) {
      title = 'Выявлены несоответствия'
    } else {
      title = 'Выявлены знaчительные несоответствия'
    }

    const correctAnswers = progressStepTotal - wrongAnswers.length

    results.value = {
      name: quiz ? quiz.name : '',
      questionsWithWrongAnswer: Array.from(new Set(questionsWithWrongAnswer)),
      wrongAnswers: Array.from(new Set(wrongAnswers)),
      percent,
      title,
      correctAnswers,
      totalQuestions: progressStepTotal,
    } as IResults
  }

  return { results, violations, percent, isDialogEmailVisible, isDialogConfirmVisible, setResults }
})
