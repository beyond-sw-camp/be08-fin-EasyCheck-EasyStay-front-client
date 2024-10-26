<template>
  <div class="container p-0 mb-8">
    <h2>오시는길</h2>
    <div class="row mt-4">
      <div class="col">
        <div class="title d-flex justify-content-between align-items-center">
          <p class="fw-bold">롯데리조트 부여</p>
          <small>충청남도 부여군 규암명 백제문로 400</small>
        </div>
        <kakao-map
          class="w-100"
          :lat="centerCoordinate.lat"
          :lng="centerCoordinate.lng"
          :draggable="true"
        >
          <kakao-map-marker />
        </kakao-map>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const centerCoordinate = ref({
  lat: 37.4972146715141,
  lng: 126.927607128836,
});
</script>

<style lang="scss" scoped>
.title {
  background: #fbfbfb;
  padding: 0.625rem;
}
</style>
