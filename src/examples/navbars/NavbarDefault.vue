<script setup>
import { RouterLink } from "vue-router";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

const props = defineProps({
    action: {
        type: Object,
        route: String,
        color: String,
        label: String,
        default: () => ({
            route: "https://www.creative-tim.com/product/vue-material-kit",
            color: "bg-gradient-success",
            label: "Reservation"
        })
    },
    transparent: {
        type: Boolean,
        default: false
    },
    light: {
        type: Boolean,
        default: false
    },
    dark: {
        type: Boolean,
        default: false
    },
    sticky: {
        type: Boolean,
        default: false
    },
    darkText: {
        type: Boolean,
        default: false
    }
});

let isScrolled = ref(false);

const saveScrollState = () => {
    localStorage.setItem('isScrolled', isScrolled.value ? 'true' : 'false');
};

const loadScrollState = () => {
    const storedState = localStorage.getItem('isScrolled');
    if (storedState === 'true') {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
};

const handleScroll = () => {
    if (window.scrollY > 10) {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
    saveScrollState();
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
        if (newValue === "mobile") {
            textDark.value = true;
        } else {
            textDark.value = false;
        }
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
                EasyStay
            </RouterLink>
            <a href="https://www.creative-tim.com/product/vue-material-kit-pro"
                class="reservation-btn btn btn-sm mb-0 ms-auto d-lg-none d-block">
                <i class="material-icons opacity-6 me-2 text-md">calendar_today</i>Reservation
            </a>
            <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                <ul class="navbar-nav navbar-nav-hover ms-auto align-items-center">
                    <li class="nav-item mx-2">
                        <RouterLink :to="{ name: 'login' }" role="button"
                            class="nav-link ps-2 me-4 d-flex cursor-pointer align-items-center" :class="getTextColor()">
                            <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">person</i>
                            Sign In / Sign Up
                        </RouterLink>
                    </li>
                    <li class="nav-item mx-2">
                        <RouterLink :to="{ name: '' }" role="button" class="reservation-btn btn btn-sm mb-0 ms-auto">
                            <i class="material-icons opacity-6 me-2 text-md">calendar_today</i>Reservation
                        </RouterLink>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                            aria-label="Toggle navigation">
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
.bg-transparent-black {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(5px) !important;
}

.navbar .nav-link:hover {
    opacity: 0.7;
}

.reservation-btn {
    background-color: black !important;
    color: white !important;
    border-radius: 50px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
}

.reservation-btn i {
    font-size: 18px;
}

.reservation-btn:hover {
    background-color: rgba(0, 0, 0, 0.8) !important;
    color: white !important;
}

.always-visible {
    display: block !important;
}
</style>
