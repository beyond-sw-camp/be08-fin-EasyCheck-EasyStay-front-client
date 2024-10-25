<template>
  <NavbarDefault :sticky="true" />
  <MainImage v-if="currentThemePark" :themePark="currentThemePark" />

  <section class="accommodation-tabs px-8 py-4" v-if="accommodations.length">
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

  <section class="themepark-tabs px-8 py-4" v-if="themeParks.length">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav-wrapper position-relative end-0">
            <ul
              class="nav nav-tabs p-1 justify-content-center themepark-nav-tabs"
              role="tablist"
            >
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
      :themeParkId="Number(currentThemePark.id)"
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
import { ref, onMounted, computed, watch, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MainImage from "@/views/ThemeParks/MainImage.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NoticeInfo from "@/views/ThemeParks/NoticeInfo.vue";

// props에서 themeParkId를 받아오기
const props = defineProps({
  themeParkId: {
    type: [String, Number],
    required: true,
  }
});

const accommodations = ref([]);
const themeParks = ref([]);

const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();
const router = useRouter();
const route = useRoute();

const currentAccommodationId = ref(1);
const currentThemeParkId = ref(Number(props.themeParkId) || parseInt(route.params.themeParkId, 10) || null);

onMounted(async () => {
  await accommodationStore.fetchResortAccommodations();
  accommodations.value = accommodationStore.accommodations || [];
  fetchThemeParksData();
});

watch(
  () => route.params.themeParkId,
  (newId) => {
    currentThemeParkId.value = parseInt(newId, 10);
    fetchThemeParksData();
  }
);

const fetchThemeParksData = async () => {
  await themeParkStore.fetchThemeParks(currentAccommodationId.value);
  themeParks.value = themeParkStore.themeParks || [];
  if (themeParks.value.length > 0 && !currentThemeParkId.value) {
    currentThemeParkId.value = themeParks.value[0].id;
  }
};

const currentThemePark = computed(() => {
  return (
    themeParks.value.find((park) => park.id === currentThemeParkId.value) ||
    null
  );
});

const changeAccommodation = async (accommodationId) => {
  currentAccommodationId.value = accommodationId;
  fetchThemeParksData();
};

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
      params: {
        themeParkId: Number(currentThemePark.value.id),
        themeParkName: currentThemePark.value.name,
      },
    });
  } else {
    console.error("Invalid theme park data not available.");
  }
};
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
