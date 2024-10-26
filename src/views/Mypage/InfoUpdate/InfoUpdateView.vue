<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

// example components
import Header from "@/examples/Header.vue";

// Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

import MemberInfoUpdate from "./Sections/MemberInfoUpdate.vue";

onMounted(() => {
  setMaterialInput();
});

// 라우터
const router = useRouter();

function goToMain() {
  router.push('/');
}

function updateComplete() {
  router.push('/users/pwUpdate');
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

  <Header style="margin-top: 80px;">
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">회원 정보 수정</h2>
              <h5 class="text-black fw-normal mt-4">회원정보를 정확하게 입력해주세요.</h5>
            </div>
          </div>
        </div>

        <MemberInfoUpdate />

        <!-- 버튼 -->
        <div class="text-center mt-4 mb-5">
          <MaterialButton @click="goToMain" class="btn btn-light">
            취소
          </MaterialButton>
          <MaterialButton @click="updateComplete" class="btn btn-dark ms-2">
            다음
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>

<style>
.custom-checkbox {
  transform: scale(0.8);
}

.footer {
  position: relative;
  /* footer 위치 조정 */
  bottom: 0;
}
</style>
