<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

const loginStore = userLoginStore();
const router = useRouter();

const userData = computed(() => loginStore.userData);
onMounted(() => {
  console.log("userData: ", userData.value);
});

function goToMain() {
  router.push('/');
}

function goToLogin() {
  router.push('/users/login');
}

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
              <h2 class="text-black mb-0">아이디 찾기</h2>
              <h5 class="text-black fw-normal mt-4">해당 이름으로 가입된 아이디입니다.</h5>
            </div>
          </div>
        </div>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <table class="table">
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">이메일</th>
              <th scope="col">전화번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userData.name }}</td>
              <td>{{ userData.email }}</td>
              <td>{{ userData.phone }}</td>
            </tr>
          </tbody>
        </table>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <div class="text-center mt-5">
          <MaterialButton @click="goToMain" class="btn btn-light">홈으로</MaterialButton>
          <MaterialButton @click="goToLogin" class="btn btn-dark ms-2">로그인</MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>

<style>
.table th {
  border-bottom: 2px solid #000;
  text-align: center;
}

.table td {
  text-align: center;
}
</style>
