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

        <!-- 예약하기 버튼 -->
        <button @click="processReservation" :disabled="loading">예약하기</button>

        <!-- 예약이 완료되면 결제하기 버튼 표시 -->
        <button v-if="isReservationComplete" @click="onPaymentClick" :disabled="loading">결제하기</button>

        <!-- 로딩 상태 표시 -->
        <p v-if="loading">처리 중...</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/api";
import { processPayment } from "@/components/Payment/Payment.vue"; // processPayment 함수 가져오기

// Route 정보 가져오기
const route = useRoute();

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

// 예약 처리 함수
const processReservation = async () => {
    try {
        await apiClient.post("/reservation-room", {
            roomId: roomId.value,
            reservationDate: new Date().toISOString(),
            checkinDate: checkInDate.value,
            checkoutDate: checkOutDate.value,
            reservationStatus: "RESERVATION",
            totalPrice: totalPrice.value,
            paymentStatus: "UNPAID",
        });
        isReservationComplete.value = true; // 예약 완료 상태로 변경
        alert("예약이 완료되었습니다!");
    } catch (err) {
        console.error("예약 실패:", err);
        alert("예약 처리 중 오류가 발생했습니다.");
    }
};

// 결제 처리 함수
const onPaymentClick = () => {
    processPayment(roomId.value, totalPrice.value); // 결제 로직 호출
};
</script>

<style scoped>
.error {
    color: red;
}
</style>