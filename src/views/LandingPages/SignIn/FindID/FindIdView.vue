<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
// import MaterialInput from "@/components/MaterialInput.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

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

        <div class = "text-end">
          <RouterLink to="/users/findPwAuthentication" class="text-decoration-none" >
            <p>비밀번호 찾기</p>
          </RouterLink>
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
            <tr>
              <td>김나현</td>
              <td>example@example.com</td>
              <td>2024-10-18</td>
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

        <!-- 푸터 -->
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