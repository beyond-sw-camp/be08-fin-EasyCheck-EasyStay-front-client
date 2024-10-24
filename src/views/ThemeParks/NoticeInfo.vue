<template>
  <div class="information-section container-fluid px-5 py-4">
    <div class="row mb-5">
      <div class="col-md-6">
        <h4 class="mb-3">문의 전화</h4>
        <div class="contact-info-box">
          <table>
            <tr>
              <span class="theme-park-name mx-2">{{ themeParkName }}</span>
              <span class="contact-number mx-2">041-939-1135</span>
            </tr>
            <tr>
              <span class="mx-2">
                관련 궁금한 사항이 있으시면 언제든지 문의해 주세요.
                <br />
              </span>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <h4 class="mb-3">유의사항</h4>
      <div class="notice-box">
        <ul>
          <li>
            2024년 정기휴장: 매달 마지막주 수요일 (단, 3월 4일~29일, 9월 4일
            휴장 / 7월, 8월, 12월 휴장 없음)
          </li>
          <li>
            2024년 공휴 및 연휴 휴장 적용일: 1월 1일, 2월 9일~12일, 3월 1일, 4월
            10일, 5월 6일, 6월 6일, 8월 15일, 9월 16일~18일, 10월 1일, 10월 9일,
            12월 25일
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue";

const props = defineProps({
  themeParkName: {
    type: String,
    required: true,
  },
});

watch(
  () => props.themeParkName,
  (newValue) => {
    console.log("Theme Park Name updated to:", newValue);
  }
);
</script>

<style scoped>
.information-section {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.theme-park-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.contact-number {
  font-size: 1.2rem;
}

.notice-box {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
