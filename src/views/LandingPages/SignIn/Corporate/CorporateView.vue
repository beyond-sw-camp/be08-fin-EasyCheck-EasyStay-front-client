<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from 'vue-router';
import { userLoginStore } from "@/stores/loginStore";

import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

import CorporateInfo from "../Sections/CorporateInfo.vue";

onMounted(() => {
  setMaterialInput();
});

const loginStore = userLoginStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const corporateData = {
      name: loginStore.signUpformData.name,
      phone: `${loginStore.selectedPhonePrefix}${loginStore.phoneMiddle}${loginStore.phoneSuffix}`,
      email: `${loginStore.signUpformData.emailPrefix}@${loginStore.signUpformData.emailSuffix}`,
    };

    // 회원가입 호출
    const success = await loginStore.registerCorporateUser(corporateData);
    if (success) {
      router.push('/users/corporateJoinComplete');
    }
  } catch (error) {
    alert("회원가입 중 오류 발생: " + error.message);
  };
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

  <Header style="margin-top: 80px;">
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">법인회원 회원권 신청</h2>
              <h5 class="text-black fw-normal mt-4">회원권 구매를 위해 상담 폼을 입력해주세요.</h5>
            </div>
          </div>
        </div>

        <CorporateInfo />

        <!-- 버튼 -->
        <div class="text-center mt-5 mb-5">
          <RouterLink to="/">
            <MaterialButton class="btn btn-secondary">
              취소
            </MaterialButton>
          </RouterLink>
          <RouterLink to="/users/corporateJoinComplete">
            <MaterialButton class="btn btn-primary ms-2" @click="handleSubmit">
              신청 완료
            </MaterialButton>
          </RouterLink>
        </div>

      </div>
    </div>
  </Header>
</template>

<style>
.custom-checkbox {
  transform: scale(0.8);
}

.footer {
  position: relative;
  bottom: 0;
}
</style>
