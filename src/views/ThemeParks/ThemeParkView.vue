<template>
  <navbar-default :sticky="true" />
  <router-view />
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

const route = useRoute();
const router = useRouter();
// URL에 있는 쿼리 파라미터 사용하여 초기 로드 설정
onMounted(async () => {
  await accommodationStore.fetchResortAccommodations();
  if (route.query.accommodationId && route.query.themeParkId) {
    await loadAccommodationAndThemePark(
      route.query.accommodationId,
      route.query.themeParkId
    );
  } else {
    await redirectToFirstAccommodation();
  }
});

// 첫 번째 숙박 시설과 테마 파크로 리디렉션
const redirectToFirstAccommodation = async () => {
  const accommodations = accommodationStore.accommodations;
  if (accommodations && accommodations.length > 0) {
    const firstAccommodationId = accommodations[0].id;
    await themeParkStore.fetchThemeParks(firstAccommodationId);
    const themeParks = themeParkStore.themeParks;
    const firstThemeParkId = themeParks?.length ? themeParks[0].id : null;

    await router.replace({
      name: "ThemeParkInfo",
      query: {
        accommodationId: firstAccommodationId,
        themeParkId: firstThemeParkId,
      },
    });
  }
};

// 숙박 시설 및 테마 파크 로드
const loadAccommodationAndThemePark = async (accommodationId, themeParkId) => {
  await accommodationStore.fetchAccommodationById(accommodationId);
  await themeParkStore.fetchThemeParks(accommodationId);
  await themeParkStore.fetchThemeParkById(accommodationId, themeParkId);
};

// 숙박 시설 ID 변경 시 테마 파크 업데이트
watch(
  () => route.query.accommodationId,
  async (newAccommodationId) => {
    if (newAccommodationId) {
      await loadAccommodationAndThemePark(
        newAccommodationId,
        route.query.themeParkId || themeParkStore.themeParks[0]?.id
      );
    }
  },
  { immediate: true }
);

// 테마 파크 ID 변경 시 업데이트
watch(
  () => route.query.themeParkId,
  async (newThemeParkId) => {
    if (newThemeParkId && route.query.accommodationId) {
      await themeParkStore.fetchThemeParkById(
        route.query.accommodationId,
        newThemeParkId
      );
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
