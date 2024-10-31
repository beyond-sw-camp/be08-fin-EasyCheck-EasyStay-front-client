<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

import Authentication from "../../Sections/Authentication.vue";

onMounted(() => {
  setMaterialInput();
});

const router = useRouter();
const loginStore = userLoginStore();

function goToMain() {
  router.push('/');
}

function goToFindPW() {
  if (!loginStore.isAuthenticated) {
    alert("인증이 완료되지 않았습니다.");
    return;
  }
  router.push('/users/findPw');
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
    <div class="page-header align-items-start min-vh-100" loading="lazy" style="margin-top: 70px;">
      <span class="mask bg-white opacity-6"></span>

      <div class="d-flex flex-column my-auto container custom-login-container position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">비밀번호 찾기</h2>
              <h5 class="text-black fw-normal mt-4">비밀번호를 찾기 위해 휴대폰 본인 인증을 해주세요.</h5>
            </div>
          </div>
        </div>

        <Authentication @authenticationSuccess="onAuthenticationSuccess" />

        <!-- 버튼 -->
        <div class="text-center mt-4 mb-5">
          <MaterialButton @click="goToMain" class="btn btn-secondary">
            취소
          </MaterialButton>
          <MaterialButton @click="goToFindPW" class="btn btn-primary ms-2">
            인증 요청
          </MaterialButton>
        </div>

      </div>
    </div>
  </Header>
</template>
