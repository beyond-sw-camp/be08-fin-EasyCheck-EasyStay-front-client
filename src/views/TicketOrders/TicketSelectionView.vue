<template>
  <div class="ticket-selection container my-5 mt-8">
    <h2 v-if="accommodation" class="mb-4">
      {{ accommodation.name || "알 수 없음" }} 이용권 선택
    </h2>
    <div class="ticket-list row">
      <div v-for="ticketGroup in groupedTickets" :key="ticketGroup.name" class="col-md-4 mb-4">
        <div class="card ticket-card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ ticketGroup.name }}</h5>
            <p class="card-text">{{ ticketGroup.description }}</p>
            <div class="card-prices">
              <p class="card-price">
                대인:
                <span class="normal-price">{{ ticketGroup.adultTicket.price }}원</span>
                <span :class="{ 'final-price': isLoggedIn }" v-if="isLoggedIn">
                  {{ getDiscountedPrice(ticketGroup.adultTicket.price) }}원
                  (회원가)
                </span>
              </p>
              <p class="card-price">
                소인:
                <span class="normal-price">{{ ticketGroup.childTicket.price }}원</span>
                <span :class="{ 'final-price': isLoggedIn }" v-if="isLoggedIn">
                  {{ getDiscountedPrice(ticketGroup.childTicket.price) }}원
                  (회원가)
                </span>
              </p>
              <span class="login-hint" v-if="!isLoggedIn">
                로그인 시 회원가로 할인 적용됩니다.
              </span>
            </div>
            <button class="btn btn-primary mt-3 w-100" @click="handlePurchase(ticketGroup)">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { userLoginStore } from "@/stores/loginStore";

// 라우팅
const route = useRoute();
const router = useRouter();

// pinia 스토어
const authStore = userLoginStore();
const ticketStore = useTicketStore();

const accmomodationStore = useAccommodationStore();

// pina state, getters
const { isLoggedIn } = storeToRefs(authStore);
const { groupedTickets } = storeToRefs(ticketStore);
const { accommodation } = storeToRefs(accmomodationStore);

const themeParkId = computed(() => route.query.themeParkId);

// 숙박시설, 테마파크, 티켓 정보 조회하기
onMounted(async () => {
  await ticketStore.fetchTickets(themeParkId.value);
});

const getDiscountedPrice = (price) => {
  const discountRate = 0.8;
  return Math.floor(price * discountRate);
};

const handlePurchase = (ticketGroup) => {
  ticketStore.selectTicket(ticketGroup);
  router.replace({ name: "TicketOrder" });
};
</script>

<style scoped>
.ticket-selection {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.ticket-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.ticket-card:hover {
  transform: scale(1.05);
}

.card-prices {
  margin-top: 1rem;
}

.normal-price {
  color: #000;
  text-decoration: line-through;
  margin-right: 8px;
}

.final-price {
  color: #dc3545;
  font-weight: bold;
  font-size: 1.1rem;
}

.login-hint {
  color: #dc3545;
  font-size: 0.8rem;
  padding: 4px 8px;
  margin-top: 5px;
  border: 1px solid #dc3545;
  border-radius: 10px;
}

.card-price {
  font-size: 1.2rem;
}
</style>
