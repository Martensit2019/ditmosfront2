<template>
  <div class="quiz">
    <div class="container">
      <div class="quiz__wrapper">
        <div class="quiz__top">
          <div v-if="showPrev" class="quiz__top-prev" @click="goBack">
            &#8592;<span>Предыдущий вопрос</span>
          </div>
          <div v-else></div>
          <div class="quiz__top-title">{{ quiz?.name }}</div>
          <div class="quiz__top-close">
            <AppButton @click="openDialog" variant="text">
              Закрыть
              <slot>
                <AppMdiIcon :icon-path="mdiClose" size="16" />
              </slot>
            </AppButton>
          </div>
        </div>
        <div class="quiz__progress">
          <div class="quiz__progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="quiz__body">
          <div class="quiz__question">
            <div class="quiz__title">Ответьте на вопросы</div>
            <!-- Start Уточняющие вопросы -->
            <div v-if="isAdditional" class="quiz__additional-question">
              <div class="quiz__additional-question--title">
                Уточнения к вопросу {{ currentQuestionNumber + 1 }}
              </div>
              <div
                class="quiz__additional-question--text"
                style="padding-top: 26px; padding-left: 24px"
              >
                Уточняющий вопрос {{ currentQuestionNumberAdditional + 1 }} из
                {{ totalQuestionsAdditional }}
              </div>
              <div class="quiz__question-text">{{ currentQuestionAdditional }}</div>
              <div v-if="isImageCurrentQuestionAdditional" class="quiz__answer-images">
                <div
                  class="quiz__answer-image"
                  v-for="btn in currentAnswersAdditional"
                  @click="selectAnswerAdditional(btn)"
                  :key="btn.id"
                >
                  <img :src="btn.image" alt="" />
                </div>
              </div>

              <div v-else class="quiz__answer-btns">
                <AppButton
                  v-for="btn in currentAnswersAdditional"
                  @click="selectAnswerAdditional(btn)"
                  :key="btn.id"
                  :disabled="isFullProgress"
                  variant="primary"
                  >{{ btn.text }}</AppButton
                >
              </div>
            </div>
            <!-- End Уточняющие вопросы -->
            <div v-else>
              <div>
                Вопрос {{ currentQuestionNumber + 1 }} из {{ totalQuestions }}
                <span v-if="isQuestionsInCurrentAnswers" class="quiz__clarifications">
                  При ответе «Да» будут показаны уточняющие вопросы
                </span>
              </div>
              <div class="quiz__question-text">{{ currentQuestion }}</div>

              <div class="quiz__answer-btns">
                <AppButton
                  v-for="btn in currentAnswers"
                  @click="selectAnswer(btn)"
                  :key="btn.id"
                  :disabled="isFullProgress"
                  variant="primary"
                  class="quiz__btn"
                  >{{ btn.text }}</AppButton
                >
              </div>
            </div>

            <div v-if="isFullProgress" class="quiz__complete">
              <AppButton variant="secondary">Отменить и закрыть</AppButton>
              <div></div>
              <div style="text-align: end">
                <AppButton variant="primary" class="mr32" @click="complete"
                  >Завершить&nbsp;опрос</AppButton
                >
              </div>
            </div>
          </div>

          <div class="quiz__wrap-requirement">
            <div class="quiz__requirement">
              <div class="quiz__requirement-circle">
                <AppMdiIcon :icon-path="mdiPlaylistEdit" size="20" />
              </div>
              <div>Требование из проверочного листа</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppDialog
    v-model="isDialogVisible"
    :modal="true"
    position="top"
    :style="{ width: '732px', maxWidth: '100%' }"
    class="custom-dialog"
    @hide="onDialogHide"
    @show="onDialogShow"
  >
    <template #header>
      <div>Подтверждение</div>
    </template>

    <div class="dialog-content">
      Вы внесли изменения, которые будут потеряны, если Вы прервете процесс. Продолжить?
    </div>

    <template #footer>
      <AppButton variant="primary">Продолжить</AppButton>
      <AppButton label="Подтвердить" variant="text" @click="isDialogVisible = false"
        >Вернуться</AppButton
      >
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from './ui/AppButton.vue'
import AppMdiIcon from './ui/AppMdiIcon.vue'
import type {
  IQuiz,
  Answer,
  TQuestionAnswer,
  WrongAnswerInfo,
  IQuestionsWithWrongAnswer,
  Question,
} from '@/api/types'
import { mdiClose, mdiPlaylistEdit } from '@mdi/js'
import AppDialog from './ui/AppDialog.vue'
import { useResultsStore } from '@/stores/result'

interface IProps {
  quiz: IQuiz | null
}

const route = useRoute()
const router = useRouter()
const store = useResultsStore()

// const quizId = route.params.quizId

const props = defineProps<IProps>()

const addedAnswers = ref<TQuestionAnswer>({}) // объект {вопрос_id: ответ_на_этот_вопрос_id}
const currentQuestionNumber = ref<number>(0)
const isAdditional = ref<boolean>(false)

