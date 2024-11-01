<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { userLoginStore } from '@/stores/loginStore';
import { usePaymentStore } from "@/stores/paymentStore";
import { useReservationStore } from "@/stores/reservationStore";
import { useRoute } from "vue-router";
import { refundPayment } from "@/components/Payment/Payment.vue";

import KakaoMap from "@/components/map/KakaoMap.vue";

import Header from "@/examples/Header.vue";

import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
  fetchReservationsWithDetails();
});

const userStore = userLoginStore();
const paymentStore = usePaymentStore();
const reservationStore = useReservationStore();
const router = useRouter();
// 상태 변수
const reservations = ref([]);
const filteredReservations = ref([]);

const centerCoordinate = ref({
  lat: 37.4972146715141,
  lng: 126.927607128836
});

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

    await paymentStore.fetchAllPayments();
    const allPayments = paymentStore.payments.filter(payment => payment.userId === userId);

    await reservationStore.fetchReservationRoomLists();
    const allReservations = reservationStore.reservations;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    reservations.value = allPayments.map(payment => {
      const reservation = allReservations.find(res => res.id === payment.reservationRoomId);

      return {
        ...reservation,
        reservationId: payment.reservationRoomId,
        impUid: payment.impUid,
        completionStatus: paymentStatusMapping[payment.completionStatus] || "정보 없음",
        reservationDate: formatDate(payment.paymentDate),
        accommodationName: payment.accommodationName || "정보 없음",
        typeName: reservation ? reservation.typeName : "정보 없음",
        checkinDate: formatDate(payment.checkinDate),
        checkoutDate: formatDate(payment.checkoutDate),
        roomCount: reservation ? reservation.totalRoomCount : 0,
        adult: reservation ? reservation.adultCount : 0,
        child: reservation ? reservation.childCount : 0,
        paymentMethod: paymentStatusMapping[payment.completionStatus],
        // 결제자 이름, 전화번호
        userName: reservation ? reservation.userName : "정보 없음",
        userPhone: reservation ? reservation.userPhone : "정보 없음",
        // 투숙자 이름, 전화번호
        representativeName: reservation ? reservation.userName : "정보 없음",
        representativePhone: reservation ? reservation.userPhone : "정보 없음"
      };
    });


    filteredReservations.value = [...reservations.value];
    console.log("최종 예약 정보:", reservations.value);

  } catch (error) {
    console.error("예약 및 결제 정보를 가져오는 중 오류 발생:", error);
  }
};

const route = useRoute();
const orderId = ref(route.params.id); // 예약 ID를 저장할 ref (이 값을 페이지에서 가져오세요)

const handleRefund = async () => {
  if (reservations.value.length === 0) {
    alert("예약 정보가 없습니다.");
    return;
  }

  // 현재 예약 정보를 가져오는 방식
  const reservationId = reservations.value[0]?.reservationId; // 예시로 첫 번째 예약의 reservationId를 사용
  const reservation = reservations.value.find(res => res.reservationId === reservationId); // reservationId로 예약 정보 찾기

  if (!reservation || !reservation.impUid) {
    alert("유효한 결제 정보를 찾을 수 없습니다.");
    return;
  }

  const confirmRefund = confirm("정말 환불하시겠습니까?");
  if (!confirmRefund) {
    return; // 사용자가 취소를 선택하면 함수 종료
  }

  try {
    await refundPayment(reservation.id, reservation.impUid); // reservationId와 impUid 사용
    alert('정상적으로 환불되었습니다.');
    await reservationStore.fetchReservationRoomLists(); // 예약 목록 새로 고침
    router.push("/users/roomReservationLists");
  } catch (error) {
    console.error("환불 처리 중 오류 발생:", error);
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
                  <td>{{ reservations[0]?.completionStatus || '정보 없음' }}</td>
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
                  <th scope="row">객실 이름</th>
                  <td>{{ reservations[0]?.typeName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">체크인</th>
                  <td>{{ reservations[0]?.checkinDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">체크아웃</th>
                  <td>{{ reservations[0]?.checkoutDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">객실 수</th>
                  <td>{{ reservations[0]?.roomCount || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">투숙 인원</th>
                  <td>{{ reservations[0]?.adult || 0 }}명 (성인), {{ reservations[0]?.child || 0 }}명 (어린이)</td>
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
                  <td>{{ reservations[0]?.paymentMethod || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">결제 날짜</th>
                  <td>{{ reservations[0]?.reservationDate || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">결제 상태</th>
                  <td>{{ reservations[0]?.completionStatus || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">총 가격</th>
                  <td>{{ reservations[0]?.totalPrice || '정보 없음' }}</td>
                </tr>
              </tbody>
            </table>

            <h4 class="text-left mt-5">예약자 정보</h4>
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

            <h4 class="text-left mt-5">투숙자 정보</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">이름</th>
                  <td>{{ reservations[0]?.representativeName || '정보 없음' }}</td>
                </tr>
                <tr>
                  <th scope="row">전화번호</th>
                  <td>{{ reservations[0]?.representativePhone || '정보 없음' }}</td>
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
            <li>객실 요금은 현장에서 투숙자 정보에 따라 달라질 수 있습니다.</li>
          </ul>

          <h6>취소 규정</h6>
          <ul>
            <li>예약 취소는 위약금 부과 기간 전까지 가능합니다. 체크인 7일 전(한국시간)까지 가능하나, 체크인 6일 전부터 위약금 및 페널티가 부과됩니다. 자세한 내용은 '예약 규정 확인 및 동의'를
              통해 확인해주세요.</li>
            <li>예약 변경은 위약금 또는 페널티 부과 기간 전까지 가능합니다. 체크인 6일 이내 변경 시 투숙자 정보만 변경하실 수 있습니다. 이후 예약 취소 및 변경을 희망하시는 경우, 각 지점의
              예약실로 문의해주시길 바랍니다.</li>
            <li>예약하신 일자에 체크인이 되지 않거나 또는 위의 지정 시간 이후에 예약을 취소했을 경우에는 노-쇼(No-Show)처리 되며, 이에 따른 위약금 및 페널티가 부과됩니다.</li>
          </ul>

          <h6>체크인 안내</h6>
          <ul>
            <li>일반 객실: 15시(오후 3시)부터 가능하며, 밤 10시 이후 입실 시 반드시 사전 연락하여 주시길 바랍니다.</li>
          </ul>

          <!-- 예약 취소 버튼 -->
          <div class="cancel-button-container mb-5">
            <button class="btn btn-danger" @click="handleRefund">환불하기</button>
          </div>


          <h4>오시는 길 안내</h4>
          <div class="col-lg-10 col-md-8 col-12 mb-5" style="height: 500px; width: 100%;">
            <KakaoMap :lat="centerCoordinate.lat" :lng="centerCoordinate.lng" :draggable="true" />
          </div>
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
