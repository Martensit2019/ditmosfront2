<template>
  <HeroBannerHome class="main__section" />
  <HeroBannerCalculator />
  <section class="main__section questionnaires" id="questionnaires">
    <div class="questionnaires__inner container">
      <div class="questionnaires__header">
        <h2 class="h2">Популярные</h2>
      </div>
      <div class="questionnaires__cards">
        <template v-for="questionnaire in popularList" :key="questionnaire">
          <QuestionnaireHomeItem :questionnaire />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroBannerHome from '@/components/HeroBannerHome.vue'
import HeroBannerCalculator from '@/components/HeroBannerCalculator.vue'
import QuestionnaireHomeItem from '@/components/QuestionnaireHomeItem.vue'
import { getPopularRequest } from '@/api'
import type { IPopular } from '@/api/types'

const popularList = ref<IPopular[]>([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await getPopularRequest()
    if (data) {
      data.push({
        id: '',
        img: '',
        title: 'Все анкеты',
        description: '',
        link: '/questionnaires',
      })
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
.questionnaires {
  &__header {
    margin-bottom: 44px;
    @media (max-width: 600px) {
      margin-bottom: 32px;
    }
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    @media (max-width: 1250px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
