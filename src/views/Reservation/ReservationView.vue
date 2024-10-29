<template>
  <div class="position-sticky z-index-sticky top-9">
    <reservation-summary-navbar />
  </div>
  <main class="main-content">
    <div class="container">
      <h3 class="text-black">객실 예약</h3>
      <p class="text-black fw-normal">
        예약을 원하시는 리조트/호텔 지점, 투숙기간, 객실 수 입력 후 객실을
        선택하세요
      </p>
      <accommodation-navs />
      <div class="row mt-2">
        <div class="col-12 col-md-7">
          <reservation-calendar />
        </div>
        <div class="col-12 col-md-5">
          <reservation-summary />
        </div>
      </div>
      <div class="mt-8">
        <room-selection-grid v-if="showRoomSelectionGrid" />
      </div>
      <div class="mt-4">
        <reservation-form v-if="showReservationForm" />
      </div>
      <div class="mt-4">
        <reservation-info v-if="showReservationForm" />
      </div>
    </div>
  </main>
</template>

<script setup>
import AccommodationNavs from "./Sections/AccommodationNavs.vue";
import ReservationCalendar from "./Sections/ReservationCalendar.vue";
import ReservationSummary from "./Sections/ReservationSummary.vue";
import ReservationSummaryNavbar from "./Sections/ReservationSummaryNavbar.vue";
import RoomSelectionGrid from "./Sections/RoomSelectionGrid.vue";
import ReservationForm from "./Sections/ReservationForm.vue";
import ReservationInfo from "./Sections/ReservationInfo.vue";

import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, watch } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

const router = useRouter();
const reservationStore = useReservationStore();

const {
  showRoomSelectionGrid,
  showReservationForm,
  isPaymentSuccess,
  isPaymentFailed,
} = storeToRefs(reservationStore);

// 결제 성공시 결과 창으로 이동
watch(isPaymentSuccess, (isSuccess) => {
  if (isSuccess) {
    router.push("/reservation/result");
  }
});

// 결제 실패시 메인 화면으로 이동
watch(isPaymentFailed, (isFailed) => {
  if (isFailed) {
    router.push("/");
  }
});

onMounted(async () => {
  // 숙박시설들 불러오기
  await reservationStore.fetchAndInitAccommodationNavs();
});

onMounted(() => {
  reservationStore.initCheckInCheckOut();
});

onUnmounted(() => {
  // unmount시 불러온거 초기화
  reservationStore.resetAccommodationList();
});
</script>

<style lang="scss" scoped>
.main-content {
  padding-top: 180px; // 네브바의 높이에 맞춰 조정

  @media (max-width: 767px) {
    padding-top: 360px; // 모바일에서 네브바가 더 높아질 경우 조정
  }
}

.row {
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
</style>
