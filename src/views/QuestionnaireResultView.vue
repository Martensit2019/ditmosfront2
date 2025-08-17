<template>
  <div v-if="!!results" class="result">
    <div class="container">
      <h1 class="result__title">Результат</h1>
      <template v-if="results">
        <div ref="contentRef">
          <!-- <ResultHeader @openPdf="sendPdf" /> -->
          <ResultHeader @openPdf="opnenPdf" @sendPdf="sendPdf" />
          <ResultViolations v-if="isViolations" :violations />
          <ResultSurvey v-if="isQuestions" :questions />
          <ResultFooter />
        </div>
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
import axios from 'axios'

type PdfMakeResultCallback = (result: Buffer<ArrayBufferLike>) => void

const router = useRouter()
const store = useResultsStore()

const results = store.results
if (!results) router.push({ name: 'notFound' })

const violations = ref<IViolations[] | null>(store.violations || null)
const questions = ref<IQuestionsWithWrongAnswer[] | null>(
  store.results?.questionsWithWrongAnswer || null,
)

const isViolations = computed(() => !!(violations.value && violations.value?.length))
const isQuestions = computed(
  () =>
    !!(
      store.results &&
      store.results.questionsWithWrongAnswer &&
      store.results.questionsWithWrongAnswer.length
    ),
)

