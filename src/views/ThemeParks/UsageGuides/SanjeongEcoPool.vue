<template>
  <NavbarDefault :sticky="true" />
  <div class="container py-5 my-5">
    <div class="top-bar">
      <MaterialButton
        color="primary"
        size="sm"
        variant="gradient"
        @click="goBack"
        class="back-button"
      >
        돌아가기
      </MaterialButton>
    </div>

    <div class="guide-content">
      <h2 class="mb-4 guide-title">산정 에코 물놀이장 이용 안내</h2>

      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="{ 'active-tab': activeTab === index }"
          class="tab-button"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 이용 요금 탭 -->
      <div v-if="activeTab === 0" class="tab-content">
        <h5>산정 에코 물놀이장 이용요금</h5>
        <table class="price-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>요금</th>
              <th>정상가</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>[대인] 물놀이장+온천사우나</td>
              <td>18,000원</td>
              <td>20,000원</td>
            </tr>
            <tr>
              <td>[소인] 물놀이장+온천사우나</td>
              <td>16,000원</td>
              <td>18,000원</td>
            </tr>
            <tr>
              <td>[대인] 물놀이장</td>
              <td>13,000원</td>
              <td>15,000원</td>
            </tr>
            <tr>
              <td>[소인] 물놀이장</td>
              <td>11,000원</td>
              <td>13,000원</td>
            </tr>
            <tr>
              <td>테이블 대여</td>
              <td>20,000원</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>소인 적용: 14세 미만</li>
          <li>24개월 이하 무료</li>
          <li>수영모 필수 착용</li>
          <li>투숙객 할인쿠폰 프런트에서 수령</li>
          <li>날씨 상황에 따라 운영 기간이 변경될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const router = useRouter();
const goBack = () => {
  router.back();
};

const tabs = ["이용요금"];
const activeTab = ref(0);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.guide-content {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  line-height: 1.6;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.guide-title {
  font-size: 1.75rem;
  color: #0073e6;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  transition: color 0.3s, border-bottom 0.3s;
}

.tab-button:hover {
  color: #0073e6;
}

.active-tab {
  color: #0073e6;
  font-weight: bold;
  border-bottom: 2px solid #0073e6;
}

.tab-content {
  padding: 1.5rem 0;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.price-table th,
.price-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
}

.price-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #333;
}

ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}
</style>
