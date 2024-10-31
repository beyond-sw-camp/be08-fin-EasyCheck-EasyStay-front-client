<template>
  <navbar-default :sticky="true" />
  <router-view />

  <!-- 맨 위로 이동 버튼 -->
  <button v-if="showScrollButton" class="scroll-to-top" @click="scrollToTop">
    ▲
  </button>
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { onMounted, watch, ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

const route = useRoute();
const router = useRouter();

// 맨 위로 이동 버튼 상태
const showScrollButton = ref(false);

// 스크롤 위치 감시
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300;
};

// 맨 위로 이동 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 초기 로드 설정
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

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

onBeforeUnmount(() => {
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
/* 작은 원형 맨 위로 이동 버튼 */
.scroll-to-top {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background-color: rgba(0, 123, 255, 0.6); /* 반투명한 배경 */
  color: white;
  border: none;
  border-radius: 50%; /* 완전한 원형 */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 가벼운 그림자 */
}

.scroll-to-top:hover {
  background-color: rgba(0, 123, 255, 0.85); /* 마우스오버 시 색상 강조 */
  transform: scale(1.1); /* 약간 확대 */
}
</style>