const violationsPdf = computed(
  () =>
    violations.value?.map((it) => {
      return {
        text: it.violationName,
        marginBottom: 10,
      }
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any

const questionsPdf = computed(() =>
  questions.value?.map((it) => {
    return {
      text: [
        {
          text: `Вопрос ${it.number} \n`,
          color: '#fa712b',
          fontSize: 14,
        },
        {
          text: `${it.text}\n\n`,
          fontSize: 14,
        },
        {
          text: 'Рекомендации\n\n',
          fontSize: 12,
          bold: true,
        },
        {
          text: `${it.memo}\n\n`,
          color: '#334155',
          fontSize: 12,
        },
        {
          text: 'Обязательное требование\n\n',
          fontSize: 12,
          bold: true,
        },
        {
          text: `${it.npa}\n\n`,
          fontSize: 12,
        },
        {
          text: `${it.requirement}\n\n`,
          color: '#334155',
          fontSize: 12,
        },
      ],
    }
  }),
)

async function generatePdf() {
  const pdfMakeModule = await import('pdfmake/build/pdfmake')
  const pdfFonts = await import('pdfmake/build/vfs_fonts')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfMakeModule.default.vfs = pdfFonts.default as any

  const header = function () {
    return [
      {
        columns: [
          {
            svg: `
            <svg viewBox="0 0 122 38" fill="none" xmlns="http://www.w3.org/2000/svg" width="128" height="40" transform="scale(1.1)"><path d="M4.77272 12.1818C7.13635 12.1818 8.72726 10.3864 8.72726 7.68183C8.72726 4.95456 7.13635 3.1591 4.77272 3.1591C2.40908 3.1591 0.818176 4.95456 0.818176 7.68183C0.818176 10.3864 2.40908 12.1818 4.77272 12.1818ZM4.77272 10.9773C2.97726 10.9773 2.15908 9.43181 2.15908 7.68183C2.15908 5.93183 2.97726 4.36365 4.77272 4.36365C6.56817 4.36365 7.38635 5.93183 7.38635 7.68183C7.38635 9.43181 6.56817 10.9773 4.77272 10.9773ZM9.63351 4.52274H12.5199V12H13.8608V4.52274H16.7244V3.27274H9.63351V4.52274ZM18.6804 12H20.0213V8.31821H21.2259L24.0895 12H25.8168L22.2486 7.47728L25.7713 3.27274H24.044L20.9077 7.06819H20.0213V3.27274H18.6804V12ZM27.2741 15.2727H28.6151V10.6591H28.7287C29.0241 11.1364 29.5923 12.1818 31.2741 12.1818C33.456 12.1818 34.9787 10.4318 34.9787 7.6591C34.9787 4.9091 33.456 3.1591 31.2514 3.1591C29.5469 3.1591 29.0241 4.20456 28.7287 4.6591H28.5696V3.27274H27.2741V15.2727ZM28.5923 7.63637C28.5923 5.68183 29.456 4.36365 31.0923 4.36365C32.7969 4.36365 33.6378 5.79546 33.6378 7.63637C33.6378 9.50001 32.7741 10.9773 31.0923 10.9773C29.4787 10.9773 28.5923 9.61361 28.5923 7.63637ZM38.3651 6.43183V3.27274H37.0241V12H40.6832C42.7287 12 43.8423 10.75 43.8423 9.18181C43.8423 7.59092 42.7287 6.43183 40.6832 6.43183H38.3651ZM45.2287 12H46.5696V3.27274H45.2287V12ZM38.3651 7.68183H40.6832C41.7457 7.68183 42.5014 8.32951 42.5014 9.25001C42.5014 10.1307 41.7457 10.75 40.6832 10.75H38.3651V7.68183ZM48.5241 4.52274H51.4105V12H52.7514V4.52274H55.6151V3.27274H48.5241V4.52274ZM58.9119 6.43183V3.27274H57.571V12H61.2301C63.2756 12 64.3892 10.75 64.3892 9.18181C64.3892 7.59092 63.2756 6.43183 61.2301 6.43183H58.9119ZM65.7756 12H67.1165V3.27274H65.7756V12ZM58.9119 7.68183H61.2301C62.2926 7.68183 63.0483 8.32951 63.0483 9.25001C63.0483 10.1307 62.2926 10.75 61.2301 10.75H58.9119V7.68183ZM70.9119 10.0227V3.27274H69.571V12H71.1392L75.321 5.25001V12H76.6619V3.27274H75.1165L70.9119 10.0227ZM74.2301 0.363647C74.2301 0.954557 73.9119 1.47728 73.1165 1.47728C72.321 1.47728 72.0256 0.954557 72.0256 0.363647H70.7756C70.7756 1.59092 71.6847 2.45456 73.1165 2.45456C74.571 2.45456 75.4801 1.59092 75.4801 0.363647H74.2301ZM1.44885 33H5.07954V28.3551H6.43465L9.66476 33H13.9773L9.29829 26.4034L13.9261 19.9091H9.66476L6.10226 24.9886H5.07954V19.9091H1.44885V33ZM20.8871 33.2557C24.8587 33.2557 27.3303 30.5369 27.3303 26.5057C27.3303 22.4489 24.8587 19.7386 20.8871 19.7386C16.9155 19.7386 14.4439 22.4489 14.4439 26.5057C14.4439 30.5369 16.9155 33.2557 20.8871 33.2557ZM20.9041 30.4432C19.0717 30.4432 18.1342 28.7642 18.1342 26.4801C18.1342 24.196 19.0717 22.5085 20.9041 22.5085C22.7024 22.5085 23.6399 24.196 23.6399 26.4801C23.6399 28.7642 22.7024 30.4432 20.9041 30.4432ZM33.1598 19.9091H29.6911V33H33.1598V27.8608H37.6342V33H41.0774V19.9091H37.6342V25.0057H33.1598V19.9091ZM42.603 22.7642H46.7876V33H50.2479V22.7642H54.4666V19.9091H42.603V22.7642ZM56.6676 37.9091H60.2983V30.9034H60.4091C60.9119 31.9943 62.0114 33.2131 64.125 33.2131C67.108 33.2131 69.4347 30.8523 69.4347 26.4716C69.4347 21.9716 67.0057 19.7386 64.1335 19.7386C61.9432 19.7386 60.8949 21.0426 60.4091 22.108H60.2472V19.9091H56.6676V37.9091ZM60.2216 26.4545C60.2216 24.1193 61.2102 22.6278 62.9744 22.6278C64.7727 22.6278 65.7273 24.1875 65.7273 26.4545C65.7273 28.7386 64.7557 30.3239 62.9744 30.3239C61.2273 30.3239 60.2216 28.7898 60.2216 26.4545ZM77.7699 33.2557C81.7415 33.2557 84.2131 30.5369 84.2131 26.5057C84.2131 22.4489 81.7415 19.7386 77.7699 19.7386C73.7983 19.7386 71.3267 22.4489 71.3267 26.5057C71.3267 30.5369 73.7983 33.2557 77.7699 33.2557ZM77.7869 30.4432C75.9545 30.4432 75.017 28.7642 75.017 26.4801C75.017 24.196 75.9545 22.5085 77.7869 22.5085C79.5852 22.5085 80.5227 24.196 80.5227 26.4801C80.5227 28.7642 79.5852 30.4432 77.7869 30.4432ZM85.8068 33H86.8977C89.6761 33 91.1506 31.1591 91.3722 26.7614L91.5767 22.7642H94.8068V33H98.267V19.9091H88.3125L88.0994 25.7045C87.9716 29.0199 87.4602 30.1193 86.2244 30.1193H85.7898L85.8068 33ZM104.55 23.9318V19.9091H101.082V33H107.269C110.738 33 112.775 31.1847 112.783 28.483C112.775 25.7301 110.738 23.9318 107.269 23.9318H104.55ZM104.55 26.7869H107.269C108.488 26.7869 109.349 27.5028 109.366 28.5085C109.349 29.4631 108.488 30.1449 107.269 30.1449H104.55V26.7869Z" fill="#112B27"></path><path d="M120 33C121.105 33 122 32.1046 122 31C122 29.8954 121.105 29 120 29C118.895 29 118 29.8954 118 31C118 32.1046 118.895 33 120 33Z" fill="#F64027"></path></svg>
          `,
            margin: [0, 0, 0, 0],
            width: 70,
          },
          {
            text: 'тест пройден: ' + new Date().toLocaleString('ru-RU'),
            alignment: 'right',
            margin: [0, 5, 0, 0],
            fontSize: 10,
          },
        ],
        margin: [20, 20, 20, 50],
      },
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footer = function (currentPage: any, pageCount: any) {
    return {
      columns: [
        {
          text: `Страница ${currentPage} из ${pageCount}`,
          alignment: 'right',
          margin: [0, 0, 20, 0],
          fontSize: 10,
        },
      ],
      margin: [0, 0, 50, 0],
    }
  }
  const content = [
    {
      text: results?.name,
      fontSize: 14,
      marginTop: 20,
      marginBottom: 10,
    },
    {
      text: `В ${results?.percent}% случаев ваши ответы свидетельствуют о возможных нарушениях требований`,
    },
    {
      text: 'Возможны следующие нарушения:',
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    {
      ul: violationsPdf.value,
    },
    {
      text: 'Результаты опроса:',
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
    },
  ]

  if (questionsPdf.value && questionsPdf.value.length) {
    for (let i = 0; i < questionsPdf.value.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.push(questionsPdf.value[i] as any)
    }
  }

  const docDefinition = {
    header,
    footer,
    content,
    pageSize: 'A4',
    pageMargins: [50, 50, 50, 50],
  }
  return docDefinition
}

async function opnenPdf() {
  const pdfMakeModule = await import('pdfmake/build/pdfmake')

  const docDefinition = await generatePdf()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDoc = pdfMakeModule.default.createPdf(docDefinition as any)
  pdfDoc.download('Результаты опроса.pdf')
}

async function sendPdf() {
  const percent = store.percent?.toString() || 0
  const pdfMakeModule = await import('pdfmake/build/pdfmake')
  const pdfFonts = await import('pdfmake/build/vfs_fonts')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfMakeModule.default.vfs = pdfFonts.default as any

  const docDefinition = await generatePdf()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfDoc = pdfMakeModule.default.createPdf(docDefinition as any) as any
    const pdfBytes = await new Promise<Buffer<ArrayBufferLike>>((resolve) => {
      const callback: PdfMakeResultCallback = (result: Buffer<ArrayBufferLike>) => {
        resolve(result)
      }
      pdfDoc.getBuffer(callback)
    })

    console.log('pdfBytes', pdfBytes)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })

    const formData = new FormData()
    formData.append('file', blob, 'document.pdf')
    formData.append('percent', percent as string)
    formData.append('recipientEmail', store.email as string)
    console.log('formData', formData)

    await sendPdfByEmail(formData)

    //alert('PDF успешно сгенерирован и отправлен!')
  } catch (error) {
    console.error('Ошибка при генерации или отправке PDF:', error)
    //alert('Произошла ошибка при обработке PDF')
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendPdfByEmail(formData: any) {
  //  const formData = new FormData()
  //   formData.append('recipientEmail', recipientEmail)
  //   formData.append('percent', percent.value.toString())
  try {
    const res = await axios.post('https://ditmosserver2.onrender.com/send-mail', formData)
    console.log('res', res.data)
  } catch (err) {
    console.log('err', err)
  }
}
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
