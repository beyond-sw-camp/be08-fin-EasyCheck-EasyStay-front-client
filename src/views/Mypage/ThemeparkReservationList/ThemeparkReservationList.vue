<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { mypageStore } from "@/stores/mypageStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useReservationStore } from "@/stores/reservationStore";
import { usePaymentStore } from "@/stores/paymentStore";
import { useRoomStore } from "@/stores/roomStore";
import { useTicketPaymentStore } from "@/stores/ticketpaymentStore";

import easystayImage from '@/assets/img/easystay.png';
import setMaterialInput from "@/assets/js/material-input";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const error = ref(null);
const router = useRouter();
const userStore = userLoginStore();
const mypage = mypageStore();
const accommodationStore = useAccommodationStore();
const reservationStore = useReservationStore();
const ticketpaymentStore = useTicketPaymentStore();

// 상태 변수
const accommodations = ref([]);
const reservations = ref([]);
const filteredReservations = ref([]);
const branchQuery = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');

// 시설 조회
const fetchAccommodations = async () => {
  await mypage.fetchAccommodations(); // API 호출
  accommodations.value = mypage.accommodations; // 가져온 데이터 저장
};

// 브랜치 변경 처리 (필요 시 추가)
const updateBranch = () => {
  mypage.branchQuery = branchQuery.value;
};

// 검색 함수
const searchReservations = () => {
  if (!accommodations.value || accommodations.value.length === 0) {
    console.error("시설 정보가 없습니다.");
    return;
  }

  filteredReservations.value = reservations.value.filter(reservation => {
    return (
      reservation.accommodationName.includes(branchQuery.value) &&
      new Date(reservation.checkinDate) >= new Date(checkInDate.value) &&
      new Date(reservation.checkoutDate) <= new Date(checkOutDate.value)
    );
  });

  console.log("필터링된 예약:", filteredReservations.value);
};


onMounted(async () => {
  setMaterialInput();

  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      await userStore.getUserData();
    } catch (err) {
      error.value = "사용자 정보를 가져오는 데 실패했습니다.";
    }
  } else {
    alert("로그인이 필요합니다.");
    router.push("/users/login");
  }

  await fetchAccommodations();
  await fetchTicketOrdersWithDetails();
});

const fetchTicketOrdersWithDetails = async () => {
  try {
    // 사용자 정보 가져오기
    console.log("사용자 정보를 가져오는 중...");
    await userStore.getUserData();
    const userId = userStore.userData.id;
    console.log("로그인한 사용자 ID:", userId);

    // 모든 결제 정보 가져오기
    console.log("모든 결제 정보를 가져오는 중...");
    await ticketpaymentStore.getAllTicketPayments();
    const allPayments = ticketpaymentStore.payments;
    console.log("모든 결제 정보:", allPayments);

    // // 로그인한 사용자의 결제 정보만 필터링
    // const userPayments = allPayments.filter(payment =>
    //   payment.userId === userId // userId로 비교
    // );
    // console.log("로그인한 사용자의 결제 정보:", userPayments);

    // // 'YYYY-MM-DD' 형식으로 변환
    // const formatDate = (dateString) => {
    //   const date = new Date(dateString);
    //   return date.toISOString().split('T')[0];
    // };

    // // 각 결제 정보를 기반으로 예약 정보를 구성
    // reservations.value = userPayments.map(payment => {
    //   const reservation = allReservations.find(res => res.id === payment.reservationRoomId);

    //   return {
    //     accommodationName: payment.accommodationName || "정보 없음",
    //     checkinDate: formatDate(payment.checkinDate),
    //     checkoutDate: formatDate(payment.checkoutDate),
    //     typeName: reservation ? reservation.typeName : "정보 없음",
    //     reservationStatus: payment.completionStatus,
    //     reservationDate: formatDate(payment.paymentDate),
    //     payment: {
    //       method: payment.method || "정보 없음",
    //       completionStatus: payment.completionStatus || "정보 없음",
    //     },
    //     totalPrice: payment.amount || "정보 없음",
    //   };
    // });

    // console.log("최종 예약 정보:", reservations.value);

  } catch (error) {
    console.error("예약 및 결제 정보를 가져오는 중 오류 발생:", error);
  }
};


