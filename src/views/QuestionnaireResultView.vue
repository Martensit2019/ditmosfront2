<template>
  <div v-if="!!results" class="result">
    <div class="container">
      <div class="result__wrapper">
        <div class="result__content">
          <div class="result__inner">
            <div class="result__left">
              <div class="result__suptitle">{{ results && results.name }}</div>
              <div class="result__title">{{ results && results.title }}</div>
              <div v-if="results && results.percent > 1" class="result__suptitle">
                Вы можете ознакомиться с полными результатами, скачав их или отправив себе на почту
              </div>
              <div v-if="results && results.percent > 1">
                <div class="result__actions">
                  <div>Скачать результаты</div>
                  <div>Отправить на e-mail</div>
                </div>
              </div>
            </div>
            <div class="result__right">
              <div class="circle">{{ results?.percent }}%</div>
              <!-- <svg
                _ngcontent-mok-c112=""
                width="220"
                height="220"
                viewBox="-15 -20 220 216"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs _ngcontent-mok-c112="">
                  <filter
                    _ngcontent-mok-c112=""
                    id="filter0_d_45718_96908"
                    width="28"
                    height="28"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                    x="177"
                    y="120"
                  >
                    <feFlood
                      _ngcontent-mok-c112=""
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      _ngcontent-mok-c112=""
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset _ngcontent-mok-c112="" dy="4"></feOffset>
                    <feGaussianBlur _ngcontent-mok-c112="" stdDeviation="2"></feGaussianBlur>
                    <feComposite
                      _ngcontent-mok-c112=""
                      in2="hardAlpha"
                      operator="out"
                    ></feComposite>
                    <feColorMatrix
                      _ngcontent-mok-c112=""
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    ></feColorMatrix>
                    <feBlend
                      _ngcontent-mok-c112=""
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_45718_96908"
                    ></feBlend>
                    <feBlend
                      _ngcontent-mok-c112=""
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_45718_96908"
                      result="shape"
                    ></feBlend>
                  </filter>
                </defs>
                <circle _ngcontent-mok-c112="" cx="100" cy="100" r="96" fill="white"></circle>
                <path
                  _ngcontent-mok-c112=""
                  d="M8.64263 129.493C3.98835 115.076 2.81226 99.7617 5.21051 84.8029C7.60876 69.8442 13.5133 55.6654 22.4413 43.4258C31.3693 31.1862 43.0673 21.2334 56.5788 14.3811C70.0904 7.52876 85.0318 3.97151 100.182 4.00017C115.331 4.02883 130.259 7.64258 143.745 14.546C150.433 17.9696 156.672 22.1542 162.346 27C168.113 31.9251 173.295 37.5332 177.772 43.7196C186.654 55.9929 192.505 70.1939 194.846 85.1617C197.188 100.129 195.954 115.439 191.245 129.838"
                  stroke="#F04A49"
                  stroke-width="8"
                  stroke-linecap="round"
                ></path>
                <path
                  _ngcontent-mok-c112=""
                  d="M8.64263 129.493C3.98835 115.076 2.81226 99.7617 5.21051 84.8029C7.60876 69.8442 13.5133 55.6654 22.4413 43.4258C31.3693 31.1862 43.0673 21.2334 56.5788 14.3811C70.0904 7.52876 85.0318 3.97151 100.182 4.00017C115.331 4.02883 130.259 7.64258 143.745 14.546C150.433 17.9696 156.672 22.1542 162.346 27"
                  stroke="#FFBC1A"
                  stroke-width="8"
                  stroke-linecap="round"
                ></path>
                <path
                  _ngcontent-mok-c112=""
                  d="M8.64263 129.493C3.98835 115.076 2.81226 99.7617 5.21051 84.803C7.60876 69.8442 13.5133 55.6654 22.4413 43.4258C26.8697 37.3548 31.9795 31.8465 37.6542 27"
                  stroke="#30D474"
                  stroke-width="8"
                  stroke-linecap="round"
                ></path>
                <text
                  _ngcontent-mok-c112=""
                  fill="#112B27"
                  x="46%"
                  y="46%"
                  dy=".35em"
                  text-anchor="middle"
                  class="circle-text"
                >
                  <tspan _ngcontent-mok-c112="">100</tspan>
                  <tspan _ngcontent-mok-c112="" fill="#112B27" class="score-text">%</tspan>
                </text>
                <path
                  _ngcontent-mok-c112=""
                  fill="#F64027"
                  transform="translate(87,35)"
                  d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"
                  class="ng-star-inserted"
                ></path>
                <g _ngcontent-mok-c112="">
                  <circle
                    _ngcontent-mok-c112=""
                    r="10"
                    fill="white"
                    filter="url(#filter0_d_45718_96908)"
                    cx="192"
                    cy="130"
                  ></circle>
                </g>
                <circle _ngcontent-mok-c112="" r="3" cx="192" cy="130" fill="#F04A49"></circle>
              </svg> -->
            </div>
          </div>
          <div v-if="results && results.percent > 1" class="result__violations">
            <div class="result__violations-title">Возможны следующие нарушения:</div>
            <details v-for="(item, idx) in violations" :key="idx">
              <summary class="summary">
                <div class="summary__number">{{ idx + 1 }}</div>
                <div class="summary__text">
                  {{ item.violationName }}
                </div>
                <div style="margin-left: auto">&#9660;</div>
              </summary>
              <p v-for="(memo, ind) in item.memo" style="padding: 5px 0" :key="ind">
                {{ memo }}
              </p>
            </details>
          </div>
        </div>
        <div class="result__feedback">
          <div class="result__feedback-content">
            <div class="result__feedback-content__inner">
              <div>
                <div class="result__feedback-title">Был ли сервис полезен для Вас?</div>
                <div class="result__feedback-descr">
                  Оцените сервис, чтобы помочь нам стать лучше.
                </div>
              </div>
              <div class="result__feedback-btns">
                <div class="result__feedback-btn">
                  <img src="https://quiz.knd.mos.ru/assets/png/smile.png" alt="" />
                  <div>Да, все хорошо</div>
                </div>
                <div class="result__feedback-btn">
                  <img src="https://quiz.knd.mos.ru/assets/png/apathy.png" alt="" />
                  <div>Есть что улучшить</div>
                </div>
              </div>
            </div>
          </div>
          <form class="result__feedback-form">
            <label>Расскажите, какие есть предложения/замечания по работе сервиса?</label>
            <textarea name="" id="" placeholder="Ваши предложения или замечания"></textarea>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useResultsStore } from '@/stores/result'

