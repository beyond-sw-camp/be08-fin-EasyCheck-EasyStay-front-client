<template>
  <div class="reservation-confirmation">
    <h2 class="title">예약 정보 확인</h2>

    <!-- 예약 정보 테이블 -->
    <div class="info-table">
      <!-- 예약 유형 및 구분 -->
      <div class="info-row">
        <info-cell label="예약 유형" :value="reservationType" />
        <info-cell label="예약 구분" value="객실예약" />
      </div>

      <!-- 지점 및 객실 정보 -->
      <div class="info-row">
        <info-cell label="예약 지점" :value="currentAccommodationName" />
        <info-cell label="투숙 객실" :value="getRoomInfo" />
      </div>

      <!-- 투숙 기간 및 인원 -->
      <div class="info-row">
        <info-cell label="투숙 기간" :value="getStayPeriod" />
        <info-cell label="투숙 인원" :value="getGuestCount" />
      </div>

      <!-- 객실 수 및 쿠폰 정보 -->
      <div class="info-row">
        <info-cell label="객실 수" :value="`${roomCount}실`" />
        <info-cell label="쿠폰 적용" value="0 매" />
      </div>
    </div>

    <!-- 총 금액 섹션 -->
    <div class="total-price">
      <span class="price-label">총 금액 (VAT 포함)</span>
      <span class="price-value">
        {{ userRole === "CORP_USER" ? "법인" : "일반" }}가 {{ totalPrice }}원
      </span>
    </div>

    <!-- 약관 동의 섹션 -->
    <div class="agreement-section">
      <label
        v-for="agreement in agreements"
        :key="agreement.id"
        class="agreement-item"
        :class="{ required: agreement.required }"
      >
        <input
          type="checkbox"
          :checked="getAgreementStatus(agreement.id)"
          @change="handleAgreementChange($event, agreement.id)"
        />
        <span>
          {{ agreement.required ? "(필수)" : "(선택)" }}
          {{ agreement.text }}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { userLoginStore } from "@/stores/loginStore";
import { useReservationStore } from "@/stores/reservationStore";

import InfoCell from "./InfoCell.vue";

// Store 초기화
const userStore = userLoginStore();
const reservationStore = useReservationStore();

// Store refs
const { userRole } = storeToRefs(userStore);
const {
  roomCount,
  totalPrice,
  adultCount,
  childCount,
  stayDuration,
  selectedRoom,
  formattedCheckinDate,
  formattedCheckoutDate,
  agreementChecked1,
  agreementChecked2,
  agreementChecked3,
  currentAccommodationName,
} = storeToRefs(reservationStore);

// 약관 정보
const agreements = [
  { id: 1, text: "개인정보 수집 및 이용동의", required: true },
  { id: 2, text: "예약 규정 확인 및 동의", required: true },
  { id: 3, text: "개인정보 수집 및 이용동의", required: false },
];

// Computed
const reservationType = computed(() =>
  userRole.value === "CORP_USER" ? "법인 회원" : "온라인 비회원"
);

const getRoomInfo = computed(
  () => `${selectedRoom.value?.roomType} - ${selectedRoom.value?.roomName}`
);

const getStayPeriod = computed(
  () =>
    `${formattedCheckinDate.value} - ${formattedCheckoutDate.value} / ${stayDuration.value}박`
);

const getGuestCount = computed(
  () => `성인 ${adultCount.value}명 / 소인 ${childCount.value}명`
);

// Methods
const getAgreementStatus = (id) => {
  switch (id) {
    case 1:
      return agreementChecked1.value;
    case 2:
      return agreementChecked2.value;
    case 3:
      return agreementChecked3.value;
    default:
      return false;
  }
};

const handleAgreementChange = (event, id) => {
  const checked = event.target.checked;
  switch (id) {
    case 1:
      reservationStore.updateAgreements({ agreement1: checked });
      break;
    case 2:
      reservationStore.updateAgreements({ agreement2: checked });
      break;
    case 3:
      reservationStore.updateAgreements({ agreement3: checked });
      break;
  }
};
</script>

<style lang="scss" scoped>
.reservation-confirmation {
  margin: 0 auto;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .info-table {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;

    .info-row {
      display: flex;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .info-cell {
        flex: 1;
        padding: 15px;
        background-color: #fff;

        &:first-child {
          border-right: 1px solid #eee;
        }

        .info-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }

  .total-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;

    .price-label {
      font-size: 16px;
      color: #666;
    }

    .price-value {
      font-size: 20px;
      font-weight: bold;
      color: #e74c3c;
    }
  }

  .agreement-section {
    margin-bottom: 20px;

    .agreement-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      cursor: pointer;

      &.required span {
        color: #e74c3c;
      }

      input[type="checkbox"] {
        margin-right: 10px;
        cursor: pointer;
      }

      .text-button {
        margin-left: 5px;
        color: #666;
        text-decoration: underline;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
