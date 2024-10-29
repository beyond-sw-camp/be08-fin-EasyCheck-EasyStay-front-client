<template>
  <section class="py-2">
    <div class="row">
      <div class="col">
        <div class="nav-wrapper position-relative w-lg-50 w-sm-75 end-0">
          <ul class="nav nav-pills nav-fill" role="tablist" ref="navPillsRef">
            <li
              class="nav-item pe-3"
              v-for="(tab, index) in accommodationTabs"
              :key="index"
            >
              <a
                class="nav-link mb-0 px-0"
                :class="{ active: accommodationId === tab.accommodationId }"
                :aria-selected="accommodationId === tab.accommodationId"
                @click="onClickTab(index, tab.accommodationId, tab.name)"
              >
                {{ tab.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";

import { useReservationStore } from "@/stores/reservationStore.js";

const reservationStore = useReservationStore();

const { accommodationTabs, accommodationId } = storeToRefs(reservationStore);

const navPillsRef = ref(null);

const movingTabStyle = ref({
  transform: "translate3d(0px, 0px, 0px)",
  transition: ".5s ease",
  width: "0px",
});

const updateMovingTabPosition = () => {
  if (!navPillsRef.value) return;

  const activeTab = navPillsRef.value.querySelector(".nav-link.active");
  if (!activeTab) return;

  const tabWidth = activeTab.offsetWidth;
  const tabPosition = activeTab.offsetLeft;

  movingTabStyle.value = {
    transform: `translate3d(${tabPosition}px, 0px, 0px)`,
    transition: ".5s ease",
    width: `${tabWidth}px`,
  };
};

const onClickTab = (index, accommodationId, accommodationName) => {
  reservationStore.setAccommodationId(accommodationId);
  reservationStore.setAccommodationName(accommodationName);
  // 검색한 객실, 체크인, 체크아웃 날짜 초기화
  reservationStore.resetRoomSelection();
  reservationStore.resetReservationForm();
  reservationStore.initCheckInCheckOut();
};

watch(updateMovingTabPosition);

onMounted(() => {
  updateMovingTabPosition();
  window.addEventListener("resize", updateMovingTabPosition);
});

const isFlexColumn = computed(() => {
  return window.innerWidth < 991;
});

watch(isFlexColumn, (newValue) => {
  if (newValue) {
    navPillsRef.value?.classList.remove("flex-row");
    navPillsRef.value?.classList.add("flex-column", "on-resize");
  } else {
    navPillsRef.value?.classList.remove("flex-column", "on-resize");
    navPillsRef.value?.classList.add("flex-row");
  }
  updateMovingTabPosition();
});
</script>

<style scoped>
.moving-tab {
  padding: 0px;
  transition: 0.5s ease;
}

.nav-pills {
  position: relative;
}
</style>
