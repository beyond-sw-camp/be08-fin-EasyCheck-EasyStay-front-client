<template>
  <navbar-default :sticky="true" />
  <router-view />

  <!-- 맨 위로 이동 버튼 -->
  <button v-if="showScrollButton" class="scroll-to-top" @click="scrollToTop">
    ▲
  </button>
</template>

<script setup>
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { onMounted, watch, ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

// pinia 스토어
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

// 라우터 객체
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
      name: "ThemeParkInfo",
      query: {
        ...route.query,
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
