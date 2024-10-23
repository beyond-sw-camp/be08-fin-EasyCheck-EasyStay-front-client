<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
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

function goToResignComplete() {
  router.push('/users/resignComplete');
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
    <div class="page-header align-items-start min-vh-80 custom-login-container" loading="lazy">
      <span class="mask bg-white opacity-6"></span>

      <div class="d-flex flex-column my-auto container custom-login-container position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">회원 탈퇴</h2>
              <h5 class="text-black fw-normal mt-4">회원 탈퇴 전 안내사항을 확인해 주세요.</h5>
            </div>
          </div>
        </div>

        <div class="text-start">
          <h5 class="text-black mb-2">탈퇴 안내사항</h5>
        </div>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <p class="mt-2">
        <h6>회원 탈퇴 안내</h6>
        소중한 고객님, 저희 호텔/리조트를 이용해 주셔서 감사합니다. <br>
        고객님의 편안한 이용을 위해 최선을 다해 왔습니다. 하지만 탈퇴를 원하신다면, 아래의 내용을 반드시 확인해 주시기 바랍니다.<br><br>


        <h6>탈퇴 절차</h6>
        회원 탈퇴를 원하실 경우, 아래의 '탈퇴' 버튼을 클릭해 주세요. <br>
        탈퇴 신청 후, 고객님의 계정은 즉시 비활성화되며, 등록된 모든 정보는 영구적으로 삭제됩니다. <br><br>

        <h6>탈퇴 후 영향</h6>
        탈퇴 후에는 현재 예약된 숙박 및 서비스가 자동으로 취소되며, 재가입 시 기존 데이터(포인트, 예약 기록 등)는 복구 불가능합니다.<br>
        따라서, 재가입을 원하시는 경우 새로운 계정을 만들어야 합니다. <br><br>

        <h6>고객 지원</h6>
        탈퇴와 관련된 문의가 있으시거나, 서비스 이용에 대한 불만이 있으신 경우, 고객 지원 센터에 연락해 주시면 신속하게 도와드리겠습니다. <br>
        고객님의 소중한 의견은 저희에게 큰 도움이 됩니다. <br><br>

        <h6>탈퇴 이후 재가입</h6>
        만약 탈퇴 후 다시 저희 서비스를 이용하고자 하신다면, 언제든지 재가입하실 수 있습니다. <br>
        새로운 혜택과 서비스를 통해 다시 뵙기를 기대합니다. <br><br>

        고객님의 선택을 존중하며, 앞으로도 저희 EASY STAY를 기억해 주시길 바랍니다. <br>
        감사합니다.
        </p>
        <hr class="my-2" style="border-top: 3px solid #000;" />

        <!-- 버튼 -->
        <div class="text-center mt-5">
          <MaterialButton @click="goToMain" class="btn btn-light">
            취소
          </MaterialButton>
          <MaterialButton @click="goToResignComplete" class="btn btn-dark ms-2">
            탈퇴
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
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* 전체 화면 높이 */
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  /* 헤더 높이 */
  z-index: 100;
}

.custom-login-container {
  margin-top: 80px;
  /* 헤더 높이와 같게 */
  margin-bottom: 60px;
  /* 푸터 높이와 같게 */
  overflow-y: auto;
  /* 스크롤 가능 */
  flex: 1;
  /* 공간을 차지하도록 설정 */
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  /* 푸터 높이 */
  z-index: 10;
}
</style>
