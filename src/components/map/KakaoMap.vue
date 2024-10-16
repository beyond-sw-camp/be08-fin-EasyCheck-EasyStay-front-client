<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
    lat: 37.566826,
    lng: 126.9786567
};
</script>

<template>
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" class="mb-5"
        style="width:100%; height:500px;">
        <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
</template>
