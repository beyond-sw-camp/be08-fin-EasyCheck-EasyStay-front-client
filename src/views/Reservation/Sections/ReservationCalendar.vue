<template>
  <div class="reservation-calendar">
    <v-calendar
      borderless
      columns="2"
      :min-date="today"
      :attributes="calendarAttributes"
      @dayclick="handleDateSelection"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

// 상수
const DATE_SELECTION_MODE = {
  START: "START",
  END: "END",
};

// 초기 설정
const today = new Date(new Date().setHours(0, 0, 0, 0));
const selectMode = ref(DATE_SELECTION_MODE.START);

// 스토어 설정
const reservationStore = useReservationStore();
const { checkIn, checkOut } = storeToRefs(reservationStore);

// 캘린더 속성 계산
const calendarAttributes = computed(() => [
  {
    key: "selection",
    highlight: {
      start: { fillMode: "outline" },
      base: { fillMode: "light" },
      end: { fillMode: "outline" },
    },
    dates: {
      start: checkIn.value,
      end: checkOut.value,
    },
  },
]);

// 날짜 유효성 검사
const isValidDateSelection = (selectedDate) => {
  if (selectedDate.getTime() < today.getTime()) {
    console.warn("과거 날짜는 선택할 수 없습니다.");
    return false;
  }
  return true;
};

// 날짜 선택 처리
const handleDateSelection = (e) => {
  const { date: selectedDate } = e;

  if (!isValidDateSelection(selectedDate)) return;

  if (selectMode.value === DATE_SELECTION_MODE.START) {
    // 시작 날짜 선택
    reservationStore.setCheckinDate(selectedDate);
    reservationStore.setCheckoutDate(selectedDate);
    reservationStore.setShowRoomSelectionGrid(false);
    selectMode.value = DATE_SELECTION_MODE.END;
  } else {
    // 종료 날짜 선택
    const currentStartDate = checkIn.value;

    if (selectedDate.getTime() < currentStartDate.getTime()) {
      // 선택한 날짜가 시작일보다 이전인 경우
      reservationStore.setCheckinDate(selectedDate);
      reservationStore.setCheckoutDate(currentStartDate);
    } else {
      // 선택한 날짜가 시작일보다 이후인 경우
      reservationStore.setCheckoutDate(selectedDate);
    }

    // 날짜 선택이 완료되면 객실 검색 실행
    selectMode.value = DATE_SELECTION_MODE.START;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/material-kit/custom/_variables.scss";

.easycheck-calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  :deep(.vc-container) {
    width: 100%;
    // max-width: 1000px; // 최대 너비 설정
    background: $gray-50;
    transform-origin: center top; // 변환 기준점 설정
    transition: transform 0.3s ease; // 부드러운 전환 효과
  }

  :deep(.vc-day) {
    min-height: 24px;

    &.is-today {
      font-weight: bold;
    }

    &.is-disabled {
      opacity: 0.4;
    }
  }

  :deep(.vc-day-content) {
    font-size: 1em;
    height: auto;
    min-height: 32px;
    padding: 4px;
  }
}
</style>
