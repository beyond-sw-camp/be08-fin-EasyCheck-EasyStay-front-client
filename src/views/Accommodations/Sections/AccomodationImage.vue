<template>
  <div class="carousel slide p-2">
    <div class="carousel-inner">
      <div
        v-for="(url, index) in thumbnailUrls"
        :key="url"
        class="w-100"
        :class="['carousel-item', { active: index === activeIndex }]"
      >
        <img :src="url" :alt="`Slide ${index + 1}`" />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" @click="prevSlide">
      <div class="icon-wrapper">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </div>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" @click="nextSlide">
      <div class="icon-wrapper">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </div>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAccommodationStore } from "@/stores/accommodationStore.js";

const store = useAccommodationStore();

const { thumbnailUrls } = storeToRefs(store);

const activeIndex = ref(0);

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % thumbnailUrls.value.length;
};

const prevSlide = () => {
  activeIndex.value =
    (activeIndex.value - 1 + thumbnailUrls.value.length) %
    thumbnailUrls.value.length;
};
</script>

<style scoped lang="scss">
.carousel {
  height: 500px;
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-control-prev {
  left: 10px;
}

.carousel-control-next {
  right: 10px;
}
</style>
