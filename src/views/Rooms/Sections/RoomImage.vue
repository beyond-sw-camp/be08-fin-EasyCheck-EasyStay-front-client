<template>
  <div class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="(url, index) in imgUrls"
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
import { useRoomStore } from "@/stores/roomStore";

const roomStore = useRoomStore();

const { thumbnailUrls: imgUrls } = storeToRefs(roomStore);

const activeIndex = ref(0);

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % imgUrls.value.length;
};

const prevSlide = () => {
  activeIndex.value =
    (activeIndex.value - 1 + imgUrls.value.length) % imgUrls.value.length;
};
</script>

<style lang="scss" scoped>
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
