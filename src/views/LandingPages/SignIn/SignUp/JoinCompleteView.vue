<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// example components
import Header from "@/examples/Header.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

onMounted(() => {
  setMaterialInput();
});

const router = useRouter();

function goToMain() {
  router.push('/');
}

function goToLogin() {
  router.push('/users/login');
}

</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="text-black shadow-succes py-3 mb-5 text-center line">
              <span class="material-icons mb-2" style="font-size: 100px; color: steelblue">deck</span>
              <h3 class="font-weight-bolder mb-0 mt-4">EASY STAY<br>회원가입 완료</h3>
              <div class="mt-3"></div>
              <div class="row mt-3 justify-content-center mb-3">
                EasyStay와 함께 편안한 휴식과 특별한 순간이 기다리고 있습니다. <br>
                회원으로 다양한 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </div>

        <!-- 버튼 -->
        <div class="text-center mt-4">
          <MaterialButton @click="goToMain" class="btn btn-light">
            홈으로
          </MaterialButton>
          <MaterialButton @click="goToLogin" class="btn btn-dark ms-2">
            로그인
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>