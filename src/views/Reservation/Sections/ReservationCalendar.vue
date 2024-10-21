<template>
  <div class="easycheck-calendar">
    <v-calendar
      borderless
      columns="2"
      :min-date="today"
      :attributes="attrs"
      @dayclick="clickDate"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

const DATE_SELECTION_MODE = {
  START: "START",
  END: "END",
};

const today = new Date(new Date().setHours(0, 0, 0, 0));
const tomorrow = new Date().setDate(today.getDate() + 1);

const selectMode = ref(DATE_SELECTION_MODE.START);
const reservationStore = useReservationStore();

const attrs = reactive([
  {
    key: "today",
    highlight: {
      start: { fillMode: "outline" },
      base: { fillMode: "light" },
      end: { fillMode: "outline" },
    },
    dates: {
      start: today,
      end: tomorrow,
    },
  },
]);

const clickDate = (e) => {
  const { date: selectedDate } = e;

  if (selectedDate.getTime() < today.getTime()) {
    console.warn("과거 날짜는 선택할 수 없습니다.");
    return;
  }

  const currentStartDate = attrs[0].dates.start;

  if (selectMode.value === DATE_SELECTION_MODE.START) {
    attrs[0].dates = {
      start: selectedDate,
      end: selectedDate,
    };
    reservationStore.setCheckIn(selectedDate);
    reservationStore.setCheckOut(selectedDate);
  } else if (selectMode.value === DATE_SELECTION_MODE.END) {
    if (selectedDate.getTime() < currentStartDate.getTime()) {
      attrs[0].dates = {
        start: selectedDate,
        end: currentStartDate,
      };
      reservationStore.setCheckIn(selectedDate);
      reservationStore.setCheckOut(currentStartDate);
    } else {
      attrs[0].dates = {
        ...attrs[0].dates,
        end: selectedDate,
      };
      reservationStore.setCheckOut(selectedDate);
    }
  }

  selectMode.value =
    selectMode.value === DATE_SELECTION_MODE.START
      ? DATE_SELECTION_MODE.END
      : DATE_SELECTION_MODE.START;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/material-kit/custom/_variables.scss";

.easycheck-calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // 스케일 변환 시 넘치는 부분 숨김

  :deep(.vc-container) {
    width: 100%;
    // max-width: 1000px; // 최대 너비 설정
    background: $gray-50;
    transform-origin: center top; // 변환 기준점 설정
    transition: transform 0.3s ease; // 부드러운 전환 효과
  }

  :deep(.vc-day) {
    min-height: 24px;
  }

  :deep(.vc-day-content) {
    font-size: 1em; // 글자 크기 증가
  }
}
</style>
