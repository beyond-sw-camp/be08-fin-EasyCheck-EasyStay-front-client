<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <button class="close-button" @click="handleClose">X</button>
      <h2>{{ attraction.name }}</h2>
      <img
        v-if="attraction.imageUrls && attraction.imageUrls.length > 0"
        :src="attraction.imageUrls[0]"
        alt="Attraction Image"
        class="modal-image"
      />
      <p class="modal-description">{{ attraction.introduction }}</p>
      <h3>이용 기준</h3>
      <ul class="standard-use-list">
        <li
          v-for="(item, index) in formattedStandardUse"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <h3>추가 정보</h3>
      <p>{{ attraction.information }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  attraction: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};

const formattedStandardUse = computed(() => {
  if (!props.attraction.standardUse) {
    return [];
  }
  return props.attraction.standardUse
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.modal-description {
  margin-bottom: 1rem;
}

.standard-use-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
</style>
