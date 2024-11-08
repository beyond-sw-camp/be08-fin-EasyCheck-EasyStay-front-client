<template>
  <div class="reservation-container">
    <div class="position-sticky z-index-sticky top-9">
      <reservation-summary-navbar />
    </div>
    <main class="main-content">
      <div class="container">
        <reservation-header />
        <accommodation-navs />
        <div class="reservation-content row mt-2">
          <div class="col-12 col-md-7">
            <reservation-calendar />
          </div>
          <div class="col-12 col-md-5">
            <reservation-summary />
          </div>
        </div>
        <div class="mt-4">
          <room-selection-grid v-if="showRoomSelectionGrid" />
        </div>
        <div class="mt-4">
          <reservation-form v-if="showReservationForm">
            <reservation-info />
          </reservation-form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

// 컴포넌트 임포트
import ReservationForm from "@/views/Reservation/Sections/ReservationForm.vue";
import ReservationInfo from "@/views/Reservation/Sections/ReservationInfo.vue";
import ReservationHeader from "@/views/Reservation/Sections/ReservationHeader.vue";
import AccommodationNavs from "@/views/Reservation/Sections/AccommodationNavs.vue";
import RoomSelectionGrid from "@/views/Reservation/Sections/RoomSelectionGrid.vue";
import ReservationSummary from "@/views/Reservation/Sections/ReservationSummary.vue";
import ReservationCalendar from "@/views/Reservation/Sections/ReservationCalendar.vue";
import ReservationSummaryNavbar from "@/views/Reservation/Sections/ReservationSummaryNavbar.vue";

// 스토어 및 라우트 설정
const route = useRoute();
const reservationStore = useReservationStore();

// 상태 참조
const { showRoomSelectionGrid, showReservationForm } =
  storeToRefs(reservationStore);

// 쿼리 파라미터 computed
const queryParams = computed(() => ({
  accommodationId: route.query.accommodationId,
  checkInDate: route.query.checkInDate,
  checkOutDate: route.query.checkOutDate,
}));

// 초기화 로직
const initializeReservation = async () => {
  await reservationStore.fetchAccommodations();

  const { accommodationId, checkInDate, checkOutDate } = queryParams.value;

  if (!accommodationId && !checkInDate && !checkOutDate) {
    reservationStore.initializeReservation();
  } else {
    await reservationStore.initializeReservationWithQuery({
      accommodationId,
      checkInDate: checkInDate ? new Date(checkInDate) : null,
      checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    });
  }
};

// 라이프사이클 훅
onMounted(initializeReservation);
onUnmounted(() => reservationStore.resetReservation());
</script>

<style lang="scss" scoped>
.reservation-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  padding-top: 180px;
  flex: 1;

  @media (max-width: 767px) {
    padding-top: 360px;
  }
}

.reservation-content {
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
</style>
