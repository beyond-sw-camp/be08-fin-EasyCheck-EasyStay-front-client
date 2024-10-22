<template>
  <NavbarDefault :sticky="true" />
  <div class="ticket-selection container my-5">
    <h2 class="mb-4">이용권 선택</h2>
    <div class="ticket-list row">
      <div
        v-for="ticketGroup in groupedTickets"
        :key="ticketGroup.name"
        class="col-md-4 mb-4"
      >
        <div class="card ticket-card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ ticketGroup.name }}</h5>
            <p class="card-text">
              {{ ticketGroup.description }}
            </p>
            <div class="card-prices">
              <p class="card-price">
                대인:
                <span class="normal-price">{{ ticketGroup.adultPrice }}원</span>
                <span class="final-price"
                  >{{ getDiscountedPrice(ticketGroup.adultPrice) }}원</span
                >
              </p>
              <p class="card-price">
                소인:
                <span class="normal-price">{{ ticketGroup.childPrice }}원</span>
                <span class="final-price"
                  >{{ getDiscountedPrice(ticketGroup.childPrice) }}원</span
                >
              </p>
              <span class="login-hint" v-if="!isLoggedIn"> 로그인 시 </span>
            </div>
            <button
              class="btn btn-primary mt-3 w-100"
              @click="goToOrderPage(ticketGroup.id)"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import dayjs from "dayjs";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const tickets = ref([]);
const groupedTickets = ref([]);
const router = useRouter();
const ticketStore = useTicketStore();
const isLoggedIn = ref(false);

onMounted(async () => {
  const themeParkId = 1;
  await ticketStore.fetchTickets(themeParkId);
  if (ticketStore.tickets.data && Array.isArray(ticketStore.tickets.data)) {
    tickets.value = ticketStore.tickets.data;
  } else {
    console.error("Invalid tickets data:", ticketStore.tickets);
    tickets.value = [];
  }
  filterAndGroupTickets();
  checkLoginStatus();
});

const filterAndGroupTickets = () => {
  const today = dayjs();
  const validTickets = tickets.value.filter(
    (ticket) =>
      dayjs(ticket.saleStartDate).isBefore(today) &&
      dayjs(ticket.saleEndDate).isAfter(today)
  );

  const grouped = {};
  validTickets.forEach((ticket) => {
    const key = ticket.ticketName.replace(/ \(대인\)| \(소인\)/g, "");
    if (!grouped[key]) {
      grouped[key] = {
        id: ticket.id,
        name: key,
        adultPrice: null,
        childPrice: null,
      };
    }
    if (ticket.ticketName.includes("대인")) {
      grouped[key].adultPrice = ticket.price;
    } else if (ticket.ticketName.includes("소인")) {
      grouped[key].childPrice = ticket.price;
    }
  });
  groupedTickets.value = Object.values(grouped);
};

const getDiscountedPrice = (price) => {
  const discountRate = 0.8;
  return Math.floor(price * discountRate);
};

const goToOrderPage = (ticketId) => {
  router.push({ name: "TicketOrderView", params: { ticketId } });
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
