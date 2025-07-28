<template>
  <HeroBannerHome
    class="main__section"
  />

  <section class="main__section questionnaires" id="questionnaires">
    <div class="questionnaires__inner container">
      <div class="questionnaires__header">
        <h2 class="h2">
          Популярные
        </h2>
        <AppLink
          to="/questionnaires"
          variant="primary"
          text="Все анкеты"
          class="questionnaires__header-link"
          >
          <template #after-icon>
            <span class="mdi mdi-arrow-right"></span>
            <AppMdiIcon :icon-path="mdiArrowRight" size="24" />
          </template>
        </AppLink>
      </div>
      <div class="questionnaires__cards">
        <template v-for="questionnaire in popularList" :key="questionnaire">
          <QuestionnaireHomeItem :questionnaire />
        </template>
      </div>
      <div class="questionnaires__footer">
        <AppLink
          to="/questionnaires"
          variant="primary"
          text="Все анкеты"
          class="questionnaires__footer-link"
          >
          <template #after-icon>
            <span class="mdi mdi-arrow-right"></span>
            <AppMdiIcon :icon-path="mdiArrowRight" size="24" />
          </template>
        </AppLink>
      </div>
    </div>
  </section>

  <HeroBannerPlatform
    class="main__section"
  />

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroBannerHome from '@/components/HeroBannerHome.vue'
import HeroBannerPlatform from '@/components/HeroBannerPlatform.vue'
import QuestionnaireHomeItem from '@/components/QuestionnaireHomeItem.vue'
import AppLink from '@/components/ui/AppLink.vue'
import AppMdiIcon from '@/components/ui/AppMdiIcon.vue'
import { getPopularRequest } from '@/api'
import { mdiArrowRight } from '@mdi/js'
import type { IPopular } from '@/api/types'

const popularList = ref<IPopular[]>([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await getPopularRequest()
    if (data) {
      popularList.value = data
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.questionnaires{
  &__header{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  &__cards{
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    @media screen and (max-width: 780px){
      gap: 20px;
    }
  }
  &__footer-link{
    display: none;
    width: 100%;
    justify-content: center;
    background-color: #FFF5F2;
    border-radius: 6px;
    height: 48px;
    margin-top: 40px;
    @media screen and (max-width: 780px){
      display: flex;
    }
  }
  &__header-link{
    @media screen and (max-width: 780px){
      display: none;
    }
  }
}
</style>
