<script setup>
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useRouter } from "vue-router";
import ExampleCard from "../../Components/ExampleCard.vue";

const events = ref([]);
const eventStore = useEventStore();
const router = useRouter();
const currentIndex = ref(0); // 현재 표시할 첫 번째 이벤트의 인덱스
const itemsPerPage = 3;

const fetchEvents = async () => {
  try {
    await eventStore.fetchEvents();
    events.value = eventStore.allEvents;
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
};

// 현재 페이지에 맞는 이벤트 목록을 순환 방식으로 필터링
const paginatedEvents = computed(() => {
  if (events.value.length < itemsPerPage) return events.value;

  const paginated = [];
  for (let i = 0; i < itemsPerPage; i++) {
    paginated.push(events.value[(currentIndex.value + i) % events.value.length]);
  }
  return paginated;
});

// 이벤트 목록을 순환할 수 있도록 인덱스를 조정
const goToPreviousEvent = () => {
  currentIndex.value = (currentIndex.value - 1 + events.value.length) % events.value.length;
};

const goToNextEvent = () => {
  currentIndex.value = (currentIndex.value + 1) % events.value.length;
};

const fetchEventById = (id) => {
  router.push({ name: "EventDetail", params: { id } });
};

onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <section class="position-relative mt-4 mb-5 pb-5">
    <!-- 좌측 화살표 버튼 -->
    <button @click="goToPreviousEvent" class="pagination-arrow left-arrow">
      <div class="icon-wrapper" data-v-3e37aaed>
        <span class="carousel-control-prev-icon" aria-hidden="true" data-v-3e37aaed></span>
      </div>
    </button>

    <div class="container mt-sm-5 mt-3">
      <!-- 상단 제목 및 설명 영역 -->
      <div class="mb-4 mx-1">
        <h3 class="title-text">Event</h3>
        <h6 class="description-text text-secondary font-weight-normal">
          이벤트 목록을 확인하세요.
        </h6>
      </div>

      <!-- 리스트 영역 -->
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-center mb-3">
            <div class="row">
              <div class="col-md-4 image-container" v-for="event in paginatedEvents" :key="event.id">
                <ExampleCard :image="event.images" :title="event.eventName" @click="fetchEventById(event.id)" />
              </div>
            </div>
          </div>
          <!-- 페이지 인디케이터 -->
          <div class="pagination-indicator mt-6 d-flex justify-content-center">
            <span v-for="(event, index) in events" :key="index"
              :class="{ 'active-dot': index === currentIndex % events.length }" class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 우측 화살표 버튼 -->
    <button @click="goToNextEvent" class="pagination-arrow right-arrow">
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
