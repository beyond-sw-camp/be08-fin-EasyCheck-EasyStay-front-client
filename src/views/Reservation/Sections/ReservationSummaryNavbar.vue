<template>
  <nav
    class="reservation-summary-navbar"
    :class="{ 'mobile-view': isMobileView }"
    :style="{ marginTop: navbarMargin }"
  >
    <div class="container-fluid">
      <div class="summary-container" :class="{ 'flex-column': isMobileView }">
        <summary-item
          v-for="(item, index) in summaryItems"
          :key="index"
          :label="item.label"
          :value="item.value"
          :badge="item.badge"
          :is-price="item.isPrice"
          :is-mobile="isMobileView"
          @edit="handleEdit(item.type)"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useReservationStore } from "@/stores/reservationStore.js";
import { useHeaderStore } from "@/stores/headerStore"; // headerStore import
import SummaryItem from "./SummaryItem.vue";

const reservationStore = useReservationStore();
const headerStore = useHeaderStore(); // headerStore 초기화

const {
  roomCount,
  totalPrice,
  stayDuration,
  formattedCheckinDate,
  formattedCheckoutDate,
  currentAccommodationName,
} = storeToRefs(reservationStore);

// 반응형 상태 관리
const isMobileView = ref(window.innerWidth < 768);
const MOBILE_BREAKPOINT = 768;

// 헤더 메뉴 상태에 따른 여백 계산을 위한 computed
const navbarMargin = computed(() => headerStore.getContentPadding);

const checkMobileView = () => {
  isMobileView.value = window.innerWidth < MOBILE_BREAKPOINT;
};
// 요약 정보 항목들
const summaryItems = computed(() => [
  {
    type: "accommodation",
    label: "지점",
    value: currentAccommodationName.value,
    editable: true,
  },
  {
    type: "stay-period",
    label: "투숙 기간",
    value: `${formattedCheckinDate.value} ~ ${formattedCheckoutDate.value}`,
    badge: `${stayDuration.value}박`,
    editable: true,
  },
  {
    type: "room-count",
    label: "객실 수",
    value: `${roomCount.value}실`,
    editable: true,
  },
  {
    type: "total-price",
    label: "총 금액(VAT 포함)",
    value: totalPrice.value,
    isPrice: true,
    editable: false,
  },
]);

// 수정 핸들러
const handleEdit = (type) => {
  switch (type) {
    case "accommodation":
      // 숙박시설 선택 모달/탭으로 이동
      break;
    case "stay-period":
      // 달력 컴포넌트로 스크롤/포커스
      break;
    case "room-count":
      // 객실 수 조절 컴포넌트로 스크롤/포커스
      break;
  }
};

// 라이프사이클 훅
onMounted(() => {
  window.addEventListener("resize", checkMobileView);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobileView);
});
</script>

<style lang="scss" scoped>
.reservation-summary-navbar {
  padding: 0;
  background-color: #2b2b2b;
  width: 100%;
  transition: margin-top 0.3s ease; // 여백 변화에 애니메이션 추가

  .summary-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    padding: 0.5rem;

    &.flex-column {
      gap: 0.5rem;
    }
  }

  &.mobile-view {
    .summary-container {
      padding: 1rem;
    }
  }
}
</style>
