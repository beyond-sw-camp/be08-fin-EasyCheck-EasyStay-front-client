<template>
  <div class="reservation-summary card">
    <div class="card-body">
      <!-- 날짜 범위 섹션 -->
      <div
        class="date-range d-flex justify-content-between align-items-center mb-3"
      >
        <div class="date-box text-center">
          <h3 class="mb-0">{{ checkinInfo.date }}</h3>
          <small>{{ checkinInfo.month }}월 {{ checkinInfo.dayKo }}</small>
        </div>
        <div class="nights d-flex flex-column align-items-center">
          <span class="badge bg-transparent">{{ stayDuration }}박</span>
        </div>
        <div class="date-box text-center">
          <h3 class="mb-0">{{ checkoutInfo.date }}</h3>
          <small>{{ checkoutInfo.month }}월 {{ checkoutInfo.dayKo }}</small>
        </div>
      </div>

      <!-- 객실 수 조절 섹션 -->
      <div
        class="room-count d-flex justify-content-between align-items-center mb-3"
      >
        <span>객실 수</span>
        <div class="input-group" style="width: 120px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="decreaseRoomCount"
            :disabled="roomCount <= 1"
          >
            -
          </button>
          <button class="btn form-control bg-white">{{ roomCount }}실</button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="increaseRoomCount"
            :disabled="roomCount >= maxRoomCount"
          >
            +
          </button>
        </div>
      </div>

      <!-- 검색 버튼 -->
      <button
        class="btn btn-danger w-100"
        @click="handleSearch"
        :disabled="!isSearchable"
      >
        객실 검색
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

const reservationStore = useReservationStore();

// Store에서 필요한 상태 가져오기
const { checkinInfo, checkoutInfo, stayDuration, roomCount } =
  storeToRefs(reservationStore);

// 상수
const MAX_ROOM_COUNT = 10;

// Computed 속성
const maxRoomCount = computed(() => MAX_ROOM_COUNT);
const isSearchable = computed(() => {
  return checkinInfo.value && checkoutInfo.value && roomCount.value > 0;
});

// Methods
const decreaseRoomCount = () => {
  if (roomCount.value > 1) {
    reservationStore.roomCount--;
  }
};

const increaseRoomCount = () => {
  if (roomCount.value < MAX_ROOM_COUNT) {
    reservationStore.roomCount++;
  }
};

const handleSearch = async () => {
  try {
    await reservationStore.fetchAvailableRooms();
    reservationStore.setUIState({ showGrid: true });
  } catch (error) {
    console.error("객실 검색 실패:", error);
    // TODO: 에러 처리 추가
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/material-kit/custom/_variables.scss";

.reservation-summary {
  max-width: 400px;
  margin: 0 auto;
  background: $gray-50;
}

.date-range {
  .date-box {
    h3 {
      font-size: 2rem;
      font-weight: bold;
    }
    small {
      font-size: 0.8rem;
      color: #6c757d;
    }
  }

  .nights {
    .badge {
      font-size: 0.9rem;
      padding: 0.5em 1em;
      background-color: #ced4da;
      color: #495057;
    }
  }
}

.room-count {
  span {
    font-size: 0.9rem;
  }

  .input-group {
    .btn {
      padding: 0.375rem 0.75rem;
    }
    input {
      font-size: 0.9rem;
    }

    .form-control {
      border: 1px solid;
    }
  }
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}
</style>
