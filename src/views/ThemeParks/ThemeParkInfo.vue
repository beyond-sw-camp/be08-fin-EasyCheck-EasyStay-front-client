<template>
  <div class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="(url, index) in themePark.imageUrls"
        :key="url"
        class="w-100"
        :class="['carousel-item', { active: index === activeIndex }]"
      >
        <img :src="url" :alt="`Slide ${index + 1}`" />
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
</template>

<script setup>
import { ref } from "vue";

const themePark = ref({
  id: 1,
  name: "설악 워터피아",
  description:
    "눈 앞에서 시원하게 펼쳐지는 설악산의 풍광과 뜨끈뜨끈한 천연온천을 즐기며 진정한 힐링과 치유의 시간을 즐겨보세요~",
  location: "속초 리조트",
  imageUrls: [
    "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation4.jpg",
    "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation2.jpg",
    "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation3.jpg",
  ],
});

const activeIndex = ref(0);

const nextSlide = () => {
  activeIndex.value =
    (activeIndex.value + 1) % themePark.value.imageUrls.length;
};

const prevSlide = () => {
  activeIndex.value =
    (activeIndex.value - 1 + themePark.value.imageUrls.length) %
    themePark.value.imageUrls.length;
};
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