const router = useRouter()
const store = useResultsStore()

const results = store.results
if (!results) router.push({ name: 'notFound' })
const violations = store.violations
</script>

<style lang="scss" scoped>
.result {
  &__wrapper {
    padding: 0 64px;
  }
  &__content {
    background: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 32px;
  }
  &__inner {
    display: flex;
    gap: 80px;
    padding: 64px;
  }
  &__suptitle {
    font-size: 16px;
    line-height: 24px;
  }
  &__title {
    font-family:
      PT Serif,
      serif;
    font-style: normal;
    font-weight: 400;
    font-size: 56px;
    line-height: 64px;
    color: #112b27;
    font-size: 32px;
    line-height: 40px;
    padding: 12px 0 16px;
  }
  &__actions {
    padding-top: 32px;
    display: grid;
    align-items: center;
    color: #3c514e;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  &__right {
    width: 220px;
    .circle {
      min-width: 220px;
      height: 220px;
      background-color: #fff;
      border: 10px solid #cbcfcb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
    }
  }
  &__violations {
    padding: 0 64px;
    &-title {
      font-family:
        PT Serif,
        serif;
      font-style: normal;
      font-weight: 400;
      font-size: 56px;
      line-height: 64px;
      color: #112b27;
      font-family: Inter, sans-serif;
      font-size: 24px;
      line-height: 32px;
      font-size: 20px;
      line-height: 28px;
    }
  }
  &__feedback {
    border: 1px solid #d2d7d6;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 64px;
    &-content__inner {
      display: flex;
      justify-content: space-between;
    }
    &-title {
      font-family:
        PT Serif,
        serif;
      font-style: normal;
      font-weight: 400;
      font-size: 56px;
      line-height: 64px;
      color: #112b27;
      font-size: 24px;
      line-height: 32px;
    }
    &-descr {
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #677775;
      font-size: 14px;
      line-height: 20px;
      padding-top: 12px;
    }
    &-btns {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-gap: 16px;
      align-items: center;
    }
    &-btn {
      display: flex;
      flex-direction: column;
      background: #f7f7f7;
      width: 128px;
      height: 100px;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      padding: 8px;
      font-size: 12px;
      line-height: 16px;
      img {
        width: 32px;
        margin-bottom: 12px;
      }
    }
    &-form {
      label {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #112b27;
        width: 100%;
        margin-bottom: 0;
      }
      textarea {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #3c514e;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #d2d7d6;
        box-sizing: border-box;
        border-radius: 6px;
        background-color: #fff;
        width: 100%;
        padding: 16px;
      }
    }
  }
}
.summary {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  cursor: pointer;
  &__number {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    background: #f64027;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
