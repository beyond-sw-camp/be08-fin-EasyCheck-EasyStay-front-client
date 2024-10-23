<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark fixed-top py-2"
    :class="{ 'mobile-view': isMobileView }"
  >
    <div class="container-fluid">
      <div
        class="d-flex justify-content-between align-items-stretch w-100"
        :class="{ 'flex-column': isMobileView }"
      >
        <div class="navbar-item" :class="{ card: !isMobileView }">
          <div :class="{ 'card-body': !isMobileView }">
            <small class="text-secondary" v-if="!isMobileView">지점</small>
            <div class="d-flex align-items-center">
              <span class="navbar-text me-2 text-light" v-if="isMobileView"
                >지점</span
              >
              <h6 class="mb-0">롯데리조트속초</h6>
              <i
                class="bi bi-pencil-square text-secondary ms-2"
                v-if="!isMobileView"
              ></i>
            </div>
          </div>
        </div>
        <div class="navbar-item" :class="{ card: !isMobileView }">
          <div :class="{ 'card-body': !isMobileView }">
            <small class="text-secondary" v-if="!isMobileView">투숙 기간</small>
            <div class="d-flex align-items-center">
              <span class="navbar-text me-2 text-light" v-if="isMobileView"
                >투숙 기간</span
              >
              <h6 class="mb-0">
                2024.10.18
                <span class="badge rounded-pill">1박</span> 2024.10.19
              </h6>
              <i
                class="bi bi-pencil-square text-secondary ms-2"
                v-if="!isMobileView"
              ></i>
            </div>
          </div>
        </div>
        <div class="navbar-item" :class="{ card: !isMobileView }">
          <div :class="{ 'card-body': !isMobileView }">
            <small class="text-secondary" v-if="!isMobileView">객실 수</small>
            <div class="d-flex align-items-center">
              <span class="navbar-text me-2 text-light" v-if="isMobileView"
                >객실 수</span
              >
              <h6 class="mb-0">1실</h6>
              <i
                class="bi bi-pencil-square text-secondary ms-2"
                v-if="!isMobileView"
              ></i>
            </div>
          </div>
        </div>
        <div class="navbar-item" :class="{ card: !isMobileView }">
          <div :class="{ 'card-body': !isMobileView }">
            <small class="text-secondary" v-if="!isMobileView"
              >총 금액(VAT 포함)</small
            >
            <div class="d-flex align-items-center">
              <span class="navbar-text me-2 text-light" v-if="isMobileView"
                >총 금액(VAT 포함)</span
              >
              <h6 class="mb-0 text-danger">0 원</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobileView = ref(window.innerWidth < 768);

const checkMobileView = () => {
  isMobileView.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", checkMobileView);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobileView);
});
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0;
  background-color: #2b2b2b;
}

.navbar-item {
  flex: 1;
  margin: 1rem;
  &:last-child {
    margin-right: 0;
  }
}

.card {
  background-color: #363636;
  border: none;
  border-radius: 0;
  height: 100%;
}

.card-body {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

small {
  font-size: 0.75rem;
}

h6 {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0;
}

.badge {
  background-color: #4a4a4a;
  color: white;
  font-weight: normal;
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
}

.bi-pencil-square {
  font-size: 0.9rem;
  cursor: pointer;
}

.mobile-view {
  .navbar-item {
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: transparent;
  }

  .navbar-text {
    font-size: 0.75rem;
  }

  h6 {
    font-size: 0.8rem;
  }

  .badge {
    font-size: 0.7rem;
  }
}

@media (max-width: 767px) {
  .d-flex {
    flex-direction: column;
  }

  .navbar-item {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
