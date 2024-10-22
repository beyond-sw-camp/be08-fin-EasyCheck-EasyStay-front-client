<template>
    <div>
        <h1>결제 내역</h1>

        <div v-if="loading">결제 내역을 불러오는 중...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <ul v-if="payments.length > 0">
            <li v-for="payment in payments" :key="payment.id">
                <p>결제 ID: {{ payment.id }}</p>
                <p>예약 ID: {{ payment.reservationRoomId }}</p>
                <p>결제 금액: {{ payment.amount }}</p>
                <p>결제 상태: {{ payment.completionStatus }}</p>

                <!-- 환불하기 버튼 -->
                <button v-if="payment.completionStatus === 'COMPLETE'"
                    @click="handleRefund(payment.id, payment.impUid)">
                    환불하기
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { refundPayment } from "@/components/Payment/Payment.vue"; // 환불 함수 가져오기
import apiClient from "@/api";

// 상태 정의
const payments = ref([]);
const loading = ref(false);
const error = ref(null);

// 결제 내역 조회 함수
const fetchPayments = async () => {
    loading.value = true;
    try {
        const response = await apiClient.get("/payment");
        payments.value = response.data;
    } catch (err) {
        error.value = "결제 내역을 가져오는 중 오류가 발생했습니다.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// 환불 처리 함수
const handleRefund = async (paymentId, paymantImpUid) => {
    if (!paymantImpUid) {
        alert("impUid가 누락되었습니다. 결제 정보를 확인해주세요.");
        return;
    }

    try {
        await refundPayment(paymentId, paymantImpUid); // impUid로 환불 처리
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