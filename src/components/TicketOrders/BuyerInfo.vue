<template>
  <div class="card p-4 mb-5">
    <div class="d-flex justify-content-between">
      <h4 class="mb-3">구매자 정보</h4>
      <div class="form-check">
        <input type="checkbox" id="sameAsReservation" v-model="sameAsReservation" @change="copyReservationInfo"
          class="form-check-input" />
        <label for="sameAsReservation" class="form-check-label">예약자 정보와 동일</label>
      </div>
    </div>
    <div class="field-box">
      <fieldset class="input-fieldset">
        <legend class="sr-only">정보 입력</legend>
        <div class="grid-area-2x2">
          <div class="form-group">
            <label for="buyerName">구매자 이름</label>
            <div class="input-group input-lg">
              <MaterialInput class="input-group-outline" placeholder="구매자 이름" size="lg" v-model="buyerName"
                :readonly="isLoggedIn" />
            </div>
            <span v-if="!isBuyerNameValid" class="error-message">
              이름을 입력해 주세요.
            </span>
          </div>

          <div class="form-group">
            <label for="buyerPhone">휴대전화 번호</label>
            <div class="input-group input-lg">
              <MaterialInput class="input-group-outline" placeholder="휴대전화 번호" size="lg" v-model="buyerPhone"
                :readonly="isLoggedIn" />
            </div>
            <span v-if="!isBuyerPhoneValid" class="error-message">
              올바른 휴대전화 번호를 입력해 주세요.
            </span>
          </div>

          <div class="form-group email-group">
            <label for="buyerEmail">이메일</label>
            <div class="input-group input-lg d-flex align-items-center">
              <MaterialInput class="input-group-outline" placeholder="이메일 아이디" size="lg" v-model="buyerEmail"
                :readonly="isLoggedIn" style="flex: 1" />
              <span class="input-group-add mx-1">@</span>
              <MaterialInput class="input-group-outline" placeholder="이메일 도메인" size="lg" v-model="buyerEmailDomain"
                :readonly="isLoggedIn" style="flex: 1" />
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
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/MaterialInput.vue";

const props = defineProps({
  buyerName: String,
  buyerPhone: String,
  buyerEmail: String,
  buyerEmailDomain: String,
  isLoggedIn: Boolean,
});

const emit = defineEmits([
  "update:buyerName",
  "update:buyerPhone",
  "update:buyerEmail",
  "update:buyerEmailDomain",
]);

const userStore = userLoginStore();

const { userInfo, email, domain } = storeToRefs(userStore)

const buyerName = ref(props.buyerName);
const buyerPhone = ref(props.buyerPhone);
const buyerEmail = ref(props.buyerEmail);
const buyerEmailDomain = ref(props.buyerEmailDomain);
const sameAsReservation = ref(false);

// 유효성 검사를 위한 computed properties
const isBuyerNameValid = computed(() => buyerName.value.trim() !== "");
const isBuyerPhoneValid = computed(() => /^\d{10,11}$/.test(buyerPhone.value)); // 10자리 또는 11자리의 숫자만 허용
const isEmailValid = computed(() => {
  const email = `${buyerEmail.value.trim()}@${buyerEmailDomain.value.trim()}`;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
});

watch(buyerName, (newValue) => {
  emit("update:buyerName", newValue);
});
watch(buyerPhone, (newValue) => {
  emit("update:buyerPhone", newValue);
});
watch(buyerEmail, (newValue) => {
  emit("update:buyerEmail", newValue);
});
watch(buyerEmailDomain, (newValue) => {
  emit("update:buyerEmailDomain", newValue);
});

const copyReservationInfo = () => {
  if (sameAsReservation.value) {
    buyerName.value = userInfo.value?.name || "";
    buyerPhone.value = userInfo.value?.phone || "";
    buyerEmail.value = email.value || ""; // 이메일 아이디 부분을 할당
    buyerEmailDomain.value = domain.value || ""; // 이메일 도메인 부분을 할당
  } else {
    buyerName.value = "";
    buyerPhone.value = "";
    buyerEmail.value = "";
    buyerEmailDomain.value = "";
  }
};
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
