<template>
  <div class="result-footer">
    <template v-if="isShowMain">
      <div class="result-footer__main">
        <div class="result-footer__content">
          <div class="result-footer__title">Был ли сервис полезен для Вас?</div>
          <div class="result-footer__subtitle">Оцените сервис, чтобы помочь нам стать лучше.</div>
        </div>
        <div class="result-footer__actions">
          <div
            class="result-footer__action result-footer__action-yes"
            :class="{ selected: selectedAction === 'yes' }"
            @click="setSelected('yes')"
          >
            <div class="result-footer__icon">
              <img src="/src/assets/i/fi-sr-laugh.svg" alt="" />
            </div>
            <div>Да, все хорошо</div>
          </div>

          <div
            class="result-footer__action result-footer__action-no"
            :class="{ selected: selectedAction === 'no' }"
            @click="setSelected('no')"
          >
            <div class="result-footer__icon">
              <img src="/src/assets/i/fi-sr-meh.svg" alt="" />
            </div>
            <div>Есть что улучшить</div>
          </div>
        </div>
      </div>
      <div v-if="selectedAction === 'yes'" class="result-footer__submit">
        <AppButton variant="primary" class="" @click="handleClick">Отправить</AppButton>
      </div>
      <div v-if="selectedAction === 'no'" class="result-footer__form">
        <form>
          <div class="result-footer__form-title">
            Расскажите, какие есть предложения/замечания по работе сервиса?
          </div>
          <AppTextarea
            v-model="message"
            placeholder="Описание задачи"
            :error="validationError"
            autoResize
            :error-message="errorMessage"
            @blur="validateField"
          />
          <AppButton variant="primary" class="" style="margin-top: 20px" @click="sendMessage"
            >Отправить</AppButton
          >
        </form>
      </div>
    </template>
    <template v-else>
      <div class="result-footer__title">Сообщение отправлено</div>
      <div class="result-footer__subtitle">Благодарим за Ваш отзыв!</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTextarea from '../ui/AppTextarea.vue'
import AppButton from '@/components/ui/AppButton.vue'

type TAction = 'yes' | 'no' | null

const isShowMain = ref<boolean>(true)
const selectedAction = ref<TAction>(null)
const message = ref<string>('')
const validationError = ref<boolean>(false)
const errorMessage = ref<string>('')
const MIN_LENGTH_MESSAGE = 5

const setSelected = (action: TAction) => {
  selectedAction.value = action
}

const handleClick = () => {
  isShowMain.value = false
}

const validateField = () => {
  validationError.value = message.value.trim().length < MIN_LENGTH_MESSAGE
}

const setErrorMessage = () => {
  if (!message.value.trim().length) return 'Сообщение не может быть пустым'
  if (message.value.trim().length < MIN_LENGTH_MESSAGE)
    return 'Сообщение не может быть таким коротким'
  return errorMessage.value
}

const sendMessage = () => {
  errorMessage.value = setErrorMessage()
  validateField()
  if (!validationError.value) isShowMain.value = false
}
</script>

<style lang="scss" scoped>
.result-footer {
  font-family: 'Golos Text';
  font-style: normal;
  margin: 74px 0 68px;
  padding: 40px;
  background: var(--baseWhiteColor);
  border-radius: 24px;
  @media (max-width: 940px) {
    padding: 32px;
  }
  @media (max-width: 460px) {
    padding: 20px;
  }
  &__main {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    @media (max-width: 940px) {
      flex-direction: column;
    }
  }
  &__content {
    color: var(--baseBlackColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__title {
    font-weight: 500;
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 24px;
  }
  &__subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: var(--baseBlackColor);
  }
  &__actions {
    display: flex;
    gap: 32px;
    @media (max-width: 940px) {
      justify-content: center;
    }
    @media (max-width: 620px) {
      flex-direction: column;
    }
  }
  &__action {
    width: 242px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;
    gap: 20px;
    border: 1px solid #a8b1bd;
    border-radius: 16px;
    cursor: pointer;
    transition: border-color background-color 0.5s ease-in-out;
    @media (max-width: 620px) {
      justify-content: flex-start;
      flex-direction: row;
      width: 100%;
      padding: 24px;
    }
    &.result-footer__action-yes {
      .result-footer__icon {
        background-color: var(--baseGreenColor);
      }
      &:hover {
        border-color: var(--bgMint);
        background-color: var(--bgMint);
      }
    }
    &.result-footer__action-no {
      .result-footer__icon {
        background-color: var(--baseOrangeColor);
      }
      &:hover {
        border-color: var(--bgPeach);
        background-color: var(--bgPeach);
      }
    }
    &-yes.selected {
      border-color: var(--bgMint);
      background-color: var(--bgMint);
    }
    &-no.selected {
      border-color: var(--bgPeach);
      background-color: var(--bgPeach);
    }
  }
  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__submit {
    padding-top: 40px;
  }
  &__form {
    padding-top: 40px;
    &-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: var(--baseBlackColor);
      margin-bottom: 16px;
    }
  }
}
</style>
