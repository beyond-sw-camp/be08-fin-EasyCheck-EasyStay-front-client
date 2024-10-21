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
              <td>이용지</td>
              <td>설악 워터피아</td>
            </tr>
            <tr>
              <td>유효기간</td>
              <td>
                2024.08.26 ~ 2024.12.31<br />
                * 유효기간 내 잔여입장분 사용 가능합니다.
              </td>
            </tr>
            <tr>
              <td>상품명</td>
              <td>설악 워터피아 베사수 주말 이용권</td>
            </tr>
            <tr>
              <td>구매 수량</td>
              <td>
                <div class="d-flex align-items-center mb-3">
                  <span class="me-3">대인</span>
                  <button class="btn btn-outline-primary" @click="decrementAdult">-</button>
                  <input type="number" class="form-control mx-2" v-model="adultCount" readonly />
                  <button class="btn btn-outline-primary" @click="incrementAdult">+</button>
                </div>
                <div class="d-flex align-items-center mt-2">
                  <span class="me-3">소인</span>
                  <button class="btn btn-outline-primary" @click="decrementChild">-</button>
                  <input type="number" class="form-control mx-2" v-model="childCount" readonly />
                  <button class="btn btn-outline-primary" @click="incrementChild">+</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>총 금액 (VAT 포함)</td>
              <td>{{ formattedTotalPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card p-4 mb-5">
      <h4 class="mb-3">구매자 정보</h4>
      <form @submit.prevent>
        <div class="mb-3">
          <label class="form-label">구매자 이름</label>
          <input type="text" class="form-control" v-model="buyerName" required />
        </div>
        <div class="mb-3">
          <label class="form-label">휴대폰 번호</label>
          <input type="tel" class="form-control" v-model="buyerPhone" required />
        </div>
        <div class="mb-3">
          <label class="form-label">이메일</label>
          <div class="d-flex">
            <input type="text" class="form-control me-2" v-model="buyerEmail" required />
            <select class="form-select" v-model="buyerEmailDomain" required>
              <option value="" disabled>도메인 선택</option>
              <option v-for="domain in emailDomains" :key="domain" :value="domain">{{ domain }}</option>
            </select>
          </div>
        </div>
      </form>
    </div>

    <div class="card p-4 mb-5">
      <h4 class="mb-3">이용자 정보</h4>
      <div class="form-check">
        <input type="radio" id="userSelf" value="본인" v-model="usageInfo" class="form-check-input" />
        <label for="userSelf" class="form-check-label">구매자 본인</label>
      </div>
      <div class="form-check">
        <input type="radio" id="userGift" value="선물" v-model="usageInfo" class="form-check-input" />
        <label for="userGift" class="form-check-label">선물하기</label>
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
          취소는 이용권 사용 전, 홈페이지 내에서 결제 취소 버튼을 클릭하시면 자동으로 취소 및 환불 요청됩니다.
        </li>
        <li>테마파크 이용권 취소/환불 문의: 033-634-1330,1334</li>
      </ul>
      <div class="form-check">
        <input type="checkbox" id="terms1" v-model="termsChecked1" class="form-check-input" required />
        <label for="terms1" class="form-check-label">(필수) 개인정보 수집 및 이용동의</label>
      </div>
      <div class="form-check">
        <input type="checkbox" id="terms2" v-model="termsChecked2" class="form-check-input" />
        <label for="terms2" class="form-check-label">(선택) 개인정보 수집 및 이용동의</label>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2">취소</button>
      <button class="btn btn-primary mx-2" :disabled="!isFormValid">구매하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const adultCount = ref(0);
const childCount = ref(0);
const buyerName = ref("");
const buyerPhone = ref("");
const buyerEmail = ref("");
const buyerEmailDomain = ref("");
const emailDomains = ref(["naver.com", "gmail.com", "daum.net"]);
const usageInfo = ref("본인");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);

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

const getTotalPrice = () => adultCount.value * 50000 + childCount.value * 40000;
const formattedTotalPrice = computed(
  () => `\u20A9 ${getTotalPrice().toLocaleString()}`
);

const isFormValid = computed(
  () =>
    buyerName.value &&
    buyerPhone.value &&
    buyerEmail.value &&
    buyerEmailDomain.value &&
    termsChecked1.value
);
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
