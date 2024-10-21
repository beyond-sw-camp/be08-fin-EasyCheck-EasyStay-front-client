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
          <div class="info-value">개실예약</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">예약 지점</div>
          <div class="info-value">롯데리조트속초</div>
        </div>
        <div class="info-cell">
          <div class="info-label">투숙 객실</div>
          <div class="info-value">호텔 디럭스 더블</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">투숙 기간</div>
          <div class="info-value">2024.09.21(토) - 2024.09.22(일) / 1박</div>
        </div>
        <div class="info-cell">
          <div class="info-label">투숙 인원</div>
          <div class="info-value">성인 2명 / 소인 0명</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-cell">
          <div class="info-label">객실 수</div>
          <div class="info-value">1실</div>
        </div>
        <div class="info-cell">
          <div class="info-label">쿠폰 적용</div>
          <div class="info-value">0 매</div>
        </div>
      </div>
    </div>
    <div class="total-price">
      <span class="price-label">총 금액 (VAT 포함)</span>
      <span class="price-value">비회원가 398,000 원</span>
      <button class="price-detail-btn">요금별 금액</button>
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
      <button class="cancel-btn">취소</button>
      <button class="reserve-btn" :disabled="!allAgreementsChecked">
        예약하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const agreementChecked1 = ref(false);
const agreementChecked2 = ref(false);
const agreementChecked3 = ref(false);

const allAgreementsChecked = computed(
  () => agreementChecked1.value && agreementChecked2.value
);
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
