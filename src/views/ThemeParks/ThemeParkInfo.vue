<template>
  <div v-if="loading" class="spinner">로딩 중...</div>

  <MainImage class="min-vh-100" v-if="themePark && !loading" :themePark="themePark" />

  <div class="container">
    <section class="accommodation-tabs px-6 pt-4" v-if="accommodations.length && !loading">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="nav-wrapper position-relative end-0">
              <ul class="nav nav-tabs p-1 justify-content-center accommodation-nav-tabs" role="tablist">
                <li class="nav-item" v-for="accommodation in accommodations" :key="accommodation.id">
                  <transition name="fade">
                    <button class="nav-link px-4 py-2" :class="{
                      active: currentAccommodationId === accommodation.id,
                    }" @click="changeAccommodation(accommodation.id)" role="tab">
                      {{ accommodation.name }}
                    </button>
                  </transition>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="themepark-tabs px-6" v-if="themeParks.length && !loading">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="nav-wrapper position-relative end-0">
              <ul class="nav nav-tabs p-1 justify-content-center themepark-nav-tabs" role="tablist">
                <li class="nav-item" v-for="tab in themeParks" :key="tab.id">
                  <transition name="fade">
                    <button class="nav-link px-4 py-2" :class="{ active: tab.id === currentThemeParkId }"
                      @click="changeThemePark(tab.id)" role="tab">
                      {{ tab.name }}
                    </button>
                  </transition>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="container-fluid px-6" v-if="themePark && !loading">
    <AttractionInfo :themeParkId="Number(themePark.id)" :currentThemePark="themePark" />
  </div>

  <div class="container-fluid d-flex justify-content-center my-5" v-if="themePark?.ticketAvailable === 'Y' && !loading">
    <button @click="goToTicketSelectionView" class="reserve-btn">
      {{ themePark.name }} 이용권 구매하기
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import MainImage from "@/views/ThemeParks/MainImage.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";

const loading = ref(true);

const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();
const router = useRouter();
const route = useRoute();

const currentAccommodationId = computed(
  () => Number(route.query.accommodationId) || null
);
const currentThemeParkId = computed(() => {
  return Number(route.query.themeParkId) || themeParks.value[0]?.id || null;
});

onMounted(async () => {
  await accommodationStore.fetchResortAccommodations();
  loading.value = false;
});

const { accommodations } = storeToRefs(accommodationStore);
const { themeParks, themePark } = storeToRefs(themeParkStore);

const changeAccommodation = async (accommodationId) => {
  loading.value = true;
  await router.push({
    name: "ThemePark",
    query: {
      ...route.query,
      accommodationId: accommodationId,
    },
  });
  loading.value = false;
};

const changeThemePark = async (themeParkId) => {
  loading.value = true;
  await router.push({
    name: "ThemePark",
    query: {
      ...route.query,
      themeParkId: themeParkId,
    },
  });
  loading.value = false;
};

const goToTicketSelectionView = () => {
  router.push({
    name: "TicketSelection",
    query: {
      themeParkId: route.query.themeParkId,
      accommodationId: route.query.accommodationId,
    },
  });
};
</script>

<style scoped>
@media (min-width: 1400px) {

  .container {
    max-width: 1320px;
  }
}

/* 로딩 스피너 */
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #007bff;
  height: 100vh;
  overflow-x: hidden;
}

.accommodation-nav-tabs,
.themepark-nav-tabs {
  background-color: transparent;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
  padding: 0;
  max-width: 100%;
  overflow-x: hidden;
}

.nav-item {
  margin: 0 1rem;
}

.nav-link {
  color: #6c757d;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  border: none;
  position: relative;
  background: transparent;
  border-radius: none !important;
}

.nav-link.active {
  color: #000;
  font-weight: 600;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff4500;
  /* 빨간색 밑줄 */
}

.nav-link:hover {
  transform: scale(1.03);
}

.section-divider {
  height: 2px;
  background: linear-gradient(to right, #007bff, #ff0000);
  margin: 3rem 0;
  max-width: 100%;
  overflow-x: hidden;
}

.reserve-btn {
  text-align: center;
  padding: 15px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  margin: 4rem 0;
  background-color: #e74c3c;
  color: #fff;
  border: none;
}

@media (max-width: 768px) {
  .nav-link {
    padding: 8px 16px;
    font-size: 1rem;
  }

  .reserve-btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
