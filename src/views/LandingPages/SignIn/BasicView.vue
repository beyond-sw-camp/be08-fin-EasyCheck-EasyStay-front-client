<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { useRouter } from "vue-router";

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

// 회원 로그인
const router = useRouter();
const loginStore = userLoginStore();

const email = ref('');
const password = ref('');
const status = ref('');
const role = ref('');

// 일반회원 로그인
function login() {
  const formData = {
    email: email.value,
    password: password.value,
  };

  loginStore.login(formData)
    .then(response => {
      console.log("응답 데이터:", response);
      loginStore.setLoginStatus(true); // 로그인 상태 설정
      router.go(-1); // 이전 페이지로 이동
      console.log("Success Login");
    })
    .catch(error => {
      console.log("Login Fail: ", error);
    });
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
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-center line">
              <h4 class="text-black font-weight-bolder mb-0 mt-4">로그인</h4>
              <div class="row mt-3 justify-content-center">
                EasyStay와 함께 편안한 휴식과 특별한 순간이 기다리고 있습니다. <br>
                회원으로 다양한 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </div>

        <!-- 회원 로그인 -->
        <div class="custom-login-board mb-4">
          <div class="row justify-content-center col-lg-4 col-md-8 col-12 mx-lg-8">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-body">
                <h4 class="text-center mb-4">회원 로그인</h4>
                <form role="form" class="text-start">

                  <MaterialInput id="email1" class="input-group-outline my-3"
                    :label="{ text: '아이디', class: 'form-label' }" type="email" v-model="email" />
                  <MaterialInput id="password1" class="input-group-outline mb-3"
                    :label="{ text: '비밀번호', class: 'form-label' }" type="password" v-model="password" />
                  <MaterialSwitch class="d-flex align-items-center mb-3" id="rememberMe1" labelClass="mb-0 ms-3"
                    checked>아이디 저장</MaterialSwitch>
                  <div class="text-center">
                    <MaterialButton type="button" @click="login" class="my-4 mb-2" variant="gradient" color="dark"
                      fullWidth>Sign in
                    </MaterialButton>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    <RouterLink to="/users/signUp" class="text-dark text-gradient font-weight-bold">회원가입</RouterLink>
                    |
                    <RouterLink to="/users/findIdAuthentication" class="text-dark text-gradient font-weight-bold">아이디 찾기
                    </RouterLink>
                    |
                    <RouterLink to="/users/findPwAuthentication" class="text-dark text-gradient font-weight-bold">비밀번호
                      찾기</RouterLink>
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<style scoped>
.custom-login-board {
  display: flex;
  justify-content: center;
}

.card {
  margin: 0 auto;
  /* 카드 중앙 정렬 */
}
</style>