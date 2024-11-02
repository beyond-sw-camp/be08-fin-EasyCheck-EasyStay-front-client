<template>
  <div class="card py-3 px-5">
    <form class="row g-3 align-items-center" @submit.prevent="searchRooms">
      <div
        class="col-md-2"
        style="border-right: 2px solid lightgray; height: 90px"
      >
        <div class="custom-select-container">
          <label for="resortSelect" class="form-label">방문리조트 선택</label>
          <select
            v-model="resort"
            id="resortSelect"
            :class="['form-select', { 'is-invalid': v$.resort.$error }]"
            @change="onSelectAccommodation"
          >
            <option value="" disabled>지점선택</option>
            <option
              v-for="accommodation in accommodations"
              :key="accommodation.id"
              :value="accommodation.id"
            >
              {{ accommodation.name }}
            </option>
          </select>
        </div>
        <div class="invalid-feedback" v-if="v$.resort.$error">
          리조트를 선택해주세요.
        </div>
      </div>

      <div
        class="col-md-2 custom-date-container"
        style="padding-left: 30px; height: 90px"
      >
        <label for="checkIn" class="form-label">체크인</label>
        <input
          id="checkIn"
          type="date"
          class="custom-date-input form-control"
          :class="{ 'is-invalid': v$.checkInDate.$error }"
          v-model="checkInDate"
        />
        <div class="invalid-feedback" v-if="v$.checkInDate.$error">
          {{ v$.checkInDate.$errors[0].$message }}
        </div>
      </div>

      <div
        class="col-md-2 custom-date-container"
        style="
          border-right: 2px solid lightgray;
          padding-right: 30px;
          height: 90px;
        "
      >
        <label for="checkOut" class="form-label">체크아웃</label>
        <input
          id="checkOut"
          type="date"
          class="custom-date-input form-control"
          :class="{ 'is-invalid': v$.checkOutDate.$error }"
          v-model="checkOutDate"
        />
        <div class="invalid-feedback" v-if="v$.checkOutDate.$error">
          {{ v$.checkOutDate.$errors[0].$message }}
        </div>
      </div>

      <div
        class="col-md-2 custom-date-container"
        style="
          /* border-right: 1px solid lightgray; */
          padding-right: 40px;
          padding-left: 40px;
          height: 90px;
          justify-content: center;
          align-items: center;
        "
      >
        <label for="roomCount" class="form-label">객실 수</label>
        <div class="room-count-wrapper d-flex">
          <button
            type="button"
            class="room-count-btn"
            @click="reservationStore.decreaseRoomCount"
            :disabled="roomCount <= 1"
          >
            -
          </button>
          <input
            min="1"
            max="4"
            type="number"
            id="roomCount"
            v-model="roomCount"
            :class="[
              'form-control room-count-input flex-grow-1',
              { 'is-invalid': v$.roomCount.$error },
            ]"
          />
          <button
            type="button"
            class="room-count-btn"
            @click="reservationStore.increaseRoomCount"
            :disabled="roomCount >= 4"
          >
            +
          </button>
        </div>
        <div class="invalid-feedback" v-if="v$.roomCount.$error">
          {{ v$.roomCount.$errors[0].$message }}
        </div>
      </div>

      <div
        class="col-md-4"
        style="height: 90px; justify-content: center; align-items: center"
      >
        <button type="submit" class="btn btn-black w-100">객실 검색</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useReservationStore } from "@/stores/reservationStore";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, maxValue, helpers } from "@vuelidate/validators";

const router = useRouter();

// pinia 스토어
const reservationStore = useReservationStore();
const accommodationStore = useAccommodationStore();

const { roomCount } = storeToRefs(reservationStore);
const { accommodations } = storeToRefs(accommodationStore);

// 달력 오늘, 내일로 초기화
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const accommodationId = ref();
const checkInDate = ref(formatDate(today));
const checkOutDate = ref(formatDate(tomorrow));
const resort = ref("");

