<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
});

const loginStore = userLoginStore();
const router = useRouter();
const foundEmails = computed(() => {
  return loginStore.userData.foundEmails.map(email => {
    return {
      name: email.name, // 이름이 함께 반환된다고 가정
      email: email.email,
      registeredDate: email.registeredDate // 가입일자도 함께 반환된다고 가정
    };
  });
});

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
              <th scope="col">가입일자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emailData, index) in foundEmails" :key="index">
              <td>{{ emailData.name }}</td>
              <td>{{ emailData.email }}</td>
              <td>{{ emailData.registeredDate }}</td>
            </tr>
          </tbody>
        </table>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <!-- 버튼 -->
        <div class="text-center mt-5">
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


<style>
.table th {
  border-bottom: 2px solid #000;
  /* 이름 아래에 진한 선 추가 */
  text-align: center;
  /* 중앙 정렬 */
}

.table td {
  text-align: center;
  /* 중앙 정렬 */
}
</style>