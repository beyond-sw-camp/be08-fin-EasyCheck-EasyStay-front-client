<template>
  <NavbarDefault :sticky="true" />
  <MainImage v-if="themePark != null" :themePark="themePark" />

  <section class="accommodation-tabs px-8 pt-4" v-if="accommodations.length">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav-wrapper position-relative end-0">
            <ul
              class="nav nav-tabs p-1 justify-content-center accommodation-nav-tabs"
              role="tablist"
            >
              <li
                class="nav-item"
                v-for="accommodation in accommodations"
                :key="accommodation.id"
              >
                <button
                  class="nav-link px-4 py-2"
                  :class="{
                    active: currentAccommodationId === accommodation.id,
                  }"
                  @click="changeAccommodation(accommodation.id)"
                  role="tab"
                >
                  {{ accommodation.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="themepark-tabs px-8" v-if="themeParks.length">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav-wrapper position-relative end-0">
            <ul
              class="nav nav-tabs p-1 justify-content-center themepark-nav-tabs"
              role="tablist"
            >
              <li class="nav-item" v-for="tab in themeParks" :key="tab.id">
                <button
                  class="nav-link px-4 py-2"
                  :class="{ active: tab.id === themePark.id }"
                  @click="changeThemePark(tab.id)"
                  role="tab"
                >
                  {{ tab.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container-fluid px-8">
    <div class="section-divider"></div>
    <AttractionInfo
      v-if="themePark != null"
      :themeParkId="Number(themePark.id)"
      :currentThemePark="themePark"
    />
  </div>

  <div
    class="container-fluid d-flex justify-content-center my-5"
    v-if="themePark?.ticketAvailable"
  >
    <MaterialButton
      color="danger"
      size="lg"
      variant="gradient"
      @click="goToTicketSelectionView"
      class="mx-3"
    >
      {{ themePark.name }} 이용권 구매하기
    </MaterialButton>
  </div>

  <div class="section-divider my-4"></div>
  <NoticeInfo
    v-if="themePark != null"
    class="px-8"
    :themeParkName="themePark.name"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MainImage from "@/views/ThemeParks/MainImage.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NoticeInfo from "@/views/ThemeParks/NoticeInfo.vue";

// pinia 스토어
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

// 라우터 객체
const router = useRouter();
const route = useRoute();

// 현재 선택한 숙박시설 식별자
const currentAccommodationId = ref(Number(route.query.accommodationId));
// 현재 선택한 테마파크 식별자
const currentThemeParkId = ref(Number(route.query.currentThemeParkId) || null);

onMounted(async () => {
  // 모든 숙박시설 조회
  await accommodationStore.fetchResortAccommodations();

  await fetchThemeParksData();
  // handleInitialThemeParkSelection();
});

// pinia 스토어에서 fetch 받은 accommodations 받아오기
const { accommodations } = storeToRefs(accommodationStore);
const { themeParks, themePark } = storeToRefs(themeParkStore);

console.log(themePark);

const fetchThemeParksData = async () => {
  await themeParkStore.fetchThemeParks(currentAccommodationId.value);

  if (!currentThemeParkId.value && themeParks.value.length > 0) {
    currentThemeParkId.value = themeParks[0].id;
    themeParkStore.setCurrentThemeParkById(currentThemeParkId.value);
  }
};

// accommodationId가 바뀌는 경우
// accommodation fetch
watch(
  () => route.query.accommodationId,
  async (newAccommodationId) => {
    currentAccommodationId.value = Number(newAccommodationId);
    await accommodationStore.fetchAccommodationById(newAccommodationId);
  },
  { immediate: true }
);

// themeParkId 변경될 경우
// 다시 해당 테마파크 정보 fetch
watch(
  () => route.query.themeParkId,
  (newThemeParkId) => {
    console.log("watch");

    currentThemeParkId.value = Number(newThemeParkId) || null;
    themeParkStore.fetchThemeParkById(
      route.query.accommodationId,
      newThemeParkId
    );
  },
  { immediate: true }
);

const handleInitialThemeParkSelection = () => {
  if (currentThemeParkId.value) {
    themeParkStore.setCurrentThemeParkById(currentThemeParkId.value);
  } else if (themeParks.value.length > 0) {
    currentThemeParkId.value = themeParks.value[0].id;
    themeParkStore.setCurrentThemeParkById(currentThemeParkId.value);
  }
};

const currentThemePark = computed(() => {
  return (
    themeParks.value.find((park) => park.id === currentThemeParkId.value) ||
    null
  );
});

// 숙박 시설 변경
const changeAccommodation = async (accommodationId) =>
  router.push({
    name: "ThemePark",
    query: {
      ...route.query,
      accommodationId: accommodationId,
    },
  });

// 테마파크 변경
const changeThemePark = (themeParkId) =>
  router.push({
    name: "ThemePark",
    query: {
      ...route.query,
      themeParkId: themeParkId,
    },
  });

const goToTicketSelectionView = () =>
  router.push({
    name: "TicketSelection",
    query: {
      themeParkId: route.query.themeParkId,
      accommodationId: route.query.accommodationId,
    },
  });
</script>

<style scoped>
.accommodation-nav-tabs {
  background-color: #f8f9fa;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

.accommodation-nav-tabs .nav-link {
  color: #495057;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.accommodation-nav-tabs .nav-link.active {
  background-color: #ffffff;
  color: #007bff;
  border-bottom: 3px solid #ff0000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.themepark-nav-tabs {
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}

.themepark-nav-tabs .nav-link {
  color: #333333;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.themepark-nav-tabs .nav-link.active {
  background-color: #ffebcd;
  color: #333333;
  border-bottom: 2px solid #007bff;
  box-shadow: none;
}

.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ccc, transparent);
  margin: 3rem 0;
  position: relative;
}

.section-divider::before {
  content: "●";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: #ccc;
  padding: 0 10px;
  font-size: 0.8rem;
}

.nav-wrapper {
  padding: 0.5rem 0;
}

.nav-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.nav-item {
  text-align: center;
}

.nav-link {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
