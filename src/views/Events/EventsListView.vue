<template>
  <Header />
  <section class="py-9">
    <div class="container">
      <h2>Events</h2>
      <div class="banner-slider">
        <div
          v-for="(image, index) in bannerImages"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
          :style="{ display: currentSlide === index ? 'block' : 'none' }"
        >
          <img :src="image" :alt="`Banner ${index + 1}`" />
        </div>

        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>

      <!-- Rest of your template remains the same -->
      <div class="branch-selection">
        <select id="resort-select" v-model="query.branch">
          <option v-for="branch in accommodations" :key="branch.id" :value="branch.name">
            {{ branch.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <p>총 {{ events.length }}건</p>
      </div>

      <div class="event-list">
        <div v-for="(event, index) in paginatedEvents" :key="index" class="event-card"
          @click="goToEventDetail(event.id)" style="cursor: pointer">
          <img :src="event.images" :alt="`Event ${index + 1} Image`" class="event-image" />
          <div class="event-info">
            <h3>{{ event.eventName }}</h3>
            <p>{{ event.startDate }} - {{ event.endDate }}</p>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button id="prevPage" class="page-btn" @click="prevPage" :disabled="currentPage === 1">
          이전
        </button>
        <span id="pageNumbers">{{ currentPage }} / {{ totalPages }}</span>
        <button id="nextPage" class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
          다음
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import ThumnailImg1 from "@/assets/img/eventBanner-1.png";
import ThumnailImg2 from "@/assets/img/eventBanner-2.png";
import ThumnailImg3 from "@/assets/img/eventBanner-3.png";
import ThumnailImg4 from "@/assets/img/eventBanner-4.png";
import ThumnailImg5 from "@/assets/img/eventBanner-5.png";
import Header from "@/examples/Header.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useEventStore } from "@/stores/eventStore";

const eventStore = useEventStore();
const router = useRouter();

const { accommodations, query, filteredEvents } = storeToRefs(eventStore);
const { allEvents } = storeToRefs(eventStore);

const events = ref([]);
const currentPage = ref(1);
const eventsPerPage = 3;

// 슬라이더 관련 상태 관리
const currentSlide = ref(0);
const bannerImages = [
  ThumnailImg1,
  ThumnailImg2,
  ThumnailImg3,
  ThumnailImg4,
  ThumnailImg5,
];
let slideInterval;

// 슬라이더 컨트롤 함수
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerImages.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + bannerImages.length) % bannerImages.length;
};

// 자동 슬라이드 시작
const startSlideShow = () => {
  slideInterval = setInterval(nextSlide, 5000);
};

// 자동 슬라이드 정지
const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
};

onMounted(async () => {
  window.scrollTo(0, 0);
  await eventStore.fetchEvents();
  events.value = allEvents.value;
  await eventStore.fetchAccommodations();
  startSlideShow();
});

onUnmounted(() => {
  stopSlideShow();
});

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  return filteredEvents.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(allEvents.value.length / eventsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToEventDetail = (id) => {
  console.log("전달된 공지사항 ID: ", id);
  router.push({ name: "EventDetail", params: { id } });
  console.log("라우팅 완료");
};
</script>

<style lang="scss" scoped>
.branch-selection select {
  border: 1px solid gold;
  font-size: 18px;
  padding: 8px 16px;
  margin-bottom: 40px;
  color: black;
}

.event-count h2 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #333;
}

.event-count p {
  font-size: 18px;
  margin-bottom: 30px;
  color: gray;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  /* 한 줄에 다 들어가지 않을 때 자동으로 다음 줄로 넘어가게 함 */
  justify-content: space-between;
  /* 카드 간격 조절 */
  gap: 20px;
  /* 카드 사이에 간격 추가 */
}

.event-list::after {
  content: "";
  flex: auto;
  /* 빈 공간을 채워줌으로써 마지막 줄의 카드를 가운데로 정렬 */
}

.event-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: calc(33.333% - 20px);
  /* 3개의 카드가 한 줄에 들어가도록 설정 */
  max-width: 400px;
  /* 최대 너비를 제한해서 크기를 조절 */
  height: 450px;
  /* 카드의 고정된 높이 */
  display: flex;
  flex-direction: column;
  /* 내용을 세로로 정렬 */
  justify-content: space-between;
}

.event-card:hover {
  transform: scale(1.05);
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid gold;
}

.event-info {
  padding: 20px;
  flex-grow: 1;
  /* 카드의 나머지 공간을 채움 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 제목과 내용이 카드 상단에서 바로 이어지도록 */
}

.event-info h3 {
  font-size: 24px;
  margin-top: 10px;
  color: #333;
}

.event-info p {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
}

.banner-slider {
  position: relative;
  max-width: 100%;
  height: 700px;
  overflow: hidden;
  margin-top: 40px;
  margin-bottom: 20px;
}

.slide {
  display: none;
  transition: opacity 1s ease-in-out;
}

.slide img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.slide.active {
  display: block;
  opacity: 1;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.page-btn {
  padding: 10px 20px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.page-btn:hover {
  background-color: #ddd;
}

.page-numbers {
  display: flex;
  gap: 10px;
}

.page-number {
  padding: 10px 15px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.page-number.active {
  background-color: #666;
  color: #fff;
}
</style>
