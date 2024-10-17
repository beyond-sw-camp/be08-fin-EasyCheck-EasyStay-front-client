<template>
  <div class="modal" tabindex="-1" style="display: block">
    <div class="modal-dialog modal-dialog-centered mt-0">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ attraction.name }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <img
            :src="attraction.imageUrl"
            alt="Attraction Image"
            class="img-fluid mb-2"
          />
          <h6>시설 정보</h6>
          <p>{{ attraction.details }}</p>
          <h6>이용 기준</h6>
          <ul>
            <li v-for="rule in attraction.guidelines" :key="rule">
              {{ rule }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  attraction: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.modal-dialog {
  max-width: 600px;
  width: 100%;
}
.modal-content {
  overflow-y: auto;
  padding: 1rem;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}
.modal-body {
  font-size: 0.9rem;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;
}
.btn-close:hover {
  color: #555;
}
</style>
