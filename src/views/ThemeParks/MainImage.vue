<template>
  <div v-if="themePark && themePark.imageUrls" class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="(url, index) in themePark.imageUrls"
        :key="url"
        class="carousel-item"
        :class="{ active: index === activeIndex }"
      >
        <img
          :src="url"
          :alt="`Slide ${index + 1}`"
          class="w-100 carousel-image"
        />
        <div class="carousel-caption">
          <h2 class="carousel-title">{{ themePark.name }}</h2>
          <p class="carousel-description">{{ themePark.description }}</p>
        </div>
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
  <div v-else>
    <p>테마파크 정보를 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  themePark: {
    type: Object,
    required: true,
  },
});

const activeIndex = ref(0);

const nextSlide = () => {
  if (props.themePark && props.themePark.imageUrls) {
    activeIndex.value =
      (activeIndex.value + 1) % props.themePark.imageUrls.length;
  }
};

const prevSlide = () => {
  if (props.themePark && props.themePark.imageUrls) {
    activeIndex.value =
      (activeIndex.value - 1 + props.themePark.imageUrls.length) %
      props.themePark.imageUrls.length;
  }
};

watch(
  () => props.themePark,
  () => {
    activeIndex.value = 0;
  }
);
</script>

<style scoped lang="scss">
.carousel {
  height: 700px;
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
  position: relative;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.carousel-item.active {
  opacity: 1;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  text-align: left;
  z-index: 2;
  padding: 1rem;
  border-radius: 10px;
}

.carousel-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.carousel-description {
  font-size: 1rem;
  margin: 2rem 0 0 0;
  color: #fff;
  max-width: 500px;
  word-wrap: break-word;
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
