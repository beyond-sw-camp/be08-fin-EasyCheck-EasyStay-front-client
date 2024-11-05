<template>
  <div v-if="themePark && themePark.imageUrls" class="carousel slide">
    <div class="carousel-inner">
      <div v-for="(url, index) in themePark.imageUrls" :key="url" class="carousel-item"
        :class="{ active: index === activeIndex }">
        <img :src="url" :alt="`Slide ${index + 1}`" class="w-100 carousel-image"
          @load="updateCaptionColor(index, url)" />
        <div class="carousel-caption">
          <h2 :class="{ 'dark-text': isDarkText, 'light-text': !isDarkText }" class="carousel-title">
            {{ themePark.name }}
          </h2>
          <p :class="{ 'dark-text': isDarkText, 'light-text': !isDarkText }" class="carousel-description">
            {{ themePark.description }}
          </p>
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
const isDarkText = ref(false);

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

const updateCaptionColor = (index, imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let totalBrightness = 0;

    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      totalBrightness += brightness;
    }

    const avgBrightness = totalBrightness / (imgData.length / 4);
    isDarkText.value = avgBrightness > 128;
  };
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
  max-width: 100%;
}

.carousel-inner {
  height: 100%;
  overflow: hidden;
}

.carousel-item {
  height: 100%;
  position: relative;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
  max-width: 100%;
}

.carousel-item.active {
  opacity: 1;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  text-align: left;
  z-index: 2;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.01);
  color: white;
  max-width: 500px;
}

.carousel-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

.carousel-description {
  font-size: 1rem;
  margin-top: 0.5rem;
  word-wrap: break-word;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-55%);
}

.carousel-control-prev {
  left: -55px;
}

.carousel-control-next {
  right: -55px;
}
</style>
