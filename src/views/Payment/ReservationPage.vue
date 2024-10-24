<template>
    <div>
        <h1>예약 페이지</h1>
        <p>Room ID: {{ roomId }}</p>
        <p>Accommodation ID: {{ accommodationId }}</p>
        <p>Check-in Date: {{ checkInDate }}</p>
        <p>Check-out Date: {{ checkOutDate }}</p>
        <p>Room Count: {{ roomCount }}</p>

        <!-- totalPrice 입력란 -->
        <label for="totalPrice">Total Price: </label>
        <input type="number" v-model="totalPrice" id="totalPrice" />

        <label for="payment-method">결제 방법을 선택하세요:</label>
        <select v-model="selectedPaymentMethod" id="payment-method">
            <option value="card">신용카드</option>
            <option value="vbank">가상계좌</option>
        </select>

        <!-- 결제하기 버튼 -->
        <button @click="processReservationAndPayment" :disabled="loading">결제하기</button>

        <!-- 결제 내역 조회하기 버튼 -->
        <button @click="goToPaymentPage">결제 내역 조회하기</button>

        <!-- 로딩 상태 표시 -->
        <p v-if="loading">처리 중...</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/api";
import { processPayment } from "@/components/Payment/Payment.vue"; // processPayment 함수 가져오기

// Route 정보 가져오기
const route = useRoute();
const router = useRouter();

// 쿼리로 전달된 정보 사용
const roomId = ref(route.query.roomId);
const accommodationId = ref(route.query.accommodationId);
const checkInDate = ref(route.query.checkInDate);
const checkOutDate = ref(route.query.checkOutDate);
const roomCount = ref(route.query.roomCount);

// 예약 완료 여부
const isReservationComplete = ref(false);

// totalPrice 입력
const totalPrice = ref(0);

// 결제 방법 선택
const selectedPaymentMethod = ref("card"); // 기본 결제 방법은 신용카드

// 로딩 상태
const loading = ref(false);

// 결제 처리 함수
const processReservationAndPayment = async () => {
    try {
        // 예약 처리
        const reservationResponse = await apiClient.post("/reservation-room", {
            roomId: roomId.value,
            reservationDate: new Date().toISOString(),
            checkinDate: checkInDate.value,
            checkoutDate: checkOutDate.value,
            reservationStatus: "RESERVATION",
            totalPrice: totalPrice.value,
            paymentStatus: "UNPAID",
        });

        console.log("예약 응답:", reservationResponse); // 응답 로그 확인

        // 서버 응답에서 reservationId 확인
        const reservationId = reservationResponse?.data?.id || reservationResponse?.data?.reservationId;
        console.log("예약 ID:", reservationId); // 예약 ID 로그 확인

        if (!reservationId) {
            throw new Error("예약 ID를 가져오지 못했습니다.");
        }

        isReservationComplete.value = true; // 예약 완료 상태로 변경

        // 결제 처리
        await processPayment(reservationId, totalPrice.value, selectedPaymentMethod.value); // 결제 로직 호출
    } catch (err) {
        console.error("예약 또는 결제 처리 실패:", err);
        alert("예약 또는 결제 처리 중 오류가 발생했습니다.");
    } finally {
        loading.value = false;
    }
};

// 결제 내역 조회 페이지로 이동
const goToPaymentPage = () => {
    router.push({ name: 'PaymentPage' });
};
</script>

<style scoped>
.error {
    color: red;
}
</style>
