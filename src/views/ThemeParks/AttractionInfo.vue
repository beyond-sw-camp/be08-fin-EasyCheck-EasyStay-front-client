<template>
  <section class="my-3 py-3">
    <div class="d-flex justify-content-between align-items-center px-5 mb-5">
      <h3 class="text-start text-black">시설 안내</h3>
      <MaterialButton
        class="large-button"
        color="danger"
        @click="handleUsageGuide"
        >이용 안내</MaterialButton
      >
    </div>
    <div class="container-fluid px-1">
      <Splide :options="splideOptions" class="custom-splide mb-lg-5">
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
                  {{ formattedIntroduction(attraction.introduction) }}
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
import { ref, onMounted, computed, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import { useAttractionStore } from "@/stores/attractionStore";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import AttractionModal from "@/components/ThemePark/AttractionModal.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import "@splidejs/splide/css/sea-green";

const props = defineProps({
  themeParkId: {
    type: Number,
    required: true,
  },
  currentThemePark: {
    type: Object,
    required: true,
  },
});

const attractionStore = useAttractionStore();
const router = useRouter();
const selectedAttraction = ref(null);
const showModal = ref(false);

onMounted(() => {
  fetchAttractions();
});

watch(
  () => props.themeParkId,
  () => {
    fetchAttractions();
  }
);

const fetchAttractions = () => {
  if (props.themeParkId) {
    attractionStore.fetchAttractions(props.themeParkId);
  }
};

const attractions = computed(() => attractionStore.attractions);

const openModal = (attraction) => {
  selectedAttraction.value = attraction;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const formattedIntroduction = (introduction) => {
  return introduction.length > 50
    ? introduction.slice(0, 50) + "..."
    : introduction;
};

const handleUsageGuide = () => {
  if (props.currentThemePark && props.currentThemePark.guidePageName) {
    router.push({
      name: "UsageGuide",
      params: { guidePageName: props.currentThemePark.guidePageName },
    });
  }
};

const splideOptions = {
  type: "slide",
  perPage: 3,
  perMove: 1,
  pagination: true,
  arrows: true,
  gap: "1rem",
  breakpoints: {
    1024: {
      perPage: 2,
      gap: "0.5rem",
    },
    768: {
      perPage: 1,
      gap: "0.25rem",
    },
  },
};
</script>

<style scoped>
.slider-item {
  padding: 0;
  margin: 0 0.5rem;
}

.attraction-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s;
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.attraction-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.attraction-image-wrapper {
  position: relative;
  width: 420px;
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
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  backdrop-filter: blur(2px);
}

.card-title,
.card-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  color: #fff;
}

.splide__arrow {
  background-color: #007bff;
  color: #ffffff;
  border-radius: 50%;
  padding: 1rem;
  width: 50px;
  height: 50px;
  opacity: 0.8;
  transition: background-color 0.3s, opacity 0.3s;
}

.splide__arrow:hover {
  background-color: #0056b3;
  opacity: 1;
}

.splide__track {
  margin-bottom: 2rem !important;
  overflow-x: hidden;
}

.slider-item {
  margin-left: 0px;
  margin-right: 0px;
}

.large-button {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  min-width: 150px;
  min-height: 50px;
  background-color: #ff4c4c;
  border-radius: 8px;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.large-button:hover {
  background-color: #cc3a3a;
  transform: scale(1.02);
}
</style>
