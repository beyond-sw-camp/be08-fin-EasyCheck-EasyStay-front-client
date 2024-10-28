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
                v-model="localFormData.buyerName"
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
                v-model="localFormData.buyerPhone"
                :readonly="isLoggedIn"
              />
            </div>
          </div>

          <div class="form-group email-group">
            <label for="buyerEmail">이메일</label>
            <div class="input-group input-lg d-flex align-items-center">
              <MaterialInput
                class="input-group-outline"
                placeholder="이메일 아이디"
                size="lg"
                v-model="localFormData.buyerEmail"
                :readonly="isLoggedIn"
                style="flex: 1"
              />
              <span class="input-group-add mx-1">@</span>
              <MaterialInput
                class="input-group-outline"
                placeholder="이메일 도메인"
                size="lg"
                v-model="localFormData.buyerEmailDomain"
                :readonly="isLoggedIn"
                style="flex: 1"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>

    <h4 class="desc-title mt-4">취소 및 환불 규정 안내</h4>
    <div class="form-check-group">
      <div class="form-check">
        <input
          type="checkbox"
          id="terms1"
          v-model="localFormData.termsChecked1"
          class="form-check-input"
          required
        />
        <label for="terms1" class="form-check-label">
          (필수) 개인정보 수집 및 이용동의
          <a class="text-line" @click.prevent="openModal('필수')">전문보기</a>
        </label>
      </div>
      <div class="form-check">
        <input
          type="checkbox"
          id="terms2"
          v-model="localFormData.termsChecked2"
          class="form-check-input"
        />
        <label for="terms2" class="form-check-label">
          (선택) 개인정보 수집 및 이용동의
          <a class="text-line" @click.prevent="openModal('선택')">전문보기</a>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useAttrs } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";

const attrs = useAttrs();
const localFormData = reactive({ ...attrs.modelValue });
const isLoggedIn = attrs.isLoggedIn || false;

watch(
  () => localFormData,
  (newValue) => {
    attrs["onUpdate:modelValue"](newValue);
  },
  { deep: true }
);

const openModal = (type) => {
  attrs["onOpenModal"](type);
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

.form-check-label {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0;
}

.text-line {
  text-decoration: underline;
}

.desc-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
}
</style>
