<template>
  <header class="header">
    <div  class="app-header-ct new-design">
      <div  class="header-fixed kno-fixed-include-scroll-height" style="position: fixed; top: 0px; background-color: rgb(255, 255, 255);">
        <div  class="header-grid">
          <div  class="header_text-logo">
            <router-link to="/" class="ng-star-inserted">
              <AppLogoOpenControl/>
            </router-link>
          </div>
          <section  class="header-blazon">
            <AppLogoMoscowBlazon/>
            <span  class="header-blazon__title">Проект<br >Правительства<br >Москвы</span>
          </section>
          <TheHeaderMenu/>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import TheHeaderMenu from './TheHeaderMenu.vue';
import AppLogoMoscowBlazon from './ui/AppLogoMoscowBlazon.vue';
import AppLogoOpenControl from './ui/AppLogoOpenControl.vue';


</script>

<style lang="scss" scoped>
.new-design.app-header-ct .header-fixed {
  position: fixed;
  top: 0;
  z-index: 202;
  width: calc(100% - 40px);
  transition: top .3s ease-in-out 0s;
  background-color: transparent !important;
  @media (max-width: 780px) {
    width: calc(100% - 32px);
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-left: -16px;
  }
}

.new-design.app-header-ct .header-grid {
  background-color: #f3f4f5;
  align-items: center;
  display: flex;
  position: relative;
  max-width: 1440px;
  height: 64px;
  margin: auto;
  gap: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

@media (max-width: 768px) {
  .new-design.app-header-ct .header-grid{
    border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  }
}

@media (min-width: 768px) {
  .new-design.app-header-ct .header-grid {
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 68px;
    gap: 16px;
  }
}

@media (min-width: 1200px) {
  .new-design.app-header-ct .header-grid {
    height: 84px;
  }
}

@media (min-width: 1440px) {
  .new-design.app-header-ct .header-grid {
    gap: 36px;
  }
}

.new-design.app-header-ct .header_text-logo {
  order: 1;
  display: flex;
  position: relative;
  top: 4px;
  margin: 0 24px 0 12px;
}

@media (min-width: 768px) {
  .new-design.app-header-ct .header_text-logo {
    margin: 0 16px 0 4px;
  }
}

@media (min-width: 1200px) {
  .new-design.app-header-ct .header_text-logo {
    margin: 0 8px;
  }
}

.header-blazon {
  display: none;
}

@media (min-width: 768px) {
  .header-blazon {
    display: flex;
    order: 2;
  }
}

.header-blazon__title {
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.02em;
  font-family: Golos Text, sans-serif;
  font-style: normal;
  color: #5d6570;
  font-weight: 400;
  padding: 6px 4px 0;
}
</style>
