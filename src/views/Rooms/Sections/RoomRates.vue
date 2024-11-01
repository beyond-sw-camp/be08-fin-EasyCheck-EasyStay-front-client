<template>
  <section class="room-rates mt-4">
    <h3 class="text-black mb-3">객실 요금</h3>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="dropdown">
        <button class="btn btn-secondary rounded-0 dropdown-toggle" type="button" id="dropdownMenuButton"
          @click="toggleDropdown">
          {{ selectedMonth }}
        </button>
        <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
          <li v-for="month in availableMonths" :key="month" class="dropdown-item" href="#"
            @click.prevent="selectMonth(month)">
            {{ month }}
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
            <th>법인 회원요금</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rate in roomRates" :key="rate.id">
            <td>{{ rate.seasonName }}</td>
            <td>{{ formatPrice(rate.normalRate) }}</td>
            <td>{{ formatPrice(rate.corpRate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 small">
      <p><strong>요금 구분</strong></p>
      <ul>
        <li>일반요금 : 일반회원 대상</li>
        <li>
          객실이용요금 : EasyStay 회원권을 소지하고 계신 개인,법인회원 대상
        </li>
      </ul>
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
            <template v-for="(slot, slotIndex) in row.timeSlots" :key="`${index}-${slotIndex}`">
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
    <li>주중: 일 ~ 목</li>
    <li>주말: 금, 토</li>
    <li>연휴: 공휴일 당일 및 전일</li>
    <li>성수기: 여름 및 겨울 성수기 기간 별도 안내</li>
  </ul>
</div>
</section>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/stores/roomStore";

const roomStore = useRoomStore();
const { roomRates, currentRoomId } = storeToRefs(roomStore);

const isDropdownOpen = ref(false);
const currentYear = new Date().getFullYear();

// 월 선택지 생성
const availableMonths = computed(() => {
  const months = ["전체"];
  for (let i = 1; i <= 12; i++) {
    const monthStr = i < 10 ? `0${i}` : `${i}`;
    months.push(`${currentYear}년 ${monthStr}월`);
  }
  return months;
});

// 현재 월을 기본값으로 설정
const selectedMonth = ref("전체");

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

const convertToLocalDate = (monthStr) => {
  if (monthStr === "전체") return null;

  const [year, month] = monthStr
    .replace(/[년월\s]/g, "")
    .match(/(\d{4})(\d{2})/)
    .slice(1);
  return `${year}-${month}-01`;
};

const search = async () => {
  const localDateStr = convertToLocalDate(selectedMonth.value);

  // 여기서 서버 통신 로직 구현
  await roomStore.fetchRoomRates(currentRoomId.value, localDateStr);
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
    border: 1px solid #dee2e6 !important;
    border-collapse: collapse;
  }

  .table td {
    border: 1px solid #dee2e6 !important;
    border-collapse: collapse;
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
    border: 1px solid #dee2e6 !important;
    border-collapse: collapse;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .table th {
    background-color: #f8f9fa;
    vertical-align: middle;
    border: 1px solid #dee2e6 !important;
    border-collapse: collapse;
  }

  .table td {
    border: 1px solid #dee2e6 !important;
    border-collapse: collapse;
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
