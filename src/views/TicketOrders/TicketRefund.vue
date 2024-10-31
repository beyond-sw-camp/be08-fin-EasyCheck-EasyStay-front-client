<template>
    <div>
        <h1>결제 내역</h1>

        <div v-if="loading">결제 내역을 불러오는 중...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <ul v-if="ticketPayments.length > 0">
            <li v-for="ticketPayment in ticketPayments" :key="ticketPayment.id">
                <p>결제 ID: {{ ticketPayment.id }}</p>
                <p>주문 ID: {{ ticketPayment.orderId }}</p>
                <p>결제 금액: {{ ticketPayment.paymentAmount }}</p>
                <p>결제 상태: {{ ticketPayment.paymentStatus }}</p>

                <!-- 환불하기 버튼 -->
                <button v-if="ticketPayment.paymentStatus === 'COMPLETED'"
                    @click="handleRefund(ticketPayment.id, ticketPayment.impUid)">
                    환불하기
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { refundPayment } from "@/components/Payment/TicketPayment.vue"; // 환불 함수 가져오기
import apiClient from "@/api";

// 상태 정의
const ticketPayments = ref([]);
const loading = ref(false);
const error = ref(null);

// 결제 내역 조회 함수
const fetchPayments = async () => {
    loading.value = true;
    try {
        const response = await apiClient.get("/tickets/payment");
        ticketPayments.value = response.data;
    } catch (err) {
        error.value = "결제 내역을 가져오는 중 오류가 발생했습니다.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// 환불 처리 함수
const handleRefund = async (orderId, ticketPaymantImpUid) => {
    if (!ticketPaymantImpUid) {
        alert("impUid가 누락되었습니다. 결제 정보를 확인해주세요.");
        return;
    }

    try {
        await refundPayment(orderId, ticketPaymantImpUid); // impUid로 환불 처리
        alert("환불이 완료되었습니다.");
        // 환불 후 결제 내역 갱신
        await fetchPayments();
    } catch (err) {
        alert("환불 처리 중 오류가 발생했습니다.");
        console.error(err);
    }
};

// 컴포넌트 마운트 시 결제 내역 조회
onMounted(fetchPayments);
</script>

<style scoped>
.error {
    color: red;
}
</style>
