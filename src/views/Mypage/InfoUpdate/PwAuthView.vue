<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { userLoginStore } from '@/stores/loginStore';

import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

import Authentication from "@/views/LandingPages/SignIn/Sections/Authentication.vue";

const router = useRouter();
const loginStore = userLoginStore();

const isAuthenticated = ref(false);

function goToMain() {
  router.push('/');
}

// 인증 요청 및 상태 업데이트
const authenticatePhone = async () => {
  try {
    await loginStore.handlePhoneAuthentication(); // 전화번호 인증 요청
    loginStore.isAuthenticated = true; // 인증 성공 시 상태 업데이트
  } catch (error) {
    console.error('Error during phone authentication:', error.message);
    alert("인증번호 요청 중 오류가 발생했습니다."); // 오류 메시지
  }
};

const handleNext = () => {
  // 인증 상태 확인
  if (loginStore.isAuthenticated) {
    // 인증 완료 시 다음 단계로 진행
    router.push('/users/pwUpdate');
  } else {
    alert("전화번호 인증을 완료해야 다음 단계로 진행할 수 있습니다.");
  }
};

onMounted(() => {
  setMaterialInput();
});

</script>

<template>
  <Header style="margin-top: 80px;">
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">비밀번호 변경</h2>
              <h5 class="text-black fw-normal mt-4">비밀번호 변경을 위해 본인 인증을 진행해 주세요.</h5>
            </div>
          </div>
        </div>

        <Authentication v-model="signUpformData" @authenticate="authenticatePhone" />

        <!-- 버튼 -->
        <div class="text-center mt-4 mb-5">
          <MaterialButton @click="goToMain" class="btn btn-secondary">
            취소
          </MaterialButton>
          <MaterialButton @click="handleNext" class="btn btn-primary ms-2">
            다음
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>

<style scoped>
.custom-checkbox {
  transform: scale(0.8);
}
</style>
