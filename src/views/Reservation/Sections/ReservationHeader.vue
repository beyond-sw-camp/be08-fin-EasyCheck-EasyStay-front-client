// components/ReservationHeader.vue

<template>
  <div class="reservation-header">
    <h3 class="header-title text-black">객실 예약</h3>
    <div class="header-description">
      <p class="text-black fw-normal">
        예약을 원하시는 리조트/호텔 지점, 투숙기간, 객실 수 입력 후 객실을
        선택하세요
      </p>
      <div class="step-indicator" v-if="currentStep > 0">
        <div
          v-for="step in steps"
          :key="step.id"
          class="step"
          :class="{
            active: step.id === currentStep,
            completed: step.id < currentStep,
          }"
        >
          <div class="step-number">{{ step.id }}</div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useReservationStore } from "@/stores/reservationStore";

const reservationStore = useReservationStore();
const { showReservationForm, selectedRoom } = storeToRefs(reservationStore);

const steps = [
  { id: 1, label: "날짜/인원 선택" },
  { id: 2, label: "객실 선택" },
  { id: 3, label: "정보 입력" },
];

// 현재 진행 단계 계산
const currentStep = computed(() => {
  if (showReservationForm.value) return 3;
  if (selectedRoom.value) return 2;
  return 1;
});
</script>

<style lang="scss" scoped>
.reservation-header {
  margin-bottom: 2rem;

  .header-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .header-description {
    color: #666;

    p {
      margin-bottom: 1.5rem;
    }
  }

  .step-indicator {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin: 2rem auto;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 24px;
      left: 0;
      right: 0;
      height: 2px;
      background: #e0e0e0;
      z-index: 1;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;

      .step-number {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .step-label {
        font-size: 0.875rem;
        color: #666;
        text-align: center;
        transition: color 0.3s ease;
      }

      &.active {
        .step-number {
          background: #e74c3c;
          border-color: #e74c3c;
          color: white;
        }

        .step-label {
          color: #e74c3c;
          font-weight: bold;
        }
      }

      &.completed {
        .step-number {
          background: #e74c3c;
          border-color: #e74c3c;
          color: white;
          &::after {
            content: "✓";
            color: white;
          }
        }

        .step-label {
          color: #e74c3c;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .reservation-header {
    .step-indicator {
      .step {
        .step-label {
          font-size: 0.75rem;
        }
      }
    }
  }
}
</style>
