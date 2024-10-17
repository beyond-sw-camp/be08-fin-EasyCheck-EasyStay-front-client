<template>
  <section class="my-3 py-3">
    <h3 class="text-start text-black px-6 mb-5 mb-lg-7">시설 안내</h3>
    <div class="container-fluid px-6">
      <Splide :options="splideOptions">
        <SplideSlide
          v-for="attraction in attractions"
          :key="attraction.id"
          class="slider-item d-flex justify-content-center px-1"
        >
          <div class="card attraction-card" @click="openModal(attraction)">
            <div class="attraction-image-wrapper">
              <img
                :src="attraction.imageUrl"
                class="card-img-top attraction-image"
                alt="Attraction Image"
              />
              <div class="overlay">
                <h5 class="card-title">{{ attraction.name }}</h5>
                <p class="card-text">
                  {{ formattedDescription(attraction.description) }}
                </p>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>

    <AttractionModal
      v-if="showModal"
      :attraction="selectedAttraction"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import AttractionModal from "@/components/ThemePark/AttractionModal.vue";
import "@splidejs/splide/dist/css/splide.min.css";

const attractions = [
  {
    id: 1,
    name: "파도풀",
    description:
      "속초 바다를 닮은 최고높이 1.8M의 시원한 파도를 이곳에서 느껴보세요",
    imageUrl:
      "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation1.jpg",
    details: "수심 300m, 온도 27-29°C",
    guidelines: [
      "신장 90cm 이하 어린이는 보호자 동반 입장",
      "3세 이하 유아는 방수 기저귀 착용 필수",
      "음식물 반입 금지",
    ],
  },
  {
    id: 2,
    name: "멀티풀",
    description: "다양한 놀이시설을 함께 갖춘 멀티풀이 준비되어 있습니다.",
    imageUrl:
      "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation2.jpg",
    details: "수심 200m, 온도 25-28°C",
    guidelines: [
      "신장 100cm 이하 어린이는 보호자 동반 입장",
      "수영모 착용 필수",
      "음식물 반입 금지",
    ],
  },
  {
    id: 3,
    name: "키즈풀",
    description:
      "어린 아이들만의 특별한 놀이공간으로 다양한 시설에서 재미있는 시간을 가져보세요",
    imageUrl:
      "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation3.jpg",
    details: "수심 30cm, 온도 27-29°C",
    guidelines: [
      "신장 90cm 이하 어린이는 보호자 동반 입장",
      "3세 이하 유아는 방수 기저귀 착용 필수",
      "음식물 반입 금지",
    ],
  },
  {
    id: 4,
    name: "아쿠아풀",
    description: "속초 바다에서 시원한 파도와 함께 즐거움을 느껴보세요",
    imageUrl:
      "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation4.jpg",
    details: "수심 150m, 온도 26-28°C",
    guidelines: [
      "신장 100cm 이하 어린이는 보호자 동반 입장",
      "구명조끼 착용 필수",
      "음식물 반입 금지",
    ],
  },
  {
    id: 5,
    name: "인피니티 풀",
    description:
      "끝없이 펼쳐지는 속초의 푸른 바다를 파노라마로 즐길 수 있는 최고의 전망과 함께 여유를 즐기세요",
    imageUrl:
      "https://beyond-easycheck.s3.amazonaws.com/accommodation/acoommodation5.jpg",
    details: "수심 100m, 온도 27-30°C",
    guidelines: [
      "신장 120cm 이상만 이용 가능",
      "음료 반입 금지",
      "수영모 착용 필수",
    ],
  },
];

const selectedAttraction = ref(null);
const showModal = ref(false);

const openModal = (attraction) => {
  selectedAttraction.value = attraction;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};

const formattedDescription = (description) => {
  return description.length > 50
    ? description.slice(0, 50) + "..."
    : description;
};

const splideOptions = {
  type: "slide",
  perPage: 3,
  perMove: 1,
  pagination: true,
  arrows: true,
  breakpoints: {
    1024: {
      perPage: 2,
    },
    768: {
      perPage: 1,
    },
  },
};
</script>

<style scoped>
.slider-item {
  padding: 0;
}

.attraction-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  max-width: 420px;
  height: auto;
  margin-bottom: 1rem;
}

.attraction-card:hover {
  transform: scale(1.05);
}

.attraction-image-wrapper {
  position: relative;
  height: 560px;
}

.attraction-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 1rem;
  box-sizing: border-box;
}

.card-title {
  color: #ffffff;
}

.splide__arrow {
  background-color: #007bff;
  color: #ffffff;
  border-radius: 50%;
  padding: 0.5rem;
  width: 50px;
  height: 50px;
  opacity: 0.8;
  transition: background-color 0.3s, opacity 0.3s;
}

.splide__arrow:hover {
  background-color: #0056b3;
  opacity: 1;
}
</style>
