<template>
  <div v-if="isLoaded" class="card p-4 mb-5">
    <h4 class="mb-3">구매상품 정보</h4>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="label-cell">지점</td>
            <td class="content-cell">
              <span>{{ themePark?.data?.name || "알 수 없음" }}</span>
            </td>
          </tr>
          <tr>
            <td class="label-cell">티켓 이름</td>
            <td class="content-cell">
              <span>
                {{ adultTicket?.ticketName || "알 수 없음" }} /
                {{ childTicket?.ticketName || "알 수 없음" }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="label-cell">유효기간</td>
            <td class="content-cell">
              <span>
                {{ formatDate(adultTicket?.validFromDate) }} ~
                {{ formatDate(adultTicket?.validToDate) }}
              </span>
              <br />
              <small class="text-muted">
                * 유효기간 중 언제든지 사용 가능한 상품입니다.
              </small>
            </td>
          </tr>
          <tr>
            <td class="label-cell">구매 수량</td>
            <td class="content-cell">
              <div class="quantity-row">
                <div class="quantity-group">
                  <label class="quantity-label">대인</label>
                  <div class="input-group">
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="decrementAdult"
                    >
                      <i class="ni ni-fat-delete"></i>
                    </button>
                    <input
                      type="number"
                      id="adultCount"
                      class="form-control quantity-input"
                      v-model="localAdultCount"
                      min="0"
                    />
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="incrementAdult"
                    >
                      <i class="ni ni-fat-add"></i>
                    </button>
                  </div>
                  <small class="text-muted price-info">
                    대인 / {{ adultTicket?.price || 0 }}원
                  </small>
                </div>

                <div class="quantity-group">
                  <label class="quantity-label">소인</label>
                  <div class="input-group">
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="decrementChild"
                    >
                      <i class="ni ni-fat-delete"></i>
                    </button>
                    <input
                      type="number"
                      id="childCount"
                      class="form-control quantity-input"
                      v-model="localChildCount"
                      min="0"
                    />
                    <button
                      class="btn btn-primary quantity-btn mb-0"
                      @click="incrementChild"
                    >
                      <i class="ni ni-fat-add"></i>
                    </button>
                  </div>
                  <small class="text-muted price-info">
                    소인 / {{ childTicket?.price || 0 }}원
                  </small>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="label-cell">총 금액 (VAT 포함)</td>
            <td class="content-cell total-price">
              <strong class="total-amount">{{ formattedTotalPrice }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useTicketStore } from "@/stores/ticketStore";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { useThemeParkStore } from "@/stores/themeparkStore";

const ticketStore = useTicketStore();
const { adultTicket, childTicket } = storeToRefs(ticketStore);
const themeParkStore = useThemeParkStore();

const { themePark } = storeToRefs(themeParkStore);

const props = defineProps({
  adultTicketId: {
    type: String,
    required: true,
  },
  childTicketId: {
    type: String,
    required: true,
  },
  themeParkId: {
    type: Number,
    required: true,
  },
});

const isLoaded = ref(false);

const formatDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "알 수 없음";
};

onMounted(async () => {
  try {
    if (props.adultTicketId) {
      await ticketStore.fetchAdultTicket(Number(props.adultTicketId));
    }

    if (props.childTicketId) {
      await ticketStore.fetchChildTicket(Number(props.childTicketId));
    }
    console.log(props.themeParkId);

    if (props.themeParkId) {
      await themeParkStore.fetchThemeParkById(Number(props.themeParkId));
    }

    isLoaded.value = true;
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
  }
});

const localAdultCount = ref(0);
const localChildCount = ref(0);

const incrementAdult = () => localAdultCount.value++;
const decrementAdult = () => {
  if (localAdultCount.value > 0) localAdultCount.value--;
};

const incrementChild = () => localChildCount.value++;
const decrementChild = () => {
  if (localChildCount.value > 0) localChildCount.value--;
};

const formattedTotalPrice = computed(() => {
  const adultTotal = localAdultCount.value * (adultTicket.value?.price || 0);
  const childTotal = localChildCount.value * (childTicket.value?.price || 0);
  return `₩ ${(adultTotal + childTotal).toLocaleString()}`;
});
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-bordered td {
  vertical-align: middle;
  padding: 15px;
}

.label-cell {
  width: 20%;
  font-weight: bold;
  text-align: left;
}

.content-cell {
  text-align: left;
}

.quantity-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.quantity-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.quantity-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-input {
  text-align: center;
  width: 60px;
  height: 40px;
  font-size: 1.2rem;
}

.price-info {
  font-size: 0.85rem;
  color: #6c757d;
}

.total-price {
  text-align: left;
}

.total-amount {
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
