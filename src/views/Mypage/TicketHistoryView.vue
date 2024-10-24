<template>
  <div class="container my-5">
    <h2 class="text-left mb-4">쿠폰 구매내역</h2>
    <p class="text-left text-muted pb-4">
      고객님의 쿠폰 구매내역을 조회하실 수 있습니다.
    </p>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>구매 번호</th>
          <th>이용 지점 / 상품명</th>
          <th>유효기간</th>
          <th>구매 수량</th>
          <th>구매일</th>
          <th>결제 상태</th>
          <th>취소</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.orderId }}</td>
          <td>{{ order.themeParkName }} - {{ order.ticketName }}</td>
          <td>{{ order.validFromDate }} ~ {{ order.validToDate }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.purchaseDate }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button
              v-if="order.status !== '취소됨'"
              class="btn btn-danger btn-sm"
              @click="handleCancelOrder(order.id)"
            >
              취소하기
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTicketOrderStore } from "@/stores/ticketOrderStore";

const ticketOrderStore = useTicketOrderStore();
const { orders, fetchUserOrders } = ticketOrderStore;

onMounted(() => {
  fetchUserOrders();
});

const handleCancelOrder = async (orderId) => {
  const confirmCancel = confirm("정말로 이 주문을 취소하시겠습니까?");
  if (confirmCancel) {
    await ticketOrderStore.cancelOrder(orderId);
  }
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
