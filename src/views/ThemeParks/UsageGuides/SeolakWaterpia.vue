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
      <h2 class="mb-4">설악 워터피아 이용 안내</h2>

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
        <li>음식점 및 카페</li>
        <li>기념품 가게</li>
        <li>안전 요원 및 응급 처치실</li>
      </ul>

      <h4>이용 시 유의사항</h4>
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
          보관하신 음식물은 당일에 한하여 보관되며 영업시간 종료 후 폐기됩니다.
        </li>
      </ul>

      <h5>복장 안내</h5>
      <ul>
        <li>
          수영복과 수영모는 반드시 착용해 주셔야 하며, 캡모자 착용이 가능합니다.
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
          워터파크 내에서 타인에게 물총을 쏘거나 기타 불쾌감을 줄 수 있는 행위를
          금하여 주십시오.
        </li>
        <li>
          놀이시설 탑승구역, 유수풀, 파도풀 등 물놀이 구역에서는 구명조끼를
          반드시 착용해야 합니다.
        </li>
      </ul>

      <h4>이용기간 및 시간</h4>
      <p><strong>Low 시즌:</strong> 24.10.14(월) – 24.12.13(금)</p>

      <h4>시설 운영 시간 (Low 시즌)</h4>
      <table>
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
            <td>메일 스트롬</td>
            <td>11:00 - 18:00</td>
            <td>미운영</td>
            <td></td>
          </tr>
          <tr>
            <td>샤크 웨이브 (실외)</td>
            <td>미운영</td>
            <td>미운영</td>
            <td></td>
          </tr>
          <tr>
            <td>토렌트리버</td>
            <td>미운영</td>
            <td>미운영</td>
            <td></td>
          </tr>
          <tr>
            <td>익스트림밸리</td>
            <td>미운영</td>
            <td>미운영</td>
            <td></td>
          </tr>
          <tr>
            <td>어드벤처 아일랜드</td>
            <td>미운영</td>
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
          <tr>
            <td>실내외 시설 이용시간</td>
            <td>10:00 - 18:00</td>
            <td>19:00 - 21:30</td>
            <td></td>
          </tr>
          <tr>
            <td>입장마감 시간</td>
            <td>17:30</td>
            <td>20:30</td>
            <td></td>
          </tr>
          <tr>
            <td>퇴장시간</td>
            <td>18:30</td>
            <td>22:00</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h4>워터페이 이용 안내</h4>
      <p>
        락커키에 카드를 미리 등록하시면 워터피아내에서 카드처럼 사용하실 수
        있습니다. 카드비밀번호 앞의 2자리 2회 이상 잘못 입력 시 카드이용이 정지
        될 수 있습니다.
      </p>

      <h4>코인 이용 안내</h4>
      <p>
        일정금액을 락커키에 미리 충전하시면 워터피아 내에서 현금처럼 사용하실 수
        있습니다. 이용 후 잔액은 퇴장 시 충전소에서 전액 환불받으실 수 있습니다.
      </p>
    </div>
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.guide-content h4,
.guide-content h5 {
  margin-top: 1.5rem;
  font-weight: bold;
  color: #333;
}

.guide-content p,
.guide-content ul,
.guide-content table {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #555;
}

ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

ul li {
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
}

table th {
  background-color: #f1f1f1;
  font-weight: bold;
}
</style>
