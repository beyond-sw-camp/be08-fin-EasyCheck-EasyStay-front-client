<template>
  <section class="py-2">
    <div class="row">
      <div class="col">
        <div class="nav-wrapper position-relative w-lg-50 w-sm-75 end-0">
          <ul
            class="nav nav-pills nav-fill"
            role="tablist"
            ref="navPillsRef"
            :class="navClasses"
          >
            <li
              v-for="(tab, index) in accommodationTabs"
              :key="tab.accommodationId"
              class="nav-item pe-3"
            >
              <a
                class="nav-link mb-0 px-0"
                :class="{
                  active: currentAccommodationId === tab.accommodationId,
                }"
                :aria-selected="currentAccommodationId === tab.accommodationId"
                role="tab"
                @click="handleTabClick(index, tab)"
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
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useReservationStore } from "@/stores/reservationStore.js";

// Store initialization
const reservationStore = useReservationStore();
const { accommodationTabs, currentAccommodationId } =
  storeToRefs(reservationStore);

// Template refs
const navPillsRef = ref(null);

// Styles
const movingTabStyle = ref({
  transform: "translate3d(0px, 0px, 0px)",
  transition: ".5s ease",
  width: "0px",
});

// Computed
const isFlexColumn = computed(() => window.innerWidth < 991);

const navClasses = computed(() => ({
  "flex-column on-resize": isFlexColumn.value,
  "flex-row": !isFlexColumn.value,
}));

// Methods
const updateMovingTabPosition = () => {
  const activeTab = navPillsRef.value?.querySelector(".nav-link.active");
  if (!activeTab) return;

  const tabWidth = activeTab.offsetWidth;
  const tabPosition = activeTab.offsetLeft;

  movingTabStyle.value = {
    transform: `translate3d(${tabPosition}px, 0px, 0px)`,
    transition: ".5s ease",
    width: `${tabWidth}px`,
  };
};

const handleTabClick = (index, tab) => {
  reservationStore.accommodation = {
    id: tab.accommodationId,
    name: tab.name,
  };

  // Reset related states
  reservationStore.resetReservation();
  reservationStore.initializeReservation();
};

// Lifecycle hooks and watchers
onMounted(() => {
  updateMovingTabPosition();
  window.addEventListener("resize", updateMovingTabPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMovingTabPosition);
});

watch(() => currentAccommodationId.value, updateMovingTabPosition);

watch(isFlexColumn, updateMovingTabPosition);
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
