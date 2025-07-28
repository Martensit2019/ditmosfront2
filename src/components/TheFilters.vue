<template>
  <div class="filters">
    <div class="container">
      <div class="filters__inner">
        <div class="filters__top">
          <div class="filters__content">
            <div v-if="isTopic" class="filters__title">
              {{ total }} {{ declension(['тематика', 'тематики', 'тематик'], total) }} анкет
            </div>
            <div v-else class="filters__title">
              {{ total }} {{ declension(['анкета', 'анкеты', 'анкет'], total) }}
            </div>
            <div class="filters__count-items">
              <AppDropdown />
            </div>
          </div>
          <div class="filters__trigger">
            <AppButton @click="isVisible = !isVisible" :class="isVisible ? 'show' : ''">
              <span>Фильтры</span>
              <AppMdiIcon :icon-path="mdiTuneVariant" size="24" />
            </AppButton>
          </div>
        </div>
        <div class="filters__bottom">
          <AppMultiSelect
            v-model="selectedRfSubjects"
            v-show="isVisible"
            :options="rfSubjects"
            option-label="name"
            option-value="id"
            placeholder="Субъект РФ"
            wrapperClass="width-multiSelect"
            :filter="true"
            selectedItemsLabel="{0}"
            :maxSelectedLabels="0"
            style="width: 300px"
          />

          <AppMultiSelect
            v-model="selectedItems2"
            v-show="isVisible"
            :options="options2"
            option-label="name"
            option-value="id"
            placeholder="Категория организации"
            wrapperClass="width-multiSelect"
            :filter="true"
            selectedItemsLabel="{0}"
            :maxSelectedLabels="0"
            style="width: 300px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppMultiSelect from './ui/AppMultiSelect.vue'
import AppDropdown from '@/components/ui/AppDropdown.vue'
import { getRfSubjectsRequest } from '@/api'
import type { IRfSubject } from '@/api/types'
import AppButton from './ui/AppButton.vue'
import AppMdiIcon from './ui/AppMdiIcon.vue'
import { mdiTuneVariant } from '@mdi/js'

const isVisible = ref(true)

interface IProps {
  total: number
  isTopic: boolean
}
defineProps<IProps>()

const rfSubjects = ref<IRfSubject[]>([])
const selectedRfSubjects = ref<IRfSubject[]>([])

const isSelected = computed(() => !!selectedRfSubjects.value.length)

const selectedItems2 = ref([])
const options2 = ref([])

const getRfSubjects = async () => {
  try {
    const { data } = await getRfSubjectsRequest()
    if (data) {
      rfSubjects.value = [...data]
    }
  } catch (err) {
    console.log(err)
  }
}

const declension = (forms: string[], val: number) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return forms[val % 100 > 4 && val % 100 < 20 ? 2 : cases[val % 10 < 5 ? val % 10 : 5]]
}

onMounted(() => {
  getRfSubjects()
})

defineExpose({
  isSelected,
})
</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 40px;
  &__top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 780px) {
      margin-bottom: 16px;
    }
  }
  &__title {
    line-height: 64px;
    color: #112b27;
    font-size: 28px;
    line-height: 40px;
    padding-right: 12px;
  }
  &__count-items {
    display: flex;
    align-items: flex-end;
  }
  &__bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  &__trigger {
    @media screen and (max-width: 780px) {
      width: 100%;
      margin-bottom: 16px;
    }
  }
}
</style>
