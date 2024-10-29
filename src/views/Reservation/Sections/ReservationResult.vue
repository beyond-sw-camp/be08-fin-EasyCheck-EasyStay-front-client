<template>
  <div class="reservation-result pb-7">
    <h1 class="text-center text-white mb-4">예약이 완료되었습니다.</h1>
    <p class="text-center text-white">
      입력하신 대표 투숙자 휴대전화 번호와 이메일 주소로 예약 확정 내용이
      발송되었습니다.<br />
      (단, 이메일 주소는 선택 입력 사항으로 선택하신 고객에 한해 예약 확정
      메일이 발송됩니다.)
    </p>
    <div class="container">
      <div class="card mt-5">
        <div class="card-header bg-light d-flex justify-content-between">
          <span>예약 구분</span>
          <span>예약번호</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3">
            <span>객실 예약</span>
            <span>{{ reservation?.id }}</span>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered mobile-table">
              <tbody>
                <tr>
                  <th>투숙 객실</th>
                  <td>
                    {{ reservation?.typeName }} {{ reservation?.roomName }}
                  </td>
                  <th>객실 수</th>
                  <td>{{ reservation?.totalRoomCount }}실</td>
                </tr>
                <tr>
                  <th>투숙 인원</th>
                  <td>
                    성인 {{ reservation?.adultCount }}명 / 소인
                    {{ reservation?.childCount }}명
                  </td>
                  <th>지점</th>
                  <td>{{ reservation?.accommodationName }}</td>
                </tr>
                <tr>
                  <th>투숙 기간</th>
                  <td colspan="3">
                    {{ reservation?.checkinDate }} -
                    {{ reservation?.checkoutDate }}
                    {{
                      Math.floor(
                        (new Date(reservation?.checkoutDate) -
                          new Date(reservation?.checkinDate)) /
                          (1000 * 60 * 60 * 24)
                      )
                    }}박
                  </td>
                </tr>
                <tr>
                  <th>예약자 이름</th>
                  <td>{{ reservation?.userName }}</td>
                  <th>예약자 휴대전화 번호</th>
                  <td>{{ reservation?.userPhone }}</td>
                </tr>
                <tr>
                  <th>대표 투숙자 이름</th>
                  <td>{{ reservation?.representativeName }}</td>
                  <th>대표 투숙자 휴대전화 번호</th>
                  <td>{{ reservation?.representativePhone }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="fw-bold">총 요금<br />(VAT 포함)</span>
            <span class="text-danger fw-bold fs-4"
              >{{ reservation?.totalPrice }} 원</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useReservationStore } from "@/stores/reservationStore";

const reservationStore = useReservationStore();

const { reservationResult: reservation } = storeToRefs(reservationStore);
</script>

<style lang="scss" scoped>
.reservation-result {
  background-image: url("@/assets/img/dg1.jpg");
}
.reservation-confirmation {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.navbar {
  background-color: #003366 !important;
}

.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table th {
  width: 25%;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .mobile-table {
    display: block;
    width: 100%;

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      border: 1px solid #dee2e6;
    }

    th,
    td {
      display: block;
      width: 50%;
      border: none;
      border-bottom: 1px solid #dee2e6;

      &:last-child,
      &:nth-last-child(2) {
        border-bottom: none;
      }
    }

    td[colspan="3"] {
      width: 100%;
    }
  }
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
