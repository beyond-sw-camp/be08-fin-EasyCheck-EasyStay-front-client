<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { userLoginStore } from "@/stores/loginStore.js";
import LogoImg from "@/assets/img/logos/logo.png";
import { useAccommodationStore } from "@/stores";
import { useHeaderStore } from "@/stores/headerStore"; // headerStore import

// props를 통해 네비게이션의 외형이나 메뉴 항목 등을 동적으로 설정할 수 있음.
const props = defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// pinia 스토어
const headerStore = useHeaderStore();
const useUserLoginStore = userLoginStore();
const accommodationStore = useAccommodationStore();

const router = useRouter();
let isScrolled = ref(false);

// isMenuVisible을 store에서 가져오도록 변경
const isMenuVisible = computed(() => headerStore.getMenuState);

const menus = ref([
  { name: "리조트 안내", items: [] },
  { name: "호텔 안내", items: [] },
  {
    name: "이용안내",
    items: [
      { name: "테마파크", href: "/themepark" },
      { name: "이벤트", href: "/eventsListView" },
      { name: "공지사항", href: "/noticesListView" },
      { name: "건의사항", href: "/suggestionsListView" },
    ],
  },
]);

const textDark = ref(props.darkText);
const { type } = useWindowsWidth();

// API 호출 및 메뉴 항목 설정
onMounted(async () => {
  await accommodationStore.fetchAccommodations();

  // API로부터 불러온 accommodations를 Resort와 Hotel로 분류
  menus.value[0].items = accommodationStore.accommodations
    .filter((item) => item.accommodationType === "RESORT")
    .map((resort) => ({
      name: resort.name,
      href: `/accommodation/${resort.id}`,
    }));

  menus.value[1].items = accommodationStore.accommodations
    .filter((item) => item.accommodationType === "HOTEL")
    .map((hotel) => ({
      name: hotel.name,
      href: `/accommodation/${hotel.id}`,
    }));
});

