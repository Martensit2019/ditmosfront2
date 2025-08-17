<template>
  <div class="container">
    <div class="hero-banner">
      <div class="hero-banner__inner">
        <div class="hero-banner__content">
          <div class="hero-banner__title">
            Оцените вероятность нарушения обязательных требований
          </div>
          <div class="hero-banner__subtitle">
            Пройдите опрос и получите рекомендации по устранению нарушений
          </div>
          <div class="hero-banner__circle">
            <AppCircle
              hoverColor="var(--baseGreenColor)"
              color="var(--baseGreenColor)"
              @click="scrollToQuestionnaires"
            >
              <AppMdiIcon :icon-path="mdiChevronDown" size="24" />
            </AppCircle>
          </div>
        </div>

        <div class="hero-banner__creative">
          <div class="man-creative">
            <img
              class="man-creative__img"
              src="../assets/i/health-check2.svg"
              alt="Единая платформа цифровых возможностей для бизнеса по вопросам контрол"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiChevronDown } from '@mdi/js'
import AppCircle from './ui/AppCircle.vue'
import AppMdiIcon from './ui/AppMdiIcon.vue'

const scrollToQuestionnaires = () => {
  const element = document.getElementById('questionnaires')
  if (element) {
    const offset = 20
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    })
  }
}
</script>

<style lang="scss" scoped>
.hero-banner {
  background-color: #ffffff;
  border-radius: 32px;
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 780px) {
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 24px;
  }
  &__inner {
    border-radius: 32px;
    width: 100%;
    padding-top: 48px;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 780px) {
      padding-top: 0;
    }
  }
  &__content {
    width: 60%;
    margin-right: -1%;
    @media (max-width: 1485px) {
      width: 100%;
    }
    @media (max-width: 780px) {
      width: 100%;
      margin-right: 0;
      order: 1;
    }
  }
  &__creative {
    width: 41%;
    @media (max-width: 1485px) {
      height: 369px;
      margin-top: -200px;
      margin-left: auto;
    }
    @media (max-width: 1060px) {
      margin-top: -360px;
    }
    @media (max-width: 780px) {
      width: 100%;
      order: 2;
      margin-top: 0;
      height: 50vw;
    }
  }
  &__title {
    font-size: 64px;
    font-weight: 500;
    color: #112b27;
    margin-bottom: 24px;
    @media (max-width: 945px) {
      font-size: 52px;
    }
    @media (max-width: 600px) {
      font-size: 42px;
      line-height: 40px;
    }
  }
  &__subtitle {
    color: #3c514e;
    font-size: 20px;
    margin-bottom: 24px;
    @media (max-width: 1080px) {
      width: 50%;
      font-size: 16px;
    }
    @media (max-width: 780px) {
      width: 100%;
    }
  }
  &__circle {
    padding: 24px 0 48px 0;
    @media (max-width: 780px) {
      padding: 20px 0 0 0;
      display: none;
    }
  }
}

.man-creative {
  width: 100%;
  height: 100%;
  position: relative;
  &__img {
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
