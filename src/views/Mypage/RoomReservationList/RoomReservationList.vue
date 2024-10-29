<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useReservationStore } from "@/stores/reservationStore";
import { usePaymentStore } from "@/stores/paymentStore";

import easystayImage from '@/assets/img/easystay.png';
import setMaterialInput from "@/assets/js/material-input";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const error = ref(null);
const router = useRouter();
const userStore = userLoginStore();
const accommodationStore = useAccommodationStore();
const accommodations = accommodationStore.accommodations;
const reservationStore = useReservationStore();
const reservations = ref([]);
const paymentStore = usePaymentStore();
const branchQuery = ref('');
const loading = ref(false);

onMounted(async () => {
  setMaterialInput();

  // 사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  console.log("token: ", token);

  if (token) {
    try {
      await userStore.getUserData();
    } catch (err) {
      error.value = "사용자 정보를 가져오는 데 실패했습니다.";
      console.error("API 오류:", err);
    }
  } else {
    alert("로그인이 필요합니다.");
    router.push("/users/login");
  }

  const updateBranch = () => {
    // 지점 변경 시의 로직을 여기에 추가
    console.log("Selected branch:", branchQuery.value);
  };

  // 사업장 조회
  await accommodationStore.fetchAccommodations();

  // 객실 예약 및 결제 내역 조회
  await fetchReservations();

});

const fetchReservations = async () => {
  try {
    await reservationStore.fetchReservationRoomLists();
    reservations.value = reservationStore.reservations;

    await paymentStore.fetchAllPayments();
    const paymentData = paymentStore.payments;

    console.log('Payment Data:', paymentData);

    // 사업장 정보 가져오기
    await accommodationStore.fetchAccommodations();
    const accommodationsMap = {};
    accommodationStore.accommodations.forEach(branch => {
      accommodationsMap[branch.id] = branch.name; // ID를 키로 사용하여 매핑
    });

    console.log('Accommodations:', accommodationsMap);

    // 예약과 결제 정보를 매칭
    reservations.value.forEach(reservation => {
      const payment = paymentData.find(p => p.reservationRoomId === reservation.id);
      reservation.payment = payment;

      // 지점 이름 추가
      reservation.accommodationName = accommodationsMap[reservation.accommodationId]; // 매핑된 지점 이름

      // 디버깅용 로그 추가
      console.log('Reservation:', reservation);
    });
  } catch (err) {
    error.value = "예약 및 결제 정보를 가져오는 데 실패했습니다.";
    console.error("Error:", err);
  }
};


</script>

<template>
  <div class="position-sticky z-index-sticky top-0 w-100">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div class="page-header align-items-start min-vh-90" loading="lazy" style="padding-top: 80px;">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-image" :style="{ backgroundImage: 'url(' + easystayImage + ')' }"
              style="background-size: cover; background-position: center; height: 230px; display: flex; align-items: center; justify-content: center; z-index: 1;">
              <div class="py-3 mb-3 text-center" style="background-color: rgba(255, 255, 255, 0.3); width: 100%;">
                <h3 class="text-black font-weight-bolder mb-0 mt-4 mb-2">객실 예약 내역</h3>
                <h6 class="text-black-50 mt-3">고객님의 EASY STAY 전 지점 예약 현황을 확인하실 수 있습니다.</h6>
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
                        <MaterialInput type="date" v-model="checkInDate" id="checkIn"
                          class="form-control me-2 input-group-outline" />
                        <span class="mx-2">~</span>
                        <MaterialInput type="date" v-model="checkOutDate" id="checkOut"
                          class="form-control input-group-outline" />
                      </div>

                      <MaterialButton @click="searchReservations" class="btn btn-primary ms-2 mt-3"
                        style="background: linear-gradient(to right, #ff7e5f, #feb47b);">검색
                      </MaterialButton>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class=" row justify-content-center text-black fs-6 mb-4">
            <div class="text-center mt-3">
              <h5 class="custom-font">EASY STAY's membership offers special value.</h5>
              <div v-if="error" class="text-danger">{{ error }}</div>
              <div v-else>
                <!-- 사용자 정보 표시 -->
                <div>환영합니다, {{ userStore.userData.name }}님!</div>
                <div>회원 ID: {{ userStore.userData.email }}</div>
              </div>
            </div>
          </div>

          <!-- 객실 예약 내역 -->
          <div class="col-12 mt-4">
            <h4 class="text-start ms-3">예약 내역</h4>
            <div style="border-top: 1px solid #000; width: 100%; margin: 10px auto;"></div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>지점</th>
                  <th>체크인</th>
                  <th>체크아웃</th>
                  <th>객실 이름</th>
                  <th>예약 상태</th>
                  <th>결제 날짜</th>
                  <th>결제 방법</th>
                  <th>결제 상태</th>
                  <th>총 가격</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in reservations" :key="reservation.id">
                  <td>{{ reservation.accommodationame }}</td> <!-- 지점 -->
                  <td>{{ reservation.checkinDate }}</td> <!-- 체크인 -->
                  <td>{{ reservation.checkoutDate }}</td> <!-- 체크아웃 -->
                  <td>{{ reservation.typeName }}</td> <!-- 객실 이름-->
                  <td>{{ reservation.reservationStatus }}</td> <!-- 예약 상태-->
                  <td>{{ reservation.reservationDate }}</td> <!-- 결제 날짜 -->
                  <td>{{ reservation.payment?.method }}</td> <!-- 결제 방법 -->
                  <td>{{ reservation.payment?.completionStatus }}</td> <!-- 결제 상태 -->
                  <td>{{ reservation.totalPrice }}</td> <!-- 총 가격 -->
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