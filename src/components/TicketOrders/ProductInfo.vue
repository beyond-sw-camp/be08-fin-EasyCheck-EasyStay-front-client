<template>
  <div class="card p-4 mb-5">
    <h4 class="mb-3">{{ themeParkName }} 구매상품 정보</h4>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="label-cell">지점</td>
            <td class="content-cell">
              <span>{{ themeParkName }}</span>
            </td>
          </tr>
          <tr>
            <td class="label-cell">유효기간</td>
            <td class="content-cell">
              <span
                >{{ formatDate(adultTicket.validFromDate) }} ~
                {{ formatDate(adultTicket.validToDate) }}</span
              >
              <br />
              <small class="text-muted"
                >* 유효기간 중 언제든지 사용 가능한 상품입니다.</small
              >
            </td>
          </tr>
          <tr>
            <td class="label-cell">구매 수량</td>
            <td class="content-cell">
              <div class="quantity-row">
                <div class="quantity-group">
                  <label class="quantity-label">대인</label>
                  <div class="input-group">
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="decrementAdult"
                    >
                      <i class="ni ni-fat-delete"></i>
                    </button>
                    <input
                      type="number"
                      id="adultCount"
                      class="form-control quantity-input"
                      v-model="adultCount"
                      min="0"
                    />
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="incrementAdult"
                    >
                      <i class="ni ni-fat-add"></i>
                    </button>
                  </div>
                  <small class="text-muted price-info"
                    >대인 / 온라인회원가 {{ adultTicket.price }}원</small
                  >
                </div>

                <div class="quantity-group">
                  <label class="quantity-label">소인</label>
                  <div class="input-group">
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="decrementChild"
                    >
                      <i class="ni ni-fat-delete"></i>
                    </button>
                    <input
                      type="number"
                      id="childCount"
                      class="form-control quantity-input"
                      v-model="childCount"
                      min="0"
                    />
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="incrementChild"
                    >
                      <i class="ni ni-fat-add"></i>
                    </button>
                  </div>
                  <small class="text-muted price-info"
                    >소인 / 온라인회원가 {{ childTicket.price }}원</small
                  >
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="label-cell">총 금액 (VAT 포함)</td>
            <td class="content-cell total-price">
              <strong class="total-amount">{{ formattedTotalPrice }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  adultTicket: Object,
  childTicket: Object,
  themeParkName: String,
});

const adultCount = ref(0);
const childCount = ref(0);

const incrementAdult = () => adultCount.value++;
const decrementAdult = () => {
  if (adultCount.value > 0) adultCount.value--;
};

const incrementChild = () => childCount.value++;
const decrementChild = () => {
  if (childCount.value > 0) childCount.value--;
};

const formattedTotalPrice = computed(() => {
  const adultTotal = adultCount.value * (props.adultTicket?.price || 0);
  const childTotal = childCount.value * (props.childTicket?.price || 0);
  return `₩ ${(adultTotal + childTotal).toLocaleString()}`;
});

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-bordered td {
  vertical-align: middle;
  padding: 15px;
}

.label-cell {
  width: 20%;
  font-weight: bold;
  text-align: left;
}

.content-cell {
  text-align: left;
}

.quantity-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.quantity-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.quantity-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bi {
  font-size: 24px;
}

.quantity-input {
  text-align: center;
  width: 60px;
  height: 40px;
  font-size: 1.2rem;
}

.price-info {
  font-size: 0.85rem;
  color: #6c757d;
}

.total-price {
  text-align: left;
}

.total-amount {
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
