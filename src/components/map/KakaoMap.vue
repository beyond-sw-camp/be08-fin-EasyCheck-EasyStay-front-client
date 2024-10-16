<template>
    <div class="container-fluid mb-5">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-12 p-3 bg-light">
                <h5>리조트</h5>
                <ul class="list-group mb-4">
                    <li v-for="resort in resorts" :key="resort.id" class="list-group-item"
                        @click="moveToLocation(resort)" style="cursor: pointer;">
                        {{ resort.name }}
                    </li>
                </ul>

                <h5>호텔</h5>
                <ul class="list-group">
                    <li v-for="hotel in hotels" :key="hotel.id" class="list-group-item" @click="moveToLocation(hotel)"
                        style="cursor: pointer;">
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const centerCoordinate = ref({
    lat: 37.4972146715141,
    lng: 126.927607128836
});

const resorts = [
    { id: 1, name: '설악 쏘라노', lat: 38.2101595305386, lng: 128.527388761735 },
    { id: 2, name: '거제 벨버디어', lat: 35.0077457, lng: 128.711752 },
    { id: 3, name: '산정호수 안시', lat: 38.0653852333909, lng: 127.314556995093 }
];

const hotels = [
    { id: 1, name: '더 플라자 서울', lat: 37.5646641418657, lng: 126.978090221167 },
    { id: 2, name: '제주신라호텔', lat: 33.2480220364993, lng: 126.408678569391 },
    { id: 3, name: '쉐라톤 그랜드 인천', lat: 37.3902250644638, lng: 126.645426431439 }
];

// 리조트 또는 호텔 클릭 시 지도 중심 업데이트 함수
const moveToLocation = (location) => {
    centerCoordinate.value = {
        lat: location.lat,
        lng: location.lng
    };
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