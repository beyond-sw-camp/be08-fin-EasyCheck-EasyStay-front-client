<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="$emit('close')">&times;</span>
      <h2>{{ title }}</h2>
      <div v-html="content"></div>
      <MaterialButton @click="$emit('close')">확인</MaterialButton>
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
  /* 최대 높이 설정 */
  overflow-y: auto;
  /* 내용이 길 경우 스크롤 가능하게 설정 */
  display: flex;
  flex-direction: column;
  /* 세로 방향으로 정렬 */
}

.close-button {
  cursor: pointer;
  float: right;
  font-size: 24px;
}
</style>
