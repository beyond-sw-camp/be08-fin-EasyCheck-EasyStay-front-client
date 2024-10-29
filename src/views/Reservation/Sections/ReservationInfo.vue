<template>
  <div class="reservation-confirmation">
    <h2 class="title">예약 정보 확인</h2>
    <div class="info-table">
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">예약 유형</div>
          <div class="info-value">온라인 비회원</div>
        </div>
        <div class="info-cell">
          <div class="info-label">예약 구분</div>
          <div class="info-value">객실예약</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">예약 지점</div>
          <div class="info-value">{{ accommodationName }}</div>
        </div>
        <div class="info-cell">
          <div class="info-label">투숙 객실</div>
          <div class="info-value">
            {{ selectedRoom?.roomType }} - {{ selectedRoom?.roomName }}
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">투숙 기간</div>
          <div class="info-value">
            {{ formattedCheckinDate }} - {{ formattedCheckoutDate }} /
            {{ stayDuration }}박
          </div>
        </div>
        <div class="info-cell">
          <div class="info-label">투숙 인원</div>
          <div class="info-value">
            성인 {{ adultCount }}명 / 소인 {{ childCount }}명
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">객실 수</div>
          <div class="info-value">{{ roomCount }}실</div>
        </div>
        <div class="info-cell">
          <div class="info-label">쿠폰 적용</div>
          <div class="info-value">0 매</div>
        </div>
      </div>
    </div>
    <div class="total-price">
      <span class="price-label">총 금액 (VAT 포함)</span>
      <span class="price-value">{{ userRole }}가 {{ totalPrice }} 원</span>
    </div>
    <div class="agreement-section">
      <label class="agreement-item">
        <input type="checkbox" v-model="agreementChecked1" />
        <span>(필수) 개인정보 수집 및 이용동의 전문보기</span>
      </label>
      <label class="agreement-item">
        <input type="checkbox" v-model="agreementChecked2" />
        <span>(필수) 예약 규정 확인 및 동의 전문보기</span>
      </label>
      <label class="agreement-item">
        <input type="checkbox" v-model="agreementChecked3" />
        <span>(선택) 개인정보 수집 및 이용동의 전문보기</span>
      </label>
    </div>
    <div class="action-buttons">
      <button class="cancel-btn" @click="handleCancel">취소</button>
      <button
        class="reserve-btn"
        :disabled="!allAgreementsChecked"
        @click="handlePay"
      >
        결제하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";
import { useReservationStore } from "@/stores/reservationStore";

const router = useRouter(); // router 인스턴스 생성
const userStore = userLoginStore();
const reservationStore = useReservationStore();

const { userRole } = storeToRefs(userStore);

const {
  roomCount,
  totalPrice,
  adultCount,
  childCount,
  stayDuration,
  selectedRoom,
  accommodationName,
  formattedCheckinDate,
  formattedCheckoutDate,
} = storeToRefs(reservationStore);

const agreementChecked1 = ref(false);
const agreementChecked2 = ref(false);
const agreementChecked3 = ref(false);

const allAgreementsChecked = computed(
  () => agreementChecked1.value && agreementChecked2.value
);

const handleCancel = () => {
  const isConfirmed = confirm(
    "지금까지 입력한 내용이 모두 삭제됩니다. 메인페이지로 이동하시겠습니까?"
  );

  if (isConfirmed) {
    // 예약 관련 상태 초기화
    reservationStore.$reset(); // store의 상태를 초기값으로 리셋
    // 메인 페이지로 이동
    router.push("/"); // 메인 페이지 경로에 맞게 수정하세요
  }
};

const handlePay = async () => {
  await reservationStore.createReservation();
  await reservationStore.callImpRequestPay();
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

    .info-row {
      display: flex;
      border-bottom: 1px solid #eee;

      .info-cell {
        flex: 1;
        padding: 10px;

        .info-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .info-value {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  .total-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f8f8f8;

    .price-label {
      font-size: 16px;
    }

    .price-value {
      font-size: 20px;
      font-weight: bold;
      color: #e74c3c;
    }

    .price-detail-btn {
      padding: 5px 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .agreement-section {
    margin-bottom: 20px;

    .agreement-item {
      display: block;
      margin-bottom: 10px;
      cursor: pointer;

      input[type="checkbox"] {
        margin-right: 10px;
      }
    }
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin: 4rem 0;

    button {
      flex: 1;
      padding: 15px;
      font-size: 18px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &.cancel-btn {
        background-color: #f8f8f8;
        color: #333;
        margin-right: 10px;
      }

      &.reserve-btn {
        background-color: #e74c3c;
        color: #fff;

        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
