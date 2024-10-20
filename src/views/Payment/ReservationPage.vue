<template>
    <div>
        <h1>예약 페이지</h1>
        <p>Room ID: {{ roomId }}</p>
        <p>Accommodation ID: {{ accommodationId }}</p>
        <p>Check-in Date: {{ checkInDate }}</p>
        <p>Check-out Date: {{ checkOutDate }}</p>
        <p>Room Count: {{ roomCount }}</p>

        <button @click="processReservation">예약하기</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios"; // axios import

const route = useRoute(); // 현재 라우트 정보 가져오기

// 쿼리로 전달된 정보 사용
const roomId = ref(route.query.roomId);
const accommodationId = ref(route.query.accommodationId);
const checkInDate = ref(route.query.checkInDate);
const checkOutDate = ref(route.query.checkOutDate);
const roomCount = ref(route.query.roomCount);

// 예약 처리 함수
const processReservation = async () => {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/reservation-room", {
            roomId: roomId.value,
            reservationDate: new Date().toISOString(),
            checkinDate: checkInDate.value,
            checkoutDate: checkOutDate.value,
            reservationStatus: "RESERVATION",
            totalPrice: 1000,
            paymentStatus: "UNPAID"
        });
        console.log("예약 성공:", response.data);
        alert("예약이 완료되었습니다!");
    } catch (error) {
        console.error("예약 실패:", error);
        alert("예약 처리 중 오류가 발생했습니다.");
    }
};
</script>