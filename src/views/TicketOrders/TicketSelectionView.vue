<template>
  <NavbarDefault :sticky="true" />
  <div class="ticket-selection container my-5">
    <h2 class="mb-4">{{ themeParkName }} 이용권 선택</h2>
    <div class="ticket-list row">
      <div
        v-for="ticketGroup in groupedTickets"
        :key="ticketGroup.name"
        class="col-md-4 mb-4"
      >
        <div class="card ticket-card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ ticketGroup.name }}</h5>
            <p class="card-text">{{ ticketGroup.description }}</p>
            <div class="card-prices">
              <p class="card-price">
                대인:
                <span class="normal-price"
                  >{{ ticketGroup.adultTicket.price }}원</span
                >
                <span v-if="isLoggedIn" class="final-price">
                  {{ getDiscountedPrice(ticketGroup.adultTicket.price) }}원
                  (회원가)
                </span>
              </p>
              <p class="card-price">
                소인:
                <span class="normal-price"
                  >{{ ticketGroup.childTicket.price }}원</span
                >
                <span v-if="isLoggedIn" class="final-price">
                  {{ getDiscountedPrice(ticketGroup.childTicket.price) }}원
                  (회원가)
                </span>
              </p>
              <span class="login-hint" v-if="!isLoggedIn">
                로그인 시 회원가로 할인 적용됩니다.
              </span>
            </div>
            <button
              class="btn btn-primary mt-3 w-100"
              @click="handlePurchase(ticketGroup)"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import { useThemeParkStore } from "@/stores/themeParkStore";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import dayjs from "dayjs";

const props = defineProps({
  themeParkId: {
    type: [String, Number],
    required: true,
  },
  themeParkName: {
    type: String,
    required: true,
  },
});

const groupedTickets = ref([]);
const router = useRouter();
const ticketStore = useTicketStore();
const themeParkStore = useThemeParkStore();
const isLoggedIn = ref(false);

onMounted(async () => {
  const themeParkId = Number(props.themeParkId);
  await ticketStore.fetchTickets(themeParkId);

  if (ticketStore.tickets && ticketStore.tickets.data) {
    const today = dayjs();
    const validTickets = ticketStore.tickets.data.filter((ticket) => {
      const saleStart = dayjs(ticket.saleStartDate);
      const saleEnd = dayjs(ticket.saleEndDate);
      return today.isAfter(saleStart) && today.isBefore(saleEnd);
    });

    console.log("Valid Tickets:", validTickets);

    groupedTickets.value = ticketStore.groupTicketsByType(validTickets);
  } else {
    console.error("Tickets data is missing or invalid.");
  }

  checkLoginStatus();
});

const getDiscountedPrice = (price) => {
  const discountRate = 0.8;
  return Math.floor(price * discountRate);
};

const handlePurchase = (ticketGroup) => {
  const themeParkId = Number(ticketGroup.themeParkId);

  console.log("Attempting to set theme park with ID:", themeParkId);

  themeParkStore.setCurrentThemeParkById(themeParkId);

  if (!isLoggedIn.value) {
    router.push({ path: "/users/login" });
  } else {
    router.push({
      name: "TicketOrderView",
      params: {
        adultTicket: JSON.stringify(ticketGroup.adultTicket),
        childTicket: JSON.stringify(ticketGroup.childTicket),
        themeParkId: themeParkId,
        themeParkName: props.themeParkName,
      },
    });
  }
};

const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
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

.card-img-top {
  height: 200px;
  object-fit: cover;
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
