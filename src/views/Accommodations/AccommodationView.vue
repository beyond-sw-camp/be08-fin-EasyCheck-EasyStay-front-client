<template>
  <navbar-default />
  <accomodation-image />
  <div class="container w-75">
    <accommodation-info />
    <div class="section-divider"></div>
    <room-info />
    <div class="section-divider"></div>
    <event-info />
  </div>
</template>

<script setup>
import AccommodationInfo from "./Sections/AccommodationInfo.vue";
import AccomodationImage from "./Sections/AccomodationImage.vue";
import RoomInfo from "./Sections/RoomInfo.vue";
import EventInfo from "./Sections/EventInfo.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
</script>

<style lang="scss" scoped>
body {
}
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
</style>
