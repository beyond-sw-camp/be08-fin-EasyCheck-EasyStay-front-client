<script setup>
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { RouterView } from "vue-router";
import { userLoginStore } from "@/stores/loginStore.js";
import { onMounted } from "vue";

const authStore = userLoginStore();

// 새로고침시 현재 로그인 상태 확인
onMounted(() => {
  authStore.checkLogin();
});
</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <navbar-default />
      </div>
    </div>
  </div>
  <router-view />
  <default-footer />
</template>
