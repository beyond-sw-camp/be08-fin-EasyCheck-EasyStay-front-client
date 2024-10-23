<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { userLoginStore } from '@/stores/loginStore';
import apiClient from "@/api";

// example components
import Header from "@/examples/Header.vue";

// Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

import MemberInfo from "@/views/LandingPages/SignIn/Sections/MemberInfo.vue";

onMounted(() => {
  setMaterialInput();
});

const loginStore = userLoginStore();

// 라우터
const router = useRouter();

function goToMain() {
  router.push('/');
}

// 회원가입
const registerUser = async () => {
  try {
    const success = await loginStore.registerUser();
    if (success) {
      router.push('/joinComplete');
    }
  } catch (error) {
    console.error("회원가입 처리 중 오류 발생:", error.message);
  }
};

</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header style="margin-top: 80px;">
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">회원가입</h2>
              <h5 class="text-black fw-normal mt-4">회원가입을 위해 정보를 입력해주세요.</h5>
            </div>
          </div>
        </div>

        <MemberInfo v-model="signUpformData" />

        <!-- 버튼 -->
        <div class="text-center mt-4 mb-5">
          <MaterialButton @click="goToMain" class="btn btn-secondary">
            취소
          </MaterialButton>
          <MaterialButton @click="registerUser" class="btn btn-primary ms-2">
            회원가입
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
