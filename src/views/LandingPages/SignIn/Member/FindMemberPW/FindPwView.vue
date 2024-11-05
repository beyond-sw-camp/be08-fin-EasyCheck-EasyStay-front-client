<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

const router = useRouter();
const loginStore = userLoginStore();

const newPassword = ref(loginStore.pwData.newPassword);
const confirmPassword = ref(loginStore.pwData.confirmPassword);

const resetPassword = async () => {
  const { email, phone } = loginStore.pwData;
  console.log("Sending data:", { email, phone, newPassword: newPassword.value, confirmPassword: confirmPassword.value });

  if (newPassword.value !== confirmPassword.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await loginStore.resetPassword(
      email,
      phone,
      newPassword.value,
      confirmPassword.value
    );
    console.log("Response from API:", response);
    alert("비밀번호가 성공적으로 재설정되었습니다.");
    router.push('/users/pwComplete');
  } catch (error) {
    console.error("Error resetting password:", error.message);
    alert("비밀번호 재설정 중 오류가 발생했습니다.");
  }
};

onMounted(() => {
  setMaterialInput();
});
</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-80" loading="lazy">
      <span class="mask bg-white opacity-6"></span>

      <div class="d-flex flex-column my-auto container custom-login-container position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">비밀번호 재설정</h2>
              <h5 class="text-black fw-normal mt-4">비밀번호를 재설정 해주세요.</h5>
            </div>
          </div>
        </div>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <table class="table">
          <tbody>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 col-2">새 비밀번호</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="newPassword" id="newPassword" class="text-start input-group-outline mb-0 w-25"
                  :label="{ text: '비밀번호', class: 'form-label' }" type="password" />
              </td>
            </tr>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 pe-0 col-2">새 비밀번호 재입력</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="confirmPassword" id="confirmPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '비밀번호', class: 'form-label' }"
                  type="password" />
              </td>
            </tr>
          </tbody>
        </table>


        <hr class="my-2" style="border-top: 3px solid #000;" />

        <!-- 버튼 -->
        <div class="text-center mt-4 mb-5">
          <MaterialButton @click="goToMain" class="btn btn-secondary">
            취소
          </MaterialButton>
          <MaterialButton @click="resetPassword" class="btn btn-primary ms-2">
            비밀번호 변경
          </MaterialButton>
        </div>

      </div>
    </div>
  </Header>
</template>
