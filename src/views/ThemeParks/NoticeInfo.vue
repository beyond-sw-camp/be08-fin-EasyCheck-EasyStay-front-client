<template>
  <div class="information-section container-fluid px-5 py-4">
    <div class="row mb-5">
      <div class="col-md-6">
        <h4 class="mb-3">문의 전화</h4>
        <div class="contact-info-box">
          <table>
            <tr>
              <span class="theme-park-name mx-2">{{
                props.themeParkName
              }}</span>
              <span class="contact-number mx-2">041-939-1135</span>
            </tr>
            <tr>
              <span class="mx-2">
                관련 궁금한 사항이 있으시면 언제든지 문의해 주세요.
                <br />
              </span>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <h4 class="mb-3">유의사항</h4>
      <div class="notice-box">
        <ul>
          <li>
            2024년 정기휴장: 매달 마지막주 수요일 (단, 3월 4일~29일, 9월 4일
            휴장 / 7월, 8월, 12월 휴장 없음)
          </li>
          <li>
            2024년 공휴 및 연휴 휴장 적용일: 1월 1일, 2월 9일~12일, 3월 1일, 4월
            10일, 5월 6일, 6월 6일, 8월 15일, 9월 16일~18일, 10월 1일, 10월 9일,
            12월 25일
          </li>
          <li>
            아쿠아가든 운영 및 시즌에 따라 정기휴장일은 변동될 수 있습니다.
          </li>
          <li>특수 기간 내 체크인 전 또는 체크아웃 후에도 이용 가능합니다.</li>
          <li>
            1m 이상 튜브는 반입불가하며, 시설에 따라 튜브사용이 제한될 수
            있습니다.
          </li>
          <li>
            귀중품은 정상적인 점검을 보관함에 보관하지 않은 경우, 분실 및
            도난사고에 책임을 지지 않습니다. (상법153조)
          </li>
          <li>
            이유식, 환자식, 제한적 과일류, 피트병을 외 음식물의 유실물을 유발시
            반입이 제한됩니다.
          </li>
          <li>
            구명조끼 (키 130cm 이하), 수모 또는 아쿠아패션(샤넬 착용 필수),
            수영복 또는 착용 시 시설 이용이 제한됩니다.
          </li>
          <li>아쿠아가든은 고지사항 이외, 크롭스 착용을 불가합니다.</li>
          <li>
            안전사고 예방을 위해 소인이나 어르신만 이용 가능합니다. (보조자 동반
            입장 필수)
          </li>
          <li>
            유모차 및 휠체어, 돗자리 반입을 금지합니다. (사무실 또는 정산소
            데스크로 보관 가능)
          </li>
          <li>
            공중위생관리법 제23 규에 따라 새 학기마켓 이용자 개인 위생장소에
            대로타일 이용 중복이 불가능합니다.
          </li>
          <li>음주자는 시설을 이용할 수 없습니다.</li>
          <li>반려동물 입장을 금지합니다.</li>
          <li>아쿠아가든은 안전시설로 정상영업을 합니다.</li>
          <li>충돌(물보호요청) 상, 허락받지 않는 한 가지가 적용합니다.</li>
          <li>
            유실물이 예외로 하며, 카드 사용이 불가능한 입장상점에서 선물
            초콜렛을 제공합니다.
          </li>
          <li>카드, 현금 충전시 누적 또는 금액은 차액 환불됩니다.</li>
          <li>모든 물공방 및 티셔츠용품은 중고에서 사용 불가합니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  themeParkName: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.information-section {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.theme-park-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.contact-number {
  font-size: 1.2rem;
}

.notice-box {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ccc, transparent);
  position: relative;

  &::before {
    content: "●";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: #ccc;
    padding: 0 10px;
    font-size: 0.8rem;
  }
}
</style>
