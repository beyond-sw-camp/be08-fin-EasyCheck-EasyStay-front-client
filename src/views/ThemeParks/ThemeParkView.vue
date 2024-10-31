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

const loadAccommodationAndThemePark = async (accommodationId, themeParkId) => {
  await accommodationStore.fetchAccommodationById(accommodationId);
  await themeParkStore.fetchThemeParks(accommodationId);
  await themeParkStore.fetchThemeParkById(accommodationId, themeParkId);
};

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

<style scoped>
/* 페이지 전체에서 X축 스크롤 방지 */
body {
  overflow-x: hidden;
}
</style>
