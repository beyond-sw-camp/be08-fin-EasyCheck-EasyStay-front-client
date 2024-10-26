<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { userLoginStore } from "@/stores/loginStore.js";

// 네비게이션 토글 상태
const isNavOpen = ref(false);
const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value;
};

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

const saveScrollState = () => {
    localStorage.setItem("isScrolled", isScrolled.value ? "true" : "false");
};

const loadScrollState = () => {
    const storedState = localStorage.getItem("isScrolled");
    isScrolled.value = storedState === "true";
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
    saveScrollState();
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
    loadScrollState();
    window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

const getTextColor = () => {
    return isScrolled.value ? "text-white" : "text-dark";
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
    <nav class="navbar navbar-expand-lg top-0 py-3" :class="{
        'z-index-3 w-100 position-absolute my-3': props.transparent,
        'z-index-3 py-2 start-0 end-0 position-absolute': props.sticky,
        'navbar-light bg-white py-3': !isScrolled && props.light,
        'navbar-dark bg-gradient-dark z-index-3 py-3': props.dark || isScrolled,
        'bg-transparent-black': isScrolled
    }">
        <div class="container">
            <RouterLink class="navbar-brand" :class="[
                isScrolled ? 'text-white font-weight-bolder ms-sm-3' : 'text-dark font-weight-bolder ms-sm-3'
            ]" :to="{ name: 'presentation' }" rel="tooltip" title="Designed and Coded by EasyCheck">
                <img src="@/src/img/logos/logo-ct-dark.png" alt="Logo" class="navbar-logo me-2" />
                EasyStay
            </RouterLink>
            <ul class="navbar-nav navbar-nav-hover align-items-center d-lg-none">
                <li class="nav-item mx-2">
                    <button @click="handleReservationClick"
                        class="reservation-btn btn btn-sm mb-0 ms-auto d-lg-none d-block">
                        <i class="material-icons opacity-6 me-2 text-md">calendar_today</i>Reservation
                    </button>
                </li>
                <li class="nav-item mx-2">
                    <button class="navbar-toggler mb-0 ms-auto d-lg-none d-lg-block" type="button" @click="toggleNav">
                        <span class="navbar-toggler-icon mt-2">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </span>
                    </button>
                </li>
            </ul>
            <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                <ul class="navbar-nav navbar-nav-hover ms-auto align-items-center">
                    <li v-if="useUserLoginStore.isLoggedIn" class="nav-item mx-2">
                        <RouterLink :to="{ name: 'Mypage' }" role="button"
                            class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
                            <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">person</i>
                            MyPage
                        </RouterLink>
                    </li>
                    <li v-else class="nav-item mx-2">
                        <RouterLink :to="{ name: 'login' }" role="button"
                            class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
                            <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">login</i>
                            Sign In / Sign Up
                        </RouterLink>
                    </li>
                    <li v-if="useUserLoginStore.isLoggedIn" class="nav-item mx-2">
                        <RouterLink :to="{ name: 'logout' }" role="button" @click="useUserLoginStore.logout"
                            class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
                            <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">logout</i>
                            Sign Out
                        </RouterLink>
                    </li>
                    <li class="nav-item mx-2">
                        <button @click="handleReservationClick" class="reservation-btn btn btn-sm mb-0 ms-auto">
                            <i class="material-icons opacity-6 me-2 text-md">calendar_today</i>Reservation
                        </button>
                    </li>
                    <!-- 네비게이션 토글 버튼 -->
                    <li class="nav-item mx-2">
                        <button class="navbar-toggler d-lg-block" type="button" @click="toggleNav">
                            <span class="navbar-toggler-icon mt-2">
                                <span class="navbar-toggler-bar bar1"></span>
                                <span class="navbar-toggler-bar bar2"></span>
                                <span class="navbar-toggler-bar bar3"></span>
                            </span>
                        </button>
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
    background: rgba(0, 0, 0, 0.6) !important;
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
    border-radius: 100px !important;
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.btn {
    font-weight: 0 !important;
}

.reservation-btn:hover {
    background-color: rgba(0, 0, 0, 0.8) !important;
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
</style>