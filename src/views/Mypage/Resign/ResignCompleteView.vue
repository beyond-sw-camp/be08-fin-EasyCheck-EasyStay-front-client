<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const router = useRouter();
const loginStore = userLoginStore();

function goToMain() {
  router.push('/');
}

onMounted(() => {
  setMaterialInput();
  loginStore.setLoginStatus(false);
});
</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="text-black shadow-succes py-3 mb-5 text-center line">
              <span class="material-icons mb-2" style="font-size: 100px; color: steelblue">deck</span>
              <h3 class="font-weight-bolder mb-0 mt-4">EASY STAY<br>회원 탈퇴 완료</h3>
              <div class="mt-3"></div>
              <div class="row mt-3 justify-content-center mb-3">
                저희 EASY STAY와 함께한 시간에 감사드립니다. <br>
                언제든지 다시 찾아주시면 더 나은 서비스로 모시곘습니다.
              </div>
            </div>
          </div>
        </div>

        <!-- 버튼 -->
        <div class="text-center mt-4">
          <MaterialButton @click="goToMain" class="btn btn-light">
            홈으로
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>