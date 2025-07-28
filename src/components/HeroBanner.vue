<template>
  <div class="hero-banner main__section">
    <div class="hero-banner__inner container">

      <div class="hero-banner__content">
        <div class="hero-banner__title">Анкеты<br/> для каждого бизнеса </div>
        <div class="hero-banner__subtitle">Специально разработанные сервисы позволят вам проверить вероятность нарушений и получить рекомендации по их устранению</div>
      </div>

      <div class="hero-banner__creative">
        <img class="hero-banner__creative-img" src="../assets/i/questionnaires-hero.png" alt="Анкеты для каждого бизнеса ">
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.hero-banner{
  padding-left: 32px;
  padding-right: 32px;
  background-color: #fff;
  border-radius: 24px;
  @media screen and (max-width: 780px){
    padding-left: 16px;
    padding-right: 16px;
  }
  &__inner{
    width: 100%;
    padding-top: 48px;
    padding-bottom: 48px;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 780px) {
      padding-top: 20px;
    }
  }
  &__mosblizon{
    width: 100%;
    margin-bottom: 24px;
    @media (max-width: 780px) {
      order: 1;
    }
  }
  &__content{
    width: 50%;
    margin-right: 5%;
    @media (max-width: 780px) {
      width: 100%;
      margin-right: 0;
      order: 3;
    }
  }
  &__creative{
    width: 45%;
    @media (max-width: 780px) {
      width: 100%;
      order: 2;
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
  &__creative-img{
    max-height: 100%;
    max-width: 100%;
    border-radius: 32px;
  }
  &__title{
    font-size: 64px;
    font-weight: 500;
    color: #112b27;
    margin-bottom: 24px;
    @media (max-width: 1420px) {
      font-size: 54px;
    }
    @media (max-width: 1220px) {
      font-size: 38px;
    }
    @media (max-width: 1080px) {
      font-size: 24px;
    }
  }
  &__subtitle{
    color: #3c514e;
    font-size: 20px;
    margin-bottom: 24px;
    @media (max-width: 1080px) {
      font-size: 16px;
    }
  }
}
.mosblizon{
  display: flex;
  flex-wrap: wrap;
  column-gap: 14px;
  height: 60px;
  align-items: center;
  &__text{
    color: #3c514e;
    font-size: 14px;
    line-height: 16px;
    max-height: 100%;
  }
  &__svg{
    max-height: 100%;
    svg{
      max-height: 100%;
    }
  }
}
</style>
