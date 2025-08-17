<template>
  <div class="result-header">
    <div class="result-header__content" :style="{ background }">
      <div class="result-header__suptitle">{{ store.results?.name }}</div>
      <div class="result-header__title">{{ store.results?.title }}</div>
      <div class="result-header__subtitle">
        <div class="result-header__estimation">
          <img :src="`/src/assets/i/${icon}.svg`" />
        </div>
        <div>
          <div v-if="percent" class="result-header__btns">
            <div class="result-header__btn" @click="$emit('openPdf')">
              <img src="/src/assets/i/fi-sr-disk.svg" />
              <div style="">Скачать результаты</div>
            </div>
            <div class="result-header__btn" @click="store.isDialogEmailVisible = true">
              <img src="/src/assets/i/email.svg" />
              <div style="">Отправить на почту</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result-header__risk-assessment">
      <div class="result-header__risk-title">Оценка риска:</div>
      <ResultInformer />
    </div>
  </div>
  <ResultModalEmail @sendPdf="$emit('sendPdf')" />
  <ResultModalConfirm />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResultsStore } from '@/stores/result'
import ResultInformer from '@/components/QuestionnaireResult/ResultInformer.vue'
import ResultModalEmail from './ResultModalEmail.vue'
import ResultModalConfirm from './ResultModalConfirm.vue'

const store = useResultsStore()

const green = 'var(--baseGreenColor)'
const orange = 'var(--baseOrangeColor)'
const percent = ref<number>(store.percent || 0)

const background = computed(() => (percent.value > 20 ? orange : green))
const icon = computed(() => (percent.value ? (percent.value < 60 ? 'danger' : 'dislike') : 'like'))

defineEmits<{
  (e: 'openPdf'): void
  (e: 'sendPdf'): void
}>()

// const sendPdf = () => {
//   emits('sendPdf')
// }
</script>

<style lang="scss" scoped>
.result-header {
  display: flex;
  gap: 16px;
  @media (max-width: 1020px) {
    flex-direction: column;
  }
  &__content {
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    min-height: 300px;
    background: #35bc4a;
    border-radius: 24px;
    @media (max-width: 1200px) {
      padding: 32px;
      width: 100%;
    }
    @media (max-width: 700px) {
      padding: 24px 20px;
    }
  }
  &__suptitle {
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: var(--baseWhiteColor);
    margin-bottom: 12px;
    @media (max-width: 700px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  &__title {
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    color: var(--baseWhiteColor);
    margin-bottom: auto;
    @media (max-width: 700px) {
      font-size: 28px;
      line-height: 32px;
    }
  }
  &__subtitle {
    display: flex;
    justify-content: space-between;
    // margin-top: auto;
    @media (min-width: 1020px) and (max-width: 1200px) {
      margin-top: 40px;
      align-items: flex-end;
    }
    @media (max-width: 700px) {
      justify-content: center;
      margin-top: 48px;
    }
  }

  &__estimation {
    width: 56px;
    height: 56px;
    background-color: var(--baseWhiteColor);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      display: none;
    }
  }
  &__risk-assessment {
    position: relative;
    min-width: 380px;
    width: 30%;
    min-height: 300px;
    background: var(--baseWhiteColor);
    border-radius: 24px;
    padding: 40px;
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #13151a;
    @media (max-width: 1020px) {
      width: 100%;
    }
    @media (max-width: 700px) {
      min-width: 100%;
    }
  }
  &__btns {
    display: flex;
    gap: 16px;
    @media (min-width: 1020px) and (max-width: 1200px) {
      flex-direction: column;
    }
    @media (max-width: 700px) {
      flex-direction: column;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px;
    gap: 8px;
    width: 251px;
    height: 56px;
    border: 1px solid var(--baseWhiteColor);
    border-radius: 40px;
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: var(--baseWhiteColor);
    cursor: pointer;
  }
  &__risk-title {
    margin-bottom: 19px;
  }
}
</style>
