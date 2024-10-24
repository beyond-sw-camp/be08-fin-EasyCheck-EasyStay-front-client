<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import apiClient from "@/api";
import { userLoginStore } from "@/stores/loginStore";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

const userStore = userLoginStore();
const error = ref(null);
const router = useRouter();

onMounted(async () => {
  setMaterialInput();

  // 사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  console.log("token: ", token);

  if (token) {
    try {
      await userStore.getUserData();
    } catch (err) {
      error.value = "사용자 정보를 가져오는 데 실패했습니다.";
      console.error("API 오류:", err);
    }
  } else {
    alert("로그인이 필요합니다.");
    router.push("/users/login");
  }
});

import easystayImage from '@/assets/img/easystay.png';
</script>

<template>
  <div class="position-sticky z-index-sticky top-0 w-100">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div class="page-header align-items-start min-vh-90" loading="lazy" style="padding-top: 80px;">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">

        <div class="row">
          <div class="col-12">

            <div class="bg-image" :style="{ backgroundImage: 'url(' + easystayImage + ')' }"
              style="background-size: cover; background-position: center; height: 230px; display: flex; align-items: center; justify-content: center; z-index: 1;">
              <div class="py-3 mb-3 text-center" style="background-color: rgba(255, 255, 255, 0.3); width: 100%;">
                <h3 class="text-black font-weight-bolder mb-0 mt-4">마이페이지</h3>
                <div class="row mt-3 text-black justify-content-center fs-4">
                </div>
                <div class="row mt-3 justify-content-center">
                  <div class="d-flex justify-content-center w-50">
                    <RouterLink to="/users/infoUpdate" class="mx-3">회원 정보 수정 ></RouterLink>
                    <RouterLink to="/users/pwUpdate" class="mx-3">비밀번호 변경 > </RouterLink>
                    <RouterLink to="/users/resign" class="mx-3">회원 탈퇴 ></RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="bg-white p-4 min-vh-15 mt-3">
            <div class="d-flex justify-content-center">
              <div class="text-center mx-5">
                <RouterLink to="users/roomReservations">
                  <span class="material-icons" style="font-size: 70px;">description</span>
                  <div class="mt-2">객실 예약 내역</div>
                </RouterLink>
              </div>
              <div class="text-center mx-5">
                <RouterLink to="users/attractionReservations">
                  <span class="material-icons" style="font-size: 70px;">attractions</span>
                  <div class="mt-2">테마파크 예약 내역</div>
                </RouterLink>
              </div>
              <div class="text-center mx-5">
                <RouterLink to="users/point">
                  <span class="material-icons" style="font-size: 70px;">loyalty</span>
                  <div class="mt-2">포인트</div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #000; width: 25%; margin: 10px auto;"></div>

        <div class="row justify-content-center text-black fs-6 mb-4">
          <div class="text-center mt-3">
            <h5 class="custom-font">EASY STAY's membership offers special value.</h5>
            <div v-if="error" class="text-danger">{{ error }}</div>
            <div v-else>
              <!-- 사용자 정보 표시 -->
              <div>환영합니다, {{ userStore.userData.name }}님!</div>
              <div>회원 ID: {{ userStore.userData.email }}</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </Header>
</template>

<style>
.footer {
  position: relative;
  /* relative로 변경하여 흐름에 따라 위치하도록 */
  bottom: 0;
  width: 100%;
  /* 전체 너비 */
  background-color: white;
  /* 필요에 따라 배경색 추가 */
}

.custom-font {
  font-family: 'Caveat', cursive;
}
</style>