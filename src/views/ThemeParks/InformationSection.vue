<template>
  <div class="information-section container-fluid px-5 py-4">
    <div class="mb-5">
      <h4 class="mb-3">문의 전화</h4>
      <p>
        궁금한 사항이 있으시면 언제든지 문의해 주세요.<br />
        전화번호: <strong>02-123-4567</strong>
      </p>
    </div>
    <div class="mb-5">
      <h4 class="mb-3">유의사항</h4>
      <ul>
        <li>예약 취소는 3일 전까지 가능합니다.</li>
        <li>이용권은 본인만 사용할 수 있습니다.</li>
        <li>시설 이용 시 안전 수칙을 준수해 주세요.</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.information-section {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ccc, transparent);
  position: relative;

  &::before {
    content: "●";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: #ccc;
    padding: 0 10px;
    font-size: 0.8rem;
  }
}
</style>
