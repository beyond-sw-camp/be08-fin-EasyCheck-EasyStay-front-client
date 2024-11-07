<template>
  <section class="mb-5 pb-5">
    <div class="container mt-sm-5 mt-3">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-12 p-4 bg-light">
          <div class="section-title">
            <h5>리조트</h5>
          </div>
          <ul class="list-group mb-4">
            <li
              v-for="resort in resortAccommodations"
              :key="resort.id"
              class="list-group-item"
              :class="{ active: selectedAccommodation?.id === resort.id }"
              @click="moveToLocation(resort)"
              style="cursor: pointer"
            >
              {{ resort.name }}
            </li>
          </ul>

          <div class="section-title">
            <h5>호텔</h5>
          </div>
          <ul class="list-group">
            <li
              v-for="hotel in hotelAccommodations"
              :key="hotel.id"
              class="list-group-item"
              :class="{ active: selectedAccommodation?.id === hotel.id }"
              @click="moveToLocation(hotel)"
              style="cursor: pointer"
            >
              {{ hotel.name }}
            </li>
          </ul>
        </div>

        <div class="col-lg-9 col-md-8 col-12" style="height: 500px">
          <KakaoMap
            :lat="centerCoordinate.lat"
            :lng="centerCoordinate.lng"
            :draggable="true"
            style="width: 100%; height: 100%"
          >
            <KakaoMapMarker
              :lat="centerCoordinate.lat"
              :lng="centerCoordinate.lng"
            ></KakaoMapMarker>
          </KakaoMap>
        </div>
      </div>

      <div
        class="row mt-5 location-info"
        v-if="currentLocation.name !== 'selectedAccommodation'"
      >
        <div class="col-12 text-left p-4">
          <h4 class="title">리조트 위치안내</h4>
          <div class="transportation mt-3">
            <i class="fas fa-car mr-2"></i>
            <span>자차 이용</span>
          </div>
          <div class="mt-3">
            <p class="address">
              주소: <span>{{ currentLocation.address }}</span>
            </p>
            <p class="departure">
              출발지: 서울 (<span>{{ currentLocation.responseTime }}</span
              >)
            </p>
          </div>
          <div
            class="path-info mt-4 d-flex justify-content-center align-items-center"
          >
            <img
              v-if="currentLocation.directionsUrl"
              :src="currentLocation.directionsUrl"
              alt="Directions"
              class="directions-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAccommodationStore } from "@/stores/accommodationStore.js";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const centerCoordinate = ref({
  lat: 37.4972146715141,
  lng: 126.927607128836,
});

const currentLocation = ref({ name: "selectedAccommodation" });
const selectedAccommodation = ref(null);
const accommodationStore = useAccommodationStore();

const resortAccommodations = computed(() =>
  accommodationStore.accommodations.filter(
    (acc) => acc.accommodationType === "RESORT"
  )
);
const hotelAccommodations = computed(() =>
  accommodationStore.accommodations.filter(
    (acc) => acc.accommodationType === "HOTEL"
  )
);

onMounted(() => {
  accommodationStore.fetchAccommodations();
});

const moveToLocation = (location) => {
  centerCoordinate.value = {
    lat: location.latitude,
    lng: location.longitude,
  };
  currentLocation.value = location;
  selectedAccommodation.value = location;
};
</script>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

.location-info {
  height: 500px;
  padding: 20px;
}

.title {
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
}

.transportation {
  font-family: "Pretendard-Regular";
  font-size: 1.1rem;
  color: #333;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.transportation i {
  font-size: 1.2rem;
  margin-right: 12px;
  color: #495057;
}

.transportation span {
  font-weight: 500;
  letter-spacing: -0.3px;
}

.address,
.departure {
  font-family: "Pretendard-Regular";
  font-size: 1rem;
  color: #495057;
}

.directions-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 15px;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 10px;
}

.list-group-item {
  transition: all 0.3s ease;
  border-radius: 0 !important;
}

.list-group-item:hover {
  background-color: #e9ecef;
}

.list-group-item.active {
  background-color: black;
  border-color: white;
  color: white;
}

.list-group-item.active:hover {
  background-color: black;
}

@media (max-width: 768px) {
  .col-lg-3,
  .col-lg-9 {
    height: auto;
  }

  .col-lg-9 {
    padding: 0 !important;
  }

  .list-group-item {
    font-size: 0.9rem;
  }
}

ul.list-group {
  border-radius: 0 !important;
}

.map-container {
  position: relative;
}
</style>
