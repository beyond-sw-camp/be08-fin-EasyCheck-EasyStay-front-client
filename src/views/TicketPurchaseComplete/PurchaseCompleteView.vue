<template>
  <div class="order-completion container my-5">
    <h1 class="text-center text-primary mb-4">입장권 구매가 완료되었습니다.</h1>
    <p class="text-center text-muted">
      입력하신 구매자 정보로 구매 완료 내용이 발송되었습니다.<br />
    </p>
    <div class="card mt-5">
      <div class="card-header bg-light d-flex justify-content-between">
        <span>구매 내역</span>
        <span>주문 번호</span>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <span>입장권 구매</span>
          <span>{{ order?.orderId }}</span>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered mobile-table">
            <tbody>
              <tr>
                <th>성인 입장권</th>
                <td>{{ order?.adultTicketAmount }}매</td>
                <th>어린이 입장권</th>
                <td>{{ order?.childTicketAmount }}매</td>
              </tr>
              <tr>
                <th>총 인원</th>
                <td colspan="3">
                  성인 {{ order?.adultTicketAmount }}명 / 어린이
                  {{ order?.childTicketAmount }}명
                </td>
              </tr>
              <tr>
                <th>구매자 이름</th>
                <td>{{ order?.buyerName }}</td>
                <th>구매자 휴대전화</th>
                <td>{{ order?.buyerPhone }}</td>
              </tr>
              <tr>
                <th>구매자 이메일</th>
                <td colspan="3">{{ order?.buyerEmail || "미입력" }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="fw-bold">총 요금<br />(VAT 포함)</span>
          <span class="text-danger fw-bold fs-4"
            >{{ order?.totalPrice }} 원</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticketStore";

// 주문 데이터 가져오기
const ticketStore = useTicketStore();
const { orderResult: order } = storeToRefs(ticketStore);
</script>

<style scoped lang="scss">
/* 기본 페이지 스타일 */
.order-completion {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

/* 카드 스타일 */
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
