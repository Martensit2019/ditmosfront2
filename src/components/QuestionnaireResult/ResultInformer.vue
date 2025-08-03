<template>
  <div class="result-informer">
    <div class="result-informer__rounding-left" :style="{ backgroundColor: currentColor }"></div>
    <div class="result-informer__rounding-right"></div>
    <div class="result-informer__stat">Верно: {{ correctAnswers }} из {{ total }}</div>
    <div class="result-informer__indicator" :style="{ left, bottom }"></div>
    <div class="result-informer__inner">
      <span :style="{ transform, borderColor }"></span>
      <div class="result-informer__number">{{ percent }}%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useResultsStore } from '@/stores/result'

const store = useResultsStore()

const green = 'var(--baseGreenColor)'
const orange = 'var(--baseOrangeColor)'
const percent = ref<number>(store.percent || 0)
const correctAnswers = ref<number>(store.results?.correctAnswers || 0)
const total = ref<number>(store.results?.totalQuestions || 0)

const currentColor = computed(() => (percent.value > 20 ? orange : green))
const transform = computed(() => `rotate(${percent.value * 1.8 + 135}deg)`)
const borderColor = computed(
  () => `${currentColor.value} ${currentColor.value} var(--baseGrayColor)
      var(--baseGrayColor)`,
)
const angleVal = computed(() => -1.8 * percent.value + 180)
const left = computed(() => `${132 + 140 * Math.cos((angleVal.value * Math.PI) / 180)}px`)
const bottom = computed(() => `${-18 + 140 * Math.sin((angleVal.value * Math.PI) / 180)}px`)
</script>

<style lang="scss" scoped>
.result-informer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + 10px));
  &__rounding-left {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    bottom: -10px;
    left: 0;
  }
  &__rounding-right {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--baseGrayColor);
    bottom: -10px;
    right: 0;
  }
  &__stat {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #5d6570;
  }

  &__indicator {
    position: absolute;
    width: 36px;
    height: 36px;
    left: -8px;
    bottom: -18px;
    box-sizing: border-box;
    background: #fff;
    border: 8.75914px solid var(--baseBlackColor);
    border-radius: 50%;
    z-index: 10;
  }
  &__number {
    font-family: 'Golos Text';
    font-style: normal;
    font-weight: 500;
    font-size: 56px;
    line-height: 56px;
    text-align: center;
    color: #13151a;
  }

  &__inner {
    height: 150px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
  }
  &__inner span {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 300px;
    border: 20px solid;
    border-radius: 50%;
    transform: rotate(135deg);
  }
}
</style>
