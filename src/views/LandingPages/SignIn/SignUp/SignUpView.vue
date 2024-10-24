<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

// example components
import Header from "@/examples/Header.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
onMounted(() => {
  setMaterialInput();
});
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
    <div class="page-header align-items-start min-vh-100">
      <span class="mask bg-white opacity-6"></span>

      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="text-black shadow-succes py-3 mb-5 text-center line">
              <h3 class="font-weight-bolder mb-0">EASY STAY<br>회원가입</h3>
              <div class="mt-3"></div>
              <div class="row mt-3 justify-content-center">
                EasyStay와 함께 편안한 휴식과 특별한 순간이 기다리고 있습니다. <br>
                회원으로 다양한 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4 justify-content-center">
          <div class="col-lg-4 col-md-8 col-12 mx-lg-8">
            <div class="d-flex justify-content-center text-center">
              <div class="col-auto d-flex flex-column align-items-center mx-5">
                <RouterLink to="/users/member/info" class="text-decoration-none custom-router-link">
                  <span class="material-icons" style="font-size: 200px;">person</span>
                  <h4>일반 회원</h4>
                </RouterLink>
              </div>
              <div class="col-auto d-flex flex-column align-items-center mx-5">
                <RouterLink to="/corporate/signUp" class="text-decoration-none custom-router-link">
                  <span class="material-icons" style="font-size: 200px;">apartment</span>
                  <h4>법인 회원</h4>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<style>
.custom-router-link {
  color: inherit;
}

.custom-router-link:hover {
  color: inherit;
  background-color: transparent;
}
</style>