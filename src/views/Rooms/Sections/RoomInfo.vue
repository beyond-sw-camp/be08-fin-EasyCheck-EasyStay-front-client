<template>
  <section class="mt-5">
    <h3 class="text-black">{{ roomType?.name }} - {{ currentRoom?.type }}</h3>
    <p class="text-black fw-normal">
      {{ currentRoom?.description }}
    </p>
  </section>

  <section class="pt-2">
    <table class="table table-bordered room-info-table">
      <tbody>
        <tr>
          <th>체크인</th>
          <td>{{ currentRoom?.checkInTime }}</td>
          <th>체크아웃</th>
          <td>{{ currentRoom?.checkOutTime }}</td>
        </tr>
        <tr>
          <th>기준 인원</th>
          <td>{{ currentRoom?.standardOccupancy }}명</td>
          <th>최대 인원</th>
          <td>{{ currentRoom?.maxOccupancy }}명</td>
        </tr>
        <tr>
          <th>객실 구성</th>
          <td>{{ currentRoom?.composition }}</td>
          <th>객실 면적</th>
          <td>{{ currentRoom?.size }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/stores/roomStore";

const roomStore = useRoomStore();

const { currentRoom, roomType } = storeToRefs(roomStore);
</script>

<style scoped>
.room-info-table th,
.room-info-table td {
  border: 1px solid #dee2e6 !important;
}
</style>
