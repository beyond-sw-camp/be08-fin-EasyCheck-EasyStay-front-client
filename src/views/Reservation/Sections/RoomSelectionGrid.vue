<template>
  <section>
    <room-type-navs />
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-1">
      <div v-for="room in availableRooms" :key="room.roomId" class="col">
        <div class="card h-100">
          <img
            :src="room.thumbnailImgUrl"
            class="card-img-top rounded-0"
            :alt="room.roomName"
            loading="lazy"
          />

          <div class="card-body rounded-0">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">
                {{ room.roomType }} - {{ room.roomName }}
              </h5>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="handleDetailView(room)"
                aria-label="상세 정보 보기"
              >
                +
              </button>
            </div>

            <p class="card-text fw-bold small">{{ room.description }}</p>
            <p class="card-text fw-bold">
              <small class="text-muted">
                기준 인원: {{ room.standardOccupancy }} / 최대 인원:
                {{ room.maxOccupancy }}
              </small>
            </p>
            <p class="card-text fw-bold small">
              잔여 객실({{ room.remainingRoom }})
            </p>
            <p class="card-text">
              <small class="text-muted">1박 기준(VAT 포함)</small>
            </p>
          </div>

          <div class="card-footer bg-transparent border-top-0">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <small class="text-muted text-decoration-line-through">
                  {{ formatPrice(room?.expensiveSeasonPrice) }}원
                </small>
                <span class="text-danger fw-bold ms-2">
                  {{ formatPrice(room?.currentSeasonPrice) }}원~
                </span>
              </div>
            </div>

            <button
              class="btn w-100 mt-2"
              :class="getRoomButtonClasses(room)"
              @click="handleRoomSelection(room)"
              :aria-pressed="isRoomSelected(room)"
            >
              {{ getRoomButtonText(room) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import RoomTypeNavs from "@/views/Rooms/Sections/RoomTypeNavs.vue";
import { useReservationStore } from "@/stores/reservationStore.js";
import { userLoginStore } from "@/stores/loginStore.js";

const router = useRouter();
const reservationStore = useReservationStore();
const userStore = userLoginStore();

const { availableRooms, selectedRoom } = storeToRefs(reservationStore);
const { isLoggedIn } = storeToRefs(userStore);

// Computed
const isRoomSelected = (room) => selectedRoom.value?.roomId === room.roomId;

const getRoomButtonClasses = (room) => ({
  "btn-primary": isRoomSelected(room),
  "btn-outline-primary": !isRoomSelected(room),
  "selected-room-btn": isRoomSelected(room),
});

const getRoomButtonText = (room) =>
  isRoomSelected(room) ? "객실 선택됨" : "객실 선택";

// Methods
const formatPrice = (price) => price?.toLocaleString();

const handleDetailView = (room) => {
  console.log("객실 상세 보기:", room.roomName);
};

const handleRoomSelection = async (room) => {
  try {
    // 이미 선택된 객실 클릭 시
    if (isRoomSelected(room)) {
      reservationStore.setUIState({
        showForm: false,
        showInfo: false,
        showGrid: true,
      });
      reservationStore.resetReservationRoom();
      return;
    }

    // 로그인 체크
    if (!isLoggedIn.value) {
      const currentPath = router.currentRoute.value.fullPath;
      router.push({
        name: "login",
        query: { redirect: currentPath },
      });
      return;
    }

    // 로그인 상태일 때 정상 처리
    await userStore.fetchUserInfo();
    reservationStore.selectRoom(room);
    reservationStore.setUIState({
      showForm: true,
      showInfo: true,
      showGrid: true,
    });
  } catch (error) {
    console.error("객실 선택 처리 실패:", error);
    // TODO: 에러 처리
  }
};
</script>

<style lang="scss" scoped>
.card {
  background: #fbfbfb;

  &-img-top {
    height: 200px;
    object-fit: cover;
  }

  &-title {
    font-size: 1rem;
  }

  &-text {
    &.small {
      font-size: 0.8rem;
    }
  }
}

.btn-outline-secondary {
  border-color: #ced4da;
}

.text-danger {
  font-size: 1.1rem;
}

.selected-room-btn {
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid currentColor;
    border-radius: inherit;
    opacity: 0.5;
  }
}
</style>
