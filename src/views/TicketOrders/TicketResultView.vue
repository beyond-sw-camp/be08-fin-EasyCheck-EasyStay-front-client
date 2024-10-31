<template>
  <ticket-result class="pt-8" />
  <location-guide class="mt-4" />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import TicketResult from "./Sections/TicketResult.vue";
import LocationGuide from "../Reservation/Sections/LocationGuide.vue";

const handleBeforeUnload = (e) => {
  const message =
    "페이지를 벗어나면 입력하신 정보가 모두 사라집니다. 계속하시겠습니까?";
  e.returnValue = message;
  return message;
};

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<style lang="scss" scoped></style>