// Id текущего вопроса для отправки результатов
const currentQuestionNumberInfo = computed(() =>
  props.quiz && props.quiz.questions.length
    ? props.quiz.questions[currentQuestionNumber.value]
    : null,
)
// Id текущего вопроса для отправки результатов
const currentQuestionNumberId = computed(() =>
  props.quiz && props.quiz.questions.length
    ? props.quiz.questions[currentQuestionNumber.value].id
    : null,
)

const progress = ref<number>(0)
const progressStepValue = ref<number>(0)
const progressStepTotal = ref<number>(0)
const isAddedProgressStep = ref<boolean>(false)

const isFullProgress = computed(() => progress.value === 100)

const totalQuestions = computed(() => props.quiz && props.quiz.questions.length)
const showPrev = computed(
  () => progress.value && totalQuestions.value && progressStepTotal.value > 1,
)

const currentQuestion = computed(
  () => props.quiz && props.quiz.questions[currentQuestionNumber.value].text,
)
const currentAnswers = computed(
  () => props.quiz && props.quiz.questions[currentQuestionNumber.value].answers,
)

const isQuestionsInCurrentAnswers = computed(
  () => currentAnswers.value && currentAnswers.value[0].questions,
)

const questionsAdditional = ref()

const currentQuestionNumberAdditional = ref<number>(0)

const totalQuestionsAdditional = computed(
  () => questionsAdditional.value && questionsAdditional.value.length,
)
const currentQuestionNumberInfoAdditional = computed(
  () =>
    questionsAdditional.value && questionsAdditional.value[currentQuestionNumberAdditional.value],
)
const currentQuestionNumberIdAdditional = computed(
  () =>
    questionsAdditional.value &&
    questionsAdditional.value[currentQuestionNumberAdditional.value].id,
)
const currentQuestionAdditional = computed(
  () =>
    questionsAdditional.value &&
    questionsAdditional.value[currentQuestionNumberAdditional.value].text,
)
const isImageCurrentQuestionAdditional = computed(
  () =>
    questionsAdditional.value &&
    questionsAdditional.value[currentQuestionNumberAdditional.value].questionType === 'IMAGE',
)
const currentAnswersAdditional = computed(
  () =>
    questionsAdditional.value &&
    questionsAdditional.value[currentQuestionNumberAdditional.value].answers,
)

const addQuestionWithWrongAnswer = (question: Question, answer: WrongAnswerInfo) => {
  // if(isAdditional.value)

  const number = isAdditional.value
    ? `${question.number}.${currentQuestionNumberInfoAdditional.value?.number}`
    : question.number

  const text =
    isAdditional.value && currentQuestionNumberInfoAdditional.value
      ? currentQuestionNumberInfoAdditional.value.text
      : question.text

  questionsWithWrongAnswer.value.push({
    number,
    text,
    memo: answer.memo as string,
    requirement: answer.requirement as string,
    npa: answer.npa as string,
  })
}

const addAnswers = (question: string, answer: string) => {
  addedAnswers.value[question] = answer
}

const questionsWithWrongAnswer = ref<IQuestionsWithWrongAnswer[]>([]) //Вопросы с неправильными ответами
const wrongAnswers = ref<WrongAnswerInfo[]>([]) //Неправильные ответы

const responseProcessing = (answer: Answer) => {
  if (!answer.isWrongAnswer) return
  if (currentQuestionNumberInfo.value)
    addQuestionWithWrongAnswer(currentQuestionNumberInfo.value, answer.wrongAnswerInfo)
  wrongAnswers.value.push(answer.wrongAnswerInfo)
}

const selectAnswer = (answer: Answer) => {
  responseProcessing(answer)
  if (currentQuestionNumberId.value && answer.id)
    addAnswers(currentQuestionNumberId.value, answer.id)

  if (answer.questions && answer.questions.length > 1) {
    progressStepTotal.value = currentQuestionNumber.value + 1 + answer.questions.length
    progressStepValue.value = 100 / progressStepTotal.value
    isAddedProgressStep.value = true
    progress.value += progressStepValue.value
    if (Math.round(progress.value) >= 100) progress.value = 100
  } else {
    if (totalQuestions.value) {
      progressStepTotal.value = totalQuestions.value
      progressStepValue.value = 100 / progressStepTotal.value
      progress.value += progressStepValue.value
      if (Math.round(progress.value) >= 100) progress.value = 100
    }
  }
  if (currentQuestionNumberId.value && answer.id)
    addAnswers(currentQuestionNumberId.value, answer.id)

  if (isQuestionsInCurrentAnswers.value && answer.questions) {
    isAdditional.value = true
    questionsAdditional.value = [...answer.questions]
    return
  }

  if (totalQuestions.value && currentQuestionNumber.value + 1 < totalQuestions.value)
    currentQuestionNumber.value++
}

