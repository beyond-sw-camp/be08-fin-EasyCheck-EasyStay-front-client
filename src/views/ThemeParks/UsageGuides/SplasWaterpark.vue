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
      <h2 class="mb-4 guide-title">스플라스 워터파크 이용 안내</h2>

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
        <h5>입장 안내</h5>
        <p>
          티켓은 발행 당일 1회만 사용 가능하며, 분실 시 재발행되지 않습니다.<br />
          티켓 발권 후 반드시 20분 이내에 입장하셔야 합니다. (20분 초과 시 결제
          취소 후 재매표)<br />
          입장은 폐장 1시간 전까지 가능합니다.<br />
          성수기에는 본관과 별관으로 나누어 입장할 수 있습니다.<br />
          본관 락커 마감 시 별관 입장만 가능합니다.<br />
          최초 입장 후에는 재입장이 불가합니다.<br />
          입장 후에는 환불이 불가합니다. 단, 입장 후 30분 이내 긴급한 귀가 사정
          발생 시 특별한 사유로 가능합니다.<br />
          워터파크 내 일부 시설은 유료로 운영되며, 퇴장 시 후불 정산됩니다.
        </p>

        <h5>귀중품 보관</h5>
        <p>
          귀중품은 정산소에 위치한 귀중품보관소에 맡겨 주십시오.<br />
          귀중품보관소에 맡기지 않은 물품의 분실 및 도난에 대해서는 당사가
          책임지지 않습니다.
        </p>

        <h5>유의사항</h5>
        <ul>
          <li>최초 입장 후에는 재입장이 불가합니다.</li>
          <li>
            맨발 또는 아쿠아 슈즈 착용 가능합니다. (슬리퍼 및 크록스 착용 불가)
          </li>
          <li>
            수영모 및 캡모자 등 머리가 완전히 덮이는 모자 착용 필수입니다.
            (머리가 보이는 썬캡, 두건, 후드모자 등 착용 불가)
          </li>
          <li>
            돗자리, 의자, 웨건, 핸드카트, 유모차, 요람, 오리발, 보트, 대형튜브는
            반입을 금지합니다.
          </li>
          <li>
            음식물은 반입 금지입니다. 다음에 해당되는 음식물을 가져온 경우
            보관소에 맡겨 주십시오.
          </li>
          <li>
            물, PET음료, 영아 이유식, 특수체질 및 특이환자를 위한 특별식에
            한하여 반입 가능
          </li>
          <li>
            음식물 외 기타 물품 및 분실물 보관기간은 일주일이며, 이후 모두
            폐기처분됩니다.
          </li>
          <li>반려동물 동반은 금지되어 있습니다.</li>
          <li>음주자는 절대 입장하실 수 없습니다.</li>
          <li>
            노약자, 임산부, 거동이 불편하신 분들은 안전을 위해 보호자와 동반하여
            주십시오. (시설 동의서 작성 후 이용)
          </li>
          <li>식후 30분 이내에는 물 속에 들어가지 마십시오.</li>
          <li>
            탕에 들어갈 때는 지정된 출입구를 이용하여 주십시오. 다이빙은 절대
            금지입니다.
          </li>
          <li>
            안전사고 예방을 위하여 나이 제한, 신장 제한 등 이용 제한 시설이
            있습니다.
          </li>
          <li>바데풀은 신장 140cm 이하 구명조끼 필수 착용</li>
          <li>
            토렌트리버(파도풀)에 비치된 튜브 수량이 부족할 수 있으며, 개인튜브
            반입이 가능합니다.
          </li>
          <li>
            고객 부주의로 발생하는 안전사고에 대해서는 당사에서 책임지지
            않습니다.
          </li>
        </ul>

        <h5>어린이 물놀이 안전 약속</h5>
        <ul>
          <li>어린이가 혼자 있지 않도록 항상 보호자가 동행해 주십시오.</li>
          <li>물에 들어가기 전 준비체조를 해야 합니다.</li>
          <li>바닥이 미끄럽습니다. 뛰지 않도록 살펴 주십시오.</li>
          <li>
            6세 이하의 어린이는 안전을 위해 어린이용 튜브를 이용해야 합니다.
          </li>
          <li>
            신장 150cm 이하 어린이는 바데풀에 입장할 수 없습니다. (보호자 동반
            시 또는 구명조끼 착용 시 가능)
          </li>
          <li>영유아 어린이는 반드시 구명조끼를 착용해야 합니다.</li>
          <li>
            다음에 해당하는 어린이는 사우나 이용 시 혼욕을 할 수 없습니다: 만
            4세 이상, 신장 100cm 이상
          </li>
          <li>3세 이하 어린이는 방수기저귀를 착용해야 합니다. (스파샵 판매)</li>
        </ul>
      </div>

      <!-- 사우나/워터파크 운영시간 탭 -->
      <div v-if="activeTab === 1" class="tab-content">
        <h5>사우나/워터파크 운영시간</h5>
        <table class="schedule-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>운영기간</th>
              <th>운영시간</th>
              <th>매표시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사우나</td>
              <td>주간권</td>
              <td>06:00 ~ 19:00</td>
              <td>06:00 ~ 18:00</td>
            </tr>
            <tr>
              <td>워터파크</td>
              <td>주간권</td>
              <td>09:00 ~ 18:00</td>
              <td>09:00 ~ 17:00</td>
            </tr>
          </tbody>
        </table>
        <p class="facility-notice">
          매표소 운영시간 : 06:00~18:00<br />
          문의 : 041-330-8064
        </p>

        <h5>어트랙션 운영시간 (비수기/동계)</h5>

        <div class="attraction-schedule">
          <h6>[주중]</h6>
          <table class="schedule-table">
            <thead>
              <tr>
                <th>시간</th>
                <th>마스터 슬라이드</th>
                <th>파도풀</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00 ~ 11:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>11:00 ~ 12:00</td>
                <td>점검</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>12:00 ~ 13:00</td>
                <td>운영</td>
                <td>점검</td>
              </tr>
              <tr>
                <td>13:00 ~ 14:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>14:00 ~ 15:00</td>
                <td>점검</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>15:00 ~ 16:00</td>
                <td>운영</td>
                <td>점검</td>
              </tr>
              <tr>
                <td>16:00 ~ 17:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>17:00</td>
                <td>종료</td>
                <td>종료</td>
              </tr>
            </tbody>
          </table>

          <h6>[주말 / 공휴일]</h6>
          <table class="schedule-table">
            <thead>
              <tr>
                <th>시간</th>
                <th>마스터 슬라이드</th>
                <th>파도풀</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00 ~ 11:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>11:00 ~ 12:00</td>
                <td>운영</td>
                <td>점검</td>
              </tr>
              <tr>
                <td>12:00 ~ 13:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>13:00 ~ 14:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>14:00 ~ 15:00</td>
                <td>점검</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>15:00 ~ 16:00</td>
                <td>운영</td>
                <td>운영</td>
              </tr>
              <tr>
                <td>16:00 ~ 17:30</td>
                <td>운영</td>
                <td>종료</td>
              </tr>
              <tr>
                <td>17:30</td>
                <td>종료</td>
                <td>종료</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="facility-notice">
          * 폭우, 강풍 등 기상 악화 시 어트랙션 운행이 중단될 수 있습니다.<br />
          * 운영 및 점검 시간은 현장 상황에 따라 변경될 수 있습니다.<br />
          * 문의: 041-330-8064
        </p>

        <h5>수유실 안내</h5>
        <p>
          위치: 워터파크 내 의무실 옆<br />
          운영시간: 워터파크 운영시간 내<br />
          문의: 041-330-8064
        </p>
      </div>

      <!-- 시설 대여 요금 탭 -->
      <div v-if="activeTab === 2" class="tab-content">
        <h5 class="table-title">
          시설 대여요금 <span>*일부 시설 특별 할인가 적용</span>
        </h5>
        <table class="rental-table">
          <thead>
            <tr>
              <th>위치</th>
              <th>품목</th>
              <th>일반시즌<br />(주중 / 주말)</th>
              <th>하계성수기<br />(주중 / 주말)</th>
              <th>보증금</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2">써니레이존<br />(야외 1층)</td>
              <td>구명조끼</td>
              <td>5,000원</td>
              <td>3,000원</td>
              <td>3,000원</td>
            </tr>
            <tr>
              <td>선베드</td>
              <td>10,000원 / 15,000원</td>
              <td>20,000원</td>
              <td>30,000원</td>
            </tr>
            <tr>
              <td rowspan="2">오크사우나<br />(패밀리룸)</td>
              <td>대여비</td>
              <td style="color: red">200,000원 / 250,000원</td>
              <td style="color: red">100,000원 / 180,000원</td>
              <td>260,000원</td>
            </tr>
            <tr>
              <td>케이브방갈로</td>
              <td>80,000원 / 100,000원</td>
              <td>130,000원</td>
              <td></td>
            </tr>
            <tr>
              <td rowspan="2">토렌트리버존<br />(야외 2층)</td>
              <td>선베드</td>
              <td>10,000원 / 15,000원</td>
              <td>20,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>카바나</td>
              <td>50,000원 / 70,000원</td>
              <td>90,000원</td>
              <td></td>
            </tr>
            <tr>
              <td rowspan="7">실내 스파존</td>
              <td>선베드</td>
              <td>10,000원 / 15,000원</td>
              <td>20,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>방갈로<br />(편백 커플룸)</td>
              <td>130,000원 / 180,000원</td>
              <td>200,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>방갈로<br />(편백 패밀리룸)</td>
              <td>150,000원 / 200,000원</td>
              <td>220,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>방갈로Ⅱ</td>
              <td>70,000원 / 100,000원</td>
              <td>150,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>사랑채 방갈로</td>
              <td>100,000원 / 150,000원</td>
              <td>180,000원</td>
              <td></td>
            </tr>
            <tr>
              <td>대여가운</td>
              <td colspan="2">15,000원</td>
              <td>10,000원</td>
            </tr>
            <tr>
              <td>바스타올</td>
              <td colspan="2">5,000원</td>
              <td>10,000원</td>
            </tr>
          </tbody>
        </table>
        <p class="facility-notice">
          * 모든 대여상품은 현장대여이며, 사전예약은 불가합니다.<br />
          * 렌탈품목 및 요금은 변경될 수 있습니다.<br />
          * 워터파크 내 용품 대여, 시설 대여, 식음업장 이용 시 발생하는 요금은
          퇴장 시 후불 정산됩니다.
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

const tabs = ["이용 안내", "이용 시간", "시설 대여 요금"];
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

.schedule-table,
.attraction-table,
.rental-table,
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.schedule-table th,
.schedule-table td,
.attraction-table th,
.attraction-table td,
.rental-table th,
.rental-table td,
.info-table th,
.info-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
}

.schedule-table th,
.attraction-table th,
.rental-table th,
.info-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #333;
}
.table-title {
  font-weight: bold;
  color: #333;
}
.table-title span {
  color: red;
  font-size: 0.9rem;
  margin-left: 5px;
}

.rental-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.rental-table th,
.rental-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
}

.rental-table th {
  background-color: #f9f9f9;
  font-weight: bold;
  color: #333;
}

.rental-table td.rowspan {
  vertical-align: middle;
}

.discount {
  font-weight: bold;
  color: #333;
}

.red {
  color: red;
  font-weight: bold;
  display: block;
  margin-top: 4px;
}

.attraction-schedule h6 {
  font-weight: bold;
  margin-top: 20px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 20px;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.schedule-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.facility-notice {
  font-size: 0.9rem;
  color: #555;
}
</style>
