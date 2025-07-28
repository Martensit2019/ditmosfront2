<template>
  <div class="questionnaires-empty">
    <div class="questionnaires-empty__circle"></div>
    <div class="questionnaires-empty__text"></div>
    Записей не найдено
  </div>
</template>

<style lang="scss" scoped>
.questionnaires-empty {
  text-align: center;
  &__circle {
    background: #fff5f2;
    width: 112px;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 20px auto;
  }
  &__text {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #3c514e;
    margin: 24px 0;
    text-align: center;
  }
}
</style>
