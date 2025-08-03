<template>
  <div class="result-violations">
    <div class="result-violations__title">Возможны следующие нарушения:</div>

    <Accordion :value="[]" multiple>
      <AccordionPanel
        v-for="(violation, idx) in violations"
        :key="idx"
        :value="idx"
        class="accordion-panel"
        style="border-radius: 24px; overflow: hidden"
      >
        <AccordionHeader
          ><div class="accordeon__title-icon">
            <img src="/src/assets/i/danger.svg" alt="" />
          </div>
          <div class="accordeon__title">{{ violation.violationName }}</div>
          <div class="accordeon__trigger"></div>
        </AccordionHeader>
        <AccordionContent>
          <p v-for="(memo, ind) in violation.memo" style="padding: 5px 0" :key="ind">
            {{ memo }}
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import type { IViolations } from '@/api/types'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { onMounted, ref } from 'vue'

const activePanel = ref('0')

interface IProps {
  violations: IViolations[] | null
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.result-violations {
  margin-top: 92px;
  @media (max-width: 770px) {
    margin-top: 68px;
  }
  @media (max-width: 460px) {
    margin-top: 72px;
  }
  &__title {
    font-family: 'Golos Text';
    font-style: normal;
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
}
.accordeon {
  &__title {
    margin: 0 auto 0 16px;
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
    &-icon {
      min-width: 56px;
      width: 56px;
      height: 56px;
      background-color: var(--bgPeach);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 460px) {
        display: none;
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
