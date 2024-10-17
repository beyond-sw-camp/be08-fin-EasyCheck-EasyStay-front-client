<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
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
  <DefaultNavbar transparent />
  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-center line">
              <h4 class="text-black font-weight-bolder mb-0 mt-4">회원가입</h4>
              <div class="row mt-3 justify-content-center">
                EasyStay와 함께 편안한 휴식과 특별한 순간이 기다리고 있습니다. <br>
                회원으로 다양한 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </div>

        <div class="row custom-login-board mb-4">
          <div class="col-lg-4 col-md-8 col-12 mx-lg-8">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-body">
                <span class="material-icons custom-icon">person</span>
                <h4 class="text-center mb-4">일반 회원</h4>
                <form role="form" class="text-start">
                  <MaterialInput id="email1" class="input-group-outline my-3"
                    :label="{ text: '아이디', class: 'form-label' }" type="email" />
                  <MaterialInput id="password1" class="input-group-outline mb-3"
                    :label="{ text: '비밀번호', class: 'form-label' }" type="password" />
                  <MaterialSwitch class="d-flex align-items-center mb-3" id="rememberMe1" labelClass="mb-0 ms-3"
                    checked>아이디 저장</MaterialSwitch>
                  <div class="text-center">
                    <MaterialButton class="my-4 mb-2" variant="gradient" color="dark" fullWidth>Sign in
                    </MaterialButton>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    <router-link to="/join" class="text-dark text-gradient font-weight-bold">회원가입</router-link>
                    |
                    <a href="#" class="text-dark text-gradient font-weight-bold">아이디 찾기</a>
                    |
                    <a href="#" class="text-dark text-gradient font-weight-bold">비밀번호 찾기</a>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-8 col-12 ms-lg-5">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-body">
                <h4 class="text-center mb-4">법인 회원</h4>
                <form role="form" class="text-start">
                  <MaterialInput id="value" class="input-group-outline my-3"
                    :label="{ text: '성함', class: 'form-label' }" type="text" />

                  <div class="input-group d-flex justify-content-center align-items-center">
                    <div class="row w-100 g-0">
                      <div class="col">
                        <MaterialInput id="value" class="input-group-outline"
                          :label="{ text: '휴대폰 번호 (\'-\' 제외)', class: 'form-label' }" type="text"
                          style="width: 100%; margin-right: 0;" />
                      </div>
                      <div class="col-auto">
                        <div class="input-group-append">
                          <MaterialButton class="btn btn-black text-white"
                            style="border-top-left-radius: 0; border-bottom-left-radius: 0;" type="button">
                            인증번호 전송
                          </MaterialButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="input-group d-flex justify-content-center align-items-center">
                    <div class="row w-100 g-0">
                      <div class="col">
                        <MaterialInput id="value" class="input-group-outline"
                        :label="{ text: '인증번호', class: 'form-label'}" type="text"
                        style="width: 100%; margin-right: 0;" />
                      </div>
                      <div class="col-auto">
                        <div class="input-group-append">
                          <MaterialButton class="btn btn-black text-whtie"
                          style="border-top-left-radius: 0; border-bottom-left-radius: 0;" type="button">
                          인증번호 확인
                        </MaterialButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-check mb-3 d-flex align-items-center">
                    <MaterialButton class="custom-btn me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      개인정보 약관안내
                    </MaterialButton>
                    <input class="form-check-input me-2" type="checkbox" id="privacyConsent" />
                    <label class="form-check-label" for="privacyConsent">개인정보 이용에 동의합니다.</label>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Your modal title
                            </h5>
                            <MaterialButton color="none" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </MaterialButton>
                          </div>
                          <div class="modal-body">
                            Society has put up so many boundaries, so many limitations on
                            what’s right and wrong that it’s almost impossible to get a pure
                            thought out.
                            <br /><br />
                            It’s like a little kid, a little boy, looking at colors, and no
                            one told him what colors are good, before somebody tells you you
                            shouldn’t like pink because that’s for girls, or you’d instantly
                            become a gay two-year-old.
                          </div>
                          <div class="modal-footer justify-content-between">
                            <MaterialButton variant="gradient" color="dark" data-bs-dismiss="modal">
                              Close
                            </MaterialButton>
                            <MaterialButton variant="gradient" color="success" class="mb-0">
                              Save changes
                            </MaterialButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <MaterialButton class="my-4 mb-2" variant="gradient" color="dark" fullWidth>Sign in
                    </MaterialButton>
                  </div>
                </form>
              </div>
            </div>
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
    </div>
  </Header>
</template>