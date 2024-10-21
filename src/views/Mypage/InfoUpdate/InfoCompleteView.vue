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
  router.push('/reservation');
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
              <h3 class="font-weight-bolder mb-0 mt-4">EASY STAY<br>회원 정보 수정 완료</h3>
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
            예약하기
          </MaterialButton>
        </div>
      </div>
    </div>

    <footer class="footer position-absolute bottom-2 py-2 w-100">
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
                  class="nav-link text-dark" target="_blank">About Us</a>
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