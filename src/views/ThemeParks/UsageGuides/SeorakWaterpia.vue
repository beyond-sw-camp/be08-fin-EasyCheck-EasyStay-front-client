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
      <h2 class="mb-4 guide-title">설악 워터피아 이용 안내</h2>

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
        <h5>설악 워터피아 입장권 구매 안내</h5>
        <p>
          홈페이지에서 입장권 구매 시 이용하시는 날짜의 시즌과, 대인/소인 유형을
          반드시 확인하시기 바랍니다.<br />
          입장권은 사전예약 없이 현장 매표소에서도 구입하실 수 있습니다.<br />
          입장 후 1시간 이내 요청 시 환불 가능합니다.<br />
          통합권 구매고객은 재입장이나 분할사용은 불가합니다.
        </p>

        <h5>워터페이 이용 안내</h5>
        <p>
          락커키에 카드를 미리 등록하시면 워터피아내에서 카드처럼 사용하실 수
          있습니다.<br />
          락카키에 카드 소유주 본인의 실물카드로 워터페이 등록 가능합니다.<br />
          카드비밀번호 앞의 2자리 2회 이상 잘못 입력 시 카드이용이 정지 될 수
          있습니다.<br />
          워터페이 사용 비밀번호 분실 시 해제 후 등록을 하셔야 합니다.
        </p>

        <h5>워터페이 등록 안내</h5>
        <p>
          등록은 개인, 체크, 개인법인카드로 등록 가능합니다.<br />
          카드 등록을 위한 고객 동의 후 소유자 본인의 개인정보를 입력합니다.<br />
          업장 내 사용하실 비밀번호를 설정하시고 이용합니다.<br />
          신발장에 키를 돌리시면 등록은 자동 해제됩니다.
        </p>

        <h5>잠깐! 유아동반 시 다음 사항을 꼭 지켜주세요</h5>
        <p>
          무료 입장 시 확인을 위하여 반드시 증빙서류를 지참하여 주시기
          바랍니다.<br />
          (증빙서류: 가족관계증명서, 의료보험증 등)<br />
          사우나(라커룸) 이용 시 만 4세 이상 아동은 이성 보호자와 동반 입장이
          불가합니다.
        </p>

        <h5>코인 이용안내</h5>
        <p>
          일정금액을 락커키에 미리 충전하시면 워터피아 내에서 현금처럼 사용하실
          수 있습니다.<br />
          이용 후 잔액은 퇴장 시 충전소에서 전액 환불받으실 수 있습니다.
        </p>

        <h5>코인 충전방법 안내</h5>
        <ul>
          <li>충전은 현금과 신용카드(체크카드 포함)로 가능합니다.</li>
          <li>
            상품권은 충전가능하나 60% 이상 사용 시 잔액 환불이 가능합니다.
          </li>
          <li>
            1인당 10,000원부터 200,000원까지, 만원 단위로 충전 가능합니다.
          </li>
          <li>현금과 카드를 모두 사용하여 충전 시 현금이 먼저 사용됩니다.</li>
          <li>
            카드 충전 후 잔액 환불 시, 기존 결제 내역 취소 후 사용한 만큼만
            재결제됩니다.
          </li>
        </ul>

        <h5>코인 충전지역 안내</h5>
        <ul>
          <li>워터피아 로비 (1층) 메인충전소/정산소</li>
          <li>지하 1층 렌탈샵</li>
        </ul>

        <h5>환불안내</h5>
        <ul>
          <li>
            코인 사용 후 금액에 대한 잔액 환불은 충전소/정산소에서 가능합니다.
          </li>
          <li>
            신용카드로 구입한 코인은 정산 시 사용하신 금액만큼만 재승인 됩니다.
          </li>
        </ul>
      </div>

      <!-- 시설 운영시간 탭 -->
      <div v-if="activeTab === 1" class="tab-content">
        <h5>시설 운영 시간 (Low 시즌)</h5>
        <table class="schedule-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>Low 시즌 (24.10.14 – 24.12.13)</th>
              <th>Night Spa (24.10.14 – 24.12.13)</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>매표소</td>
              <td>10:00 - 17:30</td>
              <td>19:00 - 20:30</td>
              <td></td>
            </tr>
            <tr>
              <td>주간 사우나</td>
              <td>16:00 – 18:00</td>
              <td>미운영</td>
              <td></td>
            </tr>
            <tr>
              <td>샤크블루 (실내)</td>
              <td>10:00 - 18:00</td>
              <td>19:00 - 21:30</td>
              <td></td>
            </tr>
            <tr>
              <td>유수풀</td>
              <td>10:00 – 18:00</td>
              <td>미운영</td>
              <td></td>
            </tr>
            <tr>
              <td>아쿠아 플레이 시스템</td>
              <td>10:00 - 18:00</td>
              <td>19:00 - 21:30</td>
              <td></td>
            </tr>
            <tr>
              <td>아쿠아풀</td>
              <td>11:00 - 18:00</td>
              <td>미운영</td>
              <td></td>
            </tr>
            <tr>
              <td>정규풀</td>
              <td>10:00 - 18:00</td>
              <td>19:00 - 21:30</td>
              <td></td>
            </tr>
            <tr>
              <td>스파밸리</td>
              <td>10:00 - 18:00</td>
              <td>19:00 - 21:30</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p class="facility-notice">
          * 시설 이용시간은 기후 및 운영 여건에 따라 변경될 수 있습니다.<br />
          * 실외 놀이기종과 사우나 노천탕은 기상조건(강풍, 폭우)에 따라 운영이
          제한될 수 있습니다.<br />
          * 놀이기종은 안전사고 예방을 위하여 키와 나이를 제한하고 있습니다.<br />
          * 놀이기종은 고객님들의 안전을 위하여 하루 2~3회 시설 점검을 실시하고
          있습니다.<br />
          * 스파동 입장 마감 시에는 아쿠아동으로 입장 가능합니다.
        </p>
      </div>

      <!-- 이용 시 유의사항 탭 -->
      <div v-if="activeTab === 2" class="tab-content">
        <h5>이용 시 유의사항</h5>

        <h5>음식물 반입 안내</h5>
        <ul>
          <li>
            생수 및 PET 음료, 이유식, 환자식, 껍질을 벗긴 씨 없는 과일만 반입
            가능합니다.
          </li>
          <li>
            알레르기, 발병, 치료 등의 이유로 섭취할 수 있는 음식이 제한된 경우
            기타 음식물 반입이 가능하며, 진료확인서를 지참하시어 사전 협의하여
            주시기 바랍니다.
          </li>
          <li>반입이 안되는 음식물은 보관증을 드리며 보관해 드립니다.</li>
          <li>
            보관하신 음식물은 당일에 한하여 보관되며 영업시간 종료 후
            폐기됩니다.
          </li>
        </ul>

        <h5>복장 안내</h5>
        <ul>
          <li>
            수영복과 수영모는 반드시 착용해 주셔야 하며, 캡모자 착용이
            가능합니다.
          </li>
          <li>
            수영복 위에는 물이 빠지지 않는 얇은 의류에 한하여 수영복 위에 착용이
            가능합니다.
          </li>
          <li>
            깨끗하고 안전한 물놀이를 위해 36개월 미만 유아는 반드시 방수 기저귀
            착용을 부탁드립니다.
          </li>
          <li>안전을 위해 아쿠아슈즈의 착용을 권장합니다.</li>
        </ul>

        <h5>기타 안전수칙</h5>
        <ul>
          <li>
            돗자리나 유모차를 반입하거나 반려동물과 함께 입장하실 수 없습니다.
          </li>
          <li>
            워터파크 내에서 타인에게 물총을 쏘거나 기타 불쾌감을 줄 수 있는
            행위를 금하여 주십시오.
          </li>
          <li>
            놀이시설 탑승구역, 유수풀, 파도풀 등 물놀이 구역에서는 구명조끼를
            반드시 착용해야 합니다.
          </li>
        </ul>
      </div>

      <!-- 이용 약관 탭 -->
      <div v-if="activeTab === 3" class="tab-content">
        <h5>제1조 (약관의 적용)</h5>
        <p>
          설악 워터피아의 입장과 시설물 이용에 관한 규정 사항은 본 약관에 정하는
          바에 의하고 본 약관에 규정되지 않은 내용에 관하여는 법령 또는 관습에
          따라 의한다.
        </p>

        <h5>제2조 (성수기/비수기)</h5>
        <p>
          ① 골드시즌, 하이시즌, 로우시즌으로 운영한다.<br />
          ② 회사의 사정에 따라 상기 시즌과는 별도의 시즌을 변경하여 운영할 수
          있다.
        </p>

        <h5>제3조 (개장 및 개장시간)</h5>
        <p>
          ① 개장 시간은 별도로 게시하여 운영하되, 특별한 경우 변경할 수 있다.<br />
          ② 시설의 개·보수 및 천재지변, 예측지 못한 기상 변화, 기타 회사의 특수
          사정 등에 의하여 일정기간 폐장할 수 있다.
        </p>

        <h5>제4조 (요금의 적용)</h5>
        <p>
          ① 요금적용 연령 구분<br />
          가. 대인 : 2024년 기준 2011년 생<br />
          나. 소인 : 2024년 기준 2020년생 ~ 2012년생까지
        </p>
        <p>* 2024년 기준 2021년 이후 출생 무료(건강보험증 반드시 지참)</p>
        <p>
          ② 단체요금 적용 : 30명 이상(단, 일정한 목적에 의한 단체명의로 입장하는
          경우)
        </p>
        <p>
          ③ 요 금 <br />
          입장료 및 렌탈, 부대시설(식음료 매장, 상품매장) 요금은 별도로 게시하며
          법률이 정하는 바에 따라 변경 될 수 있다.
        </p>

        <h5>제5조 (요금의 환불)</h5>
        <p>
          ① 각종 입장권은 입장한 후에는 환불하지 않는다.<br />
          ② 선불제의 경우 현금 대용으로 사용하여 워터피아 칩에 기록된 금액을
          사용자가 정산하여야 한다. 만약 워터피아 칩의 분실로 인한 사용 분에
          대해서는 회사에서는 책임지지 아니한다.
        </p>

        <h5>제6조 (제한 사항)</h5>
        <p>
          ① 쾌적하고 청결한 환경 유지를 위하여 다음과 같은 음식물 및 버너 등의
          반입/ 사용을 금지한다. <br />
          (단 물, 음료수(PET만 가능), 이유식, 환자식, 껍질 벗긴 씨 없는 과일의
          반입은 가능하다.) <br />
          가. 수질오염 등 물놀이 시설을 오염시킬 수 있는 음식물 <br />
          나. 식중독 등 이용객의 위생 사고의 위험이 있는 음식물 <br />
          다. 다른 이용객의 안전을 위협할 수 있는 음식물(병류, 캔류, 화기를
          이용해 조리를 하는 음식물 등) <br />
          라. 과도한 냄새로 인해 다른 이용객에게 불쾌감을 줄 수 있는 음식물
          <br />② 10세 이하의 어린이는 보호자가 동반한다. <br />
          ③ 쾌적하고 청결한 환경/수질 유지 및 이용자의 건강을 위하여 반드시
          수영모를 착용하여야 하며 금속성의 날카로운 장식물이 있는 수영복,
          수영모의 착용을 금지한다. <br />
          ④ 돗자리, 아이스 박스, 유리 용기, 애완 동물의 반입을 금지한다.<br />
          ⑤ 흡연은 지정된 장소에서만 가능하다.<br />
          ⑥ 사업 목적의 촬영은 사전에 회사의 허가를 받아야만 가능하다. <br />
          ⑦ 대형 물놀이 기구의 반입 및 사용을 금지한다.<br />
          ⑧ 슬라이더 탑승 시 안경, 시계, 악세사리 등의 착용을 금지한다. <br />
          ⑨ 타 사용자에게 폐가 될 우려가 있는 사람의 입장을 금지한다. <br />
          ⑩ 고객의 편의와 안전을 위하여 나이, 신장 등의 신체 조건을 고려하여
          시설물 이용을 제한 할 수 있다.<br />
          ⑪ 각 시설물 이용 규칙과 주의 사항은 시설 별로 게시한다.<br />
          ⑫ 음식물의 섭취는 깨끗한 환경 유지를 위해 회사가 지정한 장소에서
          행해져야 한다.
        </p>

        <h5>제7조 (재입장)</h5>
        <p>
          입장객이 퇴장한 후 재입장은 원칙적으로 불가하다. <br />
          단, 회사가 인정하는 경우에 한하여 재입장이 가능하되, 회사에서 승인하는
          표시가 있어야 한다.
        </p>

        <h5>제8조 (손해배상 (사고시 처리))</h5>
        <p>
          ① 회사의 시설물 관리 소홀 등의 과실로 인하여 고객에게 손해가
          발생하였을 경우 회사는 배상의 의무를 진다.<br />
          ② 손님의 귀책사유에 의하여 발생된 사고에 대하여는 책임을 지지 않는다.
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

const tabs = ["이용안내", "시설 운영시간", "이용 시 유의사항", "이용 약관"];
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

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
}

.schedule-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #333;
}

.facility-notice {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
