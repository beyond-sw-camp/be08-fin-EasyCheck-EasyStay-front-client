<template>
  <div class="theme-park-error-page">
    <h1>올바르지 않은 접근입니다.</h1>
    <p>테마파크 정보가 올바르게 로드되지 않았습니다.</p>
    <button @click="goToThemeParkView" class="btn btn-primary">
      테마파크 첫 화면으로 이동
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToThemeParkView = () => {
  router.push({ name: "ThemePark", params: { accommodationId: 1 } });
};
</script>

<style scoped>
.theme-park-error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.theme-park-error-page h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #dc3545;
}

.theme-park-error-page p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.theme-park-error-page button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
