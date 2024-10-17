<template>
    <div class="container-fluid mb-7">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-12 p-3 bg-light">
                <h5>리조트</h5>
                <ul class="list-group mb-4">
                    <li v-for="resort in resortAccommodations" :key="resort.id" class="list-group-item"
                        @click="moveToLocation(resort)" style="cursor: pointer;">
                        {{ resort.name }}
                    </li>
                </ul>

                <h5>호텔</h5>
                <ul class="list-group">
                    <li v-for="hotel in hotelAccommodations" :key="hotel.id" class="list-group-item"
                        @click="moveToLocation(hotel)" style="cursor: pointer;">
                        {{ hotel.name }}
                    </li>
                </ul>
            </div>

            <div class="col-lg-9 col-md-8 col-12" style="height: 500px;">
                <KakaoMap :lat="centerCoordinate.lat" :lng="centerCoordinate.lng" :draggable="true"
                    style="width: 100%; height: 100%;">
                    <KakaoMapMarker :lat="centerCoordinate.lat" :lng="centerCoordinate.lng"></KakaoMapMarker>
                </KakaoMap>
            </div>
        </div>

        <!-- 경로 안내 메시지 및 위치 안내 섹션 -->
        <div class="row mt-5" v-if="currentLocation.name !== 'selectedAccommodation'">
            <div class="col-12 text-center">
                <h4>리조트 위치안내</h4>
                <div class="d-flex justify-content-center align-items-center mt-3">
                    <i class="fas fa-car mr-2"></i>
                    <span>자차 이용</span>
                </div>
                <div class="mt-2">
                    <p>주소: <span>{{ currentLocation.address }}</span></p>
                    <p>출발지: 서울 (<span>{{ currentLocation.responseTime }}</span>)</p>
                    <div class="path-info d-flex justify-content-center align-items-center">
                        <!-- AWS S3에 저장된 directionsUrl 이미지를 표시 -->
                        <img v-if="currentLocation.directionsUrl" :src="currentLocation.directionsUrl" alt="Directions"
                            style="max-width: 100%; height: auto;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAccommodationStore } from '@/stores/accommodationStore';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const centerCoordinate = ref({
    lat: 37.4972146715141,
    lng: 126.927607128836
});

// 현재 선택된 리조트 또는 호텔 위치를 저장할 변수
const currentLocation = ref({ name: 'selectedAccommodation' });

// Pinia store 사용
const accommodationStore = useAccommodationStore();

// 리조트와 호텔을 필터링하여 나눔
const resortAccommodations = computed(() => accommodationStore.accommodations.filter(acc => acc.accommodationType === 'RESORT'));
const hotelAccommodations = computed(() => accommodationStore.accommodations.filter(acc => acc.accommodationType === 'HOTEL'));

// API에서 리조트와 호텔 목록을 가져오는 함수
onMounted(() => {
    accommodationStore.fetchAccommodations();
});

// 지도 중심을 이동하고 경로 안내를 업데이트하는 함수
const moveToLocation = (location) => {
    centerCoordinate.value = {
        lat: location.latitude,
        lng: location.longitude
    };

    // 선택된 리조트 또는 호텔의 정보를 업데이트
    currentLocation.value = location;
};
</script>

<style scoped>
@media (max-width: 768px) {

    .col-lg-3,
    .col-lg-9 {
        height: auto;
    }

    .col-lg-9 {
        padding: 0 !important;
    }
}

ul.list-group {
    border-radius: 0 !important;
}

.map-container {
    position: relative;
}
</style>