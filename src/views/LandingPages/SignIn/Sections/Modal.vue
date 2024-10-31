<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="$emit('close')">&times;</span>
      <h2>{{ title }}</h2>
      <div v-html="content" class="modal-body"></div>
      <MaterialButton @click="$emit('close')" class="confirm-button">확인</MaterialButton>
    </div>
  </div>
</template>

<script setup>
import MaterialButton from '@/components/MaterialButton.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  title: String,
  content: String,
});

const emit = defineEmits(['close']);
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  overflow-y: hidden;
  /* 스크롤을 숨김 */
  display: flex;
  flex-direction: column;
}

.modal-body {
  flex-grow: 1;
  /* 내용이 많아질 경우 공간을 차지하게 설정 */
  overflow-y: auto;
  /* 내용이 많을 경우 스크롤 가능 */
}

.close-button {
  cursor: pointer;
  float: right;
  font-size: 24px;
}

.confirm-button {
  margin-top: 20px;
  /* 버튼과 내용 사이에 공간 추가 */
  align-self: flex-end;
  /* 버튼을 오른쪽 정렬 */
}
</style>
