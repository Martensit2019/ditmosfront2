<template>
  <AppDialog
    v-model="store.isDialogEmailVisible"
    :modal="true"
    position="center"
    :style="{ width: '620px', maxWidth: '100%' }"
    class="custom-dialog"
    @hide="onDialogEmailHide"
    @show="onDialogEmailShow"
  >
    <template #header>
      <div>Отправить результат</div>
    </template>

    <div class="dialog-content">
      Результат опроса «{{ store.results?.name }}» будет отправлен на указанную ниже почту<br />
      <div style="margin-top: 40px">
        <AppInputText
          id="email"
          v-model="email"
          placeholder="E-mail"
          :error="validationError"
          :error-message="errorMessage"
          @blur="validateField"
          @enter="handleSubmit"
        />
      </div>
    </div>

    <template #footer>
      <AppButton variant="primary" @click="handleSubmit">Отправить</AppButton>
      <AppButton label="Подтвердить" variant="text" @click="store.isDialogEmailVisible = false"
        >Отменить</AppButton
      >
    </template>
  </AppDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useResultsStore } from '@/stores/result'
import AppInputText from '@/components/ui/AppInputText.vue'
import AppDialog from '@/components/ui/AppDialog.vue'
import AppButton from '@/components/ui/AppButton.vue'
import axios from 'axios'

const store = useResultsStore()

const emit = defineEmits<{
  (e: 'sendPdf'): void
}>()

const email = ref<string>('')
const validationError = ref<boolean>(false)
const errorMessage = ref<string>('')
const percent = ref<number>(store.percent ? store.percent : 0)

const validateField = () => {
  if (!email.value.trim()) return 'Email не может быть пустым'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) return 'Введите валидный email'
  return ''
}

const handleSubmit = () => {
  errorMessage.value = validateField()

  validationError.value = !!errorMessage.value
  if (!validationError.value) {
    store.isDialogEmailVisible = false
    setTimeout(() => {
      store.isDialogConfirmVisible = true
      store.email = email.value
      emit('sendPdf')
    }, 300)
  }
}

const onDialogEmailHide = () => {
  store.isDialogEmailVisible = false
  console.log('Диалог закрыт')
}
const onDialogEmailShow = () => {
  console.log('Диалог открыт')
}
</script>
