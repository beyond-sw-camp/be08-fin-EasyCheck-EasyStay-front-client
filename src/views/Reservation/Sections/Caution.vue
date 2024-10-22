<template>
  <div class="container mt-5">
    <h2 class="mb-4">유의사항</h2>
    <div class="card mb-4">
      <div class="card-header">
        <h2 class="h5 mb-0">요금 정책</h2>
      </div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li class="mb-2">
            • 모든 유급에는 세금과 봉사료가 포함되어 있습니다.
          </li>
          <li class="mb-2">
            • 객실 요금은 현장에서 투숙자 전원에 따라 달라질 수 있습니다.
          </li>
          <li class="mb-2">
            • 기준인원 초과 시 인원추가 비용이 발생하며 최대인원 초과 시 입실이
            제한됩니다.
          </li>
        </ul>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        <h2 class="h5 mb-0">취소 규정</h2>
      </div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li class="mb-2">
            • 비회원/예약 취소 및 변경은 바우처 중 숙소 2일 전, 무인텔(모텔) 및
            숙소-기간 전미자 가능하며, 본영업일의 경우 7일 전까지 가능합니다.
            이후 취소 및 변경 시 취약금 또는 대략금이 부과됩니다. 자세한 내용은
            예약 규정 확인 및 통과 룸 통해 확인하세요.
          </li>
          <li class="mb-2">
            • 예약하신 날짜에 체크인 되지 않거나 노쇼 위험 자전 시간 이후에
            예약을 취소하는 경우에는 노쇼(No-Show) 처리되며, 이에 따른 위약금
            또는 페널티가 부과됩니다.
          </li>
          <li class="mb-2">
            • 2024 여름성수기간: 2024년07월19일(금) ~ 2024년08월24일(토)
          </li>
          <li class="mb-2">
            • 2024 겨울성수기간: 2024년12월20일(금) ~ 2025년02월28일(금)
          </li>
        </ul>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        <h2 class="h5 mb-0">체크인 안내</h2>
      </div>
      <div class="card-body">
        <p>
          • 15시(오후 3시)부터 가능하며, 밤 10시 이후 입실시 반드시 사전
          연락하여 주시기 바랍니다.
        </p>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <button class="btn btn-primary w-50 mw-25 rounded-0" @click="goHome">
        예약조회
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/"); // Assuming '/' is your home route
};
</script>

<style scoped>
.card {
  background: #fbfbfb;
}
</style>
