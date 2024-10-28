<template>
  <section class="py-6">
    <div class="container">
      <h3>{{ roomType?.name }}</h3>
      <room-type-navs />
      <room-image />
      <room-info />
      <additional-service />
      <room-rates />
      <router-link :to="{ path: '/reservation' }">
        <div class="d-flex justify-content-end mt-5">
          <button class="btn btn-black rounded-0 ms-auto">예약하기</button>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import RoomImage from "./Sections/RoomImage.vue";
import RoomTypeNavs from "./Sections/RoomTypeNavs.vue";
import RoomInfo from "./Sections/RoomInfo.vue";
import AdditionalService from "./Sections/AdditionalService.vue";
import RoomRates from "./Sections/RoomRates.vue";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed, onMounted, watch } from "vue";
import { useRoomStore } from "@/stores/roomStore";

const route = useRoute();
const roomStore = useRoomStore();

const roomTypeId = computed(() => route.params.roomTypeId);

const { roomType, currentRoomId } = storeToRefs(roomStore);

onMounted(async () => {
  await roomStore.fetchRoomTypeById(roomTypeId.value);
  await roomStore.fetchRoomsByRoomTypeId(roomTypeId.value);
  roomStore.initDefaultRoomId();
  await roomStore.fetchRoomRates(currentRoomId.value);
});

watch(currentRoomId, async (newRoomId) => {
  console.log(newRoomId);

  await roomStore.fetchRoomRates(newRoomId);
});
</script>

<style lang="scss" scoped></style>
