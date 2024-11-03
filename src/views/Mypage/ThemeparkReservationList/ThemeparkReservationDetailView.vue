<script setup>
import { ref, onMounted } from "vue";
import { userLoginStore } from '@/stores/loginStore';
import { useTicketPaymentStore } from "@/stores/ticketpaymentStore";
import { useRoute, useRouter } from "vue-router";
import { refundPayment } from "@/components/Payment/TicketPayment.vue";

import KakaoMap from "@/components/map/KakaoMap.vue";

import Header from "@/examples/Header.vue";

import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
  fetchTicketOrdersWithDetails();
});

const userStore = userLoginStore();
const paymentStore = useTicketPaymentStore();
const router = useRouter();
const route = useRoute();

// 상태 변수
const reservations = ref([]);
const filteredReservations = ref([]);
const orderParamId = route.params.id;

const centerCoordinate = ref({
  lat: 37.4972146715141,
  lng: 126.927607128836
});

// 결제 상태 값 매핑
const paymentStatusMapping = {
  COMPLETED: "결제 완료",
  INCOMPLETE: "결제 미완료",
  REFUNDED: "환불 완료",
};

// 결제 방법 값 매핑
const paymentMethodMapping = {
  vbank: "무통장 입금",
  card: "카드",
};

// 'YYYY-MM-DD' 형식으로 변환
const formatDate = (dateString) => {
  if (!dateString) {
    console.error("유효하지 않은 날짜 값:", dateString);
    return "정보 없음"; // 기본값 반환
  }

  const date = new Date(dateString);

  // 날짜 유효성 검사
  if (isNaN(date.getTime())) {
    console.error("유효하지 않은 날짜 값:", dateString);
    return "정보 없음"; // 기본값 반환
  }

  return date.toISOString().split('T')[0];
};

// 예약 내역 조회
const fetchTicketOrdersWithDetails = async () => {
  try {
    await userStore.getUserData();
    const userId = userStore.userData.id;
    const userName = userStore.userData.name;
    const userPhone = userStore.userData.phone;

    await paymentStore.getAllTicketPayments();
    const allPayments = paymentStore.payments.filter(payment => payment.userId === userId);

    console.log("payments: ", allPayments);

    reservations.value = allPayments.map(payment => {
      return {
        paymentId: payment.id,
        orderId: payment.orderId,
        impUid: payment.impUid,

        // 예약 정보
        status: paymentStatusMapping[payment.paymentStatus] || "정보 없음",
        reservationDate: formatDate(payment.paymentDate) || "정보 없음",
        accommodationName: payment.accommodationName || "정보 없음",
        themeparkName: payment.themeParkName,
        ticketName: payment.ticketName || "정보 없음",
        validFromDate: formatDate(payment.validFromDate),
        validToDate: formatDate(payment.validToDate),
        quantity: payment.quantity,

        // 결제 정보
        method: paymentMethodMapping[payment.paymentMethod] || "정보 없음",
        paymentDate: formatDate(payment.paymentDate),
        paymentStatus: paymentStatusMapping[payment.paymentStatus] || "정보 없음",
        price: payment.paymentAmount,

        // 결제자 정보
        userName: userName || "정보 없음",
        userPhone: userPhone || "정보 없음"
      };
    });

    filteredReservations.value = [...reservations.value];
    console.log("최종 예약 정보:", reservations.value);

  } catch (error) {
    console.error("예약 및 결제 정보를 가져오는 중 오류 발생:", error);
  }
};

// 환불
const handleRefund = async () => {
  const reservationsToRefund = reservations.value.filter(res => String(res.orderId) === String(orderParamId));
  console.log("찾은 예약 정보:", reservationsToRefund);

  const confirmation = confirm("정말 환불하시겠습니까?");

  if (!confirmation) {
    return;
  }

  try {
    if (reservationsToRefund.length === 0) {
      alert("환불할 예약이 없습니다.");
      return;
    }

    const paymentId = reservationsToRefund[0].paymentId;
    const impUid = reservationsToRefund[0].impUid;

    console.log(paymentId);
    console.log(impUid);

    // 환불 함수 호출
    await refundPayment(paymentId, impUid);
    router.push("/users/themeparkReservationLists");

  } catch (error) {
    console.error("환불 처리 중 오류 발생:", error);
    alert("환불 처리 중 오류가 발생했습니다.");
  }
};
</script>

