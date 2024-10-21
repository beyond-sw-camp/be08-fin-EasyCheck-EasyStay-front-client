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
                :value="buyerName"
                @input="$emit('update:buyerName', $event)"
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
                :value="buyerPhone"
                @input="$emit('update:buyerPhone', $event)"
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
                :value="buyerEmail"
                @input="$emit('update:buyerEmail', $event)"
                style="flex: 1"
              />
              <span class="input-group-add mx-1">@</span>
              <MaterialInput
                class="input-group-outline"
                placeholder="이메일 도메인"
                size="lg"
                :value="buyerEmailDomain"
                @input="$emit('update:buyerEmailDomain', $event)"
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
import { defineProps } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";

const props = defineProps({
  buyerName: String,
  buyerPhone: String,
  buyerEmail: String,
  buyerEmailDomain: String,
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