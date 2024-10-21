<template>
  <NavbarDefault :sticky="true" />
  <MainImage :themeParkName="themeParks[currentThemeParkIndex].name" />

  <section class="px-8 py-4">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-tabs p-1 justify-content-center" role="tablist">
              <li
                class="nav-item"
                v-for="(themePark, index) in themeParks"
                :key="index"
              >
                <button
                  class="nav-link px-4 py-2"
                  :class="{ active: currentThemeParkIndex === index }"
                  @click="changeThemePark(index)"
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
    <AttractionInfo :themeParkId="themeParks[currentThemeParkIndex].id" />
  </div>

  <div
    class="container-fluid d-flex justify-content-center my-5"
    v-if="themeParks[currentThemeParkIndex].ticketAvailable"
  >
    <MaterialButton
      color="danger"
      size="lg"
      variant="gradient"
      @click="goToTicketOrderView"
    >
      {{ themeParks[currentThemeParkIndex].name }} 이용권 구매하기
    </MaterialButton>
  </div>

  <div class="section-divider my-4"></div>
  <NoticeInfo
    class="px-8"
    :themeParkName="themeParks[currentThemeParkIndex].name"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MainImage from "@/views/ThemeParks/MainImage.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NoticeInfo from "@/views/ThemeParks/NoticeInfo.vue";

const themeParks = ref([
  { id: 1, name: "설악 워터피아", ticketAvailable: true },
  { id: 2, name: "인피니티 풀", ticketAvailable: false },
  { id: 3, name: "라라키즈 어드벤처", ticketAvailable: false },
  { id: 4, name: "미니 골프 포렌드", ticketAvailable: false },
]);

const currentThemeParkIndex = ref(0);

const changeThemePark = (index) => {
  currentThemeParkIndex.value = index;
};

const router = useRouter();

const goToTicketOrderView = () => {
  const themePark = themeParks.value[currentThemeParkIndex.value];
  if (themePark) {
    router.push({
      name: "TicketOrderView",
      params: { themeParkId: themePark.id },
    });
  } else {
    console.error("Invalid theme park index or theme park data not available.");
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
