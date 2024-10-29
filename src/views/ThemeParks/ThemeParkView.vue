<template>
  <div class="position-sticky z-index-sticky top-0">
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
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// pinia 스토어
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

// 라우터 객체
const route = useRoute();
const router = useRouter();

// 첫 번째 숙소와 테마파크로 리다이렉트하는 함수
const redirectToFirstAccommodation = async () => {
  const accommodations = accommodationStore.accommodations;
  if (accommodations && accommodations.length > 0) {
    // 첫 번째 숙소의 ID 가져오기
    const firstAccommodationId = accommodations[0].id;

    // 해당 숙소의 테마파크 정보 가져오기
    await themeParkStore.fetchThemeParks(firstAccommodationId);

    // 첫 번째 테마파크 ID 가져오기
    const themeParks = themeParkStore.themeParks;
    const firstThemeParkId =
      themeParks && themeParks.length > 0 ? themeParks[0].id : null;

    // 현재 경로에 쿼리 파라미터 추가하여 리다이렉트
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

onMounted(async () => {
  // 모든 숙박시설 조회
  await accommodationStore.fetchResortAccommodations();

  // accommodationId가 없는 경우 첫 번째 숙소로 리다이렉트
  if (!route.query.accommodationId) {
    await redirectToFirstAccommodation();
  }
});

// accommodationId가 바뀌는 경우
watch(
  () => route.query.accommodationId,
  async (newAccommodationId) => {
    if (newAccommodationId) {
      await accommodationStore.fetchAccommodationById(newAccommodationId);
      await themeParkStore.fetchThemeParks(newAccommodationId);

      // accommodationId가 변경되었는데 themeParkId가 없는 경우
      // 해당 숙소의 첫 번째 테마파크로 설정
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

// themeParkId 변경될 경우
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
