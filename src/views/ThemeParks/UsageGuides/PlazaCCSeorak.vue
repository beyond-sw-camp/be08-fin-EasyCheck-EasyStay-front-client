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
      <h2 class="mb-4 guide-title">플라자 설악 이용 안내</h2>

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

      <!-- 이용 안내 탭 -->
      <div v-if="activeTab === 0" class="tab-content">
        <h4>예약 방법</h4>
        <h5>온라인 예약</h5>
        <h5>유선 예약</h5>
        <p>
          예약 문의(예약실): 033-630-5511~4 (월-토, 10:00 - 17:00)<br />
          이용 문의(프런트): 033-630-5515~6 (월-일, 6:00 - 19:00)
        </p>

        <h4>회원 정기 예약</h4>
        <h5>주말 정기 예약</h5>
        <p>
          · 예약 접수: 이용일 기준 5주 전 금요일 / 토~일 예약 오픈 (공휴일, 연휴
          포함)<br />
          · 예약 횟수: 30일 내 1회 가능, 예약일 내장한 다음날부터 다시 30일 이내
          예약 가능
        </p>

        <h5>주중 정기 예약</h5>
        <p>
          · 예약 접수: 이용일 기준 5주 전 월요일 / 월~금 예약 오픈<br />
          · 예약 횟수: 30일 내 2회 가능, 예약일 내장한 다음날부터 다시 30일 이내
          예약 가능
        </p>

        <h4>비회원 잔여 타임 예약</h4>
        <h5>주말 잔여 타임 예약</h5>
        <p>· 이용일 기준 1개월 전부터 1회 예약 가능</p>
        <h5>주중 잔여 타임 예약</h5>
        <p>· 이용일 기준 1개월 전부터 1회 예약 가능</p>

        <h4>대기 예약</h4>
        <p>
          대기 예약은 유선으로 접수 받습니다.<br />
          대기 예약 후 예약이 가능해지면 남겨주신 전화번호로 연락드립니다.
        </p>

        <h4>이용 규정</h4>
        <ul>
          <li>예약은 1인 1팀에 한하여 가능합니다.</li>
          <li>
            일요일 및 공휴일에 예약한 회원이 불참 시 라운딩 불가하며, 위약
            규정에 따라 불이익을 받을 수 있습니다.
          </li>
          <li>
            예약 취소는 4일 전까지 가능하며, 온라인 예약 시 마이페이지에서
            취소할 수 있습니다.
          </li>
          <li>
            ARS 예약의 경우 ARS를 통해 취소 가능합니다. 2팀 이상 예약은 유선
            문의 바랍니다.
          </li>
          <li>주말과 주중 모두 4일 전까지 벌점 없이 취소 가능합니다.</li>
          <li>
            주말과 주중 4일 전 이후에 취소할 경우 예약 정지가 될 수 있습니다.
          </li>
          <li>
            이용 규정 위반 시 회사 규정에 따라 1개월 이내 예약 정지가
            적용됩니다.
          </li>
          <li>
            회원의 추천으로 입장한 동반객이 클럽의 명예 훼손이나 시설 파손 시,
            회원에게 제재가 있을 수 있습니다.
          </li>
          <li>취소 건수와 시기에 따라 예약 정지가 될 수 있습니다.</li>
        </ul>
      </div>

      <!-- 운영 시간 탭 -->
      <div v-if="activeTab === 1" class="tab-content">
        <h4>플라자 설악 운영 시간 안내</h4>
        <table class="schedule-table">
          <thead>
            <tr>
              <th>시설명</th>
              <th>운영 시간</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>골프장</td>
              <td>06:00 - 18:00</td>
              <td>주중과 주말 동일 운영</td>
            </tr>
            <tr>
              <td>레스토랑</td>
              <td>07:00 - 22:00</td>
              <td>예약 필수</td>
            </tr>
            <tr>
              <td>스파 시설</td>
              <td>10:00 - 20:00</td>
              <td>고객 안전을 위한 수칙 준수</td>
            </tr>
          </tbody>
        </table>
        <p class="facility-notice">
          * 운영 시간은 계절과 날씨에 따라 변동될 수 있으며, 사전 예약이
          권장됩니다.
        </p>
      </div>

      <!-- 유의 사항 탭 -->
      <div v-if="activeTab === 2" class="tab-content">
        <h4>이용 시 유의 사항</h4>

        <h5>복장 규정</h5>
        <ul>
          <li>골프장 이용 시 지정된 복장을 착용해 주시기 바랍니다.</li>
          <li>스파 이용 시 수영복 착용 필수입니다.</li>
        </ul>

        <h5>시설 내 안전 수칙</h5>
        <ul>
          <li>
            모든 시설에서는 고객님의 안전을 최우선으로 하며, 운영 수칙을 준수해
            주세요.
          </li>
          <li>유아와 동반 시 주의 바랍니다.</li>
        </ul>

        <h5>금지 사항</h5>
        <ul>
          <li>시설 내에서는 금연입니다. 지정된 흡연 구역을 이용해 주세요.</li>
          <li>외부 음식물 반입은 제한됩니다.</li>
          <li>시설 내 애완동물 출입은 금지되어 있습니다.</li>
        </ul>
      </div>

      <!-- 이용 요금 안내 탭 -->
      <div v-if="activeTab === 3" class="tab-content">
        <h4>이용 요금 안내</h4>
        <table class="fee-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>주중</th>
              <th>주말</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>정회원</td>
              <td>75,000원</td>
              <td>85,000원</td>
            </tr>
            <tr>
              <td>비회원</td>
              <td>200,000원</td>
              <td>240,000원</td>
            </tr>
          </tbody>
        </table>

        <h4 class="mt-4">기타 이용요금</h4>
        <table class="additional-fee-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>이용요금</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>카트료 (4인승 전동카트)</td>
              <td>100,000원</td>
            </tr>
            <tr>
              <td>캐디피</td>
              <td>150,000원</td>
            </tr>
            <tr>
              <td>대여 골프채 (세트)</td>
              <td>40,000원</td>
            </tr>
            <tr>
              <td>대여 골프채 (단품)</td>
              <td>10,000원</td>
            </tr>
          </tbody>
        </table>
        <p class="fee-notice">
          * 카트료와 캐디피는 그린피와 별도로 계산됩니다.<br />
          * 캐디피는 회원님께서 직접 캐디에게 지불하시면 됩니다.
        </p>
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

const tabs = ["이용 안내", "운영 시간", "유의 사항", "이용 요금 안내"];
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

.fee-table,
.additional-fee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.fee-table th,
.fee-table td,
.additional-fee-table th,
.additional-fee-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
}

.fee-table th,
.additional-fee-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #333;
}

.fee-notice {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
