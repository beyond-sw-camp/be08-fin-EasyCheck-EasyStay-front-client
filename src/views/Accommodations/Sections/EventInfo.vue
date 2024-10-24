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
import { storeToRefs } from "pinia";
import { useEventStore } from "@/stores/eventStore.js";

const eventStore = useEventStore();

const { compactEventList: events } = storeToRefs(eventStore);
</script>

<style lang="scss" scoped></style>
