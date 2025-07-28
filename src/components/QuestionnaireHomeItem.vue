<template>
  <div class="questcard">
    <div class="questcreative">
      <div class="questcreative__img" :style="'background-image: url(' + questionnaire.img + ')'"></div>
      <div class="questcreative__figure"></div>
    </div>
    <div class="questcard__title">{{ questionnaire.title }}</div>
    <div class="questcard__description">{{ questionnaire.description }}</div>
    <div class="questcard__link">
      <AppLink
        :to="questionnaire.link"
        variant="primary"
        text="Начать"
        >
        <template #after-icon>
          <AppMdiIcon :icon-path="mdiOpenInNew" size="24" />
        </template>
      </AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPopular } from '@/api/types'
import AppLink from '@/components/ui/AppLink.vue'
import AppMdiIcon from '@/components/ui/AppMdiIcon.vue'
import { mdiOpenInNew } from '@mdi/js'

interface IProps {
  questionnaire: IPopular
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.questcard{
  flex-basis: calc(33% - 20px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  @media screen and (max-width: 990px) {
    flex-basis: calc(50% - 30px);
  }
  @media screen and (max-width: 780px) {
    flex-basis: 100%;
  }
  &:nth-child(1){
    @media screen and (max-width: 780px) {
      border-bottom: 1px solid #D2D7D6;
      padding-bottom: 20px;
    }
  }
  &:nth-child(3){
    @media screen and (max-width: 990px) {
      display: none;
    }
  }
  &__creative{

  }

  &__title{
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 20px;
    @media screen and (max-width: 990px){
      font-size: 22px;
    }
  }
  &__description{
    color: #3c514e;
    margin-bottom: 20px;
  }
  &__link{
    margin-top: auto;
  }

}
.questcreative{
  height: 280px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  @media screen and (max-width: 780px) {
    display: none;
  }
  &__img{
    max-width: 100%;
    width: 220px;
    height: 280px;
    border-radius: 32px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 2;
    position: relative;
  }
  &__figure{
    height: 220px;
    width: 220px;
    border-radius: 32px;
    background-color: rgba(248,224,218,.3);
    transform: rotate(65deg) translateY(-150px) translateX(-210px);
    z-index: 1;
    position: relative;
  }
}
</style>
