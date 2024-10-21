<template>
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
              2024.08.26 ~ 2024.12.31<br />* 유효기간 내 잔여입장분 사용
              가능합니다.
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
</template>

<script setup>
import { ref, computed } from "vue";

const adultCount = ref(0);
const childCount = ref(0);

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
</style>
