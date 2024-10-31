<template>
  <div class="ticket-result pb-7">
    <h1 class="text-center text-primary mb-4">입장권 구매가 완료되었습니다.</h1>
    <p class="text-center text-muted">
      입력하신 구매자 정보로 구매 완료 내용이 발송되었습니다.
    </p>
    <div class="container">
      <div class="card mt-5">
        <div class="card-header bg-light d-flex justify-content-between">
          <span>구매 내역</span>
          <span>주문 번호: {{ currentOrder?.orderId }}</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3">
            <span>입장권 구매</span>
            <span>{{ currentOrder?.orderId }}</span>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered mobile-table">
              <tbody>
                <tr>
                  <th>지점</th>
                  <td colspan="3">
                    {{ ticketInfo?.themeParkName || "알 수 없음" }}
                  </td>
                </tr>
                <tr>
                  <th>티켓 이름</th>
                  <td colspan="3">
                    대인: {{ ticketInfo?.adultTicketName || "알 수 없음" }} /
                    소인: {{ ticketInfo?.childTicketName || "알 수 없음" }}
                  </td>
                </tr>
                <tr>
                  <th>유효기간</th>
                  <td colspan="3">
                    {{ ticketInfo?.validFrom }} ~ {{ ticketInfo?.validTo }}
                  </td>
                </tr>
                <tr>
                  <th>대인 입장권</th>
                  <td>{{ currentOrder?.adultTicketAmount }}매</td>
                  <th>소인 입장권</th>
                  <td>{{ currentOrder?.childTicketAmount }}매</td>
                </tr>
                <tr>
                  <th>구매자 이름</th>
                  <td>{{ currentOrder?.buyerName }}</td>
                  <th>구매자 휴대전화</th>
                  <td>{{ currentOrder?.buyerPhone }}</td>
                </tr>
                <tr>
                  <th>구매자 이메일</th>
                  <td colspan="3">
                    {{ currentOrder?.buyerEmail || "미입력" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="fw-bold">총 요금<br />(VAT 포함)</span>
            <span class="text-danger fw-bold fs-4"
              >{{ formattedTotalPrice }} 원</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketOrderStore } from "@/stores/ticketorderStore";
import { useTicketStore } from "@/stores/ticketStore";

const ticketOrderStore = useTicketOrderStore();
const { currentOrder } = storeToRefs(ticketOrderStore);

const ticketStore = useTicketStore();
const { ticketInfo } = storeToRefs(ticketStore);

const route = useRoute();

const handleBeforeUnload = (e) => {
  const message =
    "페이지를 벗어나면 입력하신 정보가 모두 사라집니다. 계속하시겠습니까?";
  e.returnValue = message;
  return message;
};

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);

  const orderId = route.query.orderId;
  if (orderId) {
    ticketOrderStore.fetchOrderById(orderId);
  } else {
    console.error("Order ID가 없습니다.");
  }

  const ticketId = route.query.ticketId;
  if (ticketId) {
    ticketStore.fetchTicketInfoById(ticketId);
  } else {
    console.error("Ticket ID가 없습니다.");
  }
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const formattedTotalPrice = computed(() => {
  if (!currentOrder.value?.totalPrice) return "0";
  return currentOrder.value.totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
</script>

<style scoped>
.ticket-result {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table th {
  width: 25%;
  background-color: #f8f9fa;
}

.text-primary {
  color: #007bff;
}

.text-danger {
  color: #dc3545;
}

@media (max-width: 768px) {
  .mobile-table {
    display: block;
    width: 100%;

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      border: 1px solid #dee2e6;
    }

    th,
    td {
      display: block;
      width: 50%;
      border: none;
      border-bottom: 1px solid #dee2e6;

      &:last-child,
      &:nth-last-child(2) {
        border-bottom: none;
      }
    }

    td[colspan="3"] {
      width: 100%;
    }
  }
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
