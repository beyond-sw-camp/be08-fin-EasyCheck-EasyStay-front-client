<template>
  <section class="my-5 py-5">
    <h3 class="text-center text-black mb-5 mb-lg-7">
      당신의 완벽한 휴식을 위한 특별한 공간
    </h3>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <rotating-card>
            <rotating-card-front
              title=""
              description=""
              image="https://beyond-easycheck.s3.amazonaws.com/room/room2.JPG"
              icon=""
              class="w-100"
            />

            <rotating-card-back
              image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
              title="Discover More"
              description="You will save a lot of time going from prototyping to full-functional
                code because all elements are implemented."
              class="rotate"
            />
          </rotating-card>
        </div>
        <div class="col-lg-6 ms-auto">
          <rotating-card>
            <rotating-card-front
              image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              :title="accomodation.name"
              :description="accomodation.description"
            />

            <rotating-card-back
              image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
              :description="accomodation.description"
            />
          </rotating-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import RotatingCard from "@/examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardBack from "@/examples/cards/rotatingCards/RotatingCardBack.vue";
import RotatingCardFront from "@/examples/cards/rotatingCards/RotatingCardFront.vue";

import { onMounted, ref } from "vue";

// 시설관련 더미 데이터
const accomodation = {
  id: 0,
  name: "자연이 만든 프리미엄,\n완벽한 오션 뷰",
  address: "string",
  description:
    "끝없이 펼져진 동해가 보이는 최고급 시설의 워터파크는 바다 저변으로 헤엄쳐가는 듯한 특별한 경험을 선사합니다. 스파와 레저를 즐기며 아름다운 순간을 만끽하세요",
  accommodationType: "RESORT",
};

const autoRotate = ref(false);

onMounted(() => {
  setInterval(() => (autoRotate.value = !autoRotate.value), 1000);
});
</script>

<style lang="scss" scoped></style>
