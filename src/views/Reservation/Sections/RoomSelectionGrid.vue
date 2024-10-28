<template>
  <section>
    <room-type-navs />
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-1">
      <div v-for="room in rooms" :key="room.id" class="col">
        <div class="card h-100">
          <img
            :src="room.image"
            class="card-img-top rounded-0"
            :alt="room.name"
          />
          <div class="card-body rounded-0">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">{{ room.name }}</h5>
              <button class="btn btn-outline-secondary btn-sm">+</button>
            </div>
            <p class="card-text fw-bold small">{{ room.description }}</p>
            <p class="card-text fw-bold">
              <small class="text-muted"
                >기준 인원:{{ room.standardOccupancy }} / 최대 인원:{{
                  room.maxOccupancy
                }}</small
              >
            </p>
            <p class="card-text">
              <small class="text-muted">1박 기준(VAT 포함)</small>
            </p>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <small class="text-muted text-decoration-line-through"
                  >{{ room.originalPrice.toLocaleString() }}원</small
                >
                <span class="text-danger fw-bold ms-2"
                  >{{ room.discountedPrice.toLocaleString() }}원~</span
                >
              </div>
            </div>
            <button
              class="btn w-100 mt-2"
              :class="room.isSelected ? 'btn-primary' : 'btn-outline-primary'"
              @click="toggleRoomSelection(room)"
            >
              {{ room.isSelected ? "객실 선택됨" : "객실 선택" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import RoomTypeNavs from "@/views/Rooms/Sections/RoomTypeNavs.vue";

import { storeToRefs } from "pinia";
import { useReservationStore } from "@/stores/reservationStore.js";

const reservationStore = useReservationStore();

const { availableRoomList } = storeToRefs(reservationStore);

console.log(availableRoomList);

const rooms = availableRoomList;

const toggleRoomSelection = (room) => {
  room.isSelected = !room.isSelected;
};
</script>

<style lang="scss" scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card {
  background: #fbfbfb;
}

.btn-outline-secondary {
  border-color: #ced4da;
}

.text-danger {
  font-size: 1.1rem;
}

.card-title {
  font-size: 1rem;
}

.card-text.small {
  font-size: 0.8rem;
}
</style>
