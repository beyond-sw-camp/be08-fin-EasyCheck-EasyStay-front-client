<script setup>
import { ref, computed, onMounted } from "vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useRouter } from "vue-router";
import ExampleCard from "../../Components/ExampleCard.vue";

const accommodations = ref([]);
const accommodationStore = useAccommodationStore();
const router = useRouter();
const currentIndex = ref(0); // 현재 표시할 첫 번째 숙박 시설의 인덱스
const itemsPerPage = 3;

const fetchAccommodations = async () => {
  try {
    await accommodationStore.fetchAccommodations();
    accommodations.value = accommodationStore.allAccommodations;
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
  }
};

// 현재 페이지에 맞는 숙박 시설 목록을 순환 방식으로 필터링
const paginatedAccommodations = computed(() => {
  if (accommodations.value.length < itemsPerPage) return accommodations.value;

  const paginated = [];
  for (let i = 0; i < itemsPerPage; i++) {
    paginated.push(accommodations.value[(currentIndex.value + i) % accommodations.value.length]);
  }
  return paginated;
});

// 숙박 시설 목록을 순환할 수 있도록 인덱스를 조정
const goToPreviousAccommodation = () => {
  currentIndex.value = (currentIndex.value - 1 + accommodations.value.length) % accommodations.value.length;
};

const goToNextAccommodation = () => {
  currentIndex.value = (currentIndex.value + 1) % accommodations.value.length;
};

const fetchAccommodationById = async (id) => {
  try {
    await accommodationStore.fetchAccommodationById(id);
    router.push({ name: "Accommodation", params: { id } });
  } catch (error) {
    console.error("Failed to fetch accommodation by ID:", error);
  }
};

onMounted(() => {
  fetchAccommodations();
});
</script>

<template>
  <section class="position-relative mt-4 mb-5 pb-5">
    <!-- 좌측 화살표 버튼 -->
    <button @click="goToPreviousAccommodation" class="pagination-arrow left-arrow">
      <div class="icon-wrapper" data-v-3e37aaed>
        <span class="carousel-control-prev-icon" aria-hidden="true" data-v-3e37aaed></span>
      </div>
    </button>

    <div class="container sm-5">
      <div class="mb-4 mx-1">
        <h3 class="title-text">Accommodation</h3>
        <h6 class="description-text text-secondary font-weight-normal">
          지점 목록을 확인하세요.
        </h6>
      </div>

      <!-- 리스트 영역 -->
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-center mb-3">
            <div class="row">
              <div class="col-md-4 image-container" v-for="accommodation in paginatedAccommodations"
                :key="accommodation.id">
                <ExampleCard :image="accommodation.thumbnailUrls[0]" :title="accommodation.name"
                  @click="fetchAccommodationById(accommodation.id)" />
              </div>
            </div>
          </div>
          <!-- 페이지 인디케이터 -->
          <div class="pagination-indicator mt-6 d-flex justify-content-center">
            <span v-for="(accommodation, index) in accommodations" :key="index"
              :class="{ 'active-dot': index === currentIndex % accommodations.length }" class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 우측 화살표 버튼 -->
    <button @click="goToNextAccommodation" class="pagination-arrow right-arrow">
      <div class="icon-wrapper" data-v-3e37aaed>
        <span class="carousel-control-next-icon" aria-hidden="true" data-v-3e37aaed></span>
      </div>
    </button>
  </section>
</template>

<style scoped>
.title-text {
  font-size: 2.5rem;
  font-weight: bold;
}

.description-text {
  font-size: 1.2rem;
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

.pagination-arrow:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.left-arrow {
  left: -55px;
}

.right-arrow {
  right: -55px;
}

.image-container {
  height: 500px;
}

.pagination-indicator .dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  display: inline-block;
}

.pagination-indicator .active-dot {
  background-color: #000;
}
</style>