<template>
  <footer class="footer">
    <div class="footer__inner">

      <div class="footer__top">
        <div class="footer__coll footer__logos">
          <AppLogoOpenControl
            color="#ffffff"
            class="footer__open-control"
          />
          <div class="mosblizon">
            <div class="mosblizon__svg">
              <AppLogoMoscowBlazon
                color="#ffffff"
              />
            </div>
            <div class="mosblizon__text">
              Проект<br />
              Правительства<br />
              Москвы
            </div>
          </div>
        </div>
        <div class="footer__coll">
          <a href="https://knd.mos.ru/services" class="footer__link footer__link--head">Сервисы</a>
          <a href="https://knd.mos.ru/event-calendar-public" class="footer__link">Календарь контрольных дат</a>
          <a href="/" class="footer__link">Калькулятор рисков</a>
          <a href="" class="footer__link">Консультирование</a>
          <a href="" class="footer__link">Самообследование</a>
        </div>
        <div class="footer__coll">
          <a href="https://knd.mos.ru/actual" class="footer__link footer__link--head">Актуальное</a>
          <a href="https://knd.mos.ru/news/categories/article" class="footer__link">Новости</a>
          <a href="https://knd.mos.ru/under-control" class="footer__link">Москва в порядке</a>
          <a href="https://knd.mos.ru/actual/media" class="footer__link">Медиа</a>
        </div>
        <div class="footer__coll">
          <a href="https://knd.mos.ru/kno" class="footer__link footer__link--head">О контроле</a>
          <a href="https://knd.mos.ru/helpcenter" class="footer__link">Помощь</a>
        </div>
        <div class="footer__coll">
          <span class="footer__link footer__link--head">Прочее</span>
          <a href="" class="footer__link">Запись на приём в центры госуслуг и ведомства</a>
          <a href="" class="footer__link">Электронная приёмная Правительства Москвы</a>
          <a href="" class="footer__link">Оплатить штрафы</a>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__agreement">Соглашение о&nbsp;пользовании информационными системами и&nbsp;ресурсами города&nbsp;Москвы </div>
        <div class="footer__video">
          <div class="video-story" @click="openDialogVideo">
            <div class="video-story__preview">
              <img src="../assets/i/icon_play_dark.svg" class="video-story__play" alt="Рассказываем о работе с порталом">
            </div>
            <div class="video-story__title">Рассказываем о работе с порталом</div>
          </div>
        </div>
        <div class="footer__social">
          <a href="https://t.me/opencontrol" rel="noopener noreferrer" target="_blank">
              <img class="footer__social-icon" src="../assets/i/icon_telegram.svg" alt="Телеграм">
          </a>
        </div>
      </div>

    </div>
  </footer>

    <AppDialog
    v-model="isDialogVideoVisible"
    :modal="true"
    position="top"
    :style="{ width: '732px', maxWidth: '100%' }"
    class="custom-dialog"
  >
    <template #header><div></div></template>

    <div class="dialog-content">

      <video width="100%" height="auto" controls autoplay>
        <source src="https://knd.mos.ru/api/files/media/cbb74cae-0330-44ee-a773-0c6a16a90c48" type="video/mp4">
      </video>


    </div>

    <template #footer></template>
  </AppDialog>

</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AppLogoMoscowBlazon from './ui/AppLogoMoscowBlazon.vue';
  import AppLogoOpenControl from './ui/AppLogoOpenControl.vue';
  import AppDialog from './ui/AppDialog.vue';

  const openDialogVideo = () => {
    isDialogVideoVisible.value = true
  }
  const isDialogVideoVisible = ref(false)

</script>

<style lang="scss" scoped>

.footer{
  &__inner{
    padding: 32px;
    background-color:#4b525c;
    max-width: 1440px;
    border-radius: 24px;
    margin: 0 auto 20px auto;
    @media (max-width: 780px) {
      padding: 24px;
      border-radius: 16px 16px 0 0;
      margin: 0 auto;
    }
  }
  &__top{
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #5d6570;
    padding-bottom: 32px;
     @media (max-width: 1000px) {
      padding-bottom: 12px;
     }
  }
  &__bottom{
    display: flex;
    flex-wrap: wrap;
    padding-top: 32px;
  }
  &__coll{
    width: 20%;
    padding-right: 20px;
    @media (max-width: 1000px) {
      width: 50%;
      margin-bottom: 20px;
    }
    @media (max-width: 380px){
      width: 100%;
      padding-right: 0!important;
    }
    &:nth-last-child(1){
      padding-right: 0;
    }
    &:nth-child(2n + 1){
      @media (max-width: 1000px) {
        padding-right: 0;
      }
    }
  }
  &__logos{
    @media (max-width: 1000px) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    @media (max-width: 380px){
      column-gap: 40px;
    }
  }
  &__link{
    display: block;
    color: #ffffff;
    font-size: 15px;
    margin-bottom: 8px;
    &--head{
      margin-bottom: 16px;
      font-size: 18px;
    }
  }
  &__open-control{
    margin-bottom: 20px;
    transform: translateX(0);
  }
  &__agreement{
    width: 40%;
    padding-right: 20px;
    font-size: 15px;
    color: #a8b1bd;
    @media (max-width: 1000px) {
      width: 100%;
      order: 3;
      margin-top: 32px;
    }
  }
  &__video{
    flex-grow: 1;
    padding-right: 20px;
    cursor: pointer;
    @media (max-width: 1000px) {
      width: 50%;
      flex-grow: 0;
      min-width: 320px;
    }
    @media (max-width: 640px){
      padding-right: 0;
      min-width: auto;
    }
  }
  &__social{
    width: 20%;
    @media (max-width: 1000px) {
      width: auto;
      flex-grow: 1;
    }
    @media (max-width: 640px){
      width: 100%;
      margin-top: 20px;
    }
  }
  &__social-icon{
    width: 52px;
    height: 52px;
     @media (max-width: 780px){
      width: 48px;
      height: 48px;
     }
  }
}

.video-story{
  background-color: #5d6570;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  max-width: 318px;
  min-width: 290px;
  @media (max-width: 780px){

  }
  @media (max-width: 380px){
    padding: 6px;
    min-width: 240px;
  }
  &__preview{
    border-radius: 8px;
    width: 82px;
    height: 52px;
    position: relative;
    background-image: url('../assets/i/public_main_page_vide_placeholder.png');
    background-size: cover;
    @media (max-width: 380px){
       width: 70px;
       height: 40px;
    }
  }
  &__play{
    width: 24px;
    height: 24px;
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__title{
    padding-left: 16px;
    padding-right: 8px;
    color: #ffffff;
    width: calc(100% - 82px);
    font-size: 18px;
    align-self: center;
    @media (max-width: 780px){
      font-size: 16px;
      padding-left: 8px;
      padding-right: 0;
    }
    @media (max-width: 380px){
      font-size: 14px;
    }
  }
}
.mosblizon{
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  height: 60px;
  align-items: center;
  &__text{
    color: #ffffff;
    font-size: 12px;
    line-height: 12px;
    max-height: 100%;
    transform: translateY(-4px);
  }
  &__svg{
    max-height: 100%;
    svg{
      max-height: 100%;
    }
  }
}
</style>
