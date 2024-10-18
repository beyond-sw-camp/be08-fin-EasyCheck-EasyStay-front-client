<template>
  <section class="room-rates mt-4">
    <h3 class="text-black mb-3">객실 요금</h3>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="dropdown">
        <button
          class="btn btn-secondary rounded-0 dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          @click="toggleDropdown"
        >
          {{ selectedMonth }}
        </button>
        <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
          <li v-for="month in availableMonths" :key="month">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectMonth(month)"
              >{{ month }}</a
            >
          </li>
        </ul>
      </div>
      <button class="btn btn-primary rounded-0" @click="search">검색</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-light">
          <tr>
            <th>구분</th>
            <th>일반요금</th>
            <th colspan="2">객실이용요금</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>무기명</th>
            <th>기명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rate in roomRates" :key="rate.id">
            <td>{{ rate.type }}</td>
            <td>{{ formatPrice(rate.normalPrice) }}</td>
            <td>{{ formatPrice(rate.unnamedPrice) }}</td>
            <td>{{ formatPrice(rate.namedPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 small">
      <p><strong>요금 구분</strong></p>
      <ul>
        <li>일반요금 : 비회원 대상</li>
        <li>
          객실이용요금 : 한화리조트 회원권을 소지하고 계신 개인,법인회원 대상
        </li>
      </ul>
      <p>
        프렌즈 고객 요금은 로그인 후 객실예약 화면에서 별도 조회가
        가능합니다.(일반요금 대비 20~40% 할인 적용)
      </p>
      <p>
        자세한 시즌 일정은 로그인 후 확인 가능합니다.<br />(홈페이지 >
        회원로그인 > 분양회원추첨접수 > 추첨접수안내 > 추첨예약 일정)
      </p>
    </div>
  </section>
  <section class="late-checkout-fees mt-5">
    <h3 class="text-brown mb-4">퇴실 연장요금 안내</h3>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th rowspan="2">시기</th>
            <th colspan="2">퇴실 연장요금(시간당)</th>
          </tr>
          <tr>
            <th>회원</th>
            <th>비회원</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in feeData" :key="index">
            <td :rowspan="row.timeSlots.length">{{ row.season }}</td>
            <template
              v-for="(slot, slotIndex) in row.timeSlots"
              :key="`${index}-${slotIndex}`"
            >
              <tr v-if="slotIndex !== 0">
                <td>{{ slot.time }}</td>
                <td>{{ slot.memberFee }}</td>
                <td>{{ slot.nonMemberFee }}</td>
              </tr>
              <td v-else>{{ slot.time }}</td>
              <td>{{ slot.memberFee }}</td>
              <td>{{ slot.nonMemberFee }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 small">
      <ul>
        <li>오후 3시 이후 퇴실 시에는 1박의 객실요금을 지불해야 합니다.</li>
        <li>퇴실 연장은 객실상황에 따라 불가할 수 있습니다.</li>
        <li>
          퇴실 연장을 원하시는 고객님께서는 사전에 프런트로 문의해 주시기
          바랍니다.
        </li>
      </ul>
      <p><strong>요일기준</strong></p>
      <ul>
        <li>
          주중: 일 ~ 목 (한화리조트 제주, 거제 벨버디어, 르 씨엘 멤버스: 월 ~
          목)
        </li>
        <li>
          주말: 금, 토 (한화리조트 제주, 거제 벨버디어, 르 씨엘 멤버스: 금, 토,
          일)
        </li>
        <li>연휴: 공휴일 당일 및 전일</li>
        <li>성수기: 여름 및 겨울 성수기 기간 별도 안내</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const isDropdownOpen = ref(false);
const selectedMonth = ref("2024년 03월");
const availableMonths = ["2024년 03월", "2024년 04월", "2024년 05월"];

const roomRates = ref([
  {
    id: 1,
    type: "가을 비수기 준주말",
    normalPrice: 475000,
    unnamedPrice: 223000,
    namedPrice: 213000,
  },
  {
    id: 2,
    type: "가을 비수기 일요일",
    normalPrice: 473000,
    unnamedPrice: 222000,
    namedPrice: 212000,
  },
  {
    id: 3,
    type: "가을 비수기 월요일",
    normalPrice: 425000,
    unnamedPrice: 199000,
    namedPrice: 189000,
  },
  {
    id: 4,
    type: "가을 비수기 화요일",
    normalPrice: 410000,
    unnamedPrice: 192000,
    namedPrice: 182000,
  },
  {
    id: 5,
    type: "가을 비수기 수요일",
    normalPrice: 410000,
    unnamedPrice: 192000,
    namedPrice: 182000,
  },
  {
    id: 6,
    type: "가을 비수기 목요일",
    normalPrice: 425000,
    unnamedPrice: 199000,
    namedPrice: 189000,
  },
  {
    id: 7,
    type: "가을 성수기 주말",
    normalPrice: 538000,
    unnamedPrice: 240000,
    namedPrice: 230000,
  },
  {
    id: 8,
    type: "가을 성수기 연휴",
    normalPrice: 665000,
    unnamedPrice: 251000,
    namedPrice: 241000,
  },
  {
    id: 9,
    type: "가을 극성수기 연휴",
    normalPrice: 728000,
    unnamedPrice: 276000,
    namedPrice: 266000,
  },
  {
    id: 10,
    type: "가을 준성수기B 연휴",
    normalPrice: 593000,
    unnamedPrice: 222000,
    namedPrice: 212000,
  },
]);

const feeData = ref([
  {
    season: "주말/연휴/성수기",
    timeSlots: [
      { time: "11시 부터", memberFee: "10,000", nonMemberFee: "20,000" },
      {
        time: "15시 이후",
        memberFee: "일일 객실료",
        nonMemberFee: "일일 객실료",
      },
    ],
  },
  {
    season: "비수기 주중",
    timeSlots: [
      { time: "12시 부터", memberFee: "10,000", nonMemberFee: "20,000" },
      {
        time: "15시 이후",
        memberFee: "일일 객실료",
        nonMemberFee: "일일 객실료",
      },
    ],
  },
]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectMonth = (month) => {
  selectedMonth.value = month;
  isDropdownOpen.value = false;
};

const search = () => {
  console.log(`Searching for rates in ${selectedMonth.value}`);
  // Here you would typically fetch new data based on the selected month
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(price);
};
</script>

<style lang="scss" scoped>
.room-rates {
  .table {
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .table th {
    background-color: #f8f9fa;
  }

  .dropdown-toggle,
  .btn-primary {
    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.375rem 0.75rem;
    }
  }

  .dropdown-menu {
    display: none;
    &.show {
      display: block;
    }
  }
}
.late-checkout-fees {
  .table {
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .table th {
    background-color: #f8f9fa;
    vertical-align: middle;
  }

  .text-brown {
    color: #8b4513;
  }

  ul {
    padding-left: 1.2rem;
  }

  @media (max-width: 768px) {
    .table-responsive {
      font-size: 0.8rem;
    }
  }
}
</style>
