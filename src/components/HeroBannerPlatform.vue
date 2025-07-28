<template>
  <section class="main__section home-page__banner">
      <div class="gis-ok container">
        <div class="gis-ok__content">
          <div class="gis-ok__text"> Единая платформа цифровых возможностей для бизнеса по вопросам контроля </div>
          <a href="https://knd.mos.ru/" class="gis-ok__wrap-circle">
            <AppCircle
              color="#fff"
              textColor="var(--secondaryColorHover)"
            >
              <AppMdiIcon :icon-path="mdiArrowRight" size="24"/>
            </AppCircle>
            <div class="gis-ok__link">Перейти на платформу</div>
          </a>
        </div>
        <div class="gis-ok__creative">
          <img src="../assets/i/gis-ok.png" alt="Единая платформа цифровых возможностей для бизнеса по вопросам контроля" class="gis-ok__image">
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { mdiArrowRight } from '@mdi/js';
import AppCircle from './ui/AppCircle.vue';
import AppMdiIcon from './ui/AppMdiIcon.vue';
</script>

<style lang="scss" scoped>

.gis-ok {
  color:#fff;
  background:linear-gradient(155.91deg,
  #FF7D60 -13.81%,
  #e13925 84.55%);
  border-radius: 24px;
  display:flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 32px;
  @media screen and (max-width: 780px) {
    padding: 24px;
  }
  &__wrap-circle{
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 16px;
    column-gap: 20px;
    align-items: center;
    margin-top: auto;
  }
  &__creative{
    width: calc(40% - 24px);
    align-self: center;
    @media screen and (max-width: 780px) {
      width: 100%;
      order: 1;
    }
  }
  &__link{
    @media screen and (max-width: 340px){
      width: 160px;
    }
  }
  &__content{
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 780px) {
      width: 100%;
      order: 2;
    }
  }
  &__image{
    width: 100%;
  }
  &__text{
    margin-bottom: 20px;
    color:#fff;
    font-size: 48px;
    @media (max-width: 1280px) {
      font-size: 32px
    }
    @media (max-width: 780px) {
      font-size: 24px;
    }
  }
}
</style>
