<template>
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

import { useRoute } from "vue-router";
import { useRoomStore } from "@/stores/roomStore.js";
import { useEventStore } from "@/stores/eventStore.js";
import { useAccommodationStore } from "@/stores/accommodationStore.js";
import { onMounted } from "vue";

const route = useRoute();

const roomStore = useRoomStore();
const eventStore = useEventStore();
const accommodationStore = useAccommodationStore();

onMounted(async () => {
  // 숙박시설에 존재하는 객실 조회
  await roomStore.fetchAccommodationRooms(route.params.accommodationId);
  // 숙박시설에 해당하는 이벤트 조회
  await eventStore.fetchAccommodationEvents(route.params.accommodationId);
  // 숙박시설 단일 조회
  await accommodationStore.fetchAccommodationById(route.params.accommodationId);
});
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
