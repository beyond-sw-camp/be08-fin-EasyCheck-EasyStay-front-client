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

const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

const route = useRoute();
const router = useRouter();
const showNavbar = ref(true);

const handleScroll = () => {
  showNavbar.value = window.scrollY === 0;
};

// URL에 있는 쿼리 파라미터 사용하여 초기 로드 설정
onMounted(async () => {
  await accommodationStore.fetchResortAccommodations();
  if (route.query.accommodationId && route.query.themeParkId) {
    await accommodationStore.fetchAccommodationById(
      route.query.accommodationId
    );
    await themeParkStore.fetchThemeParks(route.query.accommodationId);
    await themeParkStore.fetchThemeParkById(
      route.query.accommodationId,
      route.query.themeParkId
    );
  } else {
    await redirectToFirstAccommodation(); // 쿼리가 없는 경우만 초기화
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const redirectToFirstAccommodation = async () => {
  const accommodations = accommodationStore.accommodations;
  if (accommodations && accommodations.length > 0) {
    const firstAccommodationId = accommodations[0].id;
    await themeParkStore.fetchThemeParks(firstAccommodationId);
    const themeParks = themeParkStore.themeParks;
    const firstThemeParkId = themeParks?.length ? themeParks[0].id : null;

    await router.replace({
      path: route.path,
      query: {
        accommodationId: firstAccommodationId,
        themeParkId: firstThemeParkId,
      },
    });
  }
};

watch(
  () => route.query.accommodationId,
  async (newAccommodationId) => {
    if (newAccommodationId) {
      await accommodationStore.fetchAccommodationById(newAccommodationId);
      await themeParkStore.fetchThemeParks(newAccommodationId);
      if (!route.query.themeParkId) {
        const themeParks = themeParkStore.themeParks;
        if (themeParks?.length) {
          await router.replace({
            path: route.path,
            query: {
              themeParkId: themeParks[0].id,
            },
          });
        }
      }
    }
  },
  { immediate: true }
);

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
