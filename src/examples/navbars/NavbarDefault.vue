<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
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

// set text color
const getTextColor = () => {
    let color;
    if (props.transparent && textDark.value) {
        color = "text-dark";
    } else if (props.transparent) {
        color = "text-white";
    } else {
        color = "text-dark";
    }

    return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
    textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
    textDark.value = false;
}

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
        'z-index-3 w-100 navbar-transparent position-absolute my-3':
            props.transparent,
        'z-index-3 py-2 py-2 start-0 end-0 position-absolute':
            props.sticky,
        'navbar-light bg-white py-3': props.light,
        ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }">
        <div :class="props.transparent || props.light || props.dark
            ? 'container'
            : 'container'
            ">
            <RouterLink class="navbar-brand d-none d-md-block" :class="[
                (props.transparent && textDark.value) || !props.transparent
                    ? 'text-dark font-weight-bolder ms-sm-3'
                    : 'text-white font-weight-bolder ms-sm-3'
            ]" :to="{ name: 'presentation' }" rel="tooltip" title="Designed and Coded by Creative Tim"
                data-placement="bottom">
                EasyStay
            </RouterLink>
            <RouterLink class="navbar-brand d-block d-md-none" :class="props.transparent || props.dark
                ? 'text-white'
                : 'font-weight-bolder ms-sm-3'
                " to="/" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">
                EasyStay
            </RouterLink>
            <a href="https://www.creative-tim.com/product/vue-material-kit-pro"
                class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block">Reservation</a>
            <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                </span>
            </button>
            <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                <ul class="navbar-nav navbar-nav-hover ms-auto  align-items-center">
                    <li class="nav-item mx-2">
                        <RouterLink :to="{ name: 'signin-basic' }" role="button"
                            class="nav-link ps-2 me-4 d-flex cursor-pointer align-items-center" :class="getTextColor()"
                            aria-expanded="false">
                            <i class="material-icons opacity-6 me-2 text-md text-dark">person</i>
                            Sign In / Sign Up
                        </RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav d-lg-block d-none">
                    <li class="nav-item">
                        <a :href="action.route" class="btn btn-sm mb-0" :class="action.color"
                            onclick="smoothToPricing('pricing-soft-ui')">{{ action.label }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
</template>

<style>
.navbar .nav-link:hover {
    opacity: 0.5;
}
</style>