const selectAnswerAdditional = (answer: Answer) => {
  responseProcessing(answer)
  if (currentQuestionNumberIdAdditional.value && answer.id)
    addAnswers(currentQuestionNumberIdAdditional.value, answer.id)
  if (isAddedProgressStep.value) progress.value += progressStepValue.value
  if (progress.value > 100) progress.value = 100
  if (
    totalQuestionsAdditional.value &&
    currentQuestionNumberAdditional.value + 1 < totalQuestionsAdditional.value
  ) {
    currentQuestionNumberAdditional.value++
  } else {
    if (totalQuestions.value && totalQuestions.value !== 1) {
      isAdditional.value = false
      if (totalQuestions.value && currentQuestionNumber.value + 1 < totalQuestions.value)
        currentQuestionNumber.value++
    } else {
      progressStepTotal.value -= 1
    }
  }
}

const goBack = () => {
  questionsWithWrongAnswer.value.pop()
  wrongAnswers.value.pop()
  if (progress.value === 100) {
    progress.value -= 2 * progressStepValue.value
  } else {
    progress.value -= progressStepValue.value
    if (progress.value < 0.1) {
      progress.value = 0
    }
  }

  if (isAdditional.value) {
    if (!currentQuestionNumberAdditional.value) {
      isAdditional.value = false
    } else {
      currentQuestionNumberAdditional.value--
    }
  } else {
    currentQuestionNumber.value--
  }
}

const complete = async () => {
  // start по логике отправлять просто объект вопрос:ответ на бэкенд https://quiz.knd.mos.ru
  // const payload = {
  //   quiz: addedAnswers.value,
  //   multipleAnswers: {},
  //   organizationId: null,
  // }

  // const response = axios.post(
  //   `https://quiz.knd.mos.ru/api/risk-calculator/quiz/${quizId}/calculate`,
  //   payload,
  // )
  // end по логике отправлять просто объект вопрос:ответ на бэкенд https://quiz.knd.mos.ru

  // start обработка результатов опроса на фронте
  if (props.quiz) {
    store.setResults(
      props.quiz,
      questionsWithWrongAnswer.value,
      wrongAnswers.value,
      progressStepTotal.value,
    )
    router.push(`${route.path}/result`)
  }
  // end обработка результатов опроса на фронте
}

const openDialog = () => {
  isDialogVisible.value = true
}
const isDialogVisible = ref(false)
const onDialogHide = () => {
  console.log('Диалог закрыт')
}
const onDialogShow = () => {
  console.log('Диалог открыт')
}
</script>

<style lang="scss" scoped>
.quiz {
  &__top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px 0;
    @media screen and (max-width: 780px) {
      justify-content: flex-start;
    }
  }
  &__row {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 24px;
  }
  &__top-prev,
  &__top-close {
    font-size: 18px;
    span {
      font-size: 14px;
      margin-left: 10px;
    }
    &:hover {
      cursor: pointer;
      span {
        color: red;
      }
    }
    @media screen and (max-width: 780px) {
      width: 100%;
      margin-bottom: 8px;
    }
  }
  &__top-title {
    font-size: 16px;
    @media screen and (max-width: 780px) {
      width: 100%;
      margin-bottom: 8px;
    }
  }
  &__top-close {
    text-align: end;
    span {
      margin-right: 10px;
    }
  }
  &__progress {
    width: 100%;
    height: 2px;
    background-color: #fff;
    overflow: hidden; // нужно ли
  }
  &__progress-bar {
    height: 100%;
    background-color: #f64027;
    transition: width 0.3s ease;
  }
  &__title {
    font-size: 56px;
    line-height: 64px;
    color: #112b27;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 8px;
  }
  &__question {
    width: calc(100% - 270px - 32px);
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
  &__clarifications {
    border-radius: 3px;
    padding: 0 8px;
    font-size: 14px;
    margin-left: 16px;
    background-color: #fff5f2;
  }
  &__question-text {
    font-size: 56px;
    line-height: 64px;
    color: #112b27;
    font-size: 24px;
    line-height: 32px;
    font-size: 20px;
    line-height: 28px;
    margin-top: 16px;
  }
  &__answer-btns {
    margin: 32px 0 35px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    img {
      width: 100%;
    }
  }
  &__answer-images {
    margin: 32px 0 35px;
    display: flex;
    gap: 16px;
  }
  &__answer-image {
    width: 50%;
    cursor: pointer;
    img {
      width: 100%;
      object-fit: contain;
      border-radius: 30px;
    }
  }
  &__wrap-requirement {
    width: 270px;
    align-self: center;
    @media screen and (max-width: 780px) {
      width: 100%;
      margin-bottom: 32px;
    }
  }
  &__requirement {
    background: #fff;
    padding: 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    height: 80px;
    font-size: 16px;
  }
  &__requirement-circle {
    display: flex;
    border-radius: 50%;
    min-width: 32px;
    height: 32px;
    align-items: center;
    padding: 8px;
    background: #d2d7d6;
  }
  &__additional-question--title {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 24px;
    font-size: 16px;
    line-height: 24px;
    color: #112b27;
  }
  &__additional-question--text {
    padding-top: 26px;
    padding-left: 24px;
  }
  &__btn {
    min-width: 80px;
    justify-content: center;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    margin-top: 32px;
    justify-content: space-between;
  }
  &__complete {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 32px;
  }
}
</style>
