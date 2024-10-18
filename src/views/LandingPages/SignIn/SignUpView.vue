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
  <NavbarDefault />
  <Header>
    <div class="page-header align-items-start min-vh-100">
      <span class="mask bg-white opacity-6"></span>

      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="text-black shadow-succes py-3 mb-5 text-center line">
              <h3 class="font-weight-bolder mb-0 mt-4">EASY STAY<br>회원가입</h3>
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
                <RouterLink to="/users/signUp/member" class="text-decoration-none custom-router-link">
                  <span class="material-icons" style="font-size: 200px;">person</span>
                  <h4>일반 회원</h4>
                </RouterLink>
              </div>
              <div class="col-auto d-flex flex-column align-items-center mx-5">
                <RouterLink to="join/signUp/corporate" class="text-decoration-none custom-router-link">
                  <span class="material-icons" style="font-size: 200px;">apartment</span>
                  <h4>법인 회원</h4>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer fixed-bottom py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-dark text-lg-start">
              © {{ new Date().getFullYear() }}, made with
              <i class="fa fa-heart" aria-hidden="true"></i> by
              <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server.git"
                class="font-weight-bold text-dark" target="_blank">EASY CHECK</a>
              for a better web.
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul class="nav nav-footer justify-content-center justify-content-lg-end">
              <li class="nav-item">
                <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server.git"
                  class="nav-link text-dark" target="_blank">EASY CHECK</a>
              </li>
              <li class="nav-item">
                <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-front-client.git"
                  class="nav-link text-dark" target="_blank">About
                  Us</a>
              </li>
              <li class="nav-item">
                <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-front-admin.git"
                  class="nav-link text-dark" target="_blank">GitHub</a>
              </li>
              <li class="nav-item">
                <a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-dark"
                  target="_blank">License</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
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