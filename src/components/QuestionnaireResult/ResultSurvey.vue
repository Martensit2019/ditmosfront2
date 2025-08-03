<template>
  <div class="result-violations">
    <div class="result-violations__title">Результаты опроса</div>

    <Accordion :value="[]" multiple>
      <AccordionPanel
        v-for="question in questions"
        :key="question.number"
        :value="question.number"
        class="accordion-panel"
        style="border-radius: 24px; overflow: hidden"
      >
        <AccordionHeader>
          <div class="accordeon__title-box">
            <div>
              <div class="accordeon__title-question">Вопрос {{ question.number }}</div>
              <div class="accordeon__title" style="">{{ question.text }}</div>
            </div>
            <div class="accordeon__trigger"></div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="result-violations__subtitle">Рекомендации</div>
          <p class="result-violations__memo">{{ question.memo }}</p>
          <template v-if="question.npa">
            <div class="result-violations__subtitle">Обязательное требование</div>
            <p class="result-violations__npa">{{ question.npa }}</p>
          </template>
          <p>{{ question.requirement }}</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { IQuestionsWithWrongAnswer } from '@/api/types'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

interface IProps {
  questions: IQuestionsWithWrongAnswer[] | null
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.result-violations {
  font-family: 'Golos Text';
  font-style: normal;
  margin-top: 92px;
  @media (max-width: 770px) {
    margin-top: 68px;
  }
  @media (max-width: 460px) {
    margin-top: 72px;
  }
  &__title {
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    color: #13151a;
    margin-bottom: 32px;
    @media (max-width: 770px) {
      font-size: 28px !important;
      line-height: 32px !important;
    }
  }
  &__subtitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #13151a;
    margin-bottom: 12px;
  }
  &__memo {
    margin-bottom: 18px;
  }
  &__npa {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #13151a;
    margin-bottom: 18px;
  }
}
.accordeon {
  &__title {
    margin: 0 auto 0 0;
    font-family: 'Golos Text' !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 20px !important;
    line-height: 24px !important;
    color: #13151a !important;
    @media (max-width: 460px) {
      font-size: 18px !important;
      margin: 0;
    }
    &-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    &-question {
      font-family: 'Golos Text';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: var(--baseOrangeColor);
      margin-bottom: 8px;
      @media (max-width: 460px) {
        font-size: 18px;
      }
    }
  }
  &__trigger {
    min-width: 56px;
    height: 56px;
    background-image: url('../../assets/i/arrow-up.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
}

.accordion-panel {
  margin-top: 16px !important;
}
</style>
