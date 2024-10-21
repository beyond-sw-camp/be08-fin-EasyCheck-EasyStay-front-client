<template>
  <div class="container my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <div class="card p-4 mb-5">
      <h4 class="mb-3">구매상품 정보</h4>
      <div class="table-responsive">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td colspan="1">이용지</td>
              <td colspan="2">설악 워터피아</td>
            </tr>
            <tr>
              <td colspan="1">유효기간</td>
              <td colspan="2">
                2024.08.26 ~ 2024.12.31<br />
                * 유효기간 내 잔여입장분 사용 가능합니다.
              </td>
            </tr>
            <tr>
              <td colspan="1">상품명</td>
              <td colspan="2">설악 워터피아 베사수 주말 이용권</td>
            </tr>
            <tr>
              <td>구매 수량</td>
              <td colspan="1">
                <div class="quantity-container">
                  <label for="adultCount" class="quantity-label">대인</label>
                  <div class="number-control">
                    <button
                      type="button"
                      class="btn-control minus"
                      @click="decrementAdult"
                      :disabled="adultCount <= 0"
                    >
                      <span>-</span>
                    </button>
                    <input
                      type="text"
                      id="adultCount"
                      class="input-control"
                      v-model="adultCount"
                      readonly
                    />
                    <button
                      type="button"
                      class="btn-control plus"
                      @click="incrementAdult"
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <small class="price-info">대인 / 온라인회원가 30,000원</small>
                </div>
              </td>
              <td colspan="1">
                <!-- Child Ticket Quantity -->
                <div class="quantity-container">
                  <label for="childCount" class="quantity-label">소인</label>
                  <div class="number-control">
                    <button
                      type="button"
                      class="btn-control minus"
                      @click="decrementChild"
                      :disabled="childCount <= 0"
                    >
                      <span>-</span>
                    </button>
                    <input
                      type="text"
                      id="childCount"
                      class="input-control"
                      v-model="childCount"
                      readonly
                    />
                    <button
                      type="button"
                      class="btn-control plus"
                      @click="incrementChild"
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <small class="price-info">소인 / 온라인회원가 24,000원</small>
                </div>
              </td>
            </tr>
            <tr>
              <td>총 금액 (VAT 포함)</td>
              <td colspan="2">{{ formattedTotalPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card p-4 mb-5">
      <h4 class="mb-3">구매자 정보</h4>
      <div class="field-box">
        <fieldset class="input-fieldset">
          <legend class="sr-only">정보 입력</legend>
          <div class="grid-area-2x2">
            <div class="form-group">
              <label for="buyerName">구매자 이름</label>
              <div class="input-group input-lg">
                <MaterialInput
                  class="input-group-outline"
                  placeholder="구매자 이름"
                  size="lg"
                  v-model="buyerName"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="buyerPhone">휴대전화 번호</label>
              <div class="input-group input-lg">
                <MaterialInput
                  class="input-group-outline"
                  placeholder="휴대전화 번호"
                  size="lg"
                  v-model="buyerPhone"
                />
              </div>
            </div>

            <div class="form-group email-group">
              <label for="buyerEmail">이메일 (선택)</label>
              <div class="input-group input-lg d-flex align-items-center">
                <MaterialInput
                  class="input-group-outline"
                  placeholder="이메일 아이디"
                  size="lg"
                  v-model="buyerEmail"
                  style="flex: 1"
                />
                <span class="input-group-add mx-1">@</span>
                <MaterialInput
                  class="input-group-outline"
                  placeholder="이메일 도메인"
                  size="lg"
                  v-model="buyerEmailDomain"
                  style="flex: 1"
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="text-box w-max">
      <h4 class="desc-title">이용 안내</h4>
      <ul class="text-list">
        <li>본 테마파크 이용권은 이용 지점에 한합니다.</li>
        <li>바코드 이미지를 매표소에 제시하여 주시기 바랍니다.</li>
        <li>유효기간 내에 1회만 사용 가능합니다.</li>
        <li>워터파크 운영에 따라 정기 휴장일은 변동 될 수 있습니다.</li>
      </ul>
      <br />
      <h4 class="desc-title">취소 및 환불 규정 안내</h4>
      <ul class="text-list">
        <li>
          취소는 이용권 사용 전, 홈페이지 내에서 결제 취소 버튼을 클릭하시면
          자동으로 취소 및 환불 요청됩니다.
        </li>
        <li>테마파크 이용권 취소/환불 문의: 033-634-1330,1334</li>
      </ul>
      <div class="form-check">
        <input
          type="checkbox"
          id="terms1"
          v-model="termsChecked1"
          class="form-check-input"
          required
        />
        <label for="terms1" class="form-check-label">
          (필수) 개인정보 수집 및 이용동의
          <a @click.prevent="openModal('필수')">전문보기</a>
        </label>
      </div>
      <div class="form-check">
        <input
          type="checkbox"
          id="terms2"
          v-model="termsChecked2"
          class="form-check-input"
        />
        <label for="terms2" class="form-check-label">
          (선택) 개인정보 수집 및 이용동의
          <a @click.prevent="openModal('선택')">전문보기</a>
        </label>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2">취소</button>
      <button class="btn btn-primary mx-2" :disabled="!isFormValid">
        구매하기
      </button>
    </div>

    <PrivacyAgreementModal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :type="modalType"
      @close="closeModal"
      @agree="agreeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PrivacyAgreementModal from "@/components/ThemePark/PrivacyAgreementModal.vue";
import MaterialInput from "@/components/MaterialInput.vue";

const adultCount = ref(0);
const childCount = ref(0);
const buyerName = ref("윤호연");
const buyerPhone = ref("01041803589");
const buyerEmail = ref("hoyer96");
const buyerEmailDomain = ref("naver.com");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);
const isModalVisible = ref(false);
const modalType = ref("");
const isLoggedIn = ref(true); // 로그인 상태 확인용 변수 (현재는 기본값 true로 설정)

const incrementAdult = () => {
  adultCount.value++;
};
const decrementAdult = () => {
  if (adultCount.value > 0) adultCount.value--;
};
const incrementChild = () => {
  childCount.value++;
};
const decrementChild = () => {
  if (childCount.value > 0) childCount.value--;
};

const getTotalPrice = () => adultCount.value * 30000 + childCount.value * 24000;
const formattedTotalPrice = computed(
  () => `₩ ${getTotalPrice().toLocaleString()}`
);

const openModal = (type) => {
  modalType.value = type;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const agreeModal = () => {
  if (modalType.value === "필수") {
    termsChecked1.value = true;
  } else if (modalType.value === "선택") {
    termsChecked2.value = true;
  }
  closeModal();
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.quantity-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.quantity-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.number-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.btn-control {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #f8f9fa;
  cursor: pointer;
  font-size: 18px;
}

.btn-control:disabled {
  cursor: not-allowed;
  color: #aaa;
}

.input-control {
  width: 50px;
  text-align: center;
  border: none;
  font-size: 16px;
  padding: 0.5rem 0;
}

.price-info {
  margin-top: 0.5rem;
  font-size: 12px;
  color: #888;
}

.field-box {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  border: 2px solid #ddd;
}

.grid-area-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
}

.form-group {
  position: relative;
}

.input-group-add {
  font-size: 1rem;
  align-self: center;
}

.label-line {
  position: relative;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}
</style>
