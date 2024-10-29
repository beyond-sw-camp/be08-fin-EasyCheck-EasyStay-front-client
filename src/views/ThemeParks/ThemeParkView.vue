<template>
  <!-- 스크롤 위치에 따라 navbar 표시/숨기기 -->
  <div class="position-sticky z-index-sticky top-0" v-show="showNavbar">
    <div class="row">
      <div class="col-12">
        <navbar-default :sticky="true" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// Pinia 스토어
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

// 라우터 객체
const route = useRoute();
const router = useRouter();

// navbar 표시 여부 상태
const showNavbar = ref(true);

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  showNavbar.value = window.scrollY === 0; // 화면 맨 위에서만 Navbar 표시
};

// 첫 번째 숙소와 테마파크로 리다이렉트하는 함수
const redirectToFirstAccommodation = async () => {
  const accommodations = accommodationStore.accommodations;
  if (accommodations && accommodations.length > 0) {
    const firstAccommodationId = accommodations[0].id;
    await themeParkStore.fetchThemeParks(firstAccommodationId);
    const themeParks = themeParkStore.themeParks;
    const firstThemeParkId =
      themeParks && themeParks.length > 0 ? themeParks[0].id : null;

    await router.replace({
      path: route.path,
      query: {
        ...route.query,
        accommodationId: firstAccommodationId,
        themeParkId: firstThemeParkId,
      },
    });
  }
};

// 컴포넌트 마운트 시 초기화 및 스크롤 이벤트 등록
onMounted(async () => {
  await accommodationStore.fetchResortAccommodations();
  if (!route.query.accommodationId) {
    await redirectToFirstAccommodation();
  }

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll);
});

// 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// accommodationId가 변경될 경우
watch(
  () => route.query.accommodationId,
  async (newAccommodationId) => {
    if (newAccommodationId) {
      await accommodationStore.fetchAccommodationById(newAccommodationId);
      await themeParkStore.fetchThemeParks(newAccommodationId);
      if (!route.query.themeParkId) {
        const themeParks = themeParkStore.themeParks;
        if (themeParks && themeParks.length > 0) {
          await router.replace({
            path: route.path,
            query: {
              ...route.query,
              themeParkId: themeParks[0].id,
            },
          });
        }
      }
    }
  },
  { immediate: true }
);

// themeParkId가 변경될 경우
watch(
  () => route.query.themeParkId,
  (newThemeParkId) => {
    if (newThemeParkId && route.query.accommodationId) {
      themeParkStore.fetchThemeParkById(
        route.query.accommodationId,
        newThemeParkId
      );
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