</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-90" loading="lazy" style="padding-top: 80px;">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-image" :style="{ backgroundImage: 'url(' + easystayImage + ')' }"
              style="background-size: cover; background-position: center; height: 230px; display: flex; align-items: center; justify-content: center; z-index: 1;">
              <div class="py-3 mb-3 text-center" style="background-color: rgba(255, 255, 255, 0.3); width: 100%;">
                <h3 class="text-black font-weight-bolder mb-0 mt-4 mb-2">테마파크 예약 내역</h3>
                <h6 class="text-black-50 mt-3">고객님의 EASY STAY 전 지점 테마파크 예약 현황을 확인하실 수 있습니다.</h6>
                <div class="row text-black justify-content-center fs-4"></div>

                <!-- 검색바 추가 -->
                <div class="row mt-4">
                  <div class="col-12 text-center">
                    <div class="d-flex justify-content-center align-items-center mb-3">
                      <div class="d-flex align-items-center me-3">
                        <label for="resort-select" class="form-label me-2 mb-0" style="white-space: nowrap;">지점
                          선택</label>
                        <select id="resort-select" v-model="branchQuery" class="form-select me-2"
                          @change="updateBranch">
                          <option value="" disabled>지점을 선택하세요</option>
                          <option v-for="branch in accommodations" :key="branch.id" :value="branch.name">
                            {{ branch.name }}
                          </option>
                        </select>
                      </div>

                      <div class="d-flex align-items-center me-3">
                        <label for="stayDuration" class="me-2 mb-0" style="white-space: nowrap;">투숙 기간</label>
                        <MaterialInput type="date" v-model="checkInDate"
                          class="form-control me-2 input-group-outline" />
                        <span class="mx-2">~</span>
                        <MaterialInput type="date" v-model="checkOutDate" class="form-control input-group-outline" />
                      </div>

                      <MaterialButton @click="searchReservations" class="btn btn-primary ms-2 mt-3"
                        style="background: linear-gradient(to right, #ff7e5f, #feb47b)">
                        검색
                      </MaterialButton>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>

          <!-- 객실 예약 내역 -->
          <div class=" col-12 mt-4">
            <h4 class="text-start ms-3">예약 내역</h4>
            <div style="border-top: 1px solid #000; width: 100%; margin: 10px auto;"></div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>지점</th>
                  <th>티켓명</th>
                  <th>사용 시작 기간</th>
                  <th>사용 종료 기간</th>
                  <th>수량</th>
                  <th>결제 상태</th>
                  <th>결제 방법</th>
                  <th>결제 날짜</th>
                  <th>총 가격</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in filteredReservations" :key="reservation.id">
                  <td>{{ reservation.accommodationName || '정보 없음' }}</td> <!-- 숙소 이름 -->
                  <td>{{ reservation.startDate || '정보 없음' }}</td> <!-- 사용 시작 기간 -->
                  <td>{{ reservation.endDate || '정보 없음' }}</td> <!-- 사용 종료 기간 -->
                  <td>{{ reservation.quantity || '정보 없음' }}</td> <!-- 수량 -->
                  <td>{{ reservation.paymentStatus || '정보 없음' }}</td> <!-- 결제 상태 -->
                  <td>{{ reservation.payment?.method || '정보 없음' }}</td> <!-- 결제 방법 -->
                  <td>{{ reservation.payment?.date || '정보 없음' }}</td> <!-- 결제 날짜 -->
                  <td>{{ reservation.totalPrice !== undefined ? reservation.totalPrice : '정보 없음' }}</td>
                  <!-- 총 가격 -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<style>
.custom-font {
  font-family: 'Caveat', cursive;
}
</style>