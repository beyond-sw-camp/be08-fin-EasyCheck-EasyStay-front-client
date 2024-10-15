<script>
export default {
    mounted() {
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도 중심좌표
            level: 3 // 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성
    }
};
</script>

<template>
    <div class="mb-5" id="map" style="width:100%; height:500px;"></div>
</template>