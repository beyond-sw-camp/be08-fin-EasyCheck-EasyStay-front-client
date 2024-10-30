<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isVisible" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="close" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <p>{{ content }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['title', 'content', 'isVisible']);
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  z-index: 1060;
  position: relative;
}
</style>
