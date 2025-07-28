import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IQuiz, IResults, IViolations, WrongAnswerInfo } from '@/api/types'

export const useResultsStore = defineStore('survey-results', () => {
  const results = ref<IResults | null>(null)

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

  const setResults = (quiz: IQuiz, wrongAnswers: WrongAnswerInfo[], progressStepTotal: number) => {
    let percent = progressStepTotal
      ? Math.round((wrongAnswers.length / progressStepTotal) * 100)
      : 0

    if (percent > 100) percent = 100

    let title
    if (!percent) {
      title = 'Нарушений обязательных требований не выявлено'
    } else if (percent <= 33.3) {
      title = 'Возможны незначительные нарушения обязательных требований'
    } else if (percent > 33.3 && percent < 66.6) {
      title = 'Возможны нарушения обязательных требований'
    } else {
      title = 'Высокая вероятность нарушения обязательных требований'
    }

    results.value = {
      name: quiz ? quiz.name : '',
      wrongAnswers: Array.from(new Set(wrongAnswers)),
      percent,
      title,
    } as IResults
  }

  return { results, violations, setResults }
})