<template>
  <Header class="content mt-4">
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">예약 상세내역</h2>
              <h5 class="text-black-50 fw-normal mt-4">예약 변경 및 예약 취소 시 위약금 또는 패널티가 부과될 수 있습니다.</h5>
            </div>
          </div>
        </div>

        <div class="tables-container">
          <div class="reservation-table">
            <h4 class="text-left">예약 정보</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">예약 상태</th>
                  <td>{{ reservations[0]?.status || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">예약 날짜</th>
                  <td>{{ reservations[0]?.reservationDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">예약 지점</th>
                  <td>{{ reservations[0]?.accommodationName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">테마파크명</th>
                  <td>{{ reservations[0]?.themeparkName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">티켓명</th>
                  <td>{{ reservations[0]?.ticketName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">사용 시작 기간</th>
                  <td>{{ reservations[0]?.validFromDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">사용 종료 기간</th>
                  <td>{{ reservations[0]?.validToDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">수량</th>
                  <td>{{ reservations[0]?.quantity || '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="payment-table">
            <h4 class="text-left">결제 정보</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">결제 방법</th>
                  <td>{{ reservations[0]?.method || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">결제 날짜</th>
                  <td>{{ reservations[0]?.paymentDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">결제 상태</th>
                  <td>{{ reservations[0]?.paymentStatus || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">총 가격</th>
                  <td>{{ reservations[0]?.price || '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>

            <h4 class="text-left mt-5">결제자 정보</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">이름</th>
                  <td>{{ reservations[0]?.userName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">전화번호</th>
                  <td>{{ reservations[0]?.userPhone || '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <!-- 유의사항 및 요금 정책 -->
        <div class="notice-section mt-5">
          <h4 class="mb-4">유의사항</h4>

          <h6>요금 정책</h6>
          <ul>
            <li>모든 요금에는 세금과 봉사료가 포함되어 있습니다.</li>
            <li>티켓 요금은 성인, 아동, 노인에 따라 달라질 수 있으며, 특정 시즌에 따라 변동이 있을 수 있습니다.</li>
            <li>티켓 구매 후, 취소 및 환불 정책을 꼭 확인하시기 바랍니다.</li>
          </ul>

          <h6>입장 안내</h6>
          <ul>
            <li>입장은 오전 9시부터 가능합니다.</li>
            <li>주말 및 공휴일에는 대기 시간이 발생할 수 있으니, 여유 있게 방문하시기 바랍니다.</li>
            <li>입장권은 사전예약 없이 현장 매표소에도 구입하실 수 있습니다.</li>
            <li>입장 후 1시간 이내 요청 시 환불 가능합니다.</li>
          </ul>
        </div>

        <!-- 예약 취소 버튼 -->
        <div class="cancel-button-container mb-5">
          <button class="btn btn-danger" @click="handleRefund">예약 취소</button>
        </div>

        <h4>오시는 길 안내</h4>
        <div class="col-lg-10 col-md-8 col-12 mb-5" style="height: 500px; width: 100%;">
          <KakaoMap :lat="centerCoordinate.lat" :lng="centerCoordinate.lng" :draggable="true" />
        </div>
      </div>
    </div>
  </Header>
</template>


<style scoped>
.tables-container {
  display: flex;
  gap: 20px;
  /* 테이블 간의 간격 */
  align-items: stretch;
}

.reservation-table,
.payment-table {
  flex: 1;
  /* 각 테이블이 남은 공간을 균등하게 차지하도록 설정 */
}

.table {
  width: 40%;
  border-collapse: collapse;
  /* 경계 겹침 방지 */
  margin-bottom: 20px;
}

/* 모든 셀의 하단 경계 설정 */
.table th,
.table td {
  padding: 8px;
  /* 셀 패딩 추가 */
  text-align: left;
  /* 텍스트 왼쪽 정렬 */
  border-bottom: 1px solid #ddd;
  /* 기본적으로 연한 가로선 추가 */
}

/* 헤더 스타일 */
.table th {
  background-color: #f2f2f2;
  /* 헤더 배경 색상 설정 */
}

/* 모든 열의 첫 번째 셀에 대한 상단 경계 추가 */
.table tr:first-child th {
  border-top: 1px solid #423e3e;
  /* 첫 번째 행의 모든 헤더 두껍게 설정 */
}

.table tr:first-child td {
  border-top: 1px solid #423e3e;
  /* 첫 번째 행의 모든 데이터 셀 두껍게 설정 */
}

/* 외곽 세로선 제거 */
.table {
  border-left: none;
  /* 왼쪽 외곽선 제거 */
  border-right: none;
  /* 오른쪽 외곽선 제거 */
}

/* 나머지 세로선 연하게 설정 */
.table th,
.table td {
  border-right: 1px solid #ddd;
  /* 연한 세로선 추가 */
}

.table td:last-child,
.table th:last-child {
  border-right: none;
  /* 마지막 열의 세로선 제거 */
}

/* 첫 번째 셀의 하단 테두리 제거 */
.table tr:last-child td {
  border-bottom: none;
  /* 마지막 행의 셀 하단 경계 제거 */
}

.content {
  padding-top: 60px;
  /* 헤더 높이에 맞춰 조정 */
}

.cancel-button-container {
  display: flex;
  justify-content: center;
  /* 오른쪽으로 정렬 */
  margin-top: 20px;
  /* 필요에 따라 여백 조정 */
}
</style>
