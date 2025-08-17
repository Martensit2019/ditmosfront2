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
  const email = ref<string | null>(null)
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

  const sendMail = async (recipientEmail: string) => {
    return fetch('https://ditmosserver2.onrender.com/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipientEmail, percent: percent.value }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log('err', err))
  }

  // sendMail(settingsData.email, productData.title, price.split(' ')[0], productData.link)

  return {
    results,
    email,
    violations,
    percent,
    isDialogEmailVisible,
    isDialogConfirmVisible,
    setResults,
    sendMail,
  }
})
