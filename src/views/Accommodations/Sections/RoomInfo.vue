<template>
  <section class="py-5">
    <h3 class="text-center text-black mb-5 mb-lg-7">객실 안내</h3>

    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
        <div class="col" :key="room.roomId" v-for="room in rooms">
          <info-card :info="room" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import InfoCard from "@/components/Cards/Room/InfoCard.vue";

const rooms = [
  {
    roomId: 0,
    title: "디럭스",
    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room1.JPG",
  },
  {
    roomId: 1,
    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room4.JPG",
    title: "스위트",
  },
  {
    roomId: 2,
    title: "패밀리",
    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room2.JPG",
  },
  {
    roomId: 3,
    title: "프레지덴셜",
    imgUrl: "https://beyond-easycheck.s3.amazonaws.com/room/room3.jpg",
  },
];
</script>

<style lang="scss" scoped>
// 추가적인 스타일이 필요하다면 여기에 작성하세요
</style>
