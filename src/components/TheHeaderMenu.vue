<template>
  <div class="header-menu">
    <div  class="header-menu__list-page">

      <div class="header-menu-desktop" v-if="!islaptop">
        <AppButton
          @click="navigateTo('https://knd.mos.ru/services')"
          variant="secondary"
        >
         <img src="https://knd.mos.ru/assets/svg/new-design/menu-item-services.svg" alt="Сервисы">
          <span>Сервисы</span>
        </AppButton>
        <AppButton
          v-for="(item, index) in menuItems" :key="index"
          @click="navigateTo(item.link)"
          variant="secondary"
        >
          <span>{{ item.title }}</span>
        </AppButton>
      </div>

      <div class="mobile-menu-wrapper">

          <transition name="slide">
            <div class="mobile-menu" v-if="isMenuOpen" @click.stop>
              <AppButton
                @click="navigateTo('https://knd.mos.ru/services')"
                variant="secondary"
                class="mobile-menu__link"
              >
                <img src="https://knd.mos.ru/assets/svg/new-design/menu-item-services.svg" alt="Сервисы">
                <span>Сервисы</span>
              </AppButton>
              <AppButton
                v-for="(item, index) in menuItems" :key="index"
                @click="navigateTo(item.link)"
                variant="secondary"
                class="mobile-menu__link"
              >
                <span>{{ item.title }}</span>
              </AppButton>
              <div v-if="isMobile" class="mobile-menu__blazon">
                <AppLogoMoscowBlazon/>
                <span  class="mobile-menu__blazon-title">Проект<br >Правительства<br >Москвы</span>
              </div>
            </div>
          </transition>

          <div class="mobile-menu__overlay" v-if="isMenuOpen" @click="closeMenu"></div>
        </div>

    </div>

    <div  class="header-menu__auth-search">

        <AppButton
          v-if="islaptop && !isMenuOpen"
          class="header-menu__btn-burger"
          @click="toggleMenu"
        >
          <AppMdiIcon :icon-path="mdiMenu" size="18" />
          <span v-if="!isMobile">Меню</span>
        </AppButton>

        <AppButton
          v-if="islaptop && isMenuOpen"
          class="header-menu__btn-burger"
          @click="toggleMenu"
          :class="{ active: isMenuOpen }"
        >
          <AppMdiIcon :icon-path="mdiClose" size="18" />
          <span v-if="!isMobile">Меню</span>
        </AppButton>

        <AppButton
          class="header-menu__btn-login"
        >
          <img alt="Войти" src="https://knd.mos.ru/assets/svg/new-design/user.svg">
          <span v-if="!isMobile">Войти</span>
        </AppButton>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppButton from './ui/AppButton.vue';
import AppMdiIcon from './ui/AppMdiIcon.vue';
import AppLogoMoscowBlazon from './ui/AppLogoMoscowBlazon.vue';
import { mdiClose, mdiMenu } from '@mdi/js';


const navigateTo = (url: string): void => {
  window.location.href = url;
};

interface MenuItem {
  title: string;
  link: string;
}

const isMobile = ref(false);
const isMenuOpen = ref(false);
const islaptop = ref(false);

const menuItems: MenuItem[] = [
  { title: 'О контроле ', link: 'https://knd.mos.ru/kno' },
  { title: 'Актуальное ', link: 'https://knd.mos.ru/actual' },
  { title: 'Помощь ', link: 'https://knd.mos.ru/helpcenter' },
];

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  islaptop.value = window.innerWidth < 1200;
  // Закрываем меню при переходе с мобильного на десктоп
  if (!isMobile.value) {
    isMenuOpen.value = false;
  }
};


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Обработчик клика вне меню
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const isBurgerButton = target.closest('.header-menu__btn-burger');
  if (isMenuOpen.value && !target.closest('.mobile-menu-wrapper') && !isBurgerButton) {
    closeMenu();
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.header-menu {
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-grow: 1;

  &__btn-login,
  &__btn-burger {
    @media (max-width: 768px) {
      height: 48px;
      width: 48px;
      padding: 0;
      justify-content: center;
      align-items: center;
    }
  }

  &__btn-burger {
    @media (max-width: 768px) {
      order: 2;
    }
    &.active {
      background-color: #ffffff;
      border-color: #ffffff;
      color: #13151a;
    }
  }

  &__auth-search {
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;
  }
}

.mobile-menu {
  background-color: var(--baseGrayColor);
  border-radius: 20px;
  padding: 16px 20px;

  @media (max-width: 768px) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 16px 0;
  }

  &__link {
    width: 100%;
    border-radius: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    &:hover {
      background-color: #eaeaea;
    }
  }

  &__blazon {
    display: flex;
    margin: 16px 10px 0px 16px;
  }

  &__blazon-title {
    font-size: 12px;
    line-height: 12px;
    letter-spacing: -0.02em;
    font-family: Golos Text, sans-serif;
    font-style: normal;
    color: #5d6570;
    font-weight: 400;
    padding: 6px 4px 0;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #13151ab3;
    z-index: -1;
  }
}

.mobile-menu-wrapper {
  width: 396px;
  position: absolute;
  top: 68px;
  left: calc(100% - 394px);

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    top: 64px;
  }
}

.header-menu-desktop {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
