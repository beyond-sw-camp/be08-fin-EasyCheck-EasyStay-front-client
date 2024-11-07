<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator } from "@vuelidate/validators";

import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";

// 폼 데이터
const formData = ref({
  email: "",
  password: "",
});

// 유효성 검사 규칙
const rules = {
  email: {
    required,
    emailValidator,
  },
  password: {
    required,
  },
};

// vuelidate 설정
const v$ = useVuelidate(rules, formData);

const router = useRouter();
const loginStore = userLoginStore();

onMounted(() => {
  setMaterialInput();
});

// 일반회원 로그인
async function login() {
  // 폼 유효성 검사 실행
  const isFormCorrect = await v$.value.$validate();

  // 유효성 검사 실패시 함수 종료
  if (!isFormCorrect) return;

  loginStore
    .login(formData.value)
    .then((response) => {
      console.log("응답 데이터:", response);
      loginStore.setLoginStatus(true);
      router.go(-1);
      console.log("Success Login");
    })
    .catch((error) => {
      console.log("Login Fail: ", error);
    });
}
</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-center line">
              <h4 class="text-black font-weight-bolder mb-0 mt-4">로그인</h4>
              <div class="row mt-3 justify-content-center">
                EasyStay와 함께 편안한 휴식과 특별한 순간이 기다리고 있습니다.
                <br />
                회원으로 다양한 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </div>

        <!-- 회원 로그인 -->
        <div class="custom-login-board mb-4">
          <div
            class="row justify-content-center col-lg-4 col-md-8 col-12 mx-lg-8"
          >
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-body">
                <h4 class="text-center mb-4">회원 로그인</h4>
                <form role="form" class="text-start" @submit.prevent="login">
                  <div class="form-group">
                    <MaterialInput
                      id="email1"
                      class="input-group-outline my-3"
                      :class="{ 'is-invalid': v$.email.$error }"
                      :label="{ text: '아이디', class: 'form-label' }"
                      type="email"
                      v-model="formData.email"
                    />
                    <div class="invalid-feedback" v-if="v$.email.$error">
                      <span v-if="v$.email.required.$invalid"
                        >이메일을 입력해주세요.</span
                      >
                      <span v-if="v$.email.emailValidator.$invalid"
                        >올바른 이메일 형식이 아닙니다.</span
                      >
                    </div>
                  </div>

                  <div class="form-group">
                    <MaterialInput
                      id="password1"
                      class="input-group-outline mb-3"
                      :class="{ 'is-invalid': v$.password.$error }"
                      :label="{ text: '비밀번호', class: 'form-label' }"
                      type="password"
                      v-model="formData.password"
                    />
                    <div class="invalid-feedback" v-if="v$.password.$error">
                      <span v-if="v$.password.required.$invalid"
                        >비밀번호를 입력해주세요.</span
                      >
                    </div>
                  </div>

                  <div class="text-center">
                    <MaterialButton
                      type="submit"
                      class="my-4 mb-2"
                      variant="gradient"
                      color="dark"
                      fullWidth
                    >
                      Sign in
                    </MaterialButton>
                  </div>
                </form>

                <p class="mt-4 text-sm text-center">
                  <RouterLink
                    to="/users/signUp"
                    class="text-dark text-gradient font-weight-bold"
                    >회원가입</RouterLink
                  >
                  |
                  <RouterLink
                    to="/users/findIdAuthentication"
                    class="text-dark text-gradient font-weight-bold"
                    >아이디 찾기
                  </RouterLink>
                  |
                  <RouterLink
                    to="/users/findPwAuthentication"
                    class="text-dark text-gradient font-weight-bold"
                    >비밀번호 찾기</RouterLink
                  >
                </p>
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
