<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header />
  <section class="py-10">
    <div class="container">
      <h2>Events</h2>
      <div class="banner-slider">
        <div class="slide">
          <img src="@/assets/img/이벤트배너 1.png" alt="Banner 1" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 2.png" alt="Banner 2" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 3.png" alt="Banner 3" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 4.png" alt="Banner 3" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 5.png" alt="Banner 3" />
        </div>
        <!-- 추가적인 배너 이미지를 여기다 넣을 수 있습니다 -->

        <!-- 좌우 화살표 -->
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
      </div>
      <!-- 지점 선택 -->
      <div class="branch-selection">
        <select id="resort-select" v-model="query.branch">
          <option
            v-for="branch in accommodations"
            :key="branch.id"
            :value="branch.name"
          >
            {{ branch.name }}
          </option>
        </select>
      </div>

      <!-- 공지사항 총 개수 -->
      <div class="mb-3">
        <p>총 {{ events.length }}건</p>
      </div>
      <!-- 이벤트 사진과 내용 -->
      <div class="event-list">
        <div
          v-for="(event, index) in paginatedEvents"
          :key="index"
          class="event-card"
          @click="goToEventDetail(event.id)"
          style="cursor: pointer"
        >
          <img
            :src="event.images"
            :alt="`Event ${index + 1} Image`"
            class="event-image"
          />
          <div class="event-info">
            <h3>{{ event.eventName }}</h3>
            <p>{{ event.startDate }} - {{ event.endDate }}</p>
          </div>
        </div>
      </div>
      <!-- 페이지네이션 버튼 -->
      <div class="pagination">
        <button
          id="prevPage"
          class="page-btn"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          이전
        </button>
        <span id="pageNumbers">{{ currentPage }} / {{ totalPages }}</span>
        <button
          id="nextPage"
          class="page-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          다음
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { ref, onMounted, computed } from "vue";
import { useEventStore } from "@/stores/eventStore";

const eventStore = useEventStore();

const router = useRouter();

// 여기서 state 꺼내올 수 있음
// getters도 filteredNotices 이런식으로 받아올 수 있음
const { accommodations, query, filteredEvents } = storeToRefs(eventStore);
const { allEvents } = storeToRefs(eventStore); // allEvents를 가져옴

// setup에서 events 데이터를 사용
const events = ref([]);

// 현재 페이지와 페이지당 이벤트 개수
const currentPage = ref(1);
const eventsPerPage = 3; // 페이지당 6개의 이벤트

onMounted(async () => {
  console.log("호출");
  window.scrollTo(0, 0); // 페이지 로드 시 맨 위로 스크롤
  // 지점 목록 조회하는 함수 호출 actions에서
  await eventStore.fetchEvents();
  events.value = allEvents.value; // allEvents를 events에 할당
  console.log("이벤트 목록:", eventStore.allEvents);

  // 공지사항 조회하는 함수 호출 actions에서
  await eventStore.fetchAccommodations();
});

// 선택한 지점에 맞는 이벤트 필터링
// const filteredEvents = computed(() => {
//   const events = allEvents.value.filter((event) => {
//     console.log(`Filtering: ${event.branchName} === ${query.branch}`);
//     return event.branchName === query.branch;
//   });
//   console.log("Filtered Events:", events);
//   return events;
// });

// 페이지에 맞는 이벤트 계산
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  return filteredEvents.value.slice(start, end);
});

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(allEvents.value.length / eventsPerPage);
});

// 이전 페이지로 이동
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 다음 페이지로 이동
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // 버튼 클릭 이벤트 추가
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // 자동으로 5초마다 슬라이드 넘기기
  setInterval(nextSlide, 5000);

  // 초기 슬라이드 보여주기
  showSlide(currentSlide);
});

const goToEventDetail = (id) => {
  console.log("전달된 공지사항 ID: ", id); // 전달된 ID를 확인
  router.push({ name: "EventDetail", params: { id } });
  console.log("라우팅 완료"); // 라우팅 시도 후 로그
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
  flex-wrap: wrap; /* 한 줄에 다 들어가지 않을 때 자동으로 다음 줄로 넘어가게 함 */
  justify-content: space-between; /* 카드 간격 조절 */
  gap: 20px; /* 카드 사이에 간격 추가 */
}

.event-list::after {
  content: "";
  flex: auto; /* 빈 공간을 채워줌으로써 마지막 줄의 카드를 가운데로 정렬 */
}

.event-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: calc(33.333% - 20px); /* 3개의 카드가 한 줄에 들어가도록 설정 */
  max-width: 400px; /* 최대 너비를 제한해서 크기를 조절 */
  height: 450px; /* 카드의 고정된 높이 */
  display: flex;
  flex-direction: column; /* 내용을 세로로 정렬 */
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
  flex-grow: 1; /* 카드의 나머지 공간을 채움 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 제목과 내용이 카드 상단에서 바로 이어지도록 */
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
