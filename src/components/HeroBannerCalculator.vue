<template>
  <section class="banner-calculator">
    <div class="container">
      <div class="banner-calculator__inner" style="">
        <div class="banner-calculator__left" style="">
          <div class="banner-calculator__title">Калькулятор рисков</div>
          <div class="banner-calculator__description">
            Пройдите опрос и получите рекомендации по устранению нарушений
          </div>
          <RouterLink to="/questionnaires" class="banner-calculator__btn">
            <AppButton variant="primary">Пройти опрос</AppButton>
          </RouterLink>
        </div>
        <div class="banner-calculator__right" style="">
          <div class="banner-calculator__img" style="position: relative">
            <img src="../assets/i/vid.jpg" class="banner-calculator__img-img" alt="" />
            <AppCircle
              color="var(--baseOrangeColor)"
              class="banner-calculator__trigger"
              @click="openDialogVideo"
            >
              <img src="../assets/i/icon_play_light.svg" alt="trigger" />
            </AppCircle>
          </div>
          <div class="banner-calculator__text">Рассказываем как пользоваться сервисом</div>
        </div>
      </div>
    </div>
  </section>
  <AppDialog
    v-model="isDialogVideoVisible"
    :modal="true"
    position="center"
    :style="{ width: '732px', maxWidth: '100%' }"
    class="custom-dialog"
  >
    <template #header><div></div></template>

    <div class="dialog-content">
      <video width="100%" height="auto" controls autoplay>
        <source src="../assets/video/010425_Объясняющий ролик.mp4" type="video/mp4" />
      </video>
    </div>

    <template #footer></template>
  </AppDialog>
</template>

<script lang="ts" setup>
import AppButton from './ui/AppButton.vue'
import AppCircle from './ui/AppCircle.vue'
import AppDialog from './ui/AppDialog.vue'
import { ref } from 'vue'

const openDialogVideo = () => {
  isDialogVideoVisible.value = true
}
const isDialogVideoVisible = ref(false)
</script>

<style lang="scss" scoped>
.banner-calculator {
  margin-bottom: 68px;
  &__inner {
    display: flex;
    gap: 16px;
    @media (max-width: 1022px) {
      flex-direction: column;
    }
  }
  &__left {
    flex: 1;
    padding: 40px;
    background: var(--baseWhiteColor);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
  }
  &__title {
    font-weight: 500;
    font-size: 56px;
    line-height: 56px;
    color: var(--baseBlackColor);
    margin-bottom: 24px;
    @media (max-width: 1080px) {
      font-size: 51px;
      line-height: 51px;
    }
    @media (max-width: 1022px) {
      font-size: 52px;
      line-height: 52px;
    }
    @media (max-width: 600px) {
      font-size: 36px;
      line-height: 36px;
      text-align: center;
    }
  }
  &__description {
    max-width: 393px;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #5d6570;
    margin-bottom: auto;
    @media (max-width: 1022px) {
      max-width: 100%;
    }
  }
  &__btn {
    margin-top: 24px;
  }
  &__right {
    width: 348px;
    padding: 40px;
    gap: 24px;
    background: var(--baseWhiteColor);
    border-radius: 24px;
    @media (max-width: 1022px) {
      width: 100%;
    }
  }
  &__img {
    margin-bottom: 16px;
    position: relative;
    &-img {
      width: 100%;
    }
  }
  &__trigger {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__text {
    width: 182px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #13151a;
    @media (max-width: 1022px) {
      width: 100%;
    }
  }
}
</style>
