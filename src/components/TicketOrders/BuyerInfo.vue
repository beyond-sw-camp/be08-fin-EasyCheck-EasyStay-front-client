<template>
  <div class="card p-4 mb-5">
    <h4 class="mb-3">구매자 정보</h4>
    <div class="field-box">
      <fieldset class="input-fieldset">
        <legend class="sr-only">정보 입력</legend>
        <div class="grid-area-2x2">
          <!-- 구매자 이름 -->
          <div class="form-group">
            <label for="buyerName">구매자 이름</label>
            <div class="input-group input-lg">
              <input
                type="text"
                id="buyerName"
                class="input-group-outline form-control"
                placeholder="구매자 이름"
                v-model="buyerName"
              />
            </div>
            <span v-if="!isBuyerNameValid" class="error-message">
              이름을 입력해 주세요.
            </span>
          </div>

          <!-- 휴대전화 번호 -->
          <div class="form-group">
            <label for="buyerPhone">휴대전화 번호</label>
            <div class="input-group input-lg">
              <input
                type="tel"
                id="buyerPhone"
                class="input-group-outline form-control"
                placeholder="휴대전화 번호"
                v-model="buyerPhone"
              />
            </div>
            <span v-if="!isBuyerPhoneValid" class="error-message">
              올바른 휴대전화 번호를 입력해 주세요.
            </span>
          </div>

          <!-- 이메일 입력 -->
          <div class="form-group email-group">
            <label for="buyerEmail">이메일</label>
            <div class="input-group input-lg d-flex align-items-center">
              <input
                type="text"
                id="buyerEmail"
                class="input-group-outline form-control"
                placeholder="이메일 아이디"
                v-model="buyerEmail"
                style="flex: 1"
              />
              <span class="input-group-add mx-1">@</span>
              <input
                type="text"
                id="buyerEmailDomain"
                class="input-group-outline form-control"
                placeholder="이메일 도메인"
                v-model="buyerEmailDomain"
                style="flex: 1"
              />
            </div>
            <span v-if="!isEmailValid" class="error-message">
              유효한 이메일 주소를 입력해 주세요.
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from "vue";

const props = defineProps({
  buyerName: String,
  buyerPhone: String,
  buyerEmail: String,
  buyerEmailDomain: String,
});

const emit = defineEmits([
  "update:buyerName",
  "update:buyerPhone",
  "update:buyerEmail",
  "update:buyerEmailDomain",
]);

// 참조 변수 설정
const buyerName = ref(props.buyerName || "");
const buyerPhone = ref(props.buyerPhone || "");
const buyerEmail = ref(props.buyerEmail || "");
const buyerEmailDomain = ref(props.buyerEmailDomain || "");

// 유효성 검사
const isBuyerNameValid = computed(() => buyerName.value.trim() !== "");
const isBuyerPhoneValid = computed(() => /^\d{10,11}$/.test(buyerPhone.value));
const isEmailValid = computed(() => {
  const email = `${buyerEmail.value.trim()}@${buyerEmailDomain.value.trim()}`;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
});

// 변경 사항을 부모에 emit
watch(buyerName, (newValue) => emit("update:buyerName", newValue));
watch(buyerPhone, (newValue) => emit("update:buyerPhone", newValue));
watch(buyerEmail, (newValue) => emit("update:buyerEmail", newValue));
watch(buyerEmailDomain, (newValue) =>
  emit("update:buyerEmailDomain", newValue)
);
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.grid-area-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
}

.form-group {
  position: relative;
}

.input-group-outline {
  border: 2px solid #ced4da;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-group-outline:focus {
  border-color: #007bff;
  outline: none;
}

.input-group-add {
  font-size: 1rem;
  align-self: center;
}

.error-message {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
</style>
