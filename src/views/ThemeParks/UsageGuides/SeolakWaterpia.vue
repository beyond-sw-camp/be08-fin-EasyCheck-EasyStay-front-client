<template>
  <NavbarDefault :sticky="true" />
  <div class="container py-5 my-5">
    <h2 class="mb-4">설악 워터피아 이용 안내</h2>
    <div class="guide-content">
      <h4>운영시간</h4>
      <p>
        <strong>주간:</strong> 10:00 ~ 18:00<br />
        <strong>야간:</strong> 18:30 ~ 22:00
      </p>
      <h4>입장 안내</h4>
      <p>이용권 구매 후, 티켓 매표소에서 입장권을 수령하세요.</p>
      <h4>편의시설</h4>
      <ul>
        <li>락커룸, 샤워실, 수건 대여 가능</li>
        <li>구명조끼 및 튜브 대여소</li>
      </ul>
      <h4>이용 규칙</h4>
      <p>
        안전을 위해 모든 이용객은 구명조끼 착용이 필수입니다. 130cm 이하의
        어린이는 보호자 동반이 필요합니다.
      </p>
      <h4>주의사항</h4>
      <p>
        외부 음식물 반입은 금지되어 있습니다. 입장 시 물놀이에 적합한 복장을
        착용해 주세요.
      </p>
    </div>
    <MaterialButton
      color="primary"
      size="lg"
      variant="gradient"
      @click="goBack"
      class="mt-4"
    >
      돌아가기
    </MaterialButton>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.guide-content {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  line-height: 1.6;
}

.guide-content h4 {
  margin-top: 1.5rem;
  font-weight: bold;
}

.guide-content p,
.guide-content ul {
  margin-top: 0.5rem;
  font-size: 1rem;
}

ul {
  padding-left: 20px;
}

ul li {
  margin-bottom: 0.5rem;
}
</style>
