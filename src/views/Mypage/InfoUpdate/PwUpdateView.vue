<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mypageStore } from "@/stores/mypageStore";

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
const mypage = mypageStore();

const changePassword = async () => {
  try {
    const email = mypage.userData.email;
    const oldPassword = mypage.changePW.oldPassword;
    const newPassword = mypage.changePW.newPassword;

    await mypage.changePassword(oldPassword, newPassword);
    alert("비밀번호 변경이 완료되었습니다.");
    router.push('/users/pwComplete');
  } catch (error) {
    alert(error.message);
  }
};
const goToMain = () => {
  router.push('/');
};

</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-80" loading="lazy">
      <span class="mask bg-white opacity-6"></span>

      <div class="d-flex flex-column my-auto container custom-login-container position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">비밀번호 재설정</h2>
              <h5 class="text-black fw-normal mt-4">비밀번호를 재설정 해주세요.</h5>
            </div>
          </div>
        </div>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <table class="table">
          <tbody>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 col-2">현재 비밀번호</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="mypage.changePW.oldPassword" id="oldPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '비밀번호', class: 'form-label' }"
                  type="password" />
              </td>
            </tr>
            <tr>
              <td class="text-center align-middle fw-bold fs-8 pe-0 col-2">새 비밀번호</td>
              <td class="align-middle ps-0">
                <MaterialInput v-model="mypage.changePW.newPassword" id="newPassword"
                  class="text-start input-group-outline mb-0 w-25" :label="{ text: '비밀번호', class: 'form-label' }"
                  type="password" />
              </td>
            </tr>
          </tbody>
        </table>

        <hr class="my-2" style="border-top: 3px solid #000;" />

        <!-- 버튼 -->
        <div class="text-center mt-5">
          <MaterialButton @click="goToMain" class="btn btn-light">
            취소
          </MaterialButton>
          <MaterialButton @click="changePassword" class="btn btn-dark ms-2">
            설정완료
          </MaterialButton>
        </div>
      </div>
    </div>
  </Header>
</template>