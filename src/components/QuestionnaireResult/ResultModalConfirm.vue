<template>
  <AppDialog
    v-model="store.isDialogConfirmVisible"
    :modal="true"
    position="center"
    :style="{ width: '620px', maxWidth: '100%' }"
    class="custom-dialog"
  >
    <template #header>
      <div>Отправлено</div>
    </template>

    <div class="dialog-content">
      Обычно письмо приходит сразу или в течении пары минут. Если письмо не пришло, проверьте папку
      «Спам»
    </div>

    <template #footer>
      <AppButton label="Подтвердить" variant="text" @click="store.isDialogConfirmVisible = false"
        >Закрыть</AppButton
      >
    </template>
  </AppDialog>
</template>

<script lang="ts" setup>
import { useResultsStore } from '@/stores/result'
import AppDialog from '@/components/ui/AppDialog.vue'
import AppButton from '@/components/ui/AppButton.vue'

const store = useResultsStore()
</script>

<style lang="scss" scoped></style>
