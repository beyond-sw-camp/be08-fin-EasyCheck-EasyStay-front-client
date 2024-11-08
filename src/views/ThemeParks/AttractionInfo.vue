<template>
  <div class="container">
    <section class="my-3 py-3 position-relative">
      <div class="d-flex justify-content-between align-items-center px-5 mb-5">
        <h3 class="text-start text-black">시설 안내</h3>
        <button v-if="themeParkId === 7" class="reserve-btn" @click="handleUsageGuide">
          이용 안내
        </button>
        <!-- <MaterialButton class="large-button" color="danger" @click="handleUsageGuide">이용 안내</MaterialButton> -->
      </div>

      <!-- 좌측 화살표 버튼 -->
      <button @click="goToPreviousAttraction" class="pagination-arrow left-arrow">
        <div class="icon-wrapper" data-v-3e37aaed>
          <span class="carousel-control-prev-icon" aria-hidden="true" data-v-3e37aaed></span>
        </div>
      </button>

      <div class="container mt-sm-5 mt-3">
        <div class="row">
          <div class="col-lg-12">
            <div class="d-flex justify-content-center mb-3">
              <div class="row">
                <div class="col-md-4 image-container" v-for="attraction in paginatedAttractions" :key="attraction.id">
                  <div class="card attraction-card" @click="openModal(attraction)">
                    <div class="attraction-image-wrapper">
                      <img :src="attraction.imageUrl" class="card-img-top attraction-image" alt="Attraction Image" />
                      <div class="overlay">
                        <h5 class="card-title">{{ attraction.name }}</h5>
                        <p class="card-text">
                          {{ formattedIntroduction(attraction.introduction) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 페이지 인디케이터 -->
            <div class="pagination-indicator mt-7 d-flex justify-content-center">
              <span v-for="(attraction, index) in attractions" :key="index"
                :class="{ 'active-dot': index === currentIndex % attractions.length }" class="dot"
                @click="goToAttraction(index)"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 우측 화살표 버튼 -->
      <button @click="goToNextAttraction" class="pagination-arrow right-arrow">
        <div class="icon-wrapper" data-v-3e37aaed>
          <span class="carousel-control-next-icon" aria-hidden="true" data-v-3e37aaed></span>
        </div>
      </button>

      <AttractionModal v-if="showModal" :attraction="selectedAttraction" @close="closeModal" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAttractionStore } from "@/stores/attractionStore";
import AttractionModal from "@/components/ThemePark/AttractionModal.vue";

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
const currentIndex = ref(0); // 현재 표시할 첫 번째 attraction의 인덱스
const itemsPerPage = 3;

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

const paginatedAttractions = computed(() => {
  if (attractions.value.length < itemsPerPage) return attractions.value;

  const paginated = [];
  for (let i = 0; i < itemsPerPage; i++) {
    paginated.push(attractions.value[(currentIndex.value + i) % attractions.value.length]);
  }
  return paginated;
});

const goToPreviousAttraction = () => {
  currentIndex.value = (currentIndex.value - 1 + attractions.value.length) % attractions.value.length;
};

const goToNextAttraction = () => {
  currentIndex.value = (currentIndex.value + 1) % attractions.value.length;
};

const goToAttraction = (index) => {
  currentIndex.value = index;
};

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
</script>

<style scoped>
@media (min-width: 1400px) {

  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 1320px;
  }
}

.pagination-arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #000;
  position: absolute;
  top: 50%;
  z-index: 10;
}

.left-arrow {
  left: -70px;
}

.right-arrow {
  right: -70px;
}

.image-container {
  height: 500px;
}

.attraction-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s;
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 1rem;
  overflow: hidden;
}

.attraction-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.attraction-image-wrapper {
  position: relative;
  height: 560px;
}

.attraction-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 !important;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 1rem;
  backdrop-filter: blur(2px);
}

.card-title,
.card-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  color: #fff;
}

.pagination-indicator .dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.pagination-indicator .active-dot {
  background-color: #000;
}

.reserve-btn {
  text-align: center;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e74c3c;
  color: #fff;
  border: none;
}
</style>