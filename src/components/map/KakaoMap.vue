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

        <!-- 경로 안내 메시지 및 위치 안내 섹션 -->
        <div class="row mt-5">
            <div class="col-12 text-center">
                <h4>리조트 위치안내</h4>
                <div class="d-flex justify-content-center align-items-center mt-3">
                    <i class="fas fa-car mr-2"></i>
                    <span>자차 이용</span>
                </div>
                <div class="mt-2">
                    <p>주소: <span>{{ currentLocation.name }} (서울 출발 기준 약 2시간 소요)</span></p>
                    <div class="path-info d-flex justify-content-center align-items-center">
                        <span>서울</span>
                        <i class="fas fa-arrow-right mx-2"></i>
                        <span>강일IC</span>
                        <i class="fas fa-arrow-right mx-2"></i>
                        <span>춘천JC</span>
                        <i class="fas fa-arrow-right mx-2"></i>
                        <span>동홍천양양고속도로</span>
                        <i class="fas fa-arrow-right mx-2"></i>
                        <span>양양JC</span>
                        <i class="fas fa-arrow-right mx-2"></i>
                        <span>롯데리조트속초</span>
                    </div>
                </div>
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

// 서울시청 좌표
const seoulCityHallCoordinate = {
    lat: 37.5662952,
    lng: 126.97794509999994
};

// 현재 선택된 리조트 또는 호텔 위치를 저장할 변수
const currentLocation = ref({ name: '선택된 리조트 또는 호텔 이름' });

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

// 지도 중심을 이동하고 경로 안내를 업데이트하는 함수
const moveToLocation = (location) => {
    centerCoordinate.value = {
        lat: location.lat,
        lng: location.lng
    };

    // 선택된 리조트 또는 호텔의 이름 업데이트
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