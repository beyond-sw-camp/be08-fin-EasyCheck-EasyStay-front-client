<template>
  <div class="reservation-form">
    <div class="form-section">
      <h3 class="form-title">예약자 정보 입력</h3>
      <p class="form-subtitle">* 표시된 항목은 필수 입력 사항입니다.</p>

      <div class="form-group">
        <label for="reservationName" class="form-label">예약자 이름 *</label>
        <div class="input-group">
          <input
            type="text"
            id="reservationName"
            v-model="reservationName"
            class="form-control"
            placeholder="이름"
          />
          <button class="btn-verify" type="button">본인인증</button>
        </div>
        <small class="input-hint"
          >온라인 비회원으로 예약 시 본인인증이 필요합니다.</small
        >
      </div>

      <div class="form-group">
        <label for="reservationPhone" class="form-label"
          >예약자 휴대전화 번호 *</label
        >
        <input
          type="tel"
          id="reservationPhone"
          v-model="reservationPhone"
          class="form-control"
          placeholder="'-' 제외하고 숫자만 입력"
        />
      </div>
    </div>

    <div class="form-section">
      <h3 class="form-title">투숙자 정보 입력</h3>
      <div class="form-check">
        <input
          type="checkbox"
          id="sameAsReservation"
          v-model="sameAsReservation"
          class="form-check-input"
        />
        <label for="sameAsReservation" class="form-check-label"
          >예약자 정보와 동일</label
        >
      </div>

      <div class="form-group">
        <label for="guestName" class="form-label">내표 투숙자 이름 *</label>
        <input
          type="text"
          id="guestName"
          v-model="guestName"
          class="form-control"
          placeholder="이름"
        />
      </div>

      <div class="form-group">
        <label for="guestPhone" class="form-label"
          >내표 투숙자 휴대전화 번호 *</label
        >
        <input
          type="tel"
          id="guestPhone"
          v-model="guestPhone"
          class="form-control"
          placeholder="'-' 제외하고 숫자만 입력"
        />
      </div>

      <div class="form-group">
        <label class="form-label">이메일 (선택)</label>
        <div class="email-group">
          <input
            type="text"
            v-model="emailLocal"
            class="form-control"
            placeholder="이메일"
          />
          <span class="email-at">@</span>
          <input
            type="text"
            v-model="emailDomain"
            class="form-control"
            placeholder="도메인"
          />
        </div>
        <small class="input-hint"
          >이메일 주소 입력 시 '예약확인정' 메일이 발송됩니다.</small
        >
      </div>

      <div class="form-group">
        <label class="form-label">투숙 인원 *</label>
        <div class="guest-count-group">
          <div class="count-control">
            <button @click="decreaseAdult">-</button>
            <input type="text" v-model="adultCount" readonly />
            <button @click="increaseAdult">+</button>
            <span>성인 {{ adultCount }}명</span>
          </div>
          <div class="count-control">
            <button @click="decreaseChild">-</button>
            <input type="text" v-model="childCount" readonly />
            <button @click="increaseChild">+</button>
            <span>소인 {{ childCount }}명</span>
          </div>
        </div>
        <small class="input-hint">객실 정원은 최대 4인까지 가능합니다.</small>
        <small class="input-hint">객실 정원은 영유아 포함입니다.</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reservationName = ref("");
const reservationPhone = ref("");
const sameAsReservation = ref(false);
const guestName = ref("");
const guestPhone = ref("");
const emailLocal = ref("");
const emailDomain = ref("");
const adultCount = ref(2);
const childCount = ref(0);

const decreaseAdult = () => {
  if (adultCount.value > 1) adultCount.value--;
};

const increaseAdult = () => {
  if (adultCount.value + childCount.value < 4) adultCount.value++;
};

const decreaseChild = () => {
  if (childCount.value > 0) childCount.value--;
};

const increaseChild = () => {
  if (adultCount.value + childCount.value < 4) childCount.value++;
};
</script>

<style lang="scss" scoped>
.reservation-form {
  margin: 0 auto;

  background-color: #fff;

  .form-section {
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .form-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .form-subtitle {
    color: #dc3545;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 14px;
    }

    .input-group {
      display: flex;
      align-items: center;

      .form-control {
        flex: 1;
        height: 40px;
        padding: 5px 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
      }

      .btn-verify {
        margin-left: 10px;
        padding: 0 15px;
        height: 40px;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
      }
    }

    .form-control {
      width: 100%;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  .input-hint {
    font-size: 12px;
    color: #6c757d;
    display: block;
    margin-top: 5px;
  }

  .form-check {
    margin-bottom: 15px;
    display: flex;

    .form-check-input {
      margin-right: 5px;
    }
  }

  .email-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .form-control {
      flex: 1;
    }

    .email-at {
      font-size: 16px;
    }
  }

  .guest-count-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .count-control {
      display: flex;
      align-items: center;
      border: 1px solid #ced4da;
      border-radius: 4px;

      button {
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
      }

      input {
        width: 40px;
        height: 40px;
        text-align: center;
        border: none;
        font-size: 14px;
      }

      span {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        background-color: #f8f9fa;
        border-left: 1px solid #ced4da;
        font-size: 14px;
      }
    }
  }
}
</style>
