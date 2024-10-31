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
          <span>주문 번호: {{ ticketOrderResult.orderId }}</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3"></div>

          <div class="table-responsive">
            <table class="table table-bordered mobile-table">
              <tbody>
                <tr>
                  <th>지점</th>
                  <td colspan="3">{{ themeParkName }}</td>
                </tr>
                <tr>
                  <th>티켓 이름</th>
                  <td colspan="3">{{ ticketOrderResult.ticketName }}</td>
                </tr>
                <tr>
                  <th>유효기간</th>
                  <td colspan="3">{{ validFrom }} ~ {{ validTo }}</td>
                </tr>
                <tr>
                  <th>대인 입장권</th>
                  <td>{{ ticketOrderResult.adultTicketAmount }}매</td>
                  <th>소인 입장권</th>
                  <td>{{ ticketOrderResult.childTicketAmount }}매</td>
                </tr>
                <tr>
                  <th>구매자 이름</th>
                  <td>{{ ticketOrderResult.buyerName }}</td>
                  <th>구매자 휴대전화</th>
                  <td>{{ ticketOrderResult.buyerPhone }}</td>
                </tr>
                <tr>
                  <th>구매자 이메일</th>
                  <td colspan="3">
                    {{ ticketOrderResult.buyerEmail || "미입력" }}
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
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTicketOrderStore } from "@/stores/ticketorderStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useTicketStore } from "@/stores/ticketStore";

// 스토어에서 필요한 데이터 가져오기
const ticketOrderStore = useTicketOrderStore();
const themeparkStore = useThemeParkStore();
const ticketStore = useTicketStore();
const { ticketOrderResult } = storeToRefs(ticketOrderStore);

// ticketOrderResult의 ticketId를 사용해 티켓 유효기간 가져오기
const validFrom = computed(() => {
  const ticket = ticketStore.fetchAdultTicket(ticketOrderResult.value.ticketId);
  return ticket?.validFromDate || "알 수 없음";
});

const validTo = computed(() => {
  const ticket = ticketStore.fetchAdultTicket(ticketOrderResult.value.ticketId);
  return ticket?.validToDate || "알 수 없음";
});

// 총 요금 포맷팅
const formattedTotalPrice = computed(() => {
  const totalPrice = ticketOrderResult.value.totalPrice || 0;
  return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// 필요한 데이터를 로드하는 onMounted 훅
onMounted(() => {
  themeparkStore.fetchThemeParks();
  ticketStore.fetchTickets();
});
</script>

<style scoped>
.ticket-result {
  background-color: #f9f9f9;
  padding-top: 6rem;
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
