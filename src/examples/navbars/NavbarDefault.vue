<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { userLoginStore } from "@/stores/loginStore.js";
import LogoImg from "@/assets/img/logos/logo-ct-dark.png";

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

const router = useRouter();
const useUserLoginStore = userLoginStore();
let isScrolled = ref(false);
let isMenuVisible = ref(false); // 메뉴의 보임 상태 관리

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value; // 메뉴 상태 토글
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const handleReservationClick = () => {
  console.log("로그인 상태:", useUserLoginStore.isLoggedIn);

  if (!useUserLoginStore.isLoggedIn) {
    alert("로그인을 하세요.");
    router.push({ name: "login" });
  } else {
    router.push({ name: "Reservation" });
  }
};

onMounted(() => {
  // loadScrollState();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const getTextColor = () => {
  return isScrolled.value || isMenuVisible.value ? "text-white" : "text-dark"; // 메뉴가 열렸을 때도 텍스트 색 변경
};
let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

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
            <div id="nav-menu" class="nav-menu" v-show="isMenuVisible">
              <div class="menu-grid">
                <!-- 제목 행 추가 -->
                <div class="grid-header">
                  <div>리조트 안내</div>
                  <div>호텔 안내</div>
                  <div>이용 안내</div>
                  <div>고객 센터</div>
                </div>
                <!-- 메뉴 항목 -->
                <RouterLink to="/accommodation/1" @click="isMenuVisible = false"
                  >Section 1</RouterLink
                >
                <RouterLink to="/accommodation/2" @click="isMenuVisible = false"
                  >Section 2</RouterLink
                >
                <RouterLink to="/accommodation/3" @click="isMenuVisible = false"
                  >Section 3</RouterLink
                >
                <RouterLink to="/accommodation/2" @click="isMenuVisible = false"
                  >Section 4</RouterLink
                >
                <RouterLink to="/section5" @click="isMenuVisible = false"
                  >Section 5</RouterLink
                >
                <RouterLink to="/accommodation/3" @click="isMenuVisible = false"
                  >Section 6</RouterLink
                >
                <RouterLink to="/section7" @click="isMenuVisible = false"
                  >Section 7</RouterLink
                >
                <RouterLink to="/section8" @click="isMenuVisible = false"
                  >Section 8</RouterLink
                >
                <RouterLink to="/section8" @click="isMenuVisible = false"
                  >Section 9</RouterLink
                >
                <RouterLink to="/section10" @click="isMenuVisible = false"
                  >Section 10</RouterLink
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
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

.nav-link,
.reservation-btn {
  font-size: 1rem !important;
}

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
  top: 100%; /* 헤더 바로 아래에 위치 */
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  z-index: 9999; /* 화면 맨 앞에 고정 */
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열로 나누기 */
  grid-gap: 10px; /* 항목 간의 간격 */
}

.grid-header {
  display: contents; /* 그리드 레이아웃에 맞게 배치 */
  font-weight: bold; /* 제목 강조 */
  text-align: center; /* 제목 가운데 정렬 */
  color: white; /* 제목 텍스트 색 */
  margin-bottom: 10px; /* 제목과 메뉴 항목 간의 간격 */
}

.grid-header div {
  position: relative; /* 경계선 위치 조정을 위해 상대적으로 설정 */
  padding-top: 10px; /* 선과 텍스트 간의 간격 */
}

.grid-header div::before {
  content: ""; /* 경계선 생성 */
  position: absolute;
  top: 0; /* 제목 위에 위치 */
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 80%; /* 경계선 길이 */
  height: 2px; /* 경계선 두께 */
  background-color: white; /* 경계선 색 */
}

.menu-grid a {
  display: block;
  padding: 10px;
  color: white; /* 항목 텍스트 색 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border-radius: 5px; /* 항목 둥글게 만들기 */
  transition: background-color 0.3s; /* 호버 효과를 위한 전환 */
}

.menu-grid a:hover {
  background-color: rgba(255, 255, 255, 0.3); /* 호버 시 배경색 변경 */
}
</style>
