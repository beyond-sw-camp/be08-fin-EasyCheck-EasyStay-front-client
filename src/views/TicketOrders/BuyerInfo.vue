<template>
  <div class="card p-4 mb-5">
    <h4 class="mb-3">구매자 정보</h4>
    <div class="field-box">
      <fieldset class="input-fieldset">
        <legend class="sr-only">정보 입력</legend>
        <div class="grid-area-2x2">
          <div class="form-group">
            <label for="buyerName">구매자 이름</label>
            <div class="input-group input-lg">
              <MaterialInput
                class="input-group-outline"
                placeholder="구매자 이름"
                size="lg"
                v-model="buyerName"
                :readonly="isLoggedIn"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="buyerPhone">휴대전화 번호</label>
            <div class="input-group input-lg">
              <MaterialInput
                class="input-group-outline"
                placeholder="휴대전화 번호"
                size="lg"
                v-model="buyerPhone"
                :readonly="isLoggedIn"
              />
            </div>
          </div>

          <div class="form-group email-group">
            <label for="buyerEmail">이메일 (선택)</label>
            <div class="input-group input-lg d-flex align-items-center">
              <MaterialInput
                class="input-group-outline"
                placeholder="이메일 아이디"
                size="lg"
                v-model="buyerEmail"
                :readonly="isLoggedIn"
                style="flex: 1"
              />
              <span class="input-group-add mx-1">@</span>
              <MaterialInput
                class="input-group-outline"
                placeholder="이메일 도메인"
                size="lg"
                v-model="buyerEmailDomain"
                :readonly="isLoggedIn"
                style="flex: 1"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";

const props = defineProps({
  buyerName: String,
  buyerPhone: String,
  buyerEmail: String,
  buyerEmailDomain: String,
  isLoggedIn: Boolean,
});

const emit = defineEmits();

const buyerName = ref(props.buyerName);
const buyerPhone = ref(props.buyerPhone);
const buyerEmail = ref(props.buyerEmail);
const buyerEmailDomain = ref(props.buyerEmailDomain);

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
</style>
