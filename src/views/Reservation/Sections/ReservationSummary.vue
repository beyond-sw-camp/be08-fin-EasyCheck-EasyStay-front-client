<template>
  <div class="reservation-summary card">
    <div class="card-body">
      <div
        class="date-range d-flex justify-content-between align-items-center mb-3"
      >
        <div class="date-box text-center">
          <h3 class="mb-0">21</h3>
          <small>9월 토요일</small>
        </div>
        <div class="nights d-flex flex-column align-items-center">
          <span class="badge bg-transparent">1박</span>
        </div>
        <div class="date-box text-center">
          <h3 class="mb-0">22</h3>
          <small>9월 일요일</small>
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
            @click="decrementRoom"
          >
            -
          </button>
          <button class="btn form-control bg-white">{{ roomCount }}실</button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="incrementRoom"
          >
            +
          </button>
        </div>
      </div>
      <button class="btn btn-danger w-100">객실 검색</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const roomCount = ref(1);

const decrementRoom = () => {
  if (roomCount.value > 1) roomCount.value--;
};

const incrementRoom = () => {
  roomCount.value++;
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
