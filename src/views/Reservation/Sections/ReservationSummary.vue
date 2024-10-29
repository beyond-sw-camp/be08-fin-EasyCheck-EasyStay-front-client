<template>
  <div class="reservation-summary card">
    <div class="card-body">
      <div
        class="date-range d-flex justify-content-between align-items-center mb-3"
      >
        <div class="date-box text-center">
          <h3 class="mb-0">{{ checkinDate }}</h3>
          <small>{{ checkinMonth }}월 {{ checkinDayKo }}</small>
        </div>
        <div class="nights d-flex flex-column align-items-center">
          <span class="badge bg-transparent">{{ stayDuration }}박</span>
        </div>
        <div class="date-box text-center">
          <h3 class="mb-0">{{ checkoutDate }}</h3>
          <small>{{ checkoutMonth }}월 {{ checkoutDayKo }}</small>
        </div>
      </div>
      <div
        class="room-count d-flex justify-content-between align-items-center mb-3"
      >
        <span>객실 수</span>
        <div class="input-group" style="width: 120px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="reservationStore.decreaseRoomCount"
          >
            -
          </button>
          <button class="btn form-control bg-white">{{ roomCount }}실</button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="reservationStore.increaseRoomCount"
          >
            +
          </button>
        </div>
      </div>
      <button class="btn btn-danger w-100" @click="onClickSearch">
        객실 검색
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useReservationStore } from "@/stores/reservationStore.js";

const reservationStore = useReservationStore();

const {
  checkinMonth,
  checkinDayKo,
  checkinDate,
  checkoutMonth,
  checkoutDayKo,
  checkoutDate,
  stayDuration,
  roomCount,
} = storeToRefs(reservationStore);

const onClickSearch = async () => {
  reservationStore.fetchReservationAvailableRooms();
  reservationStore.setShowRoomSelectionGrid(true);
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
      color: #6c757d; // 직접 색상 지정
    }
  }
  .nights {
    .badge {
      font-size: 0.9rem;
      padding: 0.5em 1em;
      background-color: #ced4da; // 직접 색상 지정
      color: #495057; // 직접 색상 지정
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
  background-color: #dc3545; // 직접 색상 지정
  border-color: #dc3545; // 직접 색상 지정
}
</style>