// Vuelidate rules
const rules = {
  resort: { required: helpers.withMessage("리조트를 선택해주세요.", required) },
  checkInDate: {
    required: helpers.withMessage("체크인 날짜를 선택해주세요.", required),
    validDate: helpers.withMessage(
      "체크인 날짜는 오늘 이후여야 합니다.",
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }
    ),
  },
  checkOutDate: {
    required: helpers.withMessage("체크아웃 날짜를 선택해주세요.", required),
    validCheckout: helpers.withMessage(
      "체크아웃 날짜는 체크인 날짜 이후여야 합니다.",
      (value) => {
        const checkIn = new Date(checkInDate.value);
        const checkOut = new Date(value);
        return checkOut > checkIn;
      }
    ),
  },
  roomCount: {
    required: helpers.withMessage("객실 수를 선택해주세요.", required),
    minValue: helpers.withMessage(
      "최소 1개의 객실을 선택해주세요.",
      minValue(1)
    ),
    maxValue: helpers.withMessage(
      "최대 4개의 객실까지 선택 가능합니다.",
      maxValue(4)
    ),
  },
};

const v$ = useVuelidate(rules, {
  resort,
  checkInDate,
  checkOutDate,
  roomCount,
});

const searchRooms = async () => {
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    return;
  }

  router.push({
    name: "Reservation",
    query: {
      accommodationId: accommodationId.value,
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
    },
  });
};

const onSelectAccommodation = (e) => {
  accommodationId.value = e.target.value;
};
</script>

<style scoped>
.btn {
  border-radius: 0;
  /* border: 1px solid; */
  margin-left: 50px;
  margin-top: 30px;
  font-size: 14px;
  box-shadow: none;
}
.room-count-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
}

.room-count-input {
  width: 60px;
  border: none;
  text-align: center;
  -moz-appearance: textfield; /* Firefox */
  margin: 0;
  padding: 0.375rem 0;
}

/* Chrome, Safari, Edge에서 화살표 숨기기 */
.room-count-input::-webkit-outer-spin-button,
.room-count-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.room-count-btn {
  background-color: #f8f9fa;
  border: none;
  padding: 0.375rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.2s;
}

.room-count-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.room-count-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 입력 필드 포커스 시 스타일 */
.room-count-wrapper:focus-within {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* 유효성 검사 관련 스타일 추가 */
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.room-count-wrapper.is-invalid {
  border-color: #dc3545;
}

.form-select {
  appearance: none; /* 기본 선택 상자 스타일 제거 */
  background-color: #fff; /* 배경색 */
  border: 1px solid #444; /* 테두리 */
  border-radius: 0.1rem; /* 둥근 모서리 */
  padding: 0.5rem 1rem; /* 안쪽 여백 */
  font-size: 1rem; /* 글자 크기 */
  color: #333; /* 글자 색상 */
  transition: border-color 0.3s ease; /* 테두리 색상 변화 애니메이션 */
  width: 160px; /* 너비 100% */
}

.form-select:hover {
  border-color: #007bff; /* 마우스 오버 시 테두리 색상 */
}

.form-select:focus {
  outline: none; /* 포커스 아웃라인 제거 */
  border-color: #007bff; /* 포커스 시 테두리 색상 */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* 포커스 시 그림자 효과 */
}

.form-select.is-invalid {
  border-color: #dc3545; /* 에러 발생 시 테두리 색상 */
}

.form-select option {
  padding: 0.5rem; /* 옵션 안쪽 여백 */
}
.custom-date-container {
  width: 180px;
}

.custom-date-input {
  font-size: 0.9rem;
  padding: 8px;
  border: 1px solid #444;
  border-radius: 0;
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
  text-align: center;
  /* transition: border-color 0.3s ease, box-shadow 0.3s ease; */
}

.custom-date-input:focus {
  border-color: #333;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  outline: none;
}

.custom-date-input.is-invalid {
  border-color: #dc3545;
}
.divider {
  width: 1000px;
  height: 100%;
  border-left: 1px solid #444; /* 선 색상을 지정 */
  border-color: black;
  opacity: 0.1; /* 선의 투명도를 조정 (선택사항) */
}
.room-count-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #444; /* 진한 테두리 색상 */
  border-radius: 0; /* 둥글기 제거 */
  overflow: hidden;
}
.room-count-input {
  width: 60px;
  border: none;
  text-align: center;
  font-weight: bold;
  color: #333;
  background-color: #f9f9f9;
}
.room-count-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}
.room-count-wrapper:focus-within {
  border-color: #333;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); /* 포커스 시 진한 테두리 효과 */
}
.room-count-wrapper.is-invalid {
  border-color: #dc3545; /* 유효성 검사 실패 시 테두리 색상 */
}
</style>