const toggleMenu = () => {
  headerStore.toggleMenu(); // headerStore의 toggleMenu action 사용
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const handleReservationClick = () => {
  console.log("로그인 상태:", useUserLoginStore.isLoggedIn);
  router.push({ name: "Reservation" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // 페이지 전환 시 메뉴를 닫는 로직
  router.beforeEach((to, from, next) => {
    headerStore.closeMenu(); // headerStore의 closeMenu action 사용
    next();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const getTextColor = () => {
  return isScrolled.value || headerStore.getMenuState
    ? "text-white"
    : "text-dark";
};

watch(
  () => type.value,
  (newValue) => {
    textDark.value = newValue === "mobile";
  }
);
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0 py-3"
    :class="{
      'z-index-3 w-100 position-absolute my-3': props.transparent,
      'z-index-3 py-2 start-0 end-0 position-absolute': props.sticky,
      'navbar-light bg-white py-3': !isScrolled && props.light,
      'navbar-dark  z-index-3 py-3': props.dark || isScrolled || isMenuVisible, // 메뉴가 열렸을 때도 배경색 변경
      'bg-transparent-black': isScrolled,
    }"
  >
    <div class="container">
      <RouterLink
        class="navbar-brand"
        :class="[
          getTextColor(), // 수정된 부분
          isScrolled
            ? 'text-white font-weight-bolder ms-sm-3'
            : 'text-dark font-weight-bolder ms-sm-3',
        ]"
        :to="{ name: 'presentation' }"
        rel="tooltip"
        title="Designed and Coded by EasyCheck"
      >
        <img :src="LogoImg" alt="Logo" class="navbar-logo me-2" />
        EasyStay
      </RouterLink>
      <ul class="navbar-nav navbar-nav-hover align-items-center d-lg-none">
        <li class="nav-item mx-2">
          <button
            @click="handleReservationClick"
            class="reservation-btn btn btn-sm mb-0 ms-auto d-lg-none d-block"
          >
            <i class="material-icons opacity-6 me-2 text-md">calendar_today</i
            >Reservation
          </button>
        </li>
      </ul>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto align-items-center">
          <li v-if="useUserLoginStore.isLoggedIn" class="nav-item mx-2">
            <RouterLink
              :to="{ name: 'Mypage' }"
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >person</i
              >
              MyPage
            </RouterLink>
          </li>
          <li v-else class="nav-item mx-2">
            <RouterLink
              :to="{ name: 'login' }"
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >login</i
              >
              Sign In / Sign Up
            </RouterLink>
          </li>
          <li v-if="useUserLoginStore.isLoggedIn" class="nav-item mx-2">
            <RouterLink
              :to="{ name: 'logout' }"
              role="button"
              @click="useUserLoginStore.logout"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >logout</i
              >
              Sign Out
            </RouterLink>
          </li>
          <li class="nav-item mx-2">
            <button
              @click="handleReservationClick"
              class="reservation-btn btn btn-sm mb-0 ms-auto"
            >
              <i class="material-icons opacity-6 me-2 text-md">calendar_today</i
              >Reservation
            </button>
          </li>

          <!-- 네비게이션 토글 버튼 -->
          <li class="nav-item mx-2">
            <button
              class="navbar-toggler d-lg-block"
              type="button"
              @click="toggleMenu"
            >
              <span class="navbar-toggler-icon mt-2">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </span>
            </button>

            <div
              id="nav-menu"
              class="nav-menu"
              :class="{ active: headerStore.getMenuState }"
              v-show="headerStore.getMenuState"
            >
              <div class="menu-grid">
                <div class="grid-header">
                  <div
                    class="col-md-6 col-sm-6 col-6 mb-4 text-center"
                    v-for="{ name, items } of menus"
                    :key="name"
                  >
                    <h6 class="text-sm text-white">{{ name }}</h6>
                    <ul class="nav-list justify-content-center">
                      <li
                        class="nav-item"
                        v-for="item of items"
                        :key="item.name"
                      >
                        <RouterLink class="nav-link text-white" :to="item.href">
                          {{ item.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (max-width: 991px) {
  .navbar-expand-lg .navbar-nav {
    flex-direction: row;
  }
}

.bg-transparent-black {
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(5px) !important;
}

.navbar-logo {
  width: 30px;
  /* 로고 이미지 크기 설정 */
  height: auto;
}

.navbar-brand {
  font-size: 1.2rem !important;
}

/* .nav-link,
.reservation-btn {
  font-size: 1rem !important;
} */

.navbar .nav-link:hover {
  opacity: 0.7;
}

.reservation-btn {
  background-color: black !important;
  color: white !important;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.btn {
  font-weight: 0 !important;
}

.reservation-btn:hover {
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: white !important;
}

.navbar-toggler {
  border: none !important;
}

.navbar-toggler .navbar-toggler-bar {
  width: 30px !important;
  height: 1.5px !important;
  background: white !important;
}

.nav-menu {
  position: absolute;
  top: 100;
  /* 헤더 바로 아래에 위치 */
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  z-index: 9999;
  /* 화면 맨 앞에 고정 */
  justify-content: center;
  text-align: center;
}

.nav-menu.active {
  background-color: rgba(0, 0, 0, 0.7);
  margin-top: 17.046874px; /* 메뉴가 네비게이션 바 아래로 이동 */
  padding-top: 30px; /* 상단 패딩을 줄여서 높이 조정 */
}

.menu-grid {
  display: grid;
  padding: 1px;
  top: 10px;
  left: 10;
  right: 10;
  place-items: center;
  grid-template-columns: repeat(3, 1fr); /* 3열로 나누기 */
  grid-gap: 5px; /* 항목 간의 간격 */
  justify-content: center;
  text-align: center;
  align-items: flex-start; /* 상단 정렬 */
}
.menu-grid > div {
  /* 그리드 항목을 감싸고 있는 div에 적용 */
  margin-top: 50px; /* 항목을 아래로 띄우기 위해 마진 추가 */
}

.grid-header {
  display: contents;
  /* 그리드 레이아웃에 맞게 배치 */
  font-weight: bold;
  /* 제목 강조 */
  text-align: center;
  /* 제목 가운데 정렬 */
  color: white;
  /* 제목 텍스트 색 */
  margin-bottom: 20px;
  /* 제목과 메뉴 항목 간의 간격 */
  justify-content: center;
}

.grid-header div {
  position: relative;
  /* 경계선 위치 조정을 위해 상대적으로 설정 */
  padding-top: 20px;
  /* 선과 텍스트 간의 간격 */
}

.grid-header div::before {
  content: "";
  /* 경계선 생성 */
  position: absolute;
  top: 0; /* 제목 위에 위치 */
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 80%; /* 경계선 길이 */
  height: 1px; /* 경계선 두께 */
  background-color: white; /* 경계선 색 */
}

.menu-grid a {
  display: block;
  padding: 10px;
  color: white;
  /* 항목 텍스트 색 */
  text-align: center;
  /* 텍스트 가운데 정렬 */
  border-radius: 5px;
  /* 항목 둥글게 만들기 */
  transition: background-color 0.3s;
  /* 호버 효과를 위한 전환 */
  justify-content: center;
}

.menu-grid a:hover {
  background-color: rgba(255, 255, 255, 0.3);
  /* 호버 시 배경색 변경 */
}

.nav-list {
  padding-left: 0 !important;
}

.nav-item {
  list-style-type: none !important;
}
</style>
