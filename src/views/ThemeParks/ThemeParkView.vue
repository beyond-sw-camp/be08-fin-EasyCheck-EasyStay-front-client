<template>
  <NavbarDefault :sticky="true" />
  <MainImage v-if="currentThemePark" :themePark="currentThemePark" />

  <section class="px-8 py-4" v-if="themeParks.length">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-tabs p-1 justify-content-center" role="tablist">
              <li
                class="nav-item"
                v-for="themePark in themeParks"
                :key="themePark.id"
              >
                <button
                  class="nav-link px-4 py-2"
                  :class="{ active: currentThemeParkId === themePark.id }"
                  @click="changeThemePark(themePark.id)"
                  role="tab"
                >
                  {{ themePark.name }}
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
      v-if="currentThemePark"
      :themeParkId="currentThemePark.id"
      :currentThemePark="currentThemePark"
    />
  </div>

  <div
    class="container-fluid d-flex justify-content-center my-5"
    v-if="currentThemePark?.ticketAvailable"
  >
    <MaterialButton
      color="danger"
      size="lg"
      variant="gradient"
      @click="goToTicketSelectionView"
      class="mx-3"
    >
      {{ currentThemePark.name }} 이용권 구매하기
    </MaterialButton>
  </div>

  <div class="section-divider my-4"></div>
  <NoticeInfo
    v-if="currentThemePark"
    class="px-8"
    :themeParkName="currentThemePark.name"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useThemeParkStore } from "@/stores/themeparkStore";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MainImage from "@/views/ThemeParks/MainImage.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NoticeInfo from "@/views/ThemeParks/NoticeInfo.vue";

const themeParkStore = useThemeParkStore();
const router = useRouter();
const route = useRoute();

const accommodationId = 1;
const currentThemeParkId = ref(parseInt(route.params.themeParkId, 10) || null);

onMounted(async () => {
  await themeParkStore.fetchThemeParks(accommodationId);
  if (Array.isArray(themeParks.value) && themeParks.value.length > 0) {
    if (!currentThemeParkId.value) {
      currentThemeParkId.value = themeParks.value[0].id;
    }
  }
});

const themeParks = computed(() =>
  Array.isArray(themeParkStore.themeParks) ? themeParkStore.themeParks : []
);

const currentThemePark = computed(() => {
  return (
    themeParks.value.find((park) => park.id === currentThemeParkId.value) || null
  );
});

const changeThemePark = (themeParkId) => {
  if (themeParks.value.some((park) => park.id === themeParkId)) {
    currentThemeParkId.value = themeParkId;
    router.push({
      name: "ThemePark",
      params: { themeParkId: themeParkId },
    });
  } else {
    console.error("Invalid theme park id");
  }
};

const goToTicketSelectionView = () => {
  if (currentThemePark.value) {
    router.push({
      name: "TicketSelection",
      params: { themeParkId: currentThemePark.value.id },
    });
  } else {
    console.error("Invalid theme park data not available.");
  }
};
</script>

<style scoped>
.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ccc, transparent);
  margin: 3rem 0;
  position: relative;

  &::before {
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
}

.nav-wrapper {
  padding: 0.5rem 0;
}

.nav-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  justify-content: center;
}

.nav-item {
  flex: 1 1 auto;
  min-width: 120px;
  max-width: calc(100% / 3);
  text-align: center;
}

.nav-link {
  color: #343a40;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
}

.nav-link.active {
  background-color: #007bff;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
