<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { mypageStore } from "@/stores/mypageStore";
import { useTicketPaymentStore } from "@/stores/ticketpaymentStore";

import easystayImage from '@/assets/img/easystay.png';
import setMaterialInput from "@/assets/js/material-input";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const router = useRouter();
const userStore = userLoginStore();
const mypage = mypageStore();
const ticketpaymentStore = useTicketPaymentStore();

// 상태 변수
const error = ref(null);
const accommodations = ref([]);
const reservations = ref([]);
const filteredReservations = ref([]);
const branchQuery = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');

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

  // 지점 이름, 시작 날짜, 종료 날짜 필터
  if (branchQuery.value || checkInDate.value || checkOutDate.value) {
    filteredReservations.value = reservations.value.filter(reservation => {
      const validFromDate = new Date(reservation.validFromDate);
      const validToDate = new Date(reservation.validToDate);

      return (
        (branchQuery.value ? reservation.accommodationName.includes(branchQuery.value) : true) &&
        (checkInDate.value ? validFromDate >= new Date(checkInDate.value) : true) &&
        (checkOutDate.value ? validToDate <= new Date(checkOutDate.value) : true)
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
// 'YYYY-MM-DD' 형식으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// 결제 상태 매핑
const paymentStatusMapping = {
  COMPLETED: "결제 완료",
  INCOMPLETE: "결제 미완료",
  REFUND: "환불 완료",
};

// 티켓 예약 내역 조회
const fetchTicketOrdersWithDetails = async () => {
  try {
    // 사용자 정보 가져오기
    console.log("사용자 정보를 가져오는 중...");
    await userStore.getUserData();
    const userId = userStore.userData?.id;
    console.log("로그인한 사용자 ID:", userId);

    // 모든 결제 정보 가져오기
    console.log("모든 결제 정보를 가져오는 중...");
    await ticketpaymentStore.getAllTicketPayments();
    const allPayments = ticketpaymentStore.payments;
    console.log("모든 결제 정보:", allPayments);

    // 로그인한 사용자의 결제 정보만 필터링
    const userPayments = allPayments.filter(payment =>
      payment.userId === userId
    );
    console.log("로그인한 사용자의 결제 정보:", userPayments);

    reservations.value = userPayments.map(payment => ({
      accommodationName: payment.accommodationName || "정보 없음",
      themeParkName: payment.themeParkName || "정보 없음",
      ticketName: payment.ticketName || "정보 없음",
      paymentAmount: payment.paymentAmount || "정보 없음",
      quantity: payment.quantity || "정보 없음",
      validFromDate: formatDate(payment.validFromDate),
      validToDate: formatDate(payment.validToDate),
      paymentDate: formatDate(payment.paymentDate),
      paymentMethod: payment.paymentMethod || "정보 없음",
      paymentStatus: paymentStatusMapping[payment.paymentStatus] || "정보 없음",
    }));

    console.log("최종 예약 정보:", reservations.value);

  } catch (error) {
    console.error("예약 및 결제 정보를 가져오는 중 오류 발생:", error);
  }
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

  // 모든 예약을 초기화 (예약 정보를 가져온 후)
  filteredReservations.value = [...reservations.value];

  // 현재 날짜 설정
  const today = new Date().toISOString().split('T')[0];
  checkInDate.value = today;
  checkOutDate.value = today;
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
                <tr class="text-bold">
                  <th>지점</th>
                  <th>테마파크명</th>
                  <th>티켓명</th>
                  <th>가격(원)</th>
                  <th>수량</th>
                  <th>사용 시작 기간</th>
                  <th>사용 종료 기간</th>
                  <th>결제 방법</th>
                  <th>결제 날짜</th>
                  <th>결제 상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="paginatedReservations.length === 0">
                  <td colspan="10" class="text-center">예약이 없습니다.</td>
                </tr>
                <tr v-else v-for="(reservation, index) in paginatedReservations" :key="index">
                  <td>{{ reservation.accommodationName || '정보 없음' }}</td>
                  <td>{{ reservation.themeParkName || '정보 없음' }}</td>
                  <td>{{ reservation.ticketName || '정보 없음' }}</td>
                  <td>{{ reservation.paymentAmount !== undefined ? reservation.paymentAmount : '정보 없음' }}</td>
                  <td>{{ reservation.quantity || '정보 없음' }}</td>
                  <td>{{ reservation.validFromDate || '정보 없음' }}</td>
                  <td>{{ reservation.validToDate || '정보 없음' }}</td>
                  <td>{{ reservation.paymentMethod || '정보 없음' }}</td>
                  <td>{{ reservation.paymentDate || '정보 없음' }}</td>
                  <td>{{ reservation.paymentStatus || '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 페이지네이션 버튼 -->
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
.custom-font {
  font-family: 'Caveat', cursive;
}

.pagination {
  margin-top: 20px;
}

.pagination-button {
  padding: 5px 10px;
  font-size: 0.7rem;
}

.pagination-button:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.pagination-button:disabled {
  border-color: #ccc;
  color: #ccc;
}
</style>