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
    <div class="price-info-section my-5">
      <PriceInfoWrapper v-if="guidePageName" :guidePageName="guidePageName" />
    </div>

    <!-- 맨 위로 이동 버튼 -->
    <button v-if="showScrollButton" class="scroll-to-top" @click="scrollToTop">
      ▲
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { userLoginStore } from "@/stores/loginStore";
import PriceInfoWrapper from "@/views/TicketOrders/PriceInfos/PriceInfoWrapper.vue";

// 라우팅
const route = useRoute();
const router = useRouter();

// pinia 스토어
const authStore = userLoginStore();
const ticketStore = useTicketStore();
const accommodationStore = useAccommodationStore();
const themeParkStore = useThemeParkStore();

// 상태 및 getter
const { isLoggedIn } = storeToRefs(authStore);
const { groupedTickets } = storeToRefs(ticketStore);
const { accommodation } = storeToRefs(accommodationStore);
const { themePark } = storeToRefs(themeParkStore);

// guidePageName 동기화
const guidePageName = computed(() => themePark.value?.guidePageName);

// 요금 할인 적용
const getDiscountedPrice = (price) => {
  const discountRate = 0.8;
  return Math.floor(price * discountRate);
};

// 티켓 구매 처리
const handlePurchase = (ticketGroup) => {
  if (!isLoggedIn.value) {
    router.push({ name: "login" });
    return;
  }
  ticketStore.selectTicket(ticketGroup);
  router.replace({ name: "TicketOrder" });
};

// 테마파크 및 티켓 정보 조회
onMounted(async () => {
  const themeParkId = route.query.themeParkId;
  if (themeParkId) {
    await themeParkStore.fetchThemeParkById(
      route.query.accommodationId,
      themeParkId
    );
    await ticketStore.fetchTickets(themeParkId);
  }
});

// 맨 위로 이동 버튼 상태
const showScrollButton = ref(false);

// 스크롤 위치 감시
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300;
};

// 맨 위로 이동 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.ticket-selection {
  /* background-color: #f9f9f9; */
  padding: 2rem;
  /* border-radius: 10px; */
}

.ticket-card {
  border: 1px solid rgb(231, 231, 231);
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

.scroll-to-top {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: rgba(0, 123, 255, 0.6);
  /* 반투명한 배경 */
  color: white;
  border: none;
  border-radius: 50%;
  /* 완전한 원형 */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  /* 가벼운 그림자 */
}

.scroll-to-top:hover {
  background-color: rgba(0, 123, 255, 0.85);
  /* 마우스오버 시 색상 강조 */
  transform: scale(1.1);
  /* 약간 확대 */
}
</style>
