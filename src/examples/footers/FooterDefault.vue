<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
import { onMounted, ref } from "vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { RouterLink } from "vue-router";

defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "EasyStay",
      logo: logoDark,
      route: "/",
    }),
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/hanwhahotelandresort",
      },
      {
        icon: '<i class="fa fa-medium text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim",
      },
      {
        icon: '<i class="fab fa-instagram text-lg opacity-8"></i>',
        link: "https://www.instagram.com/hanwharesort_story",
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server",
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCPQPQLc6sbZgMBrL4EqwJWA",
      },
    ],
  },
});

// accommodationStore 사용 및 메뉴 기본 값 설정
const accommodationStore = useAccommodationStore();
const menus = ref([
  { name: "RESORTS", items: [] },
  { name: "HOTELS", items: [] },
  {
    name: "THEME PARKS",
    items: [
      { name: "워터파크", href: "" },
      { name: "아쿠아리움", href: "" },
      { name: "미술관", href: "" },
    ],
  },
  {
    name: "DEVELOPER",
    items: [
      { name: "Yongun Gye", href: "https://github.com/yongun2" },
      { name: "Nahyeon Kim", href: "https://github.com/NAHYEON0713" },
      { name: "Hoyeon Yun", href: "https://github.com/hoyeon96" },
      { name: "Jihoon Lim", href: "https://github.com/limjihoon99" },
      { name: "Jinjoo Jeong", href: "https://github.com/jeongjinjoo" },
    ],
  },
]);

// API 호출 및 메뉴 항목 설정
onMounted(async () => {
  await accommodationStore.fetchAccommodations();

  // API로부터 불러온 accommodations를 Resort와 Hotel로 분류
  menus.value[0].items = accommodationStore.accommodations
    .filter((item) => item.accommodationType === "RESORT")
    .map((resort) => ({ name: resort.name, href: `/accommodation/${resort.id}` }));

  menus.value[1].items = accommodationStore.accommodations
    .filter((item) => item.accommodationType === "HOTEL")
    .map((hotel) => ({ name: hotel.name, href: `/accommodation/${hotel.id}` }));
});
</script>

<template>
  <footer class="footer pt-7" style="background-color: #333">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" style="filter: brightness(0) invert(1)" />
            </a>
            <h6 class="font-weight-bolder mb-4 text-white">{{ brand.name }}</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li class="nav-item" v-for="{ icon, link } of socials" :key="link">
                <a class="nav-link pe-1 text-white" :href="link" target="_blank" v-html="icon">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 동적으로 생성된 메뉴 목록 -->
        <div class="col-md-2 col-sm-6 col-6 mb-4" v-for="{ name, items } of menus" :key="name">
          <h6 class="text-sm text-white">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item in items" :key="item.name">
              <RouterLink :to="item.href" class="nav-link text-white">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-white my-4 text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              EasyStay by
              <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server" target="_blank"
                class="text-white">EasyCheck</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.footer-logo {
  filter: brightness(0) invert(1);
}
</style>