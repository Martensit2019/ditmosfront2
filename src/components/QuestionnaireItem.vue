<template>
  <Router-Link class="advancedcard" :to="link">
    <div class="advancedcard__content">
      <div class="advancedcard__title">{{ questionnaire.title }}</div>
      <div class="advancedcard__description">{{ questionnaire.description }}</div>
      <div class="advancedcard__link">
        <AppLink v-if="!isTopic" :to="link" variant="primary" text="Начать">
          <template #after-icon>
            <AppMdiIcon :icon-path="mdiOpenInNew" size="18" />
          </template>
        </AppLink>
      </div>
    </div>

    <div class="advancedcard__creative">
      <div class="questionnaire-item__figure">
        <div class="questionnaire-item__figure-img">
          <img :src="questionnaire.img" :alt="questionnaire.title" />
        </div>
        <div class="questionnaire-item__figure-attachment"></div>
      </div>
    </div>
  </Router-Link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IQuestionnaire } from '@/api/types'
import AppLink from '@/components/ui/AppLink.vue'
import AppMdiIcon from '@/components/ui/AppMdiIcon.vue'
import { useRoute } from 'vue-router'
import { mdiOpenInNew } from '@mdi/js'

interface IProps {
  questionnaire: IQuestionnaire
  isTopic: boolean
}
const props = defineProps<IProps>()

const route = useRoute()
const questionnairesListId = route.params.id

const link = computed(() =>
  questionnairesListId
    ? `/questionnaires/${questionnairesListId}/${props.questionnaire.id}`
    : `/questionnaires/${props.questionnaire.id}`,
)
</script>

<style lang="scss" scoped>
.advancedcard {
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--baseWhiteColor);
  column-gap: 60px;
  width: calc(50% - 16px);
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  &__creative {
    width: 166px;
    @media screen and (max-width: 480px) {
      order: 1;
      margin: 0 auto 20px auto;
    }
  }
  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: calc(100% - 166px - 60px);
    @media screen and (max-width: 480px) {
      width: 100%;
      order: 2;
    }
  }
  &__title {
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 500;
  }
  &__description {
    margin-bottom: auto;
  }
  &__link {
    margin-top: 20px;
  }
}

a {
  text-decoration: none;
  color: #212529;
}

.questionnaire-item {
  &__figure {
    position: relative;
    z-index: 1;
    &-img {
      overflow: hidden;
      max-height: 216px;
      border-radius: 28px;
    }
    &-attachment {
      position: absolute;
      width: 174px;
      height: 174px;
      left: -20px;
      top: 20px;
      background: rgba(242, 158, 137, 0.3);
      mix-blend-mode: normal;
      -webkit-backdrop-filter: blur(28px);
      backdrop-filter: blur(28px);
      border-radius: 32px;
      transform: matrix(-0.97, -0.26, -0.26, 0.97, 0, 0);
      z-index: -1;
    }
    img {
      width: 169px;
      height: 248px;
      max-height: 248px;
    }
  }
}
</style>
