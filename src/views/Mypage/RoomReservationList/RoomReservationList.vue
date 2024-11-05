<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { mypageStore } from "@/stores/mypageStore";
import { useReservationStore } from "@/stores/reservationStore";
import { usePaymentStore } from "@/stores/paymentStore";

import easystayImage from '@/assets/img/easystay.png';
import setMaterialInput from "@/assets/js/material-input";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const router = useRouter();
const userStore = userLoginStore();
const mypage = mypageStore();
const reservationStore = useReservationStore();
const paymentStore = usePaymentStore();

// 상태 변수
const error = ref(null);
const accommodations = ref([]);
const reservations = ref([]);
const filteredReservations = ref([]);
const branchQuery = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const selectedReservation = ref(null); // 선택된 예약 정보를 저장할 변수

// 페이지네이션 변수
const currentPage = ref(1);
const itemsPerPage = 5;

// 검색바 - 시설 조회
const fetchAccommodations = async () => {
  await mypage.fetchAccommodations();
  accommodations.value = mypage.accommodations;
};

// 검색바 - 지점 선택 변경 처리
const updateBranch = () => {
  mypage.branchQuery = branchQuery.value;
};

// 검색바 - 검색 함수
const searchReservations = () => {
  if (!accommodations.value || accommodations.value.length === 0) {
    console.error("시설 정보가 없습니다.");
    return;
  }

  // 지점 이름, 체크인, 체크아웃 날짜 필터
  if (branchQuery.value || checkInDate.value || checkOutDate.value) {
    filteredReservations.value = reservations.value.filter(reservation => {
      return (
        reservation.accommodationName.includes(branchQuery.value) &&
        new Date(reservation.checkinDate) >= new Date(checkInDate.value) &&
        new Date(reservation.checkoutDate) <= new Date(checkOutDate.value)
      );
    });
  } else {
    // 검색 조건이 없을 경우 모든 예약 보여줌
    filteredReservations.value = [...reservations.value];
  }

  // 페이지네이션 초기화
  currentPage.value = 1;

  console.log("필터링된 예약:", filteredReservations.value);
};

// 페이지네이션
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / itemsPerPage);
});

const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredReservations.value.slice(start, start + itemsPerPage);
});

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 결제 상태 값 매핑
const paymentStatusMapping = {
  COMPLETE: "결제 완료",
  INCOMPLETE: "결제 미완료",
  REFUND: "환불 완료",
};

// 결제 방법 값 매핑
const paymentMethodMapping = {
  vbank: "무통장 입금",
  card: "카드",
};

// 예약 내역 조회
const fetchReservationsWithDetails = async () => {
  try {
    await userStore.getUserData();
    const userId = userStore.userData.id;

    console.log("사용자 ID:", userId);

    await paymentStore.fetchAllPayments();
    const allPayments = paymentStore.payments.filter(payment => payment.userId === userId);

    console.log("사용자의 결제 내역:", allPayments);

    await reservationStore.fetchAllReservationRoomLists();
    console.log("모든 예약 내역:", reservationStore.reservations);
    const allReservations = reservationStore.reservations.filter(reservation => reservation.userId === userId);

    console.log("사용자의 예약 내역:", allReservations);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      // UTC에서 로컬 시간으로 변환
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      return localDate.toISOString().split('T')[0];
    };

    // 모든 결제에 대해 해당 결제와 연결된 모든 예약을 찾기
    reservations.value = allPayments.flatMap(payment => {
      const matchingReservations = allReservations.filter(res => res.id === payment.reservationRoomId);

      return matchingReservations.map(reservation => ({
        reservationId: reservation.id,
        accommodationName: reservation.accommodationName || "정보 없음",
        checkinDate: formatDate(reservation.checkinDate),
        checkoutDate: formatDate(reservation.checkoutDate),
        typeName: reservation.typeName || "정보 없음",
        paymentDate: formatDate(payment.paymentDate),
        payment: {
          method: paymentMethodMapping[payment.method] || "정보 없음",
          completionStatus: paymentStatusMapping[payment.completionStatus] || "정보 없음",
          id: payment.id
        },
        totalPrice: payment.amount || "정보 없음",
      }));
    });

    // 예약 정보를 결제 날짜 기준으로 최신순으로 정렬
    filteredReservations.value = [...reservations.value].sort((a, b) => {
      const dateA = new Date(a.paymentDate);
      const dateB = new Date(b.paymentDate);
      return dateB - dateA; // 내림차순 정렬
    });
    console.log("최종 예약 정보:", reservations.value);

  } catch (error) {
    console.error("예약 및 결제 정보를 가져오는 중 오류 발생:", error);
  }
};

// 예약 상세보기 선택
const selectReservation = (reservation) => {
  const id = reservation.payment.id;
  console.log(reservation.payment.id); // 예약 ID를 콘솔에 출력
  selectedReservation.value = reservation; // 선택된 예약 정보 저장
  router.push({ name: "RoomReservationDetailView", params: { id } });
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
  await fetchReservationsWithDetails();

  // 현재 날짜 설정
  const today = new Date();
  checkInDate.value = today.toISOString().split('T')[0];

  // 내일 날짜 계산
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  checkOutDate.value = tomorrow.toISOString().split('T')[0];

});

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
            <table class="table table-reservation">
              <thead>
                <tr class="text-black">
                  <th>지점</th>
                  <th>객실 이름</th>
                  <th>예약 날짜</th>
                  <th>결제 방법</th>
                  <th>결제 상태</th>
                  <th>결제 날짜</th>
                  <th>가격(원)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in paginatedReservations" :key="reservation.reservationId"
                  @click="selectReservation(reservation)" class="text-bold">
                  <td>{{ reservation.accommodationName || '정보 없음' }}</td>
                  <td>{{ reservation.typeName || '정보 없음' }}</td>
                  <td>{{ reservation.checkinDate || '정보 없음' }} ~ {{ reservation.checkoutDate || '정보 없음' }}</td>
                  <td>{{ reservation.payment?.method || '정보 없음' }}</td>
                  <td v-bind:class="{
                    'payment-complete': reservation.payment?.completionStatus === '결제 완료',
                    'payment-incomplete': reservation.payment?.completionStatus === '결제 미완료',
                    'payment-refund': reservation.payment?.completionStatus === '환불 완료'
                  }">
                    {{ reservation.payment?.completionStatus || '정보 없음' }}
                  </td>
                  <td>{{ reservation.paymentDate || '정보 없음' }}</td>
                  <td>{{ reservation.totalPrice !== undefined ? reservation.totalPrice : '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 페이지네이션 버튼 추가 -->
            <div class="pagination d-flex justify-content-center align-items-center">
              <MaterialButton variant="outline" @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="pagination-button">
                이전
              </MaterialButton>
              <span class="mx-2 mb-3">페이지 {{ currentPage }} / {{ totalPages }}</span>
              <MaterialButton variant="outline" @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages" class="pagination-button">
                다음
              </MaterialButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<style scoped>
.pagination {
  margin-top: 20px;
}

.pagination-button {
  padding: 5px 10px;
  font-size: 0.7rem;
}

.table-reservation tbody tr {
  cursor: pointer;
  /* 포인터 모양으로 변경 */
}

.table-reservation tbody tr:hover {
  background-color: #f5f5f5cc;
  /* 호버 시 배경 색상 변경 */
}

.payment-complete {
  color: green;
  font-weight: bold;
}

.payment-incomplete {
  color: orange;
  font-weight: bold;
}

.payment-refund {
  color: red;
  font-weight: bold;
}
</style>