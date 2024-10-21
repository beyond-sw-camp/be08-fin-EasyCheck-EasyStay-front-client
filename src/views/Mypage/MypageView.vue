<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
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
    <div class="page-header align-items-start min-vh-90" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-3 text-center line">
              <h3 class="text-black font-weight-bolder mb-0 mt-4">마이페이지</h3>
              <div class="row mt-3 text-black justify-content-center fs-4">
                안녕하세요. ooo님은 EASY STAY의 회원입니다.
              </div>

              <div class="row mt-3 justify-content-center">
                <div class="d-flex justify-content-center w-50">
                  <RouterLink to="/users/infoUpdate" class="mx-3">회원 정보 수정 ></RouterLink>
                  <RouterLink to="/users/pwUpdate" class="mx-3">비밀번호 변경 > </RouterLink>
                  <RouterLink to="/users/delete" class="mx-3">회원 탈퇴 ></RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="bg-white p-4 min-vh-15 mb-5">
              <div class="d-flex justify-content-center">
                <div class="text-center mx-4">
                  <RouterLink to="users/roomReservations">
                    <span class="material-icons" style="font-size: 70px;">description</span>
                    <div class="mt-2">객실 예약 내역</div>
                  </RouterLink>
                </div>
                <div class="text-center mx-4">
                  <RouterLink to="users/attractionReservations">
                    <span class="material-icons" style="font-size: 70px;">attractions</span>
                    <div class="mt-2">테마파크 예약 내역</div>
                  </RouterLink>
                </div>
                <div class="text-center mx-4">
                  <RouterLink to="users/point">
                    <span class="material-icons" style="font-size: 70px;">loyalty</span>
                    <div class="mt-2">포인트</div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>


          <div class="row justify-content-center text-black fs-6">
            <div class="text-center">
              <!-- <img src="../../assets/img/easystay2.png" alt="설명 텍스트" class="img-fluid mb-1">  -->
            </div>
            <div class="justify-content-center text-center">
              EASY STAY의 멤버십은 특별한 가치를 선사합니다.
            </div>
          </div>



        </div>

      </div>
    </div>

    <!-- 푸터 -->
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
.footer {
  position: relative;
  /* relative로 변경하여 흐름에 따라 위치하도록 */
  bottom: 0;
  width: 100%;
  /* 전체 너비 */
  background-color: white;
  /* 필요에 따라 배경색 추가 */
}
</style>