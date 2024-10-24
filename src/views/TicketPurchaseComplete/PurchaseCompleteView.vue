<template>
  <div class="purchase-complete-page">
    <div class="header-section">
      <NavbarDefault :sticky="true" />
      <div class="container text-center py-5">
        <h2 class="mb-4">구매가 완료되었습니다!</h2>
        <p class="lead">이용권과 확인 번호가 발송되었습니다.</p>
      </div>
    </div>

    <div class="purchase-info-section container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card p-4 mb-3">
            <h4 class="section-title">구매 정보</h4>
            <div class="info-table">
              <div class="info-row">
                <span class="label">지점</span>
                <span class="value">롯데리조트속초</span>
              </div>
              <div class="info-row">
                <span class="label">구매자 이름</span>
                <span class="value">윤호연</span>
              </div>
              <div class="info-row">
                <span class="label">구매자 휴대전화 번호</span>
                <span class="value">010-1234-5678</span>
              </div>
              <div class="info-row">
                <span class="label">결제 상태</span>
                <span class="value">구매 완료</span>
              </div>
              <div class="info-row">
                <span class="label">결제 일시</span>
                <span class="value">2024.10.21 16:31:00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-4 mb-3">
            <h4 class="section-title">결제 정보</h4>
            <div class="info-table">
              <div class="info-row">
                <span class="label">구매 번호</span>
                <span class="value">EH3232131</span>
              </div>
              <div class="info-row">
                <span class="label">상품명</span>
                <span class="value">속초 워터파크 종일 이용권 (비수기)</span>
              </div>
              <div class="info-row">
                <span class="label">유효 기간</span>
                <span class="value">2024.10.07 ~ 2024.12.19</span>
              </div>
              <div class="info-row">
                <span class="label">결제 금액</span>
                <span class="value">30,000원 (VAT 포함)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="coupon-info-section container my-5">
      <h4 class="section-title">쿠폰 정보</h4>
      <div class="coupon-card p-4">
        <div class="coupon-details">
          <div class="info-row">
            <span class="label">쿠폰 번호</span>
            <span class="value">OL202400056001</span>
          </div>
          <div class="info-row">
            <span class="label">이용자 휴대전화 번호</span>
            <span class="value">010-1234-5678</span>
          </div>
        </div>
        <button class="btn btn-outline-secondary">쿠폰 보기</button>
      </div>
    </div>

    <div class="notice-section container my-5">
      <h4 class="section-title">유의사항</h4>
      <div class="card p-4">
        <h5 class="desc-title">이용 안내</h5>
        <ul class="text-list">
          <li>본 테마파크 이용권은 이용 지점에 한합니다.</li>
          <li>바코드 이미지를 매표소에 제시하여 주시기 바랍니다.</li>
          <li>유효기간 내에 1회만 사용 가능합니다.</li>
          <li>워터파크 운영에 따라 정기 휴장일은 변동 될 수 있습니다.</li>
        </ul>
        <h5 class="desc-title">취소 및 환불 규정 안내</h5>
        <ul class="text-list">
          <li>
            이용권 사용 전 홈페이지 내에서 결제 취소 버튼을 클릭하여 자동으로
            취소 가능합니다.
          </li>
          <li>테마파크 이용권 취소/환불 문의: 033-634-1330, 1334</li>
        </ul>
      </div>
    </div>

    <div class="map-section container my-5">
      <h4 class="section-title">오시는 길 안내</h4>
      <div class="card p-4">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3752147292924!2d128.59165261558714!3d37.98859897972124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5fbb739414da5f23%3A0x9482d3ba411d2cb2!2z67O07J207Yq47JqUIOyDiOuvuOyLoCDtmLjrpr3si5wgMTg2!5e0!3m2!1sko!2skr!4v1675418854032!5m2!1sko!2skr"
            width="100%"
            height="300"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
</script>

<style scoped>
.purchase-complete-page {
  font-family: Arial, sans-serif;
}

.header-section {
  background-image: url("your-background-image-url.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 60px 0;
  text-align: center;
}

.section-title {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.info-table {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #555;
}

.coupon-info-section {
  text-align: center;
}

.coupon-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.notice-section {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

.text-list {
  list-style-type: disc;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.map-container {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  height: 0;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
