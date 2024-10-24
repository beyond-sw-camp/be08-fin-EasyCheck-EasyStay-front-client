<template>
  <section class="py-5">
    <h3 class="text-center text-black mb-5 mb-lg-7">객실 안내</h3>

    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
        <div class="col" :key="room.roomId" v-for="room in rooms">
          <router-link
            :to="{
              path: `/room/${room.roomId}`,
            }"
          >
            <info-card :info="room" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/stores/roomStore.js";

import InfoCard from "@/components/Cards/Room/InfoCard.vue";

const roomStore = useRoomStore();

const { compactRoomList: rooms } = storeToRefs(roomStore);
</script>

<style lang="scss" scoped>
// 추가적인 스타일이 필요하다면 여기에 작성하세요
</style>
