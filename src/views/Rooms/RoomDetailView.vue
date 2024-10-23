<template>
  <section class="py-6">
    <div class="container">
      <h3>디럭스</h3>
      <room-type-navs />
      <room-image />
      <room-info />
      <additional-service />
      <room-rates />
      <div class="d-flex justify-content-end mt-5">
        <button class="btn btn-black rounded-0 ms-auto">예약하기</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import RoomImage from "./Sections/RoomImage.vue";
import RoomTypeNavs from "./Sections/RoomTypeNavs.vue";
import RoomInfo from "./Sections/RoomInfo.vue";
import AdditionalService from "./Sections/AdditionalService.vue";
import RoomRates from "./Sections/RoomRates.vue";
</script>

<style lang="scss" scoped></style>
