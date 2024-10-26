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
            <span>24576874</span>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered mobile-table">
              <tbody>
                <tr>
                  <th>투숙 객실</th>
                  <td>롤린 디럭스 트윈</td>
                  <th>객실 수</th>
                  <td>1실</td>
                </tr>
                <tr>
                  <th>투숙 인원</th>
                  <td>성인 2명 / 소인 0명</td>
                  <th>지점</th>
                  <td>롯데호텔부여</td>
                </tr>
                <tr>
                  <th>투숙 기간</th>
                  <td colspan="3">2024.09.21(토) - 2024.09.22(일) 1박</td>
                </tr>
                <tr>
                  <th>예약자 이름</th>
                  <td>김나현</td>
                  <th>예약자 휴대전화 번호</th>
                  <td>01054865956</td>
                </tr>
                <tr>
                  <th>대표 투숙자 이름</th>
                  <td>김나현</td>
                  <th>대표 투숙자 휴대전화 번호</th>
                  <td>01054865956</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="fw-bold">총 요금<br />(VAT 포함)</span>
            <span class="text-danger fw-bold fs-4">311,000 원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
