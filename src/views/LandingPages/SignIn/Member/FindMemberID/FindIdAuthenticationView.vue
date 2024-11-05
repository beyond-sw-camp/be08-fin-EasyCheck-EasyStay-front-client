<script setup>
import { onMounted, ref } from "vue";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import setMaterialInput from "@/assets/js/material-input";
import IdAuthentication from "./IdAuthentication.vue";

onMounted(() => {
  setMaterialInput();
});

const loginStore = userLoginStore();
const selectedPhone = ref('');

</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy" style="margin-top: 70px;">
      <span class="mask bg-white opacity-6"></span>

      <div class="d-flex flex-column my-auto container custom-login-container position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">아이디 찾기</h2>
              <h5 class="text-black fw-normal mt-4">아이디를 찾기 위해 휴대폰 본인 인증을 해주세요.</h5>
            </div>
          </div>
        </div>

        <IdAuthentication :name="loginStore.signUpformData.name" :phone="selectedPhone" />

      </div>
    </div>
  </Header>
</template>
