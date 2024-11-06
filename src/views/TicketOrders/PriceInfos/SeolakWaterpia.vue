<template>
  <h2>설악 워터피아 이용 요금 안내</h2>

  <!-- 요금 테이블 -->
  <div class="responsive-table-container">
    <table class="price-table">
      <thead>
        <tr>
          <th rowspan="2">구분</th>
          <th rowspan="2">대인/소인</th>
          <th colspan="3">요금</th>
        </tr>
        <tr>
          <th>회원가</th>
          <th>투숙객</th>
          <th>정상 요금</th>
        </tr>
      </thead>
      <tbody>
        <!-- 주간권 -->
        <tr>
          <td rowspan="2">주간권 (10시-18시)</td>
          <td>대인</td>
          <td>33,500원</td>
          <td>36,000원</td>
          <td>56,000원</td>
        </tr>
        <tr>
          <td>소인</td>
          <td>27,000원</td>
          <td>29,000원</td>
          <td>45,000원</td>
        </tr>

        <!-- 오후권 -->
        <tr>
          <td rowspan="2">오후권 (15시-18시)</td>
          <td>대인</td>
          <td>28,500원</td>
          <td>30,500원</td>
          <td>47,500원</td>
        </tr>
        <tr>
          <td>소인</td>
          <td>22,500원</td>
          <td>24,500원</td>
          <td>38,000원</td>
        </tr>

        <!-- Night Spa -->
        <tr>
          <td rowspan="2">Night Spa (19시-21시30분)</td>
          <td>대인</td>
          <td>24,500원</td>
          <td>26,500원</td>
          <td>41,000원</td>
        </tr>
        <tr>
          <td>소인</td>
          <td>19,000원</td>
          <td>20,500원</td>
          <td>32,000원</td>
        </tr>

        <!-- 통합권 주간 + Night Spa -->
        <tr>
          <td rowspan="2">통합권 주간 + Night Spa (10시-21시30분)</td>
          <td>대인</td>
          <td>46,500원</td>
          <td>50,000원</td>
          <td>77,500원</td>
        </tr>
        <tr>
          <td>소인</td>
          <td>36,500원</td>
          <td>39,500원</td>
          <td>61,500원</td>
        </tr>

        <!-- 통합권 오후 + Night Spa -->
        <tr>
          <td rowspan="2">통합권 오후 + Night Spa (15시-21시30분)</td>
          <td>대인</td>
          <td>42,000원</td>
          <td>45,500원</td>
          <td>70,500원</td>
        </tr>
        <tr>
          <td>소인</td>
          <td>33,500원</td>
          <td>36,000원</td>
          <td>56,000원</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 안내 정보 섹션 -->
  <div class="info-section">
    <h3>통합권 이용 안내</h3>
    <p>재입장이나 분할 사용은 불가합니다.</p>

    <h3>소인 기준 안내</h3>
    <p>
      <strong>2024년 소인 기준:</strong> 2020년생 ~ 2012년생 (2021년생 ~
      2024년생 무료)<br />
      소인 확인을 위해 의료보험증, 출생증명서, 등본을 지참해 주세요. 미 지참
      시 무료 입장이 불가할 수 있습니다.
    </p>
  </div>

  <!-- 렌탈 품목 및 사용 요금 -->
  <h3>렌탈 품목 및 사용 요금</h3>
  <table class="rental-table">
    <thead>
      <tr>
        <th>구분</th>
        <th>사용 요금</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>남, 여 수영복</td>
        <td>10,000원</td>
      </tr>
      <tr>
        <td>여성 일체형 수영복</td>
        <td>15,000원</td>
      </tr>
      <tr>
        <td>랩스커트 / 치마</td>
        <td>10,000원</td>
      </tr>
      <tr>
        <td>구명자켓</td>
        <td>8,000원</td>
      </tr>
    </tbody>
  </table>
  <p>비치타월은 15,000원에 구매 가능합니다.</p>

  <!-- 휴식처 이용 요금 -->
  <h3>휴식처 이용 요금</h3>
  <table class="relaxation-table">
    <thead>
      <tr>
        <th>구분</th>
        <th>종일 이용 요금</th>
        <th>주말, 연휴 요금</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>썬베드 단품</td>
        <td>20,000원</td>
        <td>30,000원</td>
      </tr>
      <tr>
        <td>썬베드 세트</td>
        <td>40,000원</td>
        <td>60,000원</td>
      </tr>
      <tr>
        <td>데이베드</td>
        <td>50,000원</td>
        <td>70,000원</td>
      </tr>
      <tr>
        <td>커플베드</td>
        <td>70,000원</td>
        <td>90,000원</td>
      </tr>
      <tr>
        <td>패밀리 룸</td>
        <td>100,000원</td>
        <td>120,000원</td>
      </tr>
      <tr>
        <td>리프레쉬 룸</td>
        <td>80,000원</td>
        <td>100,000원</td>
      </tr>
      <tr>
        <td>카바나</td>
        <td>100,000원</td>
        <td>120,000원</td>
      </tr>
    </tbody>
  </table>
  <p>
    외부 기후에 따라 야외 썬베드 세트, 카바나는 미운영될 수 있습니다.<br />
    구명조끼와 휴식처 대여는 워터페이 또는 코인 결제만 가능합니다.
  </p>
</template>

<script setup></script>

<style scoped>
/* 반응형 테이블 설정 */
/* .responsive-table-container {
  overflow-x: auto;
} */

.price-table,
.rental-table,
.relaxation-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.price-table th,
.price-table td,
.rental-table th,
.rental-table td,
.relaxation-table th,
.relaxation-table td {
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #ddd;
  white-space: nowrap;
  /* 줄바꿈 방지 */
}

.price-table th {
  background-color: #f1f1f1;
  color: #333;
  font-weight: bold;
}

.info-section {
  margin-top: 2rem;
}

.info-section h3,
.rental-table h3,
.relaxation-table h3 {
  margin-top: 1.5rem;
  color: #555;
}

@media (max-width: 768px) {

  /* 모바일 화면에서 표 스타일 조정 */
  .price-table th,
  .price-table td,
  .rental-table th,
  .rental-table td,
  .relaxation-table th,
  .relaxation-table td {
    padding: 6px;
  }
}
</style>
