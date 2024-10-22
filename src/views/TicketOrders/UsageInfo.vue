<template>
  <div class="card p-4 mb-5 w-max">
    <h4 class="note-title">유의사항</h4>
    <h4 class="desc-title">이용 안내</h4>
    <ul class="text-list">
      <li>본 테마파크 이용권은 이용 지점에 한합니다.</li>
      <li>바코드 이미지를 매표소에 제시하여 주시기 바랍니다.</li>
      <li>유효기간 내에 1회만 사용 가능합니다.</li>
      <li>워터파크 운영에 따라 정기 휴장일은 변동 될 수 있습니다.</li>
    </ul>
    <br />
    <h4 class="desc-title">취소 및 환불 규정 안내</h4>
    <ul class="text-list">
      <li>
        취소는 이용권 사용 전, 홈페이지 내에서 결제 취소 버튼을 클릭하시면
        자동으로 취소 및 환불 요청됩니다.
      </li>
      <li>테마파크 이용권 취소/환불 문의: 033-634-1330,1334</li>
    </ul>
    <div class="form-check-group">
      <div class="form-check">
        <input
          type="checkbox"
          id="terms1"
          :checked="termsChecked1"
          @change="$emit('update:termsChecked1', $event.target.checked)"
          class="form-check-input"
          required
        />
        <label for="terms1" class="form-check-label">
          (필수) 개인정보 수집 및 이용동의
          <a class="text-line" @click.prevent="$emit('openModal', '필수')"
            >전문보기</a
          >
        </label>
      </div>
      <div class="form-check">
        <input
          type="checkbox"
          id="terms2"
          :checked="termsChecked2"
          @change="$emit('update:termsChecked2', $event.target.checked)"
          class="form-check-input"
        />
        <label for="terms2" class="form-check-label">
          (선택) 개인정보 수집 및 이용동의
          <a class="text-line" @click.prevent="$emit('openModal', '선택')"
            >전문보기</a
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  termsChecked1: Boolean,
  termsChecked2: Boolean,
});
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.note-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.desc-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
}

.text-list {
  list-style-type: disc;
  margin-left: 1rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.form-check-group {
  display: flex;
  gap: 2rem;
  margin-top: 0.6rem;
  align-items: flex-start;
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-top: 0;
  margin-right: 0.5rem;
  transform: translateY(1px);
}
.form-check:not(.form-switch) .form-check-input[type="checkbox"] {
  margin-top: 0;
}

.form-check-label {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0;
}
.text-line {
  text-decoration: underline;
}
</style>
