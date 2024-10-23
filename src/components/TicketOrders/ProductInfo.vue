<template>
  <NavbarDefault :sticky="true" />
  <div class="order-summary container my-5">
    <h2 class="mb-4">이용권 주문</h2>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ ticket.name }} 이용권</h5>
        <p class="card-text">
          유효기간: {{ ticket.validFrom }} ~ {{ ticket.validTo }}
        </p>
        <div class="form-group mb-3">
          <label for="adultCount">대인 수량</label>
          <div class="input-group">
            <button class="btn btn-outline-secondary" @click="decrementAdult">
              -
            </button>
            <input
              type="number"
              id="adultCount"
              class="form-control"
              v-model="adultCount"
              min="0"
            />
            <button class="btn btn-outline-secondary" @click="incrementAdult">
              +
            </button>
          </div>
          <small class="text-muted">대인 가격: {{ ticket.adultPrice }}원</small>
        </div>

        <div class="form-group mb-3">
          <label for="childCount">소인 수량</label>
          <div class="input-group">
            <button class="btn btn-outline-secondary" @click="decrementChild">
              -
            </button>
            <input
              type="number"
              id="childCount"
              class="form-control"
              v-model="childCount"
              min="0"
            />
            <button class="btn btn-outline-secondary" @click="incrementChild">
              +
            </button>
          </div>
          <small class="text-muted">소인 가격: {{ ticket.childPrice }}원</small>
        </div>

        <p class="card-text">
          총 금액: {{ formattedTotalPrice }}
        </p>

        <form @submit.prevent="placeOrder">
          <div class="form-group">
            <label for="buyerName">구매자 이름</label>
            <input
              type="text"
              id="buyerName"
              v-model="buyerName"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="buyerEmail">이메일</label>
            <input
              type="email"
              id="buyerEmail"
              v-model="buyerEmail"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mt-3 w-100">
            주문하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

// route에서 ticket 정보를 받음
const route = useRoute();
const ticket = route.state?.ticket || {};

// 수량 조정
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

// 총 가격 계산
const formattedTotalPrice = computed(() => {
  const total =
    adultCount.value * ticket.adultPrice + childCount.value * ticket.childPrice;
  return `₩ ${total.toLocaleString()}`;
});

// 구매자 정보
const buyerName = ref("");
const buyerEmail = ref("");

// 주문 처리 함수
const placeOrder = () => {
  console.log("Order placed:", {
    ticket,
    adultCount: adultCount.value,
    childCount: childCount.value,
    buyerName: buyerName.value,
    buyerEmail: buyerEmail.value,
  });
};
</script>

<style scoped>
.order-summary {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
}
</style>
