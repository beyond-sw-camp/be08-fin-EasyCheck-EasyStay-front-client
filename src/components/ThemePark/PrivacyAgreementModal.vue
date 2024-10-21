<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">&times;</button>
      <h2>{{ type }} 개인정보 수집 및 이용동의</h2>
      <p v-if="type === '필수'">
        1. 개인정보의 수집·이용 목적<br />
        - 테마파크 예약 및 재방문 서비스 제공<br /><br />
        2. 수집하는 개인정보의 항목<br />
        - 필수사항: 구매자정보 (이름, 휴대전화번호), 이용자정보 (이름, 휴대전화번호, 선물하기 서비스 이용 시)<br /><br />
        3. 개인정보의 보유·이용 기간<br />
        - 1년 (예약 취소시 취소 후 5일 이내 파기)<br />
        - 결제데이터는 전자상거래 등에서의 소비자보호에 관한 법률 시행령 제 6조에 따라 결제 시도 후 5년간 보관됩니다.<br /><br />
        동의를 거부할 수 있으나, 동의가 없는 경우 테마파크 이용자 확인 및 테마파크 예약 내용의 이메일 확인 서비스가 어려울 수 있음을 알려드립니다.
      </p>
      <p v-if="type === '선택'">
        1. 개인정보의 수집·이용 목적<br />
        - 테마파크 예약 및 재방문 서비스 제공<br /><br />
        2. 수집하는 개인정보의 항목<br />
        - 선택사항: 구매자 이메일<br /><br />
        3. 개인정보의 보유·이용 기간<br />
        - 1년 (예약 취소시 취소 후 5일 이내 파기)<br />
        - 결제데이터는 전자상거래 등에서의 소비자보호에 관한 법률 시행령 제 6조에 따라 결제 시도 후 5년간 보관됩니다.<br /><br />
        동의를 거부할 수 있으나, 동의가 없는 경우 테마파크 이용자 확인 및 테마파크 예약 내용의 이메일 확인 서비스가 어려울 수 있음을 알려드립니다.
      </p>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">취소</button>
        <button class="btn btn-primary" @click="agree">동의</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "agree"]);

const closeModal = () => {
  emit("close");
};

const agree = () => {
  emit("agree");
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
