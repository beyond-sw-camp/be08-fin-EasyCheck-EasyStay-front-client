<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { mypageStore } from "@/stores/mypageStore";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

const router = useRouter();
const mypage = mypageStore();
const loginStore = userLoginStore();

// 유효성 검사 상태
const isFormValid = ref(false);

// 비밀번호 유효성 검사
const passwordErrorMessage = ref("");
const confirmPasswordErrorMessage = ref("");

// 비밀번호 유효성 검사
const validatePassword = () => {
  const passwordValue = mypage.changePW.newPassword || "";
  const confirmPasswordValue = mypage.changePW.confirmPassword || "";

  const minLength = passwordValue.length >= 8;
  const maxLength = passwordValue.length <= 16;
  const hasUpperCase = /[A-Z]/.test(passwordValue);
  const hasNumber = /\d/.test(passwordValue);

  // 기본적으로 오류 메시지 초기화
  passwordErrorMessage.value = "";
  confirmPasswordErrorMessage.value = "";

  // 비밀번호 길이 검사
  if (!minLength || !maxLength) {
    passwordErrorMessage.value = "비밀번호는 8자 이상, 16자 이하이어야 합니다.";
  }

  // 대문자 포함 검사
  else if (!hasUpperCase) {
    passwordErrorMessage.value = "비밀번호에는 대문자가 포함되어야 합니다.";
  }

  // 숫자 포함 검사
  else if (!hasNumber) {
    passwordErrorMessage.value = "비밀번호에는 숫자가 포함되어야 합니다.";
  }

  // 새 비밀번호와 새 비밀번호 확인 일치 여부 검사
  else if (passwordValue !== confirmPasswordValue) {
    confirmPasswordErrorMessage.value = "비밀번호가 일치하지 않습니다.";
  }

  // 유효성 검사를 통과했는지 여부
  else {
    isFormValid.value = true;  // 유효성 검사를 통과하면 버튼 활성화
    return true;
  }

  isFormValid.value = false;  // 오류가 있으면 버튼 비활성화
  return false;
};

// 비밀번호 입력 시 유효성 검사
watch(() => mypage.changePW.newPassword, () => validatePassword());
watch(() => mypage.changePW.confirmPassword, () => validatePassword());

// 비밀번호 변경
const changePassword = async () => {
  try {
    const validationError = validatePassword();
    if (!validationError) {
      return; // 유효성 검사를 통과하지 않으면 아무 동작도 하지 않음
    }

    const email = mypage.userData.email;
    const oldPassword = mypage.changePW.oldPassword;
    const newPassword = mypage.changePW.newPassword;

    await mypage.changePassword(oldPassword, newPassword);
    alert("비밀번호 변경이 완료되었습니다.");
    router.push('/users/pwComplete');
  } catch (error) {
    alert(error.message);
  }
};

const goToMain = () => {
  router.push('/');
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
              <td class="text-center align-middle fw-bold fs-8 col-2">현재 비밀번호</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="mypage.changePW.oldPassword" id="oldPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '현재 비밀번호', class: 'form-label' }"
                  type="password" />
              </td>
            </tr>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 pe-0 col-2">새 비밀번호</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="mypage.changePW.newPassword" id="newPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '새 비밀번호', class: 'form-label' }"
                  type="password" />
                <!-- 오류 메시지를 왼쪽 정렬 -->
                <span v-if="passwordErrorMessage" class="text-danger" style="display: block; text-align: left;">
                  {{ passwordErrorMessage }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 pe-0 col-2">새 비밀번호 확인</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="mypage.changePW.confirmPassword" id="confirmPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '새 비밀번호 확인', class: 'form-label' }"
                  type="password" />
                <!-- 오류 메시지를 왼쪽 정렬 -->
                <span v-if="confirmPasswordErrorMessage" class="text-danger" style="display: block; text-align: left;">
                  {{ confirmPasswordErrorMessage }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <!-- 버튼 -->
        <div class="text-center mt-5">
          <MaterialButton @click="goToMain" class="btn btn-light">
            취소
          </MaterialButton>
          <MaterialButton @click="changePassword" class="btn btn-dark ms-2" :disabled="!isFormValid">
            설정완료
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>
