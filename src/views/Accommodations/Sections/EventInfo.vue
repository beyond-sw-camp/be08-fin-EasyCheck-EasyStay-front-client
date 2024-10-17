<template>
  <section class="py-5">
    <h3 class="text-center text-black mb-5 mb-lg-7">이벤트 안내</h3>
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
        <div class="col" :key="event.roomId" v-for="event in events">
          <info-card :info="event" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import InfoCard from "@/components/Cards/Room/InfoCard.vue";

const events = [
  {
    roomId: 0,

    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room1.JPG",
  },
  {
    roomId: 1,
    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room4.JPG",
  },
  {
    roomId: 2,

    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room2.JPG",
  },
  {
    roomId: 3,

    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room3.jpg",
  },
];
</script>

<style lang="scss" scoped></style>
