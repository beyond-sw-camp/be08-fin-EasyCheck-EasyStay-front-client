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
      <h2>Event 살펴보기</h2>
      <div v-if="event" class="event-card">
        <!-- 상단 왼쪽 사진 -->
        <div class="event-image">
          <img :src="event.images[0]" alt="Image" />
          <div class="overlay">
            <div class="event-info">
              <!-- 상단 오른쪽 이벤트 내용 -->
              <h3>{{ event.eventName }}</h3>
              <p>{{ event.detail }}</p>
              <p><strong>Location:</strong> {{ event.accommodationName }}</p>
              <div class="event-dates">
                <p><strong>Start Date:</strong> {{ event.startDate }}</p>
                <p><strong>End Date:</strong> {{ event.endDate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-list" @click="goBack">목록으로 돌아가기</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import { useRoute } from "vue-router";
import { useEventStore } from "@/stores/eventStore";
import { storeToRefs } from "pinia";

const eventStore = useEventStore();
const { allEvents } = storeToRefs(eventStore);
const route = useRoute();

const event = ref(null);

onMounted(async () => {
  const eventId = route.params.id;
  console.log("아이디 출력 : ", eventId);

  try {
    await eventStore.fetchEvents(); // 모든 이벤트를 먼저 가져옵니다.

    // 이벤트 목록을 콘솔에 출력합니다.
    console.log("가져온 이벤트 목록:", allEvents.value);

    // 가져온 이벤트 목록에서 해당 ID의 이벤트를 찾습니다.
    const eventData = allEvents.value.find((e) => e.id === parseInt(eventId));

    if (eventData) {
      event.value = eventData; // 찾은 이벤트 데이터를 event에 할당합니다.
    } else {
      console.error("해당 ID의 이벤트를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("이벤트를 불러오는 중 오류 발생:", error);
  }
});

const goBack = () => {
  route.push("/eventsListView");
};
</script>

<style scoped>
/* 이벤트 상세 스타일 */

.event-card {
  margin-top: 50px; /* 위쪽 여백 */
}

.event-image {
  position: relative; /* 자식 요소의 절대 위치를 위한 상대적 위치 설정 */
  width: 100%; /* 이미지 가로폭을 100%로 설정 */
}

.event-image img {
  width: 100%; /* 이미지 가로폭을 100%로 설정 */
  height: 700px; /* 비율 유지 */
  object-fit: cover; /* 비율 유지하며 공간 가득 채우기 */
}

.overlay {
  position: absolute; /* 이미지 위에 겹치도록 절대 위치 설정 */
  bottom: 0; /* 아래쪽 정렬 */
  left: 0; /* 왼쪽 정렬 */
  right: 0; /* 오른쪽 정렬 */
  background-color: rgba(0, 0, 0, 0.6); /* 검은 배경과 투명도 */
  color: white; /* 글자색 흰색 */
  padding: 20px; /* 내부 여백 */
}

.event-info h3 {
  font-size: 28px; /* 제목의 폰트 크기를 28px로 설정 */
  margin-bottom: 10px; /* 아래쪽 여백 */
  color: #fff; /* 제목 색상 흰색 */
}

.event-info p {
  font-size: 18px; /* 문단의 폰트 크기를 18px로 설정 */
  margin-bottom: 10px; /* 아래쪽 여백 */
  color: #fff; /* 문단 색상 흰색 */
}

.event-dates {
  margin-top: 10px; /* 위쪽 여백 */
}

.event-dates p {
  font-size: 16px; /* 날짜 문단의 폰트 크기를 16px로 설정 */
  color: #fff; /* 날짜 문단 색상 흰색 */
  margin-bottom: 5px; /* 아래쪽 여백 */
}

.btn-list {
  background-color: #e9ac04; /* 진한 노란색 */
  color: white; /* 글자색 흰색 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 10px 20px; /* 패딩 설정 */
  font-size: 16px; /* 폰트 크기 설정 */
  cursor: pointer; /* 커서 포인터 변경 */
  margin-top: 15px; /* 위쪽 여백 */
}

.btn-list:hover {
  background-color: #cb9202; /* 마우스 오버 시 진한 노란색 */
}
</style